/**
 * 2018-08-14
 */

(function ( jklib ) {

// 工具函数
function simple_extend( src, dist ) {
  dist = dist || {};

  for ( var k in src ) {
    if ( src.hasOwnProperty( k ) ) {
      dist[ k ] = src[ k ];
    }
  }

  return dist;
}


// 定义一些常量
var TYPE = {
  VELEMENT: 1,
  VTEXTNODE: 3
};

/**
 * 定义虚拟 DOM 构造函数
 */
// 函数的三个参数分别是
// tagName 表示节点名称, 如果不提供( null, undefined, '' 等 )则表示为文本节点
// props 表示需要的属性( attr ), class 需要替换成 className, 如果是文本节点则为 null
// 第三+个参数, 可以任意添加, 表示其子节点
function VNode( tagName, props, childVNodes ) {
  childVNodes = childVNodes && Array.prototype.slice.call( arguments, 2 );
  this.tagName = tagName;
  this.type = !!tagName ? TYPE.VELEMENT : TYPE.VTEXTNODE;
  this.props = props || {};

  // 模拟兄弟与父子节点
  // 需要计算
  this.parentNode = null;
  this.prevNode = null;
  this.nextNode = null;

  this.childVNodes = childVNodes || [] ; 

  this.firstChild = childVNodes && childVNodes[ 0 ];
  this.lastChild = childVNodes && childVNodes[ childVNodes.length - 1 ];


  // 处理关系
  var _this = this;
  var _prev = null;
  var _node = null;
  // [:jk] 考虑抽取: 20180814
  childVNodes && childVNodes.forEach( function ( node ) {

    // 绑定父节点
    node.parentNode = _this;

    // 绑定 兄弟节点( prev )
    if ( _prev ) {
      node.prevNode = _prev;
    }
    _prev = node;

    // 绑定 兄弟节点( next )
    if ( _node ) {
      _node.nextNode = node;
    }
    _node = node;

  } );

}

// 方法
VNode.fn = VNode.prototype = {
  constructor: VNode,
  extend: function ( obj ) {
    return simple_extend( obj, this );
  }
};


// 追加方法
VNode.fn.extend( {
  // 将 vnode 追加到子元素中
  append: function ( vnode ) {
    // 处理关系
    vnode.parentNode = this;
    vnode.prevNode = this.lastChild;
    // 追加
    this.childVNodes.push( vnode );

    return this;
  },
  prepend: function ( vnode ) {
    vnode.parentNode = this;
    vnode.nextNode = this.firstChild;
    this.childVNodes.unshift( vnode );
    return this;
  }
} );




if ( jklib == null ) {
  jklib = window.jklib = { test: {} };
}
if ( typeof jklib.test !== 'object' ) {
 jklib.test = {};
}
jklib.test.VNode = VNode;
})( typeof jklib === 'object' ? jklib : undefined );