(function(){
    var msg = "type not matched";
type ={
    number :function(){
        for (var i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'number'){
                throw msg
                    }
        }
    },
    
    string :function(){
        for (var i = 0; i < arguments.length; i++) {
            if(typeof arguments[i] !== 'string'){
        throw msg
            }
        }
    },
    
    object :function(){
        for (var i = 0; i < arguments.length; i++) {
            if(arguments[i] && typeof arguments[i] !== 'object'){
        throw msg
            }
        }
    },
    
    function :function(){
        for (var i = 0; i < arguments.length; i++) {
                    if(typeof arguments[i] !== 'function'){
                throw msg
                    }
        }
    },

    array :function(){
        for (var i = 0; i < arguments.length; i++) {
                    if(!(arguments[i] instanceof Array) && typeof arguments[i] !== 'object'){
                throw msg
                    }
        }
    }
}
})()