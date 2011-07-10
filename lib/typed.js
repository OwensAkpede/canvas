(function () {
    var msg = "type not matched";
    type = {
        number: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] !== 'number') {
                    // console.trace(arguments.callee.name)
                    var err= new TypeError(msg)
                    // {message:msg+`:@ ${arguments[0]}\n>expecting "${arguments.callee.name}"`}
                    throw err 
                }
            }
        },

        string: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] !== 'string') {
                    // console.trace(arguments.callee.name)
                    var err= new TypeError(msg)
                    // {message:msg+`:@ ${arguments[0]}\n>expecting "${arguments.callee.name}"`}
                    throw err 
                }
            }
        },

        object: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] && typeof arguments[i] !== 'object') {
                    // console.trace(arguments.callee.name)
                    var err= new TypeError(msg)
                    // {message:msg+`:@ ${arguments[0]}\n>expecting "${arguments.callee.name}"`}
                    throw err 
                }
            }
        },

        function: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] !== 'function') {
                    // console.trace(arguments.callee.name)
                    var err= new TypeError(msg)
                    // {message:msg+`:@ ${arguments[0]}\n>expecting "${arguments.callee.name}"`}
                    throw err 
                }
            }
        },
        array: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!(arguments[i] instanceof Array) && typeof arguments[i] !== 'object') {
                    // console.trace(arguments.callee.name)
                    var err= new TypeError(msg)
                    // {message:msg+`:@ ${arguments[0]}\n>expecting "${arguments.callee.name}"`}
                    throw err 
                }
            }
        }
    }
})()