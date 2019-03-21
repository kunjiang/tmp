var data = [
  { name: '随便什么名字1', otherProp: '测试1' },
  { name: '男装 - 随便什么名字2', otherProp: '测试2' },
  { name: '随便什么名字3', otherProp: '测试3' },
  { name: '男装 - 随便什么名字4', otherProp: '测试4' },
  { name: '童装 - 随便什么名字5', otherProp: '测试5' },
  { name: '随便什么名字6', otherProp: '测试6' },
  { name: '随便什么名字7', otherProp: '测试7' },
  { name: '童装 - 随便什么名字8', otherProp: '测试8' },
  { name: '随便什么名字9', otherProp: '测试9' },
  { name: '随便什么名字10', otherProp: '测试10' },
  { name: '随便什么名字11', otherProp: '测试11' }
];



// 过滤依据
var keys = [ '男装', '童装' ];

// 构造正则
var rtmp = new RegExp( '^' + keys.join( '|^' ) );

// 排序
data.sort( ( a, b ) => {

  var v1 = Number( rtmp.test( a.name ) ),
      v2 = Number( rtmp.test( b.name ) );
  return v1 - v2;

} );


console.table( data );