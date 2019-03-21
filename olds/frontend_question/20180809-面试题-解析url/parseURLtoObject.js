// 
// protocol
// origin
// host
// hostname
// port
// pathname
// search
// hash
//           12        34    5        6       7       8
var rurl = /^((.+):\/\/((.+?)(:.+?|)))(\/.*?|)(\?.+?|)(#.+?|)$/;
function parseURLtoObject( url ) {
  // 参数校验
  var m = rurl.exec( url );
  var obj = {};
  if ( m ) {
    obj.origin = m[ 1 ];                // 远程服务器
    obj.protocol = m[ 2 ];              // 协议
    obj.host = m[ 3 ];                  // 主机
    obj.hostname = m[ 4 ];              // 主机名
    obj.port = m[ 5 ];                  // 端口
    obj.pathname = m[ 6 ];              // 路径
    obj.search = m[ 7 ];                // 参数
    m[ 7 ] && (obj.searchObj = m[ 7 ]    // 将参数转换为对象
                  .slice( 1 )
                  .split( '&' )
                  .reduce( function ( o, kvs ) {
                    var kv = kvs.split( '=' );
                    o[ kv[ 0 ] ] = kv[ 1 ];
                    return o;
                  }, {} ));
    obj.hash = m[ 8 ];        // 锚点
  }

  return obj;
}



// 测试:
var s = 'http://127.0.0.1:8080/test.php?k=v&kk=vv&kkk=vvv#mark12345'

var o = parseURLtoObject( s );

console.log( o );

console.log( parseURLtoObject( 'http://127.0.0.1:8080/test.php?k=v&kk=vv&kkk=vvv' ) );
console.log( parseURLtoObject( 'http://127.0.0.1:8080/test.php' ) );
console.log( parseURLtoObject( 'http://127.0.0.1:8080/?k=v&kk=vv&kkk=vvv' ) );
console.log( parseURLtoObject( 'http://127.0.0.1/?k=v&kk=vv&kkk=vvv' ) );
console.log( parseURLtoObject( 'http://127.0.0.1/#mark' ) );