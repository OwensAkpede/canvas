function Thread() {

    var thread = new Worker("workers/threads.js")
    var i = 0;
    var type;
    var portal = function (foo, scope) {
        return new Promise(function (r, j) {
            var id = i += 1;
            if ("function" === typeof foo) {
                foo = foo.toString().replace(/^[^\(]+(\()/, 'function $1')
            } else {
                foo = null
            }

            thread.addEventListener('message', function (e) {
                if (type === "constructor") {
                    thread.terminate()
                }

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
                thread.postMessage({ foo: foo, scope: scope, id: id })
            } catch (a) {
                thread.terminate()
                if (a.name === "DataCloneError") {
                    a = new Error(`Trying to send an Object that can not be cloned @param 1.`)
                }
                j(a)
            }
            scope = foo = void 0
        });

    }
    if (this instanceof Window) {
        type = 'window'
        return {
            open:portal,
            close:function(){
                void thread.terminate();
            }
        }
    } else {
        type = 'constructor'
        portal = portal(arguments[0], arguments[1])
        this.then = function () {
            void portal.then(arguments[0],arguments[1])
            return portal
        }
        this.catch = function () {
            void portal.catch(arguments[0])
            return portal
        }
        this.finally=function () {
            void portal.finally(arguments[0])
            return portal
        }
    }
};

window.thread= Thread().open;

// thread(function (a) {return a}, 8)
// .then(function (e) {
//     console.log(e);
// }).catch(function (e) {
//     console.error(e);
// })
