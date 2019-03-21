var str = 'Today is a beautiful day';

var res = str.toLowerCase().split( ' ' ).reverse().join( ' ' ).replace( /^(.)(.+)$/, function ( _, g1, g2 ) {
    return g1.toUpperCase() + g2;
} );

console.log( res );







// 空间复杂度 o(1)
var arr = 'Today is a beautiful day'.split( '' );

var star = 0;
for ( var i = 0; i < arr.length; i++ ) {
    var code_num = arr[ i ].charCodeAt( 0 );
    if ( code_num >= 65 && code_num <= 90 ) {
        arr[ i ] = String.fromCharCode( 32 + code_num );
    }

    if ( arr[ i ] === ' ' || i === arr.length - 1 ) {
        if ( i === arr.length - 1 ) i++;
        // 从 star 到 i 进行反转
        for ( var j = 0; j < ( i - star ) / 2; j++ ) {
            var t = arr[ star + j ];
            arr[ star + j ] = arr[ i - j - 1 ];
            arr[ i - j - 1 ] = t;
        }

        star = i + 1;
    }
}

for ( var i = 0; i < arr.length / 2; i++ ) {
    var t = arr[ i ];
    arr[ i ] = arr[ arr.length - 1 - i ];
    arr[ arr.length - 1 - i ] = t;
    if ( i === 0 ) {
        arr[ i ] = String.fromCharCode( arr[ i ].charCodeAt() - 32 );
    } 
}

arr.join( '' );



