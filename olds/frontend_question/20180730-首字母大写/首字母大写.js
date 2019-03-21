var  str = 'hello, i\'m a student';


/**
 * 1. 传统处理就是遍历循环
 */

// 传统处理就是遍历循环
str.split( ' ' ).map( v => v.charAt( 0 ).toUpperCase() + v.slice( 1 ) ).join( ' ' );


// map
var arr = [ 1, 2, 3 ];
arr.map( function ( v, i ) {
    return v;
} ); // [ 1, 2, 3 ]

var arr = [ 1, 2, 3 ];
arr.map( function ( v, i ) {
    return v * 2;
} ); // [ 2, 4, 6 ]

// 遍历数组中的每一个元素, 将每一个元素用 函数来处里
// 处理后得到一个结果, map 会将全部的该结果组成新数组返回
// 因此 将 map 命名为 映射

// 应用场景
// 数组: 
var menus = '首页,关于默默,消息,xxx'.split( ',' )
// 要求:
// 1> 生成一个 ul-li 的菜单
'<ul>' + menus.map( function ( v ) { return '<li>' + v + '</li>'; } ).join( '' ) + '</ul>'
// 2> 生成表格的 表头行
// <thead><tr><th>...
menus.map( ( v ) => '<th>' + v + '</th>' );


// 箭头函数
// 特点: this 不再有单独的所用域
// 特点:
// 1) 如果参数只有一个 () 可以省略
// 2) 如果箭头函数的函数体只有一句话, 或括号可以省略, return 关键字可省略


/**
 * 2. 使用正则表达式
 */

// 将连字符连接的字符串转换成 驼峰命名规则
// get-element0by-id => getElementById
// 推荐大家看 vue 的源代码

var r = /^(\w)|\s+(\w)/g;

var  str = 'hello, i\'m a student';

str.replace( r, function ( _, g1, g2 ) { 
    // 如果匹配到 第 1 组就将其转大写返回
    if ( g1 ) return g1.toUpperCase();
    // 如果匹配到 第 2 组就将其转大写, 并连同前面的空格返回
    return ' ' + g2.toUpperCase();
} );