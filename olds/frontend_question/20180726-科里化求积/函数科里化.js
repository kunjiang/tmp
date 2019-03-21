// multi(1)(2)(4) => 1 * 2 * 4
// 分析

// multi(1) 得到的就是一个函数
// 

// 基本模型
// function multi( num ) {

//     return function ( num2 ) {

//         return function ( num3 ) {

//         };
//     }
// } 

// 由于每一个算法是一致的, 而且 可以 无限制的 () 调用下去
// 函数本身返回自己

var multi = 
(function () {

    var tmp = 1;
    function f( num ) {
    
        if ( num == null ) {
            var raw = tmp;
            tmp = 1;
            return raw;
        }
    
    
        // console.log( num );
    
        tmp *= num;
    
        return f;
    }
    
    return f;
})();