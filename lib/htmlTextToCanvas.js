(function htmlTextToCanvas() {
    var svg=document.createElementNS("http://www.w3.org/2000/svg",'svg')
    svg.innerHTML=`
    <foreignObject x="0" y="0" width="100%" height="500">
    <body xmlns:xhtml="http://www.w3.org/1999/xhtml">
       <h2>hello</h2>
    </body>
</foreignObject>
    `
    // document.body.appendChild(svg)

    // svg.viewBox.baseVal.height=60
    // svg.viewBox.baseVal.width=60

    svg.height.baseVal.valueAsString="60px"
    svg.width.baseVal.valueAsString="60px"

    console.dir(svg.viewBox);
})();

var o=document.createElement('canvas').getContext('2d')
d=new DOMMatrix()
d.rotate(40)

o.setTransform(d)
