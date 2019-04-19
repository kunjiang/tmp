using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace 导出所有表中数据
{
    class Program
    {
        static void Main(string[] args)
        {
            // string[] white_list = { "systemlog", "ip", "tb_Adminlog", "tb_U_Info" };

            string appset = ConfigurationManager.AppSettings["white"];

            string[] white_list = appset.Split(',');


            string connStr = "Data Source=123.123.123;Initial Catalog =123;User ID=123;Password=123";

            // 查询出所有的 表 ( 查询系统视图 )
            string search_tables_sql = @"SELECT [TABLE_NAME] FROM [DB_SCZS].[INFORMATION_SCHEMA].[TABLES]";

            using (SqlConnection conn = new SqlConnection(connStr))
            {
                using (SqlCommand cmd = new SqlCommand(search_tables_sql, conn))
                {
                    conn.Open();
                    List<string> tables = new List<string>();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string tblName = reader.GetString(0);
                            tables.Add(tblName);
                        }
                    }


                    // 循环 tables 生成查询语句, 将数据保存到文件中
                    for (int i = 0; i < tables.Count; i++)
                    {
                        string table = tables[i];

                        if (white_list.Any(s => table.ToLower().IndexOf(s.ToLower()) > -1)) continue;


                        string filename = "db_" + table + ".xmlsnippet";

                        using (FileStream stream = new FileStream(filename, FileMode.Append))
                        {
                            using (StreamWriter writer = new StreamWriter(stream, Encoding.UTF8))
                            {
                                string sql = "SELECT * FROM " + table;

                                cmd.CommandText = sql;
                                Console.WriteLine("执行: {0}, 导出数据 ...", sql);


                                using (SqlDataReader reader = cmd.ExecuteReader())
                                {
                                    List<string> item = new List<string>();
                                    List<string> columnNames = new List<string>();

                                    if (!reader.HasRows) continue;

                                    for (int j = 0; j < reader.FieldCount; j++)
                                    {
                                        columnNames.Add(reader.GetName(j));
                                    }

                                    while (reader.Read())
                                    {
                                        for (int j = 0; j < reader.FieldCount; j++)
                                        {
                                            object cell = reader.GetValue(j);

                                            if (Regex.IsMatch(cell.ToString(), "/>|</"))
                                            {
                                                // <![CDATA[
                                                item.Add(string.Format("<{0}><![CDATA[{1}]]></{0}>", columnNames[j], cell));
                                            }
                                            else {
                                                item.Add(string.Format("<{0}>{1}</{0}>", columnNames[j], cell));
                                            } 

                                        }

                                        writer.WriteLine(
                                            "<DataItem>\n    " +
                                                string.Join( "\n    ", item ) +
                                            "\n</DataItem>"
                                        );
                                        
                                    }
                                }
                            }

                        }
                        Console.WriteLine("\t\tFinished.");
                        
                    }
                }
            }

            Console.WriteLine("导出完成, 按任意键继续");
            Console.ReadKey();
            
        }
    }
}
