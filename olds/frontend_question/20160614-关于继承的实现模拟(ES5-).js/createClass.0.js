var createClass = function ( members, parent ) {
    // 可选的 ctr
    function subClass () {
        // 调用 ctr 方法
        if ( members.ctr && typeof members.ctr === 'function' ) {
            members.ctr.apply( this, arguments );
        }
    }
    parent = parent || Object;
    subClass.prototype = new parent();

    for ( var k in members ) {
        if ( k !== 'ctr' && members.hasOwnProperty( k ) ) {
            subClass.prototype[ k ] = members[ k ];
        }
    }
    subClass.prototype.constroctor = subClass;


    return subClass;
};