
// 生成一个长度为 10 的 数组, 要求数组中的数据均是数字
// 并且要求每一个数字不重复

function random( min, max ) {
    return Math.floor( ( max - min ) * Math.random() ) + min;
}



// 传统解法
// var arr = [];

// while( arr.length < 10 ) {
//     var num = random( 0, 10 );
//     if ( arr.indexOf( num ) == -1 ) {
//         arr.push( num );
//     }
// }


// 上述算法的时间复杂度略高, 可以调整一下思路

var arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
for ( var i = 0; i < arr.length; i++ ) {
    var index = random( 0, arr.length );
    arr[ i ] = arr[ index ] + ( arr[ index ] = arr[ i ] ) * 0;
}

console.log( arr );
