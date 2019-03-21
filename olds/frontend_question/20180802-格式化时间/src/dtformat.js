var dtformat =
(function () {

// 可以使用的格式有
// yyyy
// MM
// dd
// hh
// mm
// ss
var map = {
    'yyyy': 'getFullYear',
    'MM': 'getMonth',
    'dd': 'getDate',
    'hh': 'getHours',
    'mm': 'getMinutes',
    'ss': 'getSeconds'
};

// 暂时不考虑性能
function dtformat( format, date ) {
    date = date || new Date;
    var res = format;
    Object.keys( map ).forEach( function ( key ) {
        var len = key.length;
        res = res.replace( new RegExp( key, 'g' ), function ( match ) {
            var m = map[ match ];
            var tmp = date[ m ]() + ( m === 'getMonth' ? 1 : 0 ) + '';
            
            if ( len > tmp.length ) {
                tmp = '00000000000000000000000000000000'.slice( 0, len - tmp.length ) + tmp;
            }

            return tmp;
        } );
    } );
    return res;
}


return dtformat;
})();