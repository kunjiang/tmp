(function () {



function padEnd( str, len, pad ) {
  len = len || 0;
  pad = pad || '0';
  var tmp = [];
  if ( str.length > len ) return str;

  len = len - str.length; // 需要添加的数据

  var count = Math.ceil( len / pad.length ); // 计算需要添加几组字符串

  for ( var i = 0; i < count; i++ ) {
    tmp.push( pad );
  }

  var padstr = tmp.join( '' ).slice( 0, len );
  return str + padstr;
}


function padStart( str, len, pad ) {
  len = len || 0;
  pad = pad || '0';
  var tmp = [];
  if ( str.length > len ) return str;

  len = len - str.length; // 需要添加的数据

  var count = Math.ceil( len / pad.length ); // 计算需要添加几组字符串

  for ( var i = 0; i < count; i++ ) {
    tmp.push( pad );
  }
  
  var tmpjoin = tmp.join( '' );
  var padstr = tmpjoin.slice( tmpjoin.length - len );
  return padstr + str;
}




window._ = {
  padEnd: padEnd,
  padStart: padStart
};

})();