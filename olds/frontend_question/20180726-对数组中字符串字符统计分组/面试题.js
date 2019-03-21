var list = ['key', 'yek', 'sin', 'eyk', 'ins', 'pat'];
// 期望返回[['key', 'yek', 'eyk'], ['sin','ins'], ['pat']]


// 思路: 遍历数组中的每一个元素, 并计算这个元素的 一个 特征 数据( 我们自己定义 )
// 由于字符串的排序是不一样的, 但是字母都是相同的. 
// 选取 这个字符串中的所有字符安升序排序


function getTeZheng( str ) {
    return str.split( '' ).sort().join( '' );
}

var obj = {}; // key: 特征字符串, value: [ 每一个单词 ]

list.forEach( function ( word ) {
    var tezheng = getTeZheng( word );
    if( obj[ tezheng ] ) {
        obj[ tezheng ].push( word );
    } else {
        obj[ tezheng ] = [ word ];
    }
});

var arr = Object.values( obj );