var thread = new Worker("lib/worker.js");
thread.i=0;
Uint8ClampedArray.prototype.__proto__.process = function (foo,scope) {
    var id=thread.i+=1;
if ("function" === typeof foo) {
    foo = foo.toString().replace(/^[^\(]+(\()/, 'function $1')
} else {
    foo = null
}

var buffer = this;
return new Promise(function (r, j) {
    thread.addEventListener('message',function (e) {
        if (e.data.id !== id) {
            return
        }
        new CloseEvent(arguments[0])

        e = e.data
        if (e.hasOwnProperty('error')) {
            j(new Error(e.error.message))
            buffer = e = void 0
            return void 0
        }
        e = e.data
        buffer.set(e, 0)
        buffer = e = void 0
        r()
    })
    thread.addEventListener('error',function (e) {
        throw e
    })
    thread.postMessage({ data: buffer, foo: foo, scope:scope,id:id })
    scope=foo = void 0
});
}