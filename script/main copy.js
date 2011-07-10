"use strict";
const canvas_wrapper = document.querySelector('.canvas_wrapper'),
    canvas_board = document.querySelector('.canvas_board'),
    canvas_state = [],
    canvas_events = {
        mousemove:"onmousemove",
        mouseup:"onmouseup",
        mousedown:"onmousedown",
        mouseleave:"onmouseleave",

        mousemove:"ontouchmove",
        mouseup:"ontouchend",
        mousedown:"ontouchstart",
        mouseleave:"ontouchcancel"
    },
    transform_speed = 2,
    canvas_reshape = {
        right: function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            canvas_board[canvas_events.mousemove] = function (e) {
                p.style.height = p.offsetHeight + "px"
                p.style.width = (p.offsetWidth + ((e.movementX || e.webkitMovementX || -1))) + "px";
            }
        },
        bottom: function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            canvas_board[canvas_events.mousemove] = function (e) {
                p.style.width = p.offsetWidth + "px";
                p.style.height = (p.offsetHeight + ((e.movementY || e.webkitMovementY || -1))) + "px";
            }
        },
        center: function (event, elm) {
            var e = elm.parentElement;
            canvas_board[canvas_events.mousemove] = function (ev) {
                console.log(22);
                e.style.top = (e.offsetTop + (ev.movementY || ev.webkitMovementY || 0)) + 'px'
                e.style.left = (e.offsetLeft + (ev.movementX || ev.webkitMovementX || 0)) + 'px'
                e.scrollIntoViewIfNeeded(true)
            }
        },
        "bottom-right": function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            canvas_board[canvas_events.mousemove] = function (e) {
                p.style.height = (p.offsetHeight + ((e.movementY || e.webkitMovementY || -1))) + "px";
                p.style.width = (p.offsetWidth + ((e.movementY || e.webkitMovementY || -1))) + "px";
            }
        },
        currentX: 0,
        currentY: 0
    };

let canvas = document.createElement('canvas')
let canvas_div = document.createElement('div')
let canvas_ctrl = document.createElement('div')
canvas_ctrl.setAttribute("controller", "")
canvas_ctrl.innerHTML = `
<div d="center"></div>
<div d="bottom"></div>
<div d="right"></div>
<div d="bottom-right"></div>
`

canvas_ctrl.querySelectorAll('div').forEach(function (e) {
    if (canvas_reshape.hasOwnProperty(e.getAttribute('d'))) {
        e.setAttribute(canvas_events.mousedown, `canvas_reshape['${e.getAttribute('d')}'](event,this.parentElement);
        var elm=this
        // elm.ondragj=function() {
        //     canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=elm[canvas_events.mouseleave]=canvas_board[canvas_events.mousemove]=null
        //     // canvas_board.blur()
        //     // elm.parentElement.click()
        //     // canvas_board.click()
        //     update(elm.parentElement.parentElement,'${e.getAttribute('d')}')
        // }
        canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=function(){
            canvas_board[canvas_events.mouseleave]=canvas_board[canvas_events.mouseup]=elm[canvas_events.mouseleave]=canvas_board[canvas_events.mousemove]=null
            update(elm.parentElement.parentElement,'${e.getAttribute('d')}')
        }
        `)
    }
})

// console.log(canvas.getContext('2d'));

canvas_wrapper._remove = function () {
    var pa = canvas_wrapper.querySelector('div[active]');
    if (pa) {
        pa[canvas_events.mouseup] = pa[canvas_events.mousedown] = null
        pa.removeAttribute('active')
        pa.querySelector('[controller]').remove()
        pa = void 0
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

        e.setAttribute("active", "")
        var _canvas_ctrl = canvas_ctrl.cloneNode(true)

        if (e._type) {
            if (e._type==="text") {
                _canvas_ctrl.querySelector('[d="right"]').remove()
                _canvas_ctrl.querySelector('[d="bottom"]').remove()
            }
        } else {
            _canvas_ctrl.querySelector('[d="right"]').remove()
            _canvas_ctrl.querySelector('[d="bottom"]').remove()
            _canvas_ctrl.querySelector('[d="bottom-right"]').remove()
        }

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
        _canvas_div._id = id()
        _canvas_div._type = "imagedata"

        canvas_wrapper._append(_canvas_div)

        store.setItem(_canvas_div._id, {
            original_height: _canvas.height,
            original_width: _canvas.width,
            height: _canvas.offsetHeight || _canvas.height,
            width: _canvas.offsetWidth || _canvas.width,
            x: _canvas_div.offsetLeft,
            y: _canvas_div.offsetTop,
            data: _canvas_div._id,
            type: _canvas_div._type
        }).then(function () {
            storeIMGD.setItem(_canvas_div._id, _canvas.getContext('2d').getImageData(0, 0, _canvas.height, _canvas.height))
        });
    }
}

function getText(txt, data) {

}

function loadImageData(data) {
    var _canvas = canvas.cloneNode();
    storeIMGD.getItem(data.data).then(function (e) {
        _canvas.width = data.original_width
        _canvas.height = data.original_height
        _canvas.style.width = `${data.width||data.original_width}px`
        _canvas.style.height = `${data.height||data.original_height}px`
        _canvas.getContext('2d').putImageData(e, 0, 0)

        var _canvas_div = canvas_div.cloneNode(true)
        _canvas_div._id = data.data
        _canvas_div._type = data.type
        _canvas_div.appendChild(_canvas)

        _canvas_div.style.left = `${data.x}px`
        _canvas_div.style.top = `${data.y}px`
        canvas_wrapper._append(_canvas_div, true)
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
        } else if (type.match(/^(bottom|right|bottom\-r)/)) {
            var c = elm.querySelector('canvas')
            e.width = c.offsetWidth;
            e.height = c.offsetHeight;
        }
        store.setItem(elm._id, e)
    });
}

function id() {
    return "C" + Date.now()
}

function round(number, number_max, percentage) {
    // percentage = less than percentage (100)    (10,1000,100)
    percentage = percentage || 100;
    return Math.min((number * percentage) / number_max, percentage);
}

ready.then(function (e) {
    storeIMGD = e
    store.getAllItem(function (id, data) {
        if (data.type === "imagedata") {
            loadImageData(data)
        } else {
            loadImageData(data)
        }
    })
    // getImage()
});