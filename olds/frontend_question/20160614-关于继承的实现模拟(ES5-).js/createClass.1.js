
var isCtr;
var createClass = function ( name, members, parent ) {

    parent = parent || Object;

   

    // 可选的 ctr
    var fnStr = 'function ' + name + ' () {' +
        // 调用 ctr 方法
        'if ( !isCtr && typeof members.ctr === \'function\' ) {' +
        '    members.ctr.apply( this, arguments );' +
        '}' + 
    '}';
    var subClass = eval( '(' + fnStr + ')' );

   
    
    isCtr = true;
    subClass.prototype = new parent(); 
    isCtr = false;

    for ( var k in members ) {
        if ( k !== 'ctr' && members.hasOwnProperty( k ) ) {
            subClass.prototype[ k ] = members[ k ];
        }
    }
    subClass.prototype.constroctor = subClass;


    return subClass;
};