// 判断两个对象的相等


// 就是在判断成员是否相等

// 简单对象演示( 复杂对象 )

function compare_plain_obj( obj1, obj2 ) {
    if ( obj1 === obj2 ) return true;

    // 地址不相同
    // 什么是两个对象相同?
    // 对象1 中的所有属性, 在 对象2 中都有. 而且值都相同 => 对象1 包含 在对象2 中
    // 如果对象2 中的所有成员, 在 对象1 中也都有. 而且值相等 => 对象2 包含在对象 1 中

    
    for ( var k in obj2 ) {
        // if ( 是不是引用类型 ) {
        //     递归
        // }
        if ( obj1[ k ] !== obj2[ k ] ) {
            return false; // obj2 中有一个成员 在 obj1 中不存在
                          // null, undefined 需要单独讨论
        }
    }
    // 如果代码走到这里, 说明 obj2 包含在 obj1 中
    for ( var k in obj1 ) {
        if ( obj1[ k ] !== obj2[ k ] ) {
            return false; // obj1 中有一个成员 在 obj2 中不存在
        }
    }

    // 说明互相包含
    return true;
}


var o1 = {
    name: 'jim',
    age: 19,
    gender: '男'
};

var o2 = {
    name: 'jim',
    age: '19',
    gender: '男'
};

console.log( compare_plain_obj( o1, o2 ) );