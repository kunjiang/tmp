(function ( window ){

function jsonp(url, callback, data) {
    // 校验参数( 略 )

    data = data || {};
    
    var head = document.getElementsByTagName( 'head' )[ 0 ];

    var script = document.createElement( 'script' );
    
    var fnName = '__jsonp_callback_' + Math.random().toString().slice( 2 );

    var tmp_params = [];
    for ( var k in data ) {
        tmp_params.push( k + '=' + data[ k ] );
    }

    var params = '?' + tmp_params.join( '&' ) + ( tmp_params.length > 0 ? '&' : '' ) + 'callback=' + fnName; 

    window[ fnName ] = function ( json ) {
        callback( json );

        setTimeout( function () {
            delete window[ fnName ];
            head.removeChild( script );
        }, 0 );
    };

    script.src = url + params;

    head.appendChild( script );
}

window.J = {
    jsonp: jsonp
};

}( window ));