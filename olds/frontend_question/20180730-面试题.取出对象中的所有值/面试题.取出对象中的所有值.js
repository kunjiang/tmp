function get_object_value( obj, list ) {
    for ( var k in obj ) {
        if( typeof obj[ k ] === 'object' ) {
            get_object_value( obj[ k ], list );
        } else {
            list.push( obj[ k ] );
        }
    }
}


var o = {
    a: 1,
    b: {
        c: 2,
        d: 3,
        e: {
            f: 4
        }
    },
    g: 5
};

var arr = [];

get_object_value( o, arr );

console.log( arr );
