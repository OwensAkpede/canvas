offscreenCanvas=function(w,h,canvas){
    type.number(w,h)
    if (self.OffscreenCanvas && !canvas) {
        return new OffscreenCanvas(w,h)
    }
    
    var cnv=document.createElement('canvas');
    cnv.width=w
    cnv.height=h
    return cnv
}
