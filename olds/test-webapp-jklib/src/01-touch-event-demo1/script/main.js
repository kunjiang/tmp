(function () {

// 预定义值( 封装成组件的时候需要配置的数据, 也可以有默认值 )
// 宽高一般是需要配置的( 这里略 )

var limitheight = 40; // 拖拽距离超过这个范围的时候提示"释放刷新", 小于这个距离什么也不做


// 拖拽时的实时响应
function dragProcess ( distance ) {
  console.log( distance );
}


var r = /translateY\((-?\d+(\.\d+|))px\)/; // 调试加上 负数 与 小数

// 准备动画函数
function animateY( node, finalY, callback ) {
  clearInterval( node.__intervalId__ );

  var m = r.exec( node.style.transform );
  var currY = parseInt( m && m[ 1 ] || 0 );

  var dir = Math.sign( finalY - currY );

  // 暂时不考虑 0
  var tmpY = null;
  var intervalId = setInterval( function () {
    
    var delta = Math.ceil( Math.abs( currY - finalY ) / 3 );

    if ( delta == 1 ) {
      node.style.transform = 'translateY(' + finalY + 'px)';
      clearInterval( intervalId );
      typeof callback === 'function' && callback();
      return;
    } 
    
    tmpY = currY + dir * delta;
    
    node.style.transform = 'translateY(' + tmpY + 'px)';

    currY = tmpY;

  }, 20 );

  node.__intervalId__ = intervalId;

}


// 准备工具函数
function qs( selector ) {
  return document.querySelector( selector );
}



// 注册 touch 事件
var list = qs( '.list' );



var startY = 0;
var listTransStartY = 0;

list.addEventListener( 'touchstart', function ( e ) {
  clearInterval( this.__intervalId__ );
  
  // console.log( e );
  
  startY = e.touches[ 0 ].pageY;

  var m = r.exec( this.style.transform );
  listTransStartY = parseInt( m && m[ 1 ] || 0 );

  // console.log( listTransStartY + ' === ' + this.style.transform );

} );

list.addEventListener( 'touchmove', function ( e ) {
  var moveY = e.touches[ 0 ].pageY;

  // 修改 list 的 translate
  // 公式
  // 鼠标终 - 鼠标起 == list终(?) - list起

  var listTransFinalY = moveY - startY + listTransStartY;


  this.style.transform = 'translateY(' + listTransFinalY + 'px)';


  // 推拽过程中提供响应式操作
  if ( listTransFinalY > 0 ) {
    if ( listTransFinalY < limitheight ) {
      qs( '.back-msg' ).innerHTML = '测试数据 ...';
    } else {
      qs( '.back-msg' ).innerHTML = '释放开始处理 ...';
    }
    dragProcess( listTransFinalY );
  }

} );

list.addEventListener( 'touchend', function ( e ) {
  // 离开的时候需要判断是否超出临界值
  // 如果超出临界值则回到 临界值, 否则回到 0 位置
  
  // 可以封装
  var m = r.exec( this.style.transform );
  var distance = parseInt( m && m[ 1 ] || 0 );

  // console.log( distance  );


  if ( distance > 0 ) {

    if ( distance < limitheight ) {
      animateY( this, 0 );
      return;
    }
    var that = this;
    animateY( this, limitheight, function () {

      qs( '.back-msg' ).innerHTML = '开始请求处理 ...';
      // 模拟
      setTimeout( function () {
        animateY( that, 0, function () {
          qs( '.back-msg' ).innerHTML = '测试数据 ...';
        } );
      }, 2000 );

    } );

  } else {

    // 处理上拽超出问题

    // 如果 distance < 容器高度 - 内芯高度 则回到 "容器高度 - 内芯高度" 的位置
    // 注意包含符号

    var containerHeight = qs( '.list-view' ).offsetHeight;
    var contentHeight = qs( '.list' ).offsetHeight;

    var finalY = containerHeight - contentHeight;

    if ( distance < finalY ) {
      animateY( this, finalY ); 
    }

  }

} );










window.__jk_animate_test__ = function () {
  animateY( list, 0, function () {
    console.log( 'ok' );
  } );
}



})();