using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;

namespace _01_测试用例
{
    class Program
    {
        static void Main(string[] args)
        {
            if (!Directory.Exists("output")) Directory.CreateDirectory("output");
            if (!Directory.Exists("input")) Directory.CreateDirectory("input");

            string[] files = Directory.GetFiles("./input");

            for (int i = 0; i < files.Length; i++)
            {
                Process(files[i]);
            }

            Console.WriteLine("抠图成功");
 
            Console.ReadKey();


        }


        static void Process(string path)
        {
            // 读取图片
            Image img = Image.FromFile(path);

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
            
            string fileName = Path.GetFileNameWithoutExtension(path);
            string newFileName = Path.Combine("output", fileName + "_抠图.png");

            bitmap2.Save(newFileName, ImageFormat.Png);
        }
    }
}
