/**
 * 2018 年 8 月 7 日
 */
var jklib = 
(function () {

/**
 * 定义枚举类型: 用于在后期创建相应的 Node 对象( 待优化算法 )
 */
var nodeTypes = {
  element: 1,
  _1: 'element',

  text: 3,
  _3: 'text',

  parseString: function ( value ) {
    return 'nodeType.' + nodeTypes[ '_' + value ];
  }
};



// 对象结构
/*
{
  tmpId,
  nodeType,
  nodeName,
  nodeValue
  props,
  childNodes,
  parentNode,
}
*/

/**
 * 记录元素 id, 利用栈结构记录成对的标签
 */
var _queue = [];


/**
 * 解析 XML DOM 字符串, 将其解析为一棵树对象
 */
function tmpXMLParse ( xmlStr ) {
  // xmlStr = xmlStr.trim();
  var start = 0;
  var tmp = [];
  for ( var i = 0; i < xmlStr.length; i++ ) {
    var c = xmlStr.charAt( i );
    // 判断 开始的 <
    if ( c === '<' ) {
      if ( start !== i ) { // 如果 i !== start 说明 < 前面还有文本
        var s = xmlStr.slice( start, i );
        tmp.push( s );  
      } // 截取前面的字符
      start = i; // 表示从 < 开始截取后面的节点
    }
    // 获得结束的 > 需要截取该标签
    if ( c === '>' ) {
      var s = xmlStr.slice( start, i + 1 );
      tmp.push( s );
      start = i + 1;
    }

    if ( i === xmlStr.length - 1 ) {
      if ( start !== i ) {
        var s = xmlStr.slice( start );
        tmp.push( s );
      }
    }
  }
  return tmp; // 仅仅实现简单的标签解析, 无层次
}


return {
  XMLParse: tmpXMLParse
};
})();