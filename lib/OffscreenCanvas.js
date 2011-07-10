offscreenCanvas=function(w,h){
    type.number(w,h)
    if (self.OffscreenCanvas) {
        return new OffscreenCanvas(w,h)
    }
    
    var cnv=document.createElement('canvas');
    cnv.width=w
    cnv.height=h
    return cnv
}
