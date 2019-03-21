var jformat = /* 简单考虑封装 */(function () {

    // --------- 模板引擎( 处理对象参数 ) ----------
    // 模板引擎边界符号( 可配置 )
    var options = {
        left: '\\{\\{',
        right: '\\}\\}',
        __left__: '\\{\\{',
        __right__: '\\}\\}'
    };
    // 用于处理模板引擎的正则表达式
    var reg = new RegExp( options.left + '\\s*(.+?)\\s*' + options.right, 'g' );
    // 可缓存
    function getRegExpObj() {
        if ( options.left !== options.__left__ || options.right !== options.__right__ ) {
            options.__left__ = options.left;
            options.__right__ = options.right;
            reg = new RegExp( options.left + '\\s*(.+?)\\s*' + options.right, 'g' );
        }
        return reg;
    }


    function formatWithObject( format, target ) {
        var r = getRegExpObj();
        return format.replace( r, function ( _, attrName ) {
            return target[ attrName ];
        });
    }


    // --------- 模板引擎( 处理数组参数 ) ----------

    function getRHole( index ) {
        return new RegExp( '\\{\\s*(' + index + ')\\s*\\}', 'g' );
    }
    function formatWithArray( format ) {
        var args = Array.prototype.slice.call( arguments, 1 ), len = args.length;
        var i = 0, tmp_format = format;
        for ( ; i < len; i++ ) {
            tmp_format = tmp_format.replace( getRHole( i ), function ( _, index ) {
                return args[ index ];
            });
        }
        return tmp_format;
    }

    function formatFn ( format, obj ) {
        if ( typeof obj === 'object' ) {
            return formatWithObject( format, obj );
        } else {
            return formatWithArray.apply( null, arguments );
        }
    };
    formatFn.options = options;
    return formatFn;
})();