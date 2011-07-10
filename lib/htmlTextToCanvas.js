
function htmlTextToCanvas(id) {
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
.then(function(e){
    var svg=document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svg.innerHTML=`
    <foreignObject x="0" y="0" width="100px" height="500">
    <body xmlns:xhtml="http://www.w3.org/1999/xhtml" width="100%" height="100%">
       <div>
       <span>${data}</span>
       </div>
    </body>
</foreignObject>
    `
    var fo = svg.querySelector('foreignObject')
    var span = fo.querySelector('span')
    span.parentElement.style.width=log.width+'px'

    // body.innerHTML+=("Ppp".bold())
    document.body.appendChild(svg)

    svg.viewBox.baseVal.width=span.offsetWidth
    svg.viewBox.baseVal.height=span.offsetHeight

    fo.height.baseVal.valueAsString=svg.height.baseVal.valueAsString= svg.viewBox.baseVal.height+'px'
    fo.width.baseVal.valueAsString=svg.width.baseVal.valueAsString= svg.viewBox.baseVal.width  +'px'
    
    // console.dir(span);
});
};

// var o=document.createElement('canvas').getContext('2d')
// d=new DOMMatrix()
// d.rotate(40)

// o.setTransform(d)



// function m(params) {
    
// }

// m.prototype=IDBDatabase.prototype