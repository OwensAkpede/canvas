
function textToSvg(id, quality) {
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
       <span class="svg-span"></span>
       </div>
       <!--/div-->
    </x-body>
</foreignObject>
    `

            var fo = svg.querySelector('foreignObject')

            if (quality === 'low') {
                svg.viewBox.baseVal.width =
                    _width
                svg.viewBox.baseVal.height =
                    _height
            } else {
                svg.viewBox.baseVal.width =
                    original_width
                svg.viewBox.baseVal.height =
                    original_height
                log.fontSize = (Number(log.fontSize.replace(/[a-z]/igm, '')) * scalex) + "px"
                log.width = log.width * scalex
                log.x = log.x * scalex
                log.y = log.y * scaley
            }

            svg.width.baseVal.valueAsString =
                svg.viewBox.baseVal.width + 'px'
            svg.height.baseVal.valueAsString =
                svg.viewBox.baseVal.height + 'px'

            fo.height.baseVal.valueAsString =
                svg.viewBox.baseVal.height + 'px'
            fo.width.baseVal.valueAsString =
                svg.viewBox.baseVal.width + 'px'


            var span = fo.querySelector('span')
            span.innerText = data
            var _canvas_div = span.parentElement;


            _canvas_div.style.width = `${log.width}px`
            _canvas_div.style.left = `${log.x}px`
            _canvas_div.style.top = `${log.y}px`

            _canvas_div.style.transform = ` ${log.transform}`

            span.style.color = log.color
            span.style.backgroundColor = log.backgroundColor
            span.style.fontSize = log.fontSize
            span.style.fontWeight = log.fontWeight
            span.style.fontFamily = log.fontFamily
            span.style.textAlign = log.textAlign
            span.style.cssText += style

            if (dev_mode) {
                shadow.appendChild(svg)
            }


            _canvas_div = span = fo = data = log = style = id = void 0
            return thread(function (str) {
                return new Blob([str], { type: 'image/svg+xml' }, str = void 0)
            }, svg.outerHTML, svg = void 0)
        });
};


function imagedataToSvg(id, quality) {
    if (!_quality.hasOwnProperty(quality)) {
        quality = 'high'
    }
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
                    cnv.getContext('2d').imageSmoothingQuality = quality
                    cnv.getContext('2d').putImageData(e, 0, 0)
                    if (quality === "low") {
                        var _cnv = offscreenCanvas(log.width, log.height, true)
                        _cnv.getContext('2d').imageSmoothingQuality = quality
                        _cnv.getContext('2d').drawImage(cnv, 0, 0, _cnv.width, _cnv.height);
                        cnv = _cnv, _cnv = void 0;
                    } else {
                        /**
                         * @high_quality
                         * */
                        // if (log.original_width + log.original_height > log.width + log.height) {
                        //     var _cnv = offscreenCanvas(log.width * scalex, log.height * scaley, true)
                        //     _cnv.getContext('2d').imageSmoothingQuality = quality
                        //     _cnv.getContext('2d').drawImage(cnv, 0, 0, _cnv.width, _cnv.height);
                        //     cnv = _cnv, _cnv = void 0;
                        // }
                    }
                    return cnv.convertToBlob({ type: _quality[quality].type, quality: _quality[quality].quality })
                }
            });
        })
        .then(function (e) {
            data = e, e = void 0
            return db.style.getItem(log.data)
        })
        .then(function (e) {
            style = e, e = void 0

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
       <img class="svg-img" src="${dev_mode ? URL.createObjectURL(data) : "data:image/png,"}"></img><!--close-->
       </div>
       <!--/div-->
    </x-body>
</foreignObject>
    `
            var fo = svg.querySelector('foreignObject')

            if (quality === 'low') {
                svg.viewBox.baseVal.width =
                    _width
                svg.viewBox.baseVal.height =
                    _height
            } else {
                svg.viewBox.baseVal.width =
                    original_width
                svg.viewBox.baseVal.height =
                    original_height
                log.width = log.width * scalex
                log.height = log.height * scalex
                log.x = log.x * scalex
                log.y = log.y * scaley
            }

            svg.width.baseVal.valueAsString =
                svg.viewBox.baseVal.width + 'px'
            svg.height.baseVal.valueAsString =
                svg.viewBox.baseVal.height + 'px'

            fo.height.baseVal.valueAsString =
                svg.height.baseVal.valueAsString
            fo.width.baseVal.valueAsString =
                svg.width.baseVal.valueAsString

            var img = fo.querySelector('.svg-img')
            var _canvas_div = img.parentElement;

            _canvas_div.style.width = `${log.width}px`
            _canvas_div.style.height = `${log.height}px`
            _canvas_div.style.left = `${log.x}px`
            _canvas_div.style.top = `${log.y}px`
            _canvas_div.style.transform = ` ${log.transform}`

            img.style.backgroundColor = log.backgroundColor
            img.style.cssText += style



            if (dev_mode) {
                img.onload = function () {
                    URL.revokeObjectURL(this.src)
                }
                shadow.appendChild(svg)
            }
            _canvas_div = img = fo = log = style = id = void 0

            return thread(function (str, blob) {
                return new Promise(function (r) {
                    str = str.replace("\"><!--close-->", '"></img>')
                    var fr = new FileReader()
                    fr.readAsDataURL(blob)
                    blob = void 0
                    fr.onload = function () {
                        str = str.replace(/(blob|data):[^"]+/, fr.result)
                        fr = void 0
                        r(new Blob([str], { type: 'image/svg+xml' }, str = void 0))
                    }
                });
            }, [svg.outerHTML, data], svg = data = void 0)

        });
};

function renderAsCanvas(quality) {

    var loaded = 0

    if (!_quality.hasOwnProperty(quality)) {
        quality = 'low'
        quality = 'high'
    }


    var cnv = offscreenCanvas(original_width, original_height, true)

    cnv.width = original_width
    cnv.height = original_height

    cnv.style.width = _width + 'px'
    cnv.style.height = _height + 'px'

    shadow.appendChild(cnv)

    ctx = cnv.getContext('2d')
    ctx.imageSmoothingQuality = quality


    return new Promise(function (r) {
        db.log.length().then(function (len) {
            return db.log.getAllItem(function (key, log) {
                new Promise(function (r) {
                    if (log.type === "text") {
                        textToSvg(log, quality).then(r)
                    } else {
                        imagedataToSvg(log, quality).then(r)
                    }
                }).then(function (e) {
                    return new Promise(function (r) {
                        var fr = new FileReader()
                        fr.readAsDataURL(e)
                        fr.onload = function () {
                            var img = new Image()
                            img.src = fr.result
                            img.onload = function () {
                                ctx.drawImage(img, 0, 0, cnv.width, cnv.height)
                                r()
                            }
                        }
                    });
                }).then(function (e) {

                    loaded += 1
                    if (len === loaded) {
                        r()
                    }
                });
            })
        });
    }).then(function (e) {
    });
}
