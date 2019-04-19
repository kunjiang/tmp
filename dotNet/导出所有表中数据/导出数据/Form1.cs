using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Windows.Forms;

namespace 导出数据
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            CheckForIllegalCrossThreadCalls = false;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            txtConnStr.Text = ConfigurationManager.ConnectionStrings["conn"].ConnectionString;

        }

        private void btnConnectDB_Click(object sender, EventArgs e)
        {
            using (SqlConnection conn = new SqlConnection(this.txtConnStr.Text))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT [TABLE_NAME] FROM [INFORMATION_SCHEMA].[TABLES]", conn))
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string tableName = reader.GetString(0);
                            listTables.Items.Add(tableName);
                        }
                    }

                }
            }
        }

        private void listTables_SelectedIndexChanged(object sender, EventArgs e)
        {
            string tableName = listTables.SelectedItem.ToString();

            txtOutputFileName.Text = "db_" + tableName;

            cmbFormat.SelectedIndex = -1;

            // 查询该表总数据量
            using (SqlConnection conn = new SqlConnection(txtConnStr.Text))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT COUNT(*) FROM " + tableName, conn))
                {
                    conn.Open();

                    int count = Convert.ToInt32(cmd.ExecuteScalar());

                    this.Text = string.Format("表 {0} 含有 {1} 条记录", tableName, count);
                }
            }
        }

        private void cmbFormat_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (cmbFormat.SelectedIndex == -1) return;

            string format = this.cmbFormat.SelectedItem.ToString();

            if (txtOutputFileName.Text.Trim().Length == 0)
            {
                MessageBox.Show("请先选择需要导出的表格", "警告", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string tableName = this.listTables.SelectedItem.ToString();

            switch (format.ToLower())
            {
                case "xml": this.txtOutputFileName.Text = "db_" + tableName + ".xml";  break;
                case "json": this.txtOutputFileName.Text = "db_" + tableName + ".json"; break;
                case "csv": this.txtOutputFileName.Text = "db_" + tableName + ".csv"; break;
            }
            
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            Thread thread = new Thread( process );
            thread.Start();
        }


        private void process()
        {
            // 获得相关数据
            string outputfilename = txtOutputFileName.Text;

            // 获得查询表名
            string tablename = listTables.SelectedItem != null ? listTables.SelectedItem.ToString() : "";

            // 获得查询范围
            int start;
            int end;

            if (!int.TryParse(txtRangeStart.Text, out start)) {
                MessageBox.Show("请输入有效的范围", "警告", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            if (!int.TryParse(txtRangeEnd.Text, out end))
            {
                MessageBox.Show("请输入有效的范围", "警告", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // 导出格式
            string format = cmbFormat.SelectedItem != null ? cmbFormat.SelectedItem.ToString().ToLower() : "";


            // 简单校验数据
            if (
                outputfilename.Trim().Length == 0 ||
                tablename.Trim().Length == 0 ||
                format.Trim().Length == 0
            ) {
                MessageBox.Show("请确保所有的参数都有效", "警告", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }



            // 处理数据
            // 判断文件夹是否存在( output )
            if (!Directory.Exists("output"))
            {
                Directory.CreateDirectory("output");
            }

            using (FileStream stream = new FileStream(Path.Combine("output", outputfilename), FileMode.Append))
            {
                using (StreamWriter writer = new StreamWriter(stream, Encoding.UTF8))
                {
                    // 准备 SQL 语句
                    string sql = string.Format(
                           "SELECT * FROM ( SELECT ROW_NUMBER() OVER(ORDER BY id) AS rowNum, * FROM {0} ) AS t WHERE rowNum BETWEEN {1} AND {2} ", 
                           tablename, start, end
                    );

                    int count = end - start; // 用于计算比例
                    List<string> cols = new List<string>();

                    using (SqlConnection conn = new SqlConnection(txtConnStr.Text))
                    {
                        using (SqlCommand cmd = new SqlCommand(sql, conn))
                        {
                            conn.Open();


                            using (SqlDataReader reader = cmd.ExecuteReader())
                            {
                                // 获得列
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    cols.Add(reader.GetName(i));
                                }

                                // 获取数据
                                // <?xml version="2.0" charset="utf-8"?><datas></datas>
                                // [ {} ]
                                // ,
                                switch (format.ToLower())
                                {
                                    case "xml":
                                        writer.WriteLine("<?xml version=\"2.0\" charset=\"utf - 8\"?><datas>");
                                        break;
                                    case "json":
                                        writer.WriteLine("[");
                                        break;
                                    case "csv":
                                        // 将列保存起来
                                        try
                                        {
                                            File.WriteAllLines(Path.Combine("output", outputfilename + ".columns"), cols);
                                        }
                                        catch (Exception ex)
                                        {
                                            File.WriteAllText("err.txt", ex.ToString());
                                        }
                                        break;
                                }

                                int _count = 0;
                                while (reader.Read())
                                {
                                    _count++;
                                    List<string> items = new List<string>();

                                    for (int i = 0; i < reader.FieldCount; i++)
                                    {
                                        switch (format.ToLower())
                                        {
                                            case "xml":
                                                items.Add(string.Format("<{0}>{1}</{0}>", cols[i], reader.GetValue(i).ToString()));
                                                break;
                                            case "json":
                                                items.Add(string.Format(
                                                    "{0}: \"{1}\"", 
                                                    cols[i], 
                                                    Regex.Replace(
                                                        reader.GetValue(i).ToString(), 
                                                        "\"", 
                                                        "\\\""
                                                    )
                                                ));
                                                break;
                                            case "csv":
                                                items.Add(reader.GetValue(i).ToString());
                                                break;
                                        }
                                    }
                                    
                                    // 格式化写入
                                    switch (format.ToLower())
                                    {
                                        case "xml":
                                            writer.WriteLine("<item>\n    {0}\n</item>", string.Join("\n    ", items));
                                            break;
                                        case "json":
                                            writer.WriteLine("{{\n    {0}\n}},", string.Join("\n    ", items));
                                            break;
                                        case "csv":
                                            writer.WriteLine(string.Join(",", items));
                                            break;
                                    }
                                    


                                    // 写完一条, 计算完成百分比
                                    int curr = _count * 100 / count;

                                    progressBar.Value = curr;

                                }
                               

                                // 收尾
                                switch (format.ToLower())
                                {
                                    case "xml":
                                        writer.WriteLine("</datas>");
                                        break;
                                    case "json":
                                        writer.WriteLine("]");
                                        break;
                                    case "csv": break;
                                }

                            }

                        }
                    }
                }
            }


            progressBar.Value = 100;
            // 提示
            MessageBox.Show("数据导出完毕");
        }
    }
}
