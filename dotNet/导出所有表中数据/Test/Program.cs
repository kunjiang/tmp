using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
            string  s = Regex.Replace("aaa\"aa", "\"", "\\\"");
            Console.ReadKey();
        }
    }
}
