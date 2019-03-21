// var str = '1234'; // 数字的 1234

// 生写( 秦九韶算法 )
// 1234 => 1000 + 200 + 30 + 4      按权展开

// 算法描述
// s = 0;
// s += 4 * 10^0;                 // 4
// s += 3 * 10^1;                 // 34
// s += 2 * 10^2;                 // 234
// s += 1 * 10^3;                 // 1234

// Math.pow()
/*
var s = 0;
for ( var i = str.length - 1; i >= 0; i-- ) {
    var base = str.length - i - 1; // 
    // console.log( base ); // 0, 1, 2, 3
    // console.log( str.charCodeAt( i ) );
    s += ( str.charCodeAt( i ) - 48 ) * Math.pow( 10, base );
}
console.log( s );
*/






// 真正的 秦九韶

var str = '2468';

// 算法描述
// s = 0;
// s = s * 10 + 2;         // 2
// s = s * 10 + 4          // 24
// s = s * 10 + 6          // 246
// s = s * 10 + 8          // 2468


var s = 0;
for ( var i = 0; i < str.length; i++ ) {
    var num = str.charCodeAt( i ) - 48;
    s = s * 10 + num;
}


