
function textToSvg(id) {
    var log,data,stye;
new Promise(function(r,j){
db.log.getItem(id).then(function(e){
if (e instanceof Object) {
    r(e)
}else{
    j('empty')
}
});
})
.then(function(e){
    log=e
return db.object.getItem(log.data)
})
.then(function(e){
data=e
return db.style.getItem(log.data)
})
.then(function(style){
    var svg=document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svg.setAttribute('xmlns',svg.namespaceURI)
    svg.innerHTML=`
    <foreignObject x="0" y="0">
    <x-body xmlns="http://www.w3.org/1999/xhtml">
    <style>
    svg div{
        position: absolute;
        display: inline-flex;
        position: fixed;
        display: inline-flex;
    }
    .x-center{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    svg span{}
    </style>
       <div class="x-center">
       <div>
       <span>${data}</span>
       </div>
       </div>
    </x-body>
</foreignObject>
    `

    var w=log.width
    var fo = svg.querySelector('foreignObject')
    var span = fo.querySelector('span')
    var _canvas_div= span.parentElement;
    var center_canvas_div= span.parentElement.parentElement;


    _canvas_div.style.width = `${log.width}px`
    _canvas_div.style.transform = ` ${log.transform}`

    span.style.color = log.color
    span.style.backgroundColor = log.backgroundColor
    span.style.fontSize = log.fontSize
    span.style.fontWeight = log.fontWeight
    span.style.fontFamily = log.fontFamily
    span.style.textAlign = log.textAlign
    span.style.cssText+=style


    svg.viewBox.baseVal.width=_width
    svg.viewBox.baseVal.height=_height
svg.height.baseVal.valueAsString= svg.viewBox.baseVal.height
 svg.width.baseVal.valueAsString= svg.viewBox.baseVal.width

 document.body.appendChild(svg)
 center_canvas_div.style.width=_canvas_div.offsetWidth+'px'
 center_canvas_div.style.height=_canvas_div.offsetHeight+'px'

var rect=span.getBoundingClientRect()

svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`)
 svg.setAttribute('width',`${rect.width}`)
 svg.setAttribute('height',`${rect.height}`)

    fo.height.baseVal.valueAsString=
    svg.style.height=
    svg.style.minHeight=
    svg.style.maxHeight=
     svg.viewBox.baseVal.height+'px'

    fo.width.baseVal.valueAsString=
    svg.style.width= 
    svg.style.minWidth= 
    svg.style.maxWidth= 
    svg.viewBox.baseVal.width  +'px'
    

    var url= 'data:image/svg+xml,'+encodeURIComponent(svg.outerHTML)
    console.log(url);
});
};


function imagedataToSvg(id) {
    var log,data,stye;
new Promise(function(r,j){
db.log.getItem(id).then(function(e){
if (e instanceof Object) {
    r(e)
}else{
    j('empty')
}
});
})
.then(function(e){
    log=e
return db.object.getItem(log.data).then(function(e){
if (e instanceof Blob) {
    return e
}else{
    var cnv = offscreenCanvas(log.original_width,log.original_height)
cnv.getContext('2d').putImageData(e,0,0)

var _cnv = offscreenCanvas(log.width,log.height,true)
_cnv.getContext('2d').drawImage(cnv,0,0,_cnv.width,_cnv.height);
cnv=void 0;
    return _cnv.toDataURL("image/webp",1)
}
});
})
.then(function(e){
    data=e
// data=URL.createObjectURL(e)
// createdObjectURL.push(data)
e=void 0
return db.style.getItem(log.data)
})
.then(function(style){
    // console.log(data);
    // return
    var svg=document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svg.setAttribute('xmlns',svg.namespaceURI)
    svg.setAttribute('xmlns:xhtml',"http://www.w3.org/1999/xhtml")
    
    svg.innerHTML=`
    <foreignObject x="0" y="0">
    <x-body xmlns="http://www.w3.org/1999/xhtml">
    <style>
    svg div{
        position: absolute;
        display: inline-flex;
        position: fixed;
        display: inline-flex;
    }
    .x-center{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    svg span{}
    </style>
       <div class="x-center">
       <div>
       <img class="img" src="${data}"></img>
       </div>
       </div>
    </x-body>
</foreignObject>
    `
  

    var w=log.width
    var fo = svg.querySelector('foreignObject')
    var img = fo.querySelector('.img')
    var _canvas_div= img.parentElement;
    var center_canvas_div= img.parentElement.parentElement;

img.onload=function(){
    
    _canvas_div.style.width = `${log.width}px`
    _canvas_div.style.transform = ` ${log.transform}`

    img.style.backgroundColor = log.backgroundColor
    img.style.cssText+=style


    svg.viewBox.baseVal.width=_width
    svg.viewBox.baseVal.height=_height
svg.height.baseVal.valueAsString= svg.viewBox.baseVal.height
 svg.width.baseVal.valueAsString= svg.viewBox.baseVal.width

 document.body.appendChild(svg)
 center_canvas_div.style.width=_canvas_div.offsetWidth+'px'
 center_canvas_div.style.height=_canvas_div.offsetHeight+'px'
  
var rect=img.getBoundingClientRect()

svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`)
 svg.setAttribute('width',`${rect.width}`)
 svg.setAttribute('height',`${rect.height}`)

    fo.height.baseVal.valueAsString=
    svg.style.height=
    svg.style.minHeight=
    svg.style.maxHeight=
     svg.viewBox.baseVal.height+'px'

    fo.width.baseVal.valueAsString=
    svg.style.width= 
    svg.style.minWidth= 
    svg.style.maxWidth= 
    svg.viewBox.baseVal.width  +'px'
    

    var url= 'data:image/svg+xml,'+encodeURIComponent(svg.outerHTML)
    console.log(url);
}
});
};

function d() {
    console.log(arguments);
}
// var o=document.createElement('canvas').getContext('2d')
// d=new DOMMatrix()
// d.rotate(40)

// o.setTransform(d)



// function m(params) {
    
// }

// m.prototype=IDBDatabase.prototype