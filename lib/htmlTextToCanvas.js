var dev_mode = 1
var scalex = (original_width / _width);
var scaley = (original_height / _height);
function textToSvg(id) {
    var log, data, style;
    return new Promise(function (r, j) {
        if (id instanceof Object) {
            r(id, id = void 0)
        } else {
            db.log.getItem(id).then(function (e) {
                if (e instanceof Object) {
                    r(e, e = void 0)
                } else {
                    j('empty')
                }
            });
        }
    })
        .then(function (e) {
            log = e, e = void 0
            return db.object.getItem(log.data)
        })
        .then(function (e) {
            data = e, e = void 0
            return db.style.getItem(log.data)
        })
        .then(function (e) {
            style = e, e = void 0
            var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
            svg.setAttribute('xmlns', svg.namespaceURI)
            svg.innerHTML = `
    <foreignObject x="0" y="0">
    <x-body xmlns="http://www.w3.org/1999/xhtml">
    <style>
    .svg-div{
        position: absolute;
        display: inline-flex;
    }
    .svg-center{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .svg-span{}
    </style>
       <!--div class="svg-center svg-div"-->
       <div class="svg-div">
       <span class="svg-span">${data}</span>
       </div>
       <!--/div-->
    </x-body>
</foreignObject>
    `

            var fo = svg.querySelector('foreignObject')
            var span = fo.querySelector('span')
            var _canvas_div = span.parentElement;
            var center_canvas_div = span.parentElement.parentElement;

            log.fontSize = (Number(log.fontSize.replace(/[a-z]/igm, '')) * scalex) + "px"
            // console.log(log,scalex);
            _canvas_div.style.width = `${log.width * scalex}px`
            _canvas_div.style.left = `${log.x * scalex}px`
            _canvas_div.style.top = `${log.y * scaley}px`

            _canvas_div.style.transform = ` ${log.transform}`

            span.style.color = log.color
            span.style.backgroundColor = log.backgroundColor
            span.style.fontSize = log.fontSize
            span.style.fontWeight = log.fontWeight
            span.style.fontFamily = log.fontFamily
            span.style.textAlign = log.textAlign
            span.style.cssText += style


            svg.viewBox.baseVal.width = original_width
            svg.viewBox.baseVal.height = original_height

            svg.width.baseVal.valueAsString = svg.viewBox.baseVal.width + 'px'
            svg.height.baseVal.valueAsString = svg.viewBox.baseVal.height + 'px'

            // svg.height.baseVal.valueAsString = svg.viewBox.baseVal.height
            // svg.width.baseVal.valueAsString = svg.viewBox.baseVal.width

            shadow.appendChild(svg)

            center_canvas_div.style.width = _canvas_div.offsetWidth + 'px'
            center_canvas_div.style.height = _canvas_div.offsetHeight + 'px'

            var rect = span.getBoundingClientRect()

            // svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`)
            // svg.setAttribute('width', `${rect.width}`)
            // svg.setAttribute('height', `${rect.height}`)

            rect = void 0;

            fo.height.baseVal.valueAsString =
                svg.viewBox.baseVal.height + 'px'

            fo.width.baseVal.valueAsString =
                svg.viewBox.baseVal.width + 'px'

            if (!dev_mode) {
                svg.remove()
            }


            _canvas_div = center_canvas_div = span = fo = data = log = style = id = void 0
            return thread(function (str) {
                return new Blob([str], { type: 'image/svg+xml' }, str = void 0)
            }, svg.outerHTML, svg = void 0)
        });
};


function imagedataToSvg(id) {
    var log, data, style;
    return new Promise(function (r, j) {
        if (id instanceof Object) {
            r(id, id = void 0)
        } else {
            db.log.getItem(id).then(function (e) {
                if (e instanceof Object) {
                    r(e, e = void 0)
                } else {
                    j('empty')
                }
            });
        }
    })
        .then(function (e) {
            log = e, e = void 0
            return db.object.getItem(log.data).then(function (e) {
                if (e instanceof Blob) {
                    return e
                } else {
                    var cnv = offscreenCanvas(log.original_width, log.original_height)
                    cnv.getContext('2d').putImageData(e, 0, 0)

                    var _cnv = offscreenCanvas(log.width * scalex, log.height * scaley, true)
                    _cnv.getContext('2d').imageSmoothingQuality = "high"
                    _cnv.getContext('2d').drawImage(cnv, 0, 0, _cnv.width, _cnv.height);
                    cnv = void 0;
                    return _cnv.convertToBlob({ type: 'image/webp', quality: 1 })
                }
            });
        })
        .then(function (e) {
            data = e, e = void 0
            return db.style.getItem(log.data)
        })
        .then(function (e) {
            style = e, e = void 0
            // console.log(data);
            // return
            var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
            svg.setAttribute('xmlns', svg.namespaceURI)
            svg.setAttribute('xmlns:xhtml', "http://www.w3.org/1999/xhtml")


            svg.innerHTML = `
    <foreignObject x="0" y="0">
    <x-body xmlns="http://www.w3.org/1999/xhtml">
    <style>
    .svg-div{
        position: absolute;
        display: inline-flex;
    }
    .svg-center{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .svg-img{
        width:100%;
        height:100%;
    }
    </style>
       <!--div class="svg-center svg-div"-->
       <div class="svg-div">
       <img class="svg-img" src="${URL.createObjectURL(data)}"></img><!--close-->
       </div>
       <!--/div-->
    </x-body>
</foreignObject>
    `


            var fo = svg.querySelector('foreignObject')
            var img = fo.querySelector('.svg-img')
            var _canvas_div = img.parentElement;
            var center_canvas_div = img.parentElement.parentElement;
            return new Promise(function (r) {
                img.onload = function () {
                    URL.revokeObjectURL(img.src)

                    _canvas_div.style.width = `${log.width * scalex}px`
                    _canvas_div.style.height = `${log.height * scaley}px`
                    _canvas_div.style.left = `${log.x * scalex}px`
                    _canvas_div.style.top = `${log.y * scaley}px`
                    _canvas_div.style.transform = ` ${log.transform}`

                    img.style.backgroundColor = log.backgroundColor
                    img.style.cssText += style


                    svg.viewBox.baseVal.width = original_width
                    svg.viewBox.baseVal.height = original_height

                    svg.width.baseVal.valueAsString = svg.viewBox.baseVal.width + 'px'
                    svg.height.baseVal.valueAsString = svg.viewBox.baseVal.height + 'px'

                    // svg.height.baseVal.valueAsString = svg.viewBox.baseVal.height
                    // svg.width.baseVal.valueAsString = svg.viewBox.baseVal.width

                    shadow.appendChild(svg)

                    center_canvas_div.style.width = _canvas_div.offsetWidth + 'px'
                    center_canvas_div.style.height = _canvas_div.offsetHeight + 'px'

                    var rect = img.getBoundingClientRect()

                    // svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`)
                    // svg.setAttribute('width', `${rect.width}`)
                    // svg.setAttribute('height', `${rect.height}`)

                    rect = void 0

                    fo.height.baseVal.valueAsString =
                        svg.height.baseVal.valueAsString

                    fo.width.baseVal.valueAsString =
                        svg.width.baseVal.valueAsString
                    if (!dev_mode) {
                        svg.remove()
                    }

                    r(thread(function (str, blob) {
                        return new Promise(function (r) {
                            str = str.replace("\"><!--close-->", '"></img>')
                            var fr = new FileReader()
                            fr.readAsDataURL(blob)
                            blob = void 0
                            fr.onload = function () {
                                str = str.replace(/blob:[^"]+/, fr.result)
                                fr = void 0
                                r(new Blob([str], { type: 'image/svg+xml' }, str = void 0))
                            }
                        });
                    }, [svg.outerHTML, data]))
                    svg = _canvas_div = center_canvas_div = img = fo = data = log = style = id = void 0
                }
            });
        });
};

function render() {
    var cnv = offscreenCanvas(original_width, original_height, true)
    cnv.style.width=_width+'px'
    cnv.style.height=_height+'px'
    
    shadow.appendChild(cnv)
    ctx = cnv.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    // 10*(1000/500)
    // 10*(real/fake)
    //     var a=_width/original_width
    //     var b=original_width/_width

    //     var a=10/20
    //     var b=20/10

    //     var f=20
    //     c=f*a;
    // d=f*c
    //     console.log(d);
    return db.log.getAllItem(function (key, log) {
        // next()
        new Promise(function (r) {
            if (log.type === "text") {
                textToSvg(log).then(r)
            } else {
                imagedataToSvg(log).then(r)
            }
        }).then(function (e) {
            var img = new Image()
            img.src = URL.createObjectURL(e)
            console.log(log);
            img.onload = function () {
                // var x=img.width-log.width
                // var y=img.height-log.height
                // console.log(x,y);
                ctx.drawImage(img, 0, 0, cnv.width, cnv.height)
                // next()
            }
        });
        // CanvasRenderingContext2D.prototype.drawImage()
    }).then(function (e) {

    });
}
