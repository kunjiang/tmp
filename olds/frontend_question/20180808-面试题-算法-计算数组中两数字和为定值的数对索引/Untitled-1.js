function test( arr, target ) {
  // 校验参数

  var indexes = [];

  for ( var i = 0; i < arr.length; i++ ) {
    var tmp = target - arr[ i ];

    var index = arr.indexOf( tmp, i + 1 );

    if ( index > -1 ) {
      indexes.push( [ i, index ] );
    }
  }

  return indexes;
}