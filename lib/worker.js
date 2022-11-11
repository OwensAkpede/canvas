var foo = null;
onmessage = function(data) {
    if (data = data.data,
    !foo && data.foo && (foo = eval(`(${data.foo})`)),
    foo)
        try {
            var d = foo(data.data, data.scope)
        } catch (a) {
            return void self.postMessage({
                error: a,
                id: data.id
            })
        }
    d instanceof Promise ? (d.then((function(a) {
        self.postMessage(data)
    }
    )),
    d = void 0) : self.postMessage(data),
    foo = data = void 0
}
;
