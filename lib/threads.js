(function(){
    var thread=new Worker("workers/threads.js")
    var i=0;
     Thread=function(foo,scope) {
        var id = i += 1;
        if ("function" === typeof foo) {
            foo = foo.toString().replace(/^[^\(]+(\()/, 'function $1')
        } else {
            foo = null
        }

        return new Promise(function (r, j) {
            thread.addEventListener('message', function (e) {
                if (e.data.id !== id) {
                    return
                }
                new CloseEvent(arguments[0])
                e = e.data
                if (e.hasOwnProperty('error')) {
                    j(new Error(e.error.message))
                     e = void 0
                    return void 0
                }
                e = e.data
                r(e)
                e = void 0
            })
            try {
                thread.postMessage({foo: foo, scope: scope, id: id })
            } catch (a) {
                if (a.name==="DataCloneError") {
                    a=new Error(`Trying to send an Object that can not be cloned @param 1.`)
                }
                j(a)
            }
            scope = foo = void 0
        });
    }
})();

Thread(function(a){
     return a
},8).then(function(e){
console.log(e);
}).catch(function(e){
console.error(e);
})


// c=new Function('d',`
// console.log(arguments);
// `);

// console.log(c);