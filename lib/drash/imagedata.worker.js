onmessage = function (e) {
    buffer = e.data.data
    var sz = (10000000 * 90)
    var rn = Math.ceil(buffer.length / sz);
    var start = 0;
    var end = sz
    var r;
    var receive = 0;
    var i = 0

    requestAnimationFrame(function () {
        var w ;
        if (e.data.foo) {
            w = new Worker("data:application/javascript; charset=UTF-8,"+encodeURI(`
           var foo = function ${e.data.foo[1]};
            onmessage=function(data){
                data=data.data;
                try {
                    var d=foo(data.data)
                } catch (error) {
                    self.postMessage({error:error});
                    return void 0;
                }
                if (d instanceof Promise) {
                    void d.then(function(e){self.postMessage(data)});
                    d=void 0
                } else {
                    self.postMessage(data);
                }
                foo = data=void 0;
            }
            `));
        } else {
            w = new Worker("../lib/p.worker.js")
        }
        w.onmessage = function (e) {
            e.target.terminate()
            if (e.data.hasOwnProperty('error')) {
                self.postMessage(e.data)
                return e=void 0;
            }
            receive += 1
            buffer.set(e.data.data, e.data.start)
            e.data.data = void 0;
            e.data = void 0;
            if (receive === rn) {
                self.postMessage(buffer)
                buffer = void 0;
                r = void 0;
                e = void 0;
            }
        }

        w.postMessage({
            id: i,
            start: start,
            data: buffer.subarray(start, end)
        })
        start = end;
        end = end + sz
        w = void 0
        i += 1
        if (i < rn) {
            requestAnimationFrame(arguments.callee)
        }
    })
    // for (var i = 0; i < rn; i++) {
    // }
}