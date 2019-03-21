/**
 * 2018 年 8 月 7 日
 */
var jklib = 
(function () {

// 约定 标签类型是 1, 文本类型是 3
var relem = /^<[\s\S]+>$/;
function checkNodeType( nodeStr ) {
  if ( relem.test( nodeStr ) ) return 1;
  return 3;
}

// 检查是否是开始标签, 结束标签, 以及自闭和标签
// 约定: 开始标签为 1, 结束标签为 2, 自闭和标签是 3
var relemType = /^<(\/)|(\/)>$/
function checkElementType( elemStr ) {
  var m = relemType.exec( elemStr );
  if ( m ) {
    if ( m[ 1 ] ) {
      return 2;
    } else if ( m[ 2 ] ) {
      return 3;
    } 
  } else {
    return 1;
  }
  
}


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




function Init( xmlstr ) {
  this.__xmlstr__ = xmlstr;

  this.__startIndex__ = 0;
  this.__currentIndex__ = 0;
  
}
Init.prototype = {
  constructor: Init,
  /**
   * 获得当前节点字符串数据, 如果有数据则返回, 如果没有数据则返回 null
   */
  get current() {
    var s = this.__startIndex__,
        c = this.__currentIndex__;
    if ( s === c ) {
      return null;
    }

    // 阶段初始化( 保证 current 只允许访问一次 )
    this.__startIndex__ = c;

    return this.__xmlstr__.slice( s, c );
  },
  /**
   * 向下移动一个节点位置, 如果还有数据则返回 true, 如果没有数据则返回 false
   */
  next: function () {
    var s = this.__startIndex__,
        c = this.__currentIndex__,
        xml = this.__xmlstr__,
        len = xml.length;
    
    if ( s === undefined ) return false;
    if ( s !== c ) return false;

    for ( var i = s; i < len; i++ ) {
      var ch = xml.charAt( i );

      // 已到字符串结尾
      if ( i === len - 1 ) {
        this.__currentIndex__ = undefined;
        break;
      }

      // 判断是不是标签结尾
      if ( ch === '>' ) {
        this.__currentIndex__ = i + 1;
        break;
      }

      // 判断是不是标签开始
      if ( ch === '<' ) {
        if ( s === i ) continue;
        this.__currentIndex__ = i;
        break;
      }


    }

    return true;
  }
};



return {
  init: Init,
  test: {
    checkNodeType: checkNodeType,
    checkElementType: checkElementType
  }
};
})();