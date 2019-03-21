(function () {

var padName = '_pad'

'End,Start'.split( ',' ).forEach( function ( name ) {

  var fnName = padName + name;

  String.prototype[ fnName ] || (String.prototype[ fnName ] = function ( len, pad ) {
    len = len || 0;
    pad = pad || '0';
    
    var str = this, tmp = [], count, tmpjoin, padstr;

    if ( str.length > len ) return str;

    len = len - str.length; // 需要添加的数据

    count = Math.ceil( len / pad.length ); // 计算需要添加几组字符串

    for ( var i = 0; i < count; i++ ) {
      tmp.push( pad );
    }

    tmpjoin = tmp.join( '' );
    padstr = tmpjoin.slice( 0, len );
    if ( name === 'End' ) {
      return str + padstr;
    } else if ( name === 'Start' ) {
      return padstr + str;
    }
    
  });

});

})();