var ICONS = {}

ICONS.upload = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`
ICONS.plus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
ICONS["align-left"] = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>`
ICONS["align-center"] = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-center"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>`
ICONS["align-right"] = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-right"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>`
ICONS.visible = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
ICONS.invisible = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
ICONS.alert = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
ICONS.close = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
ICONS.up = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>`
ICONS.down = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>`


function popper(_e, opt) {
    // var elm=popper.element;
    if ("string" !== typeof _e) {
        _e = String(_e)
    }
    // _e=_e.replace(/\n*[\s](\s)/img,'')
    if (_e.length <= 0) {
        return
    }
    if (!popper.parentNode) {
        popper.parentNode = document.createElement('x-pop')
        if (document.body) {
            document.body.appendChild(popper.parentNode)
        } else {
            document.documentElement.appendChild(popper.parentNode)
        }
    }
    if ("object" !== typeof opt) {
        opt = {}
    }

    opt.__proto__ = popper.DefualtOptions

    if (/*popper.parentNode.childElementCount */popper.count >= popper.MAX_SIZE || popper.parentNode.childElementCount >= popper.MAX_SIZE) {
        if (opt.backup) {
            // setTimeout(function () {
            popper.pending.push({
                type: 'alert',
                summary: _e,
                opt: opt,
            })
            // popNotifierStorage.setItem(Date.now() + Math.random(), {
            //     type: 'alert',
            //     summary: _e,
            //     opt: opt,
            // }).then(function (e) { });
            // }, 10);
        }
        return
    }
    popper.sync = popper.init(_e, opt)
}

popper.init = function (_e, opt) {
    return new Promise(function (r) {

        var elm = popper.element.cloneNode(true);
        elm.exit = popper.exit

        elm.querySelector('x-pop-icon[l]').setAttribute("l", opt.type)
        elm.querySelector('x-pop-icon[l]').innerHTML = opt.mainIcon
        elm.querySelector('x-pop-summary span').textContent = _e
        elm.querySelector('src span').innerText = opt.source

        if (opt.manualCloser) {
            var x = document.createElement('x')
            x.innerHTML = opt.closeIcon
            x.onclick = function () {
                if (elm.hasAttribute("full")) {
                    popper.wait = false
                }
                elm.exit()
                var last = popper.parentNode.firstElementChild;
                if (elm === last) {
                    last = last.nextElementSibling
                }
                if (last && last._clear) {
                    last._clear()
                }
            }

            var more = document.createElement('more')
            more.innerHTML = opt.upIcon
            more.onclick = function (e) {
                setTimeout(function () {
                    if (elm.hasAttribute("full")) {
                        if (e !== 0) {
                            popper.wait = false
                        }
                        elm.removeAttribute("full")
                        more.innerHTML = opt.upIcon;
                        var last = popper.parentNode.firstElementChild;
                        if (last && last._clear) {
                            last._clear()
                        }
                    } else {
                        popper.wait = true
                        popper.parentNode.querySelectorAll('x-popped[full="true"] x-pop-icon[r]>more').
                            forEach(function (e) {
                                e.onclick(0)
                            })

                        elm.setAttribute("full", true)
                        more.innerHTML = opt.downIcon
                    }
                }, 10);
            }

            elm.querySelector('x-pop-icon[r]').appendChild(x)
            elm.querySelector('x-pop-icon[r]').appendChild(more)
        }

        popper.count += 1

        popper.sync.then(function (e) {
            setTimeout(function () {
                popper.parentNode.appendChild(elm);
                if (elm._clear) {
                    if (!elm.previousElementSibling) {
                        elm._clear()
                    }
                }
                r()
            }, 50 * popper.parentNode.childElementCount);
        });
        elm.opt = opt
        if (opt.autoClear) {
            elm._clear = popper.clear
        }
    });
}

popper.sync = new Promise(function (r) {
    r()
});
popper.clear = function (t) {
    _this = this
    if (popper.wait) {
        return
    }
    setTimeout(function () {
        if (popper.wait) {
            return
        }
        var nxt = _this.nextElementSibling
        _this.exit().then(function (e) {
            if (nxt) {
                nxt._clear()
            }
        });
    }, t || _this.opt.delay)
}
popper.MAX_SIZE = 4;
popper.count = 0;
popper.wait = false;
popper.pending = [];
popper.DefualtOptions = {
    backup: true,
    autoClear: true,
    manualCloser: true,
    delay: 3000,
    mainIcon: ICONS.alert,
    closeIcon: ICONS.close,
    upIcon: ICONS.up,
    downIcon: ICONS.down,
    type: "alert",
    source: "Unknown"
}
popper.exit = function () {
    var _this = this
    return new Promise(function (r) {
        _this.setAttribute('trans', true)
        var _t = _this
        // return
        setTimeout(function () {
            popper.count -= 1
            _t.remove()
            if (popper.parentNode.childElementCount < popper.MAX_SIZE && popper.count < popper.MAX_SIZE) {
                var e = popper.pending.shift(0)
                if (e) {
                    setTimeout(function () {
                        popper(e.summary, e.opt)
                    }, 100)
                }

                // popNotifierStorage.getAllItem(function (i, e) {
                //     popNotifierStorage.removeItem(i).then(function () {
                //         if (e instanceof Object) {
                //             popper(e.summary, e.opt)
                //         }
                //     });
                // })
            }
            r()
        }, 250);
    });
}

// popper.parentNode = document.createElement('x-pop')
// document.documentElement.appendChild(popper.parentNode)
popper.element = document.createElement('x-popped')
// popper.element.setAttribute("trans", true)
popper.element.innerHTML = `<x-pop-icon l></x-pop-icon><x-pop-summary><span></span></x-pop-summary><x-pop-icon r></x-pop-icon><src hidden>Source: <span></span></src>`;
