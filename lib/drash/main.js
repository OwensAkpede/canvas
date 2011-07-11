"use strict";
const canvas_wrapper = document.querySelector('.canvas_wrapper foreignObject'),
    canvas_state = [],
    transform_speed = 2,
    canvas_reshape = {
        right: function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            // var pX = 0
            canvas_wrapper.onmousemove = function (e) {
                p.style.height = p.offsetHeight + "px"
                // if (pX > e.clientX) {
                //     p.style.width = (p.offsetWidth - (-(e.movementX||e.webkitMovementX||-1))) + "px";
                // } else if (e.clientX > pX) {
                // }
                p.style.width = (p.offsetWidth + ((e.movementX || e.webkitMovementX || -1))) + "px";
                //    p.style.height = p.offsetHeight + "px"
                //         p.style.width = (p.offsetWidth + (-(e.movementY||e.webkitMovementY||1))) + "px";
                // console.log((e.movementY||e.webkitMovementY||0));
                // pX = e.clientX
            }
        },
        bottom: function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            // var pY = 0
            canvas_wrapper.onmousemove = function (e) {
                p.style.width = p.offsetWidth + "px";
                p.style.height = (p.offsetHeight + ((e.movementY || e.webkitMovementY || -1))) + "px";

                // if (pY > e.clientY) {
                //     p.style.height = (p.offsetHeight - transform_speed) + "px"
                // } else if (e.clientY > pY) {
                //     p.style.height = (p.offsetHeight + transform_speed) + "px"
                //     p.style.width = p.offsetWidth + "px";
                //     pY = e.offsetY
                // }
                // pY = e.clientY
            }
        },
        "bottom-r": function (event, elm) {
            var p = elm.parentElement.querySelector('canvas');
            var pY = 0
            canvas_wrapper.onmousemove = function (e) {
                if (pY > e.clientY) {
                    p.style.height = (p.offsetHeight - transform_speed) + "px"
                    p.style.width = (p.offsetWidth - transform_speed) + "px";
                } else if (e.clientY > pY) {
                    p.style.height = (p.offsetHeight + transform_speed) + "px"
                    p.style.width = (p.offsetWidth + transform_speed) + "px";
                    pY = e.offsetY
                }

                // if (pY > e.clientY) {
                //     p.style.height = (p.offsetHeight - ((e.movementY||e.webkitMovementY||-1))) + "px"
                //     p.style.width = (p.offsetWidth - ((e.movementX||e.webkitMovementX||-1))) + "px";
                // } else if (e.clientY > pY) {
                //     p.style.height = (p.offsetHeight + ((e.movementY||e.webkitMovementY||-1))) + "px"
                //     p.style.width = (p.offsetWidth + ((e.movementX||e.webkitMovementX||-1))) + "px";
                //     pY = e.offsetY
                // }
                //    if (pY > e.clientY) {
                //     p.style.height = (p.offsetHeight - ((e.movementY||e.webkitMovementY||-1))) + "px";
                //     p.style.width = (p.offsetWidth - ((e.movementX||e.webkitMovementX||-1))) + "px";
                //                 } else if (e.clientY > pY) {
                //                     // p.style.height = (p.offsetHeight + transform_speed) + "px"
                //                     // p.style.width = (p.offsetWidth + transform_speed) + "px";
                //                     p.style.height = (p.offsetHeight + ((e.movementY||e.webkitMovementY||-1))) + "px";
                //                     p.style.width = (p.offsetWidth + ((e.movementX||e.webkitMovementX||-1))) + "px";
                //                     pY = e.offsetY
                //                 }

                pY = e.clientY
            }
        },
        "center": function (event, elm) {
            // var pY = 0
            // var pX = 0

            var e = elm.parentElement;
            // e.style.pointerEvents ="none"
            // canvas_wrapper.setAttribute('mode', 'edit')
            // console.log(event);
            canvas_wrapper.onmousemove = function (ev) {
                // if (ev.offsetX === 0 || ev.offsetY === 0) {
                //     return
                // }
                // if (ev.offsetX > (e.offsetWidth / 2)) {}

                // if (ev.offsetY > (e.offsetHeight / 2)) {}


                // e.style.top = (ev.layerY - (e.offsetHeight / 2)) + 'px'
                // e.style.left = (ev.layerX - (e.offsetWidth / 2)) + 'px'


                e.style.top = (e.offsetTop + (ev.movementY || ev.webkitMovementY || 0)) + 'px'
                e.style.left = (e.offsetLeft + (ev.movementX || ev.webkitMovementX || 0)) + 'px'

                // e.style.top = (ev.offsetY) + 'px'
                // e.style.left = (ev.offsetX) + 'px'
                // console.log(e.style.top);
                // layerX
                // console.log(ev.clientY,ev.offsetY);
                // e.style.top = ((ev.clientY+ev.offsetY) - ((e.offsetHeight / 1))) + 'px'
                // e.style.top = (ev.clientY- ((e.offsetHeight / 1)+ev.offsetY)) + 'px'
                // e.style.left = (ev.clientX - ((e.offsetWidth / 1 )+ev.offsetX)) + 'px'

                // console.log(ev.movementX);
                // switch (true) {
                //     case ev.clientX > pX:
                //         e.style.left=(e.offsetLeft+1)+'px'
                //         break;
                //         case pX > ev.clientX:
                //             e.style.left=(e.offsetLeft-1)+'px'
                //             break;
                //             case ev.clientY > pY:
                //                 e.style.top=(e.offsetTop+transform_speed)+'px'
                //                 break;
                //                 case pY > ev.clientY:
                //                     e.style.top=(e.offsetTop-transform_speed)+'px'
                //                     break;
                // }
                // pX=ev.clientX
                // pY=ev.clientY
            }
        },
        currentX: 0,
        currentY: 0
    };

let canvas = document.createElement('canvas')
let canvas_div = document.createElement('xhtml:div')
canvas_div.innerHTML = `
<xhtml:div d="center"></xhtml:div>

<xhtml:div d="bottom"></xhtml:div>
<xhtml:div d="right"></xhtml:div>


<xhtml:div d="bottom-r"></xhtml:div>
`
canvas_div.getElementsByTagName('xhtml:div').forEach(function (e) {
    if (canvas_reshape.hasOwnProperty(e.getAttribute('d'))) {
        e.setAttribute('onmousedown', `canvas_reshape['${e.getAttribute('d')}'](event,this);
        var elm=this
        canvas_wrapper.onmouseleave=canvas_wrapper.onmouseup=function(){
            // console.log('up');
            canvas_wrapper.onmouseleave=canvas_wrapper.onmouseup=elm.onmouseleave=canvas_wrapper.onmousemove=null
            // console.log(elm);
            // elm.parentElement.style.pointerEvents =""
            // canvas_wrapper.removeAttribute('mode')
            update(elm.parentElement,'${e.getAttribute('d')}')
        }
        `)
    }
})

function getImageBlog() {
    var img = new Image();
    img.src = "image/1.png";

    img.onload = function () {
        // img.style.borderRadius="600px"
        canvas = canvas.cloneNode();
        canvas.width = img.width / 2
        canvas.height = img.height / 2

        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(function(e){
            console.log(e);
        },"image/webp",9)
        // var _canvas_div = canvas_div.cloneNode(true)
        console.log(canvas);
    }
}


getImageBlog()
function getImage() {
    var img = new Image();
    img.src = "image/1.png";


    console.log();
}
// console.log(canvas.getContext('2d'));
function load() {
    
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
        if (data.original_height !== data.height || data.original_width !== data.width) {
            return
            loadData(id, data)
        }
        load(id, data)
    })
    // getImage()
});