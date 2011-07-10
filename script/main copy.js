"use strict";
const canvas_wrapper = document.querySelector('.canvas_wrapper'),
    canvas_board = document.querySelector('.canvas_board'),
    transform_speed = 2,
    canvas_types = {IMAGEDATA:"imagedata",TEXT:"text"},
    canvas_state = [],
    canvas_reshape = {
        "right_imagedata": function (event, elm) {
            var PRVX;
            var PRVY;
            var p = elm.parentElement.querySelector('canvas');
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
            var p = elm.parentElement.querySelector('canvas');
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
        "center": function (event, elm) {
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
        "bottom-right_imagedata": function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            var PRVX;
            var PRVY;
            canvas_board[canvas_events.mousemove] = function (ev) {
                if (typeof ev.movementX !== 'number') {
                    ev.movementX = PRVX ? (ev.touches[0].clientX - PRVX) : 0;
                    ev.movementY = PRVY ? (ev.touches[0].clientY - PRVY) : 0;
                    PRVX = ev.touches[0].clientX
                    PRVY = ev.touches[0].clientY
                }
                p.style.height = (p.offsetHeight + ((ev.movementY || ev.webkitMovementY || -1))) + "px";
                p.style.width = (p.offsetWidth + ((ev.movementY || ev.webkitMovementY || -1))) + "px";
            }
        },
        "bottom-right_text":function(event, elm){
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
                p.style.fontSize = (Number(p.style.fontSize.replace(/[a-z]/img,'')) + ((ev.movementY || ev.webkitMovementY || -1))) + "px";
            }
        }
        // currentX: 0,
        // currentY: 0
    },
    canvas_reshape_active=function(elm,event){
        var d=elm.getAttribute('d');
        var _d=d+'_'+elm.parentElement.parentElement._type.toLowerCase();
// console.log(_d);
        (canvas_reshape[_d]||(_d=d,void 0)||canvas_reshape[d])(event,elm.parentElement);
        document.documentElement.setAttribute('interacting','1')

        elm.ondrag=function() {
            elm.ondrag=canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=elm[canvas_events.mouseleave]=canvas_board[canvas_events.mousemove]=null
            canvas_board.click()
            update(elm.parentElement.parentElement,_d)
            document.documentElement.removeAttribute('interacting')
        }

        canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=function(){
            canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=elm[canvas_events.mouseleave]=canvas_board[canvas_events.mousemove]=null
            update(elm.parentElement.parentElement,_d)
            document.documentElement.setAttribute('interacting',"0")
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
    var d=e.getAttribute('d')
    if (canvas_reshape.hasOwnProperty(d)) {
        e.setAttribute(canvas_events.mousedown, `canvas_reshape_active(this,event);`)
    }
    for (var key in canvas_types) {
        if (canvas_reshape.hasOwnProperty(d+"_"+canvas_types[key])) {
            e.setAttribute(canvas_events.mousedown, `canvas_reshape_active(this,event);`)
        }
    }
})

// console.log(canvas.getContext('2d'));

canvas_wrapper._remove = function () {
    var pa = canvas_wrapper.querySelector('[interacting] div[active]');
    if (pa) {
        pa[canvas_events.mouseup] = pa[canvas_events.mousedown] = null
        pa.removeAttribute('active')
        pa.querySelector('[controller]').remove()
        pa = void 0
        document.documentElement.removeAttribute('interacting')
    }
}

canvas_wrapper._append = function (e) {
    // if (!e._id) {
    //     e._id = id()
    // }

    // if (!e._type) {
    //     e._type = "imagedata"
    // }

    e.onclick = function () {

        if (e.hasAttribute('active')) {
            return
        }
        canvas_wrapper._remove();
        document.documentElement.setAttribute('interacting', "0")

        e.setAttribute("active", "")
        var _canvas_ctrl = canvas_ctrl.cloneNode(true)

        for (var key in canvas_reshape) {
            key=key.split('_')
             if (!key[1]||key[1] == e._type.toLowerCase()) {
                _canvas_ctrl.querySelector('[d="'+key[0]+'"]').removeAttribute("hidden")
             }
        }

        key=void 0
        // if (e._type) {
        //     if (e._type === "text") {
        //         _canvas_ctrl.querySelector('[d="right"]').remove()
        //         _canvas_ctrl.querySelector('[d="bottom"]').remove()
        //     }
        // } else {
        //     _canvas_ctrl.querySelector('[d="right"]').remove()
        //     _canvas_ctrl.querySelector('[d="bottom"]').remove()
        //     _canvas_ctrl.querySelector('[d="bottom-right"]').remove()
        // }

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

    // var e = canvas_div.cloneNode(true)
    // e.appendChild(_canvas)

    // e.style.left = `${(canvas_wrapper.offsetWidth-_canvas.width)/2}px`
    // e.style.top = `${(canvas_wrapper.offsetHeight-_canvas.height)/2}px`

    this.appendChild(e)
}


function insert(data) {
    canvas = canvas.cloneNode();
    canvas.width = data.width
    canvas.height = data.height
    canvas.getContext('2d').putImageData(data, 0, 0)
    canvas_wrapper.appendChild(canvas)
}



function getImage(src, stored) {
    var img = new Image();
    img.src = "image/1.png"
    img.onload = function () {
        img.style.borderRadius = "600px"
        var _canvas = canvas.cloneNode();
        _canvas.width = img.width / 2
        _canvas.height = img.height / 2

        _canvas.getContext('2d').drawImage(img, 0, 0, _canvas.width, _canvas.height)

        var _canvas_div = canvas_div.cloneNode(true)
        _canvas_div.appendChild(_canvas)

        _canvas_div.style.left = `${(canvas_wrapper.offsetWidth-_canvas.width)/2}px`
        _canvas_div.style.top = `${(canvas_wrapper.offsetHeight-_canvas.height)/2}px`

        id().then(function (id) {
            _canvas_div._id = id
            _canvas_div._type = canvas_types.IMAGEDATA
            canvas_wrapper._append(_canvas_div)
            store.setItem(_canvas_div._id, {
                original_height: _canvas.height,
                original_width: _canvas.width,
                height: _canvas.offsetHeight || _canvas.height,
                width: _canvas.offsetWidth || _canvas.width,
                x: _canvas_div.offsetLeft,
                y: _canvas_div.offsetTop,
                // id: _canvas_div._id,
                data: _canvas_div._id,
                // value: _canvas_div._id,
                // style: _canvas_div._id,
                // thumbnail: _canvas_div._id,
                type: _canvas_div._type
            }).then(function () {
                storeIMGD.setItem(_canvas_div._id, _canvas.getContext('2d').getImageData(0, 0, _canvas.height, _canvas.height))
            });
        });
    }
}

function getText(txt, data) {
var txt=prompt("Enter Text").trim()||"New Text"
var span =document.createElement("span")
span.innerText=txt
span.style.fontSize="24px"
span.style.fontWeight="900"
span.style.fontFamily="serif"

        var _canvas_div = canvas_div.cloneNode(true)
        _canvas_div.appendChild(span)

        _canvas_div.style.left = `${(canvas_wrapper.offsetWidth-span.offsetWidth)/2}px`
        _canvas_div.style.top = `${(canvas_wrapper.offsetHeight-span.offsetHeight)/2}px`

        id().then(function (id) {
            _canvas_div._id = id
            _canvas_div._type = canvas_types.TEXT
            canvas_wrapper._append(_canvas_div)
            store.setItem(_canvas_div._id, {
                original_style: span.style.cssText,
                cssText: span.style.cssText,
                x: _canvas_div.offsetLeft,
                y: _canvas_div.offsetTop,
                data: _canvas_div._id,
                type: _canvas_div._type
            }).then(function () {
                storeIMGD.setItem(_canvas_div._id, span.innerText)
            });
        });
}

function loadImageData(data, id,foo) {
    var _canvas = canvas.cloneNode();
    storeIMGD.getItem(data.data).then(function (e) {
        if (!e) {
            console.error('something unusual here')
            return void 0
        }
        _canvas.width = data.original_width
        _canvas.height = data.original_height
        _canvas.style.width = `${data.width||data.original_width}px`
        _canvas.style.height = `${data.height||data.original_height}px`
        _canvas.getContext('2d').putImageData(e, 0, 0)

        var _canvas_div = canvas_div.cloneNode(true)
        _canvas_div._id = id
        _canvas_div._type = data.type
        _canvas_div.appendChild(_canvas)

        _canvas_div.style.left = `${data.x}px`
        _canvas_div.style.top = `${data.y}px`
        canvas_wrapper._append(_canvas_div, true)
        if (foo) {
            foo(_canvas_div)
            foo=void 0
        }
        e = void 0
    });
}

function loadText(data, id,foo) {
    var _canvas = canvas.cloneNode();
var span =document.createElement("span")
span.style.cssText=data.cssText

    storeIMGD.getItem(data.data).then(function (e) {
        if (typeof e !== "string") {
            console.error('something unusual here')
            return void 0
        }
span.innerText=e

        // span.width = data.original_width
        // span.height = data.original_height
        // span.style.width = `${data.width||data.original_width}px`
        // span.style.height = `${data.height||data.original_height}px`

        var _canvas_div = canvas_div.cloneNode(true)
        _canvas_div._id = id
        _canvas_div._type = data.type
        _canvas_div.appendChild(span)

        _canvas_div.style.left = `${data.x}px`
        _canvas_div.style.top = `${data.y}px`
        canvas_wrapper._append(_canvas_div, true)
        if (foo) {
            foo(_canvas_div)
            foo=void 0
        }
        e = void 0
    });
}

// loadImageData.load=function(id, data) {
//     storeIMGD.getItem(data.data).then(function () {
//         canvas = canvas.cloneNode();
//         canvas.width = data.original_width
//         canvas.height = data.original_height
//         _canvas.style.width=`${data.width||data.original_width}px`
//         _canvas.style.height=`${data.height||data.original_height}px`

//         canvas.getContext('2d').putImageData(arguments[0], 0, 0)

//         var _canvas_div = canvas_div.cloneNode(true)
//         _canvas_div._id = id
//         _canvas_div.appendChild(canvas)

//         _canvas_div.style.left = `${data.x}px`
//         _canvas_div.style.top = `${data.y}px`
//         canvas_wrapper._append(_canvas_div, true)
//     });

// }

// loadImageData.loadData=function(id, data) {

//     storeIMGD.getItem(data.data).then(function (e) {
//         var _canvas = canvas.cloneNode();
//         _canvas.width = e.width;
//         _canvas.height = e.height;
//         _canvas.style.width=`${data.width||data.original_width}px`
//         _canvas.style.height=`${data.height||data.original_height}px`
//         // var _canvas = canvas.cloneNode();
//         // _canvas.width = arguments[0].width;
//         // _canvas.height = arguments[0].height;

//         // _canvas.getContext('2d').putImageData(arguments[0], 0, 0)
//         // canvas.getContext('2d').drawImage(_canvas, 0, 0, canvas.width, canvas.height)

//         _canvas.getContext('2d').putImageData(arguments[0], 0, 0)

//         var _canvas_div = canvas_div.cloneNode(true)
//         _canvas_div._id=id
//         _canvas_div.appendChild(_canvas)

//         _canvas_div.style.left = `${data.x}px`
//         _canvas_div.style.top = `${data.y}px`
//         canvas_wrapper._append(_canvas_div, true)

//     });

// }

// getImage.load = function (img) {
//     canvas = canvas.cloneNode();
//     canvas.width = img.width / 2
//     canvas.height = img.height / 2

//     canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)

//     var _canvas_div = canvas_div.cloneNode(true)
//     _canvas_div.appendChild(canvas)

//     _canvas_div.style.left = `${(canvas_wrapper.offsetWidth-_canvas_div.width)/2}px`
//     _canvas_div.style.top = `${(canvas_wrapper.offsetHeight-_canvas_div.height)/2}px`

//     canvas_wrapper._append(_canvas_div, stored)
// }

function update(elm, type) {
    // console.log(elm._id);
    store.getItem(elm._id).then(function (e) {
        if (!e) {
            console.error('something unusual!!!')
            return
        }
        if (type === 'center') {
            e.x = elm.offsetLeft
            e.y = elm.offsetTop
        } else if (type.match(/^(bottom|right|bottom\-r)$/)) {
            var c = elm.querySelector('canvas')
            e.width = c.offsetWidth;
            e.height = c.offsetHeight;
        }else if(type.match(/^(bottom-right_text)$/)){
            var c = elm.querySelector('span')
            e.cssText=c.style.cssText
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

function overlay() {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa) {
        store.getItem(pa._id).then(function (val) {
            id().then(function (e) {
                if (pa.nextElementSibling) {
                    store.setItem(e, val)
                    store.removeItem(pa._id)
                    canvas_wrapper.appendChild(pa)
                    pa._id = e
                }
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
            console.log(val);
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
        // canvas_wrapper._remove()
        store.getItem(pa._id).then(function (val) {
            id().then(function (id) {
                val.data=id;
                store.setItem(id, val)
                storeIMGD.getItem(pa._id).then(function (e) {
                    storeIMGD.setItem(id, e)
                    incoming(id, val,function(e){
                        e.click()
                    })
                    e = void 0
                });
            });
        });
    }
}


function text() {
    
}



function id(e) {
    return new Promise(function (r, j) {
        if (e) {
            e = id.split(e).join("");
            j()
        } else {
            store.length().then(function (e) {
                if (0 >= e) {
                    return r(id.default)
                }
                store.key(e - 1).then(function (e) {
                    r(e+1)
                    // r(id.split(e).join(""))
                });
            });
        }
    });
}

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
    storeIMGD = e
    store.getAllItem(incoming)
});

function incoming(id, data,foo) {
    if (data.type === canvas_types.IMAGEDATA) {
        loadImageData(data, id,foo)
    } else if(data.type===canvas_types.TEXT) {
        loadText(data, id,foo)
    }
    id=data = foo=void 0
}