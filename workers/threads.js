

onmessage = function(data) {
    data = data.data 
    var hd;
    if (data &&
     data.foo && 
    (data.foo = eval(`(${data.foo})`)) &&
     "function"===typeof data.foo ){
        var s='data.scope';
         if (data.scope instanceof Array) {
            s+='[0]';
        for (var i = 1; i < data.scope.length; i++) {
            s+=',data.scope['+i+']'
        }
         }

        try {
            var d=new Function('data',`
            "use strict"
            return data.foo(${s})
            `)(data);
            s=data.foo=data.scope=void 0;
            if (d instanceof Promise) {
                d.then(function(){
                    void self.postMessage({id:data.id,data:arguments[0]})
                    arguments[0]=void 0
                    // data.data=void 0;
                });
                d=void 0
            }else{
                void self.postMessage({id:data.id,data:d})
                // data.data=void 0;
                d=void 0
            }
        } catch (a) {
            // data.data=void 0;
            if (a.name==="DataCloneError") {
                a=new Error(`Trying to return an Object that can not be cloned.`)
            }
            data.foo=data.scope=void 0;
            return a=void self.postMessage({
                error: a,
                id: data.id
            })
        }
    }else{
        data.foo=data.scope=void 0;
       void self.postMessage({
            error: new Error('an unexpected error occurred'),
            id: data.id
        })
    }
}
;