function canvas_roundup_size(sz, w, h) {
    type.number(sz, w, h)
    // w = 100
    // h = 99

    var xrt = (w / h)
    var yrt = (h / w)
    xrt = xrt + 1
    yrt = yrt + 1

    var _sz = (sz / (xrt * yrt)) * 2

    w = (sz * xrt) / sz
    h = (sz * yrt) / sz

    w = w * _sz
    h = h * _sz
    return { width: w, height: h }
}