// 生写实现 contains 方法
// var lstr // long
// var sstr // short

// 遍历 lstr, 取 sstr.charAt( 0 )
function contains( lstr, sstr ) {
    // 核心算法
    var first = sstr.charAt( 0 );
    for ( var i = 0; i < lstr.length; i++ ) {
        // 判断
        if ( lstr.charAt( i ) === first ) {
            // 后面的字符可能是我要找的
            // 从 lstr 的 第 i 项开始查找
            for ( var j = 0; j < sstr.length; j++ ) {
                if ( lstr[ i + j ] != sstr[ j ] ) {
                    // 这个元素不对
                    // i + j 这个元素开始不对, 再遍历的时候, 从 长字符串的 i + j + 1 位置开始遍历
                    i = i + j;
                    break;
                }
            }
            // 找到了这个字符串
            // 判断是不是正常跳出
            if ( j === sstr.length ) {
                return i;
            }
        }
    }
    return -1;
}


// lstr 'abcabcdefg'
// sstr 'bcd'



// /^\s*|\s*$/g