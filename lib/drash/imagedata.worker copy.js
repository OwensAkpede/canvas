var w = new Worker("../lib/p.worker.js")

onmessage=function(e) {
    buffer=e.data.data
    var sz = (300000)
    var rn = Math.ceil(buffer.length / sz);
    var start = 0;
    var end = sz
    var r;
    var receive = 0;

    w.onmessage = function (e) {
        receive += 1
        buffer.set(e.data.data, e.data.start)
        e.data.data = void 0;
        e.data = void 0;
        e = void 0;
        if (receive === rn) {
            self.postMessage(buffer)
            buffer = void 0;
            r = void 0;
            w.terminate()
            w = void 0
        }
    }

    for (var i = 0; i < rn; i++) {
                w.postMessage({ id: i, start: start, data: buffer.subarray(start, end) })
        start = end;
        end = end + sz
        // w=void 0
    }
}