var data = [
  [ '21寸', '19寸', '18寸' ],
  [ 799, 499 ],
  [ '白色', '黑色', '红色', '蓝色' ]
];

/**
 * 将十进制数转换成 adic 进制数
 * @param {number} num, 需要转换的十进制数 
 * @param {number} adic, 采用的进制数, 默认为 10 进制
 */
function convert( num, adic = 10 ) {
  var tmp_arr = [], tmp;
  do {
    tmp = num % adic;
    tmp_arr.unshift( tmp );
  } while ( num = parseInt( num / adic ) );
  return tmp_arr; // .join( '' );
}

/**
 * 将 adic 进制数转换成 10 进制数
 * @param {string} num, 需要转换的数字( 数字形式 )
 * @param {number} adic, 进制 
 */
function toDec( num, adic ) {
  var s = 0;
  for ( var i = 0; i < num.length; i++ ) {
    s = s * adic + num.charCodeAt( i ) - 48;
  }
  return s;
}

// 测试
// var t1 = convert( 5, 2 );
// console.log( t1 );
// console.log( typeof t1 );

// console.log( toDec( 101, 2 ) );

var adic = 0;
data.forEach( v => adic = v.length > adic ? v.length : adic );
// 3 位 4 进制数最大为 333 => 转换成 10 进制  3 * 4^2 + 3 * 4^1 + 3 * 4^0 // 3 + 12 + 48 = 63

// data.length 表示位数
// adic 表示进制
var max_adic = [];
data.forEach( () => max_adic.push( adic - 1 ) );
// console.log( max_adic );

var max_10 = toDec( max_adic.join( '' ), adic );
// console.log( max_10 );
var res = [];

for ( var i = 0; i < max_10; i++ ) {
  var tmp = convert( i, adic );
  // console.log( tmp );
  // 位数不够前面补 0
  while ( tmp.length < data.length ) {
    tmp.unshift( 0 );
  }

  // console.log( tmp );

  res.push( data.map( (v, index) => v[ tmp[ index ] - 0 ] || -1 ) );
}

res = res.filter( v => v.indexOf( -1 ) === -1 );

console.log( res );

