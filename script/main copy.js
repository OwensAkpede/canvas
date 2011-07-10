"use strict";

var
    transform_speed = 2,
    canvas_types = {
        IMAGEDATA: "imagedata",
        TEXT: "text"
    },
    canvas_state = [],
    canvas_reshape = {
        center: function (event, elm) {
            var e = elm.parentElement;
            var PRVX;
            var PRVY;
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }

                e.style.top = (e.offsetTop + (ev.movementY || ev.webkitMovementY || 0)) + 'px'
                e.style.left = (e.offsetLeft + (ev.movementX || ev.webkitMovementX || 0)) + 'px'
                // e.scrollIntoViewIfNeeded(true)
            }
        },
        "right_imagedata": function (event, elm) {
            var PRVX;
            var PRVY;
            var p = elm.parentElement
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }
                p.style.height = p.offsetHeight + "px"
                p.style.width = (p.offsetWidth + ((ev.movementX || ev.webkitMovementX || -1))) + "px";
            }
        },
        "bottom_imagedata": function (event, elm) {
            var PRVX;
            var PRVY;
            var p = elm.parentElement

            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }
                p.style.width = p.offsetWidth + "px";
                p.style.height = (p.offsetHeight + ((ev.movementY || ev.webkitMovementY || -1))) + "px";
            }
        },
        "bottom-right_imagedata": function (event, elm) {
            var p = elm.parentElement

            var PRVX;
            var PRVY;
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }

                p.style.width = (p.offsetWidth + ((ev.movementY || ev.webkitMovementY || 0))) + "px";
                p.style.height = "auto";
            }
        },
        "bottom-right_text": function (event, elm) {
            var p = elm.parentElement.querySelector('span');

            var PRVX;
            var PRVY;
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }
                // font: 900 85px serif;
                p.style.fontSize = (Number(p.style.fontSize.replace(/[a-z]/img, '')) + ((ev.movementY || ev.webkitMovementY || 0))) + "px";
                // elm.style.width = p.offsetWidth+"px"//(p.offsetWidth + ((ev.movementX || ev.webkitMovementX || -1))) + "px";
            }
        },
        "right_text": function (event, elm) {
            var PRVX;
            var PRVY;
            var p = elm.parentElement
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }
                // p.style.height = p.offsetHeight + "px"
                p.style.width = (p.offsetWidth + ((ev.movementX || ev.webkitMovementX || -1))) + "px";
            }
        }
    },
    canvas_reshape_active = function (elm, event) {
        var d = elm.getAttribute('d');
        var _d = d + '_' + elm.parentElement.parentElement._type.toLowerCase();
        // console.log(_d);
        (canvas_reshape[_d] || (_d = d, void 0) || canvas_reshape[d])(event, elm.parentElement);
        document.documentElement.setAttribute('interacting', '1')

        elm.ondrag = function () {
            elm.ondrag = canvas_board[canvas_events.mouseleave] = canvas_board[canvas_events.mouseup] = elm[canvas_events.mouseleave] = canvas_board[canvas_events.mousemove] = null
            canvas_board.click()
            update(elm.parentElement.parentElement, _d)
            document.documentElement.removeAttribute('interacting')
        }
        // console.log(canvas_events);
        canvas_board[canvas_events.mouseleave] = canvas_board[canvas_events.mouseup] = function () {
            canvas_board[canvas_events.mouseleave] = canvas_board[canvas_events.mouseup] = elm[canvas_events.mouseleave] = canvas_board[canvas_events.mousemove] = null
            update(elm.parentElement.parentElement, _d)
            document.documentElement.setAttribute('interacting', "0")
        }
    }

let canvas = document.createElement('canvas')
let canvas_div = document.createElement('div')
let canvas_ctrl = document.createElement('div')
canvas_ctrl.setAttribute("controller", "")
canvas_ctrl.innerHTML = `
<div d="center" hidden></div>
<div d="bottom" hidden></div>
<div d="right" hidden></div>
<div d="bottom-right" hidden></div>
`

canvas_ctrl.querySelectorAll('div').forEach(function (e) {
    var d = e.getAttribute('d')
    if (canvas_reshape.hasOwnProperty(d)) {
        e.setAttribute(canvas_events.mousedown, `canvas_reshape_active(this,event);`)
    }
    for (var key in canvas_types) {
        if (canvas_reshape.hasOwnProperty(d + "_" + canvas_types[key])) {
            e.setAttribute(canvas_events.mousedown, `canvas_reshape_active(this,event);`)
        }
    }
})



canvas_wrapper._remove = function () {
    var pa = canvas_wrapper.querySelector('[interacting] div[active]');
    if (pa) {
        pa[canvas_events.mouseup] = pa[canvas_events.mousedown] = null
        pa.removeAttribute('active')
        pa.querySelector('[controller]').remove()
        pa = void 0
        document.documentElement.removeAttribute('interacting')
        document.documentElement.removeAttribute('type')
    }
}

canvas_wrapper._append = function (e) {
    e.onclick = function () {
        if (e.hasAttribute('active')) {
            return
        }
        canvas_wrapper._remove();
        document.documentElement.setAttribute('interacting', "0")
        document.documentElement.setAttribute('type', e._type)

        e.setAttribute("active", "")
        var _canvas_ctrl = canvas_ctrl.cloneNode(true)

        for (var key in canvas_reshape) {
            key = key.split('_')
            if (!key[1] || key[1] == e._type.toLowerCase()) {
                _canvas_ctrl.querySelector('[d="' + key[0] + '"]').removeAttribute("hidden")
            }
        }

        key = void 0

        e.appendChild(_canvas_ctrl)

        e[canvas_events.mouseup] = function () {
            canvas_board[canvas_events.mousemove] = null
        }

        canvas_board.onclick = function (e) {
            if (e.target === this || e.target === canvas_wrapper) {
                canvas_wrapper._remove();
                canvas_board.onclick = null
            }
        }
    }
    this.appendChild(e)
}


function insert(data) {
    canvas = canvas.cloneNode();
    canvas.width = data.width
    canvas.height = data.height
    canvas.getContext('2d').putImageData(data, 0, 0)
    canvas_wrapper.appendChild(canvas)
}

function imageToCanvas(img) {
    var _canvas = canvas.cloneNode();
    _canvas.width = img.width
    _canvas.height = img.height

    void _canvas.getContext('2d').drawImage(img, 0, 0, _canvas.width, _canvas.height)

    if (typeof img.close === "function") {
        void img.close()
    }

    img = void 0

    var _canvas_div = canvas_div.cloneNode(true)
    void _canvas_div.setAttribute('default', canvas_types.IMAGEDATA)
    void _canvas_div.appendChild(_canvas)


    void id().then(function (id) {
        _canvas_div._id = id
        id = void 0;
        _canvas_div._type = canvas_types.IMAGEDATA
        void canvas_wrapper._append(_canvas_div)

        _canvas_div.style.width = `${_canvas_div.offsetWidth}px`
        _canvas_div.style.height = `${_canvas_div.offsetHeight}px`
        _canvas_div.style.left = `${_canvas_div.offsetLeft-(_canvas_div.offsetWidth/2)}px`
        _canvas_div.style.top = `${_canvas_div.offsetTop-(_canvas_div.offsetHeight/2)}px`

        void _canvas_div.removeAttribute('default')

        void store.setItem(_canvas_div._id, {
            original_height: _canvas.height,
            original_width: _canvas.width,
            height: _canvas_div.offsetHeight,
            width: _canvas_div.offsetWidth,
            x: _canvas_div.offsetLeft,
            y: _canvas_div.offsetTop,
            data: _canvas_div._id,
            type: _canvas_div._type
        }).then(function () {
            void storeIMGD.setItem(_canvas_div._id, _canvas.getContext('2d').getImageData(0, 0, _canvas.width, _canvas.height))
            _canvas_div = _canvas = void 0;
        });

    });
}

function getImage() {
    openFs().then(function (e) {
        createImageBitmap(e).then(function (e) {
            imageToCanvas(e)
            e = void 0
        });
        e = void 0
    });
}

function getImage() {
    var img = new Image();
    img.src = "image/1.png"
    img.onload = function () {
        imageToCanvas(img)
    }
}

function getText(txt, data) {
    var txt = prompt("Enter Text") || "New Text"
    txt = txt.trim()
    var span = document.createElement("span")
    span.innerText = txt

    txt = void 0;

    span.style.fontSize = "24px"
    span.style.fontFamily = "serif"

    var _canvas_div = canvas_div.cloneNode(true)
    void _canvas_div.setAttribute('default', canvas_types.TEXT)
    _canvas_div.appendChild(span)


    id().then(function (id) {
        _canvas_div._id = id
        _canvas_div._type = canvas_types.TEXT
        canvas_wrapper._append(_canvas_div)

        _canvas_div.style.width = `${span.offsetWidth+1}px`
        _canvas_div.style.left = `${_canvas_div.offsetLeft-(_canvas_div.offsetWidth/2)}px`
        _canvas_div.style.top = `${_canvas_div.offsetTop-(_canvas_div.offsetHeight/2)}px`

        void _canvas_div.removeAttribute('default')

        store.setItem(_canvas_div._id, {
            original_style: span.style.cssText,
            fontWeight: span.style.fontWeight,
            fontSize: span.style.fontSize,
            fontFamily: span.style.fontFamily,
            width: _canvas_div.offsetWidth,
            x: _canvas_div.offsetLeft,
            y: _canvas_div.offsetTop,
            data: _canvas_div._id,
            type: _canvas_div._type
        }).then(function () {
            storeIMGD.setItem(_canvas_div._id, span.innerText)
        });

    });
}

function loadStyleSheet(elm){
    void elm.removeAttribute('hidden')
    //
}

function loadImageData(data, id, foo, _canvas_div) {

    var _canvas = canvas.cloneNode();
    void _canvas.setAttribute('hidden',"")


    _canvas_div.style.width = `${data.width}px`
    _canvas_div.style.height = `${data.height}px`
    _canvas_div.style.left = `${data.x}px`
    _canvas_div.style.top = `${data.y}px`

    _canvas_div._id = id
    _canvas_div._type = data.type
    _canvas_div.appendChild(_canvas)

    storeIMGD.getItem(data.data).then(function (e) {
        if (!e) {
            console.error('something unusual here')
            return void 0
        }

        _canvas.width = data.original_width
        _canvas.height = data.original_height
        _canvas.getContext('2d').putImageData(e, 0, 0)
        if (foo) {
            foo(_canvas_div)
            foo = void 0
        }
        void loadStyleSheet(_canvas)
        data = e = void 0
    });
}

function loadText(data, id, foo, _canvas_div) {
    var span = document.createElement("span")
    span.setAttribute('hidden',"")

    _canvas_div._id = id
    _canvas_div._type = data.type
    _canvas_div.style.left = `${data.x}px`
    _canvas_div.style.top = `${data.y}px`
    _canvas_div.style.width = `${data.width}px`

    span.style.fontSize = data.fontSize
    span.style.fontWeight = data.fontWeight
    span.style.fontFamily = data.fontFamily


    storeIMGD.getItem(data.data).then(function (e) {
        if (typeof e !== "string") {
            console.error('something unusual here')
            return void 0
        }

        span.innerText = e
        e = void 0

        _canvas_div.appendChild(span)

        if (foo) {
            foo(_canvas_div)
            foo = void 0
        }

        void loadStyleSheet(span)
        data = void 0
    });
}


function update(elm, type) {
    store.getItem(elm._id).then(function (e) {
        if (!e) {
            console.error('something unusual!!!')
            return
        }
        if (type === 'center') {
            e.x = elm.offsetLeft
            e.y = elm.offsetTop
        } else if (type.match(/^(bottom_imagedata|right_imagedata|bottom\-right_imagedata)$/)) {
            e.width = elm.offsetWidth;
            e.height = elm.offsetHeight;
        } else if (type.match(/^(bottom-right_text)$/)) {
            var c = elm.querySelector('span')
            e.fontSize = c.style.fontSize
            e.width = elm.offsetWidth
        } else if (type.match(/^(right_text)$/)) {
            e.width = elm.offsetWidth
        } else {
            console.error('something unusual!!!')
        }
        store.setItem(elm._id, e)
    });
}

function generateItem(e) {
    // return {
    //     original_height: _canvas.height,
    //     original_width: _canvas.width,
    //     height: _canvas.offsetHeight || _canvas.height,
    //     width: _canvas.offsetWidth || _canvas.width,
    //     x: _canvas_div.offsetLeft,
    //     y: _canvas_div.offsetTop,
    //     // id: _canvas_div._id,
    //     data: _canvas_div._id,
    //     // value: _canvas_div._id,
    //     // style: _canvas_div._id,
    //     // thumbnail: _canvas_div._id,
    //     type: _canvas_div._type
    // }
}

function moveup() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa && pa.nextElementSibling) {
        store.getItem(pa._id).then(function (val) {
            id([pa._id, 1]).then(function (e) {
                store.setItem(e, val)
                store.removeItem(pa._id)
                pa._id = e
                if (pa.nextElementSibling.nextElementSibling) {
                    canvas_wrapper.insertBefore(pa, pa.nextElementSibling.nextElementSibling)
                } else {
                    canvas_wrapper.appendChild(pa)
                }
                val = void 0
            });
        });
    }
}

function movedown() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa && pa.previousElementSibling) {
        store.getItem(pa._id).then(function (val) {
            id([pa._id, -1]).then(function (e) {
                store.setItem(e, val)
                store.removeItem(pa._id)
                pa._id = e
                canvas_wrapper.insertBefore(pa, pa.previousElementSibling)
                val = void 0
            });
        });
    }
}

function _moveup() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa && pa.nextElementSibling) {
        store.getItem(pa._id).then(function (val) {
            id().then(function (e) {
                store.setItem(e, val)
                store.removeItem(pa._id)
                pa._id = e
                canvas_wrapper.appendChild(pa)
                val = void 0
            });
        });
    }
}

function _movedown() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa && pa.previousElementSibling) {
        store.getItem(pa._id).then(function (val) {
            id(-1).then(function (e) {
                store.setItem(e, val)
                store.removeItem(pa._id)
                pa._id = e
                canvas_wrapper.insertBefore(pa, pa.previousElementSibling)
                val = void 0
            });
        });
    }
}


function remove() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa) {
        canvas_wrapper._remove()
        store.getItem(pa._id).then(function (val) {
            store.removeItem(pa._id)
            storeIMGD.removeItem(val.data)
            pa.remove()
            if (canvas_wrapper.lastElementChild) {
                canvas_wrapper.lastElementChild.click()
            }
        });
    }
}

function clone() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa) {
        store.getItem(pa._id).then(function (val) {
            id().then(function (id) {
                val.data = id;
                store.setItem(id, val)
                storeIMGD.getItem(pa._id).then(function (e) {
                    storeIMGD.setItem(id, e)
                    incoming(id, val, function (e) {
                        e.click()
                    })
                    e = void 0
                });
            });
        });
    }
}




function id(_e) {
    return new Promise(function (r, j) {

        if (_e === -1) {
            store.key(0).then(function (e) {
                r(e - 1)
            });
        } else if (_e instanceof Array) {

            store.getKey(_e[0]).then(function (e) {
                e = e + _e[1]

                if (0 > e) {
                    j("null value")
                    return
                }
                store.length().then(function (len) {
                    if (e>len) {
                        j("null value")
                        return
                    }
                store.key(e).then(function (e) {
                    _e[0] = e
                    if (_e[1] === -1) {
                        if (_e[0] >= 0) {
                            _e[0] -= 0.1
                        } else {
                            _e[0] += 0.1
                        }
                    } else {
                        if (_e[0] >= 0) {
                            _e[0] += 0.1
                        } else {
                            _e[0] -= 0.1
                        }
                    }
                    store.has(_e[0]).then(function (e) {
                        if (e) {
                            id(_e).then(function (e) {
                               r(e)
                            });
                        } else {
                           r(_e[0])
                        }
                    })
                })
                });
            });
        } else {
            store.length().then(function (e) {
                if (0 >= e) {
                    return r(id.default)
                }
                store.key(e - 1).then(function (e) {
                    r(e + 1)
                });
            });
        }
    });
}

function canvaSize(w, h) {
    if (typeof w !== 'number') {
        w = 500
    }
    if (typeof h !== 'number') {
        h = 500
    }

    _width = w
    _height = h

    canva.width = (_width = w) + "px"
    canva.height = (_height = h) + "px"
    window.onresize()
}

function openFs() {
    return new Promise(function (r, j) {
        openFs.fs.value = ""
        openFs.fs.click()
        openFs.fs.onchange = function () {
            r(openFs.fs.files[0])
        }
    });
}

openFs.fs = document.createElement("input")
openFs.fs.type = "file"
openFs.fs.accept = "image/png, image/jpg, image/webp, image/jpeg"

id.split = function (e) {
    e = e.split(/([a-z])/img)
    return [Number(e[0]) + 1, e[1]]
}
id.default = 0;

function round(number, number_max, percentage) {
    // percentage = less than percentage (100)    (10,1000,100)
    percentage = percentage || 100;
    return Math.min((number * percentage) / number_max, percentage);
}



ready.then(function (e) {
    store.getAllItem(incoming)
});

function incoming(id, data, foo) {
    var _canvas_div = canvas_div.cloneNode(true)
    if (!data) {
        console.error('something unusual here')
    } else {
        if (data.type === canvas_types.IMAGEDATA) {
            loadImageData(data, id, foo, _canvas_div)
        } else if (data.type === canvas_types.TEXT) {
            loadText(data, id, foo, _canvas_div)
        } else {
            console.error('something unusual here')
        }
    }
    // _canvas_div.key = canvas_wrapper.childElementCount
    canvas_wrapper._append(_canvas_div, true)
    _canvas_div = id = data = foo = void 0
}