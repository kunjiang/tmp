function version_compare( v1, v2 ) {
    var rversion = /^[vV]?(\d+(?:\.\d+)*)$/;
    var vm1, vm2, t1, t2;
    if ( !( vm1 = rversion.exec( v1 ) ) | !( vm2 = rversion.exec( v2 ) ) ) {
        throw new Error( '输入参数不正确' );
    }

    vm1 = vm1[ 1 ].split( '.' );
    vm2 = vm2[ 1 ].split( '.' );


    while( ( t1 = vm1.shift() ) | ( t2 = vm2.shift() ) ) {
        t1 = t1 || 0;
        t2 = t2 || 0;

        if ( t1 != t2 ) {
            return t1 - t2;
        }
    }

    return 0;
}