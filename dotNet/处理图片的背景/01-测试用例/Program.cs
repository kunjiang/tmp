using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;

namespace _01_测试用例
{
    class Program
    {
        static void Main(string[] args)
        {
            // 读取图片
            Image img = Image.FromFile("./1.png");

            // 获得 Bitmap 实例
            Bitmap bitmap = new Bitmap(img);

            int width = bitmap.Width;
            int height = bitmap.Height;

            Color white = Color.White;
            Color black = Color.Black;

            // 生成二值图
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    // 如果颜色为 250 以上的设置为 255, 其他设置为 0
                    Color c = bitmap.GetPixel(x, y);
                    if (c.R > 250 && c.G > 250 && c.B > 250)
                    {
                        bitmap.SetPixel(x, y, white);
                    }
                    else
                    {
                        bitmap.SetPixel(x, y, black);
                    }
                    
                }
            }

            // 保存
            bitmap.Save("binary image.png", ImageFormat.Png);

            Console.WriteLine("保存 二值图 成功");



            /*
            List<Point> list = new List<Point>();

            // 生成边框(算法应该可以避免)
            for (int x = 1; x < width - 1; x++)
            {
                for (int y = 1; y < height - 1; y++)
                {
                    // 计算 ( x, y ) 邻域的颜色是否与当前点相同
                    Color c = bitmap.GetPixel(x, y);

                    Color clt = bitmap.GetPixel(x - 1, y - 1);
                    Color cct = bitmap.GetPixel(x, y - 1);
                    Color crt = bitmap.GetPixel(x + 1, y - 1);
                    Color clc = bitmap.GetPixel(x - 1, y);
                    Color crc = bitmap.GetPixel(x + 1, y);
                    Color clb = bitmap.GetPixel(x - 1, y + 1);
                    Color ccb = bitmap.GetPixel(x, y + 1);
                    Color crb = bitmap.GetPixel(x + 1, y + 1);

                    if (
                        c.ToArgb() == clt.ToArgb()
                        && c.ToArgb() == cct.ToArgb()
                        && c.ToArgb() == crt.ToArgb()
                        && c.ToArgb() == clc.ToArgb()
                        && c.ToArgb() == crc.ToArgb()
                        && c.ToArgb() == clb.ToArgb()
                        && c.ToArgb() == ccb.ToArgb()
                        && c.ToArgb() == crb.ToArgb()
                    )
                    {
                        list.Add(new Point(x, y));
                    }
                }
            }
            // 处理颜色
            for (int i = 0; i < list.Count; i++)
            {
                Point pt = list[i];
                bitmap.SetPixel(pt.X, pt.Y, white);
            }

            bitmap.Save("line out.png", ImageFormat.Png);
            Console.WriteLine("生成边框");
            */



            // 抠图 (将白色区域的点设置为透明)
            Bitmap bitmap2 = new Bitmap(img);

            for (int x = 0; x < bitmap2.Width; x++)
            {
                for (int y = 0; y < bitmap2.Height; y++)
                {
                    if (bitmap.GetPixel(x, y).ToArgb() == white.ToArgb())
                    {
                        bitmap2.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
                    }
                }
            }

            bitmap2.Save("抠图.png", ImageFormat.Png);

            Console.WriteLine("抠图成功");


            Console.ReadKey();


        }
    }
}
