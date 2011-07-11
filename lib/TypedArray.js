var thread = new Worker("data:application/javascript; charset=UTF-8," +
encodeURI(`
var foo=null;onmessage=function(data){if(
    data=data.data,
    !foo&&data.foo&&(foo=eval(\`(\${data.foo})\`)),foo)
    try{var d=foo(data.data,data.scope)}catch(a){return void self.postMessage({error:a,id:data.id})}
    d instanceof Promise?
    (d.then((function(a){self.postMessage(data)})),d=void 0):self.postMessage(data),
    foo=data=void 0};
`.replace(/\s\s/g, '')
));
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
        thread.removeEventListener('message',arguments.callee)
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