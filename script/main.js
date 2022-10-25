"use strict";
const canvas_wrapper=document.querySelector('.canvas_wrapper'),
canvas_state=[];

let canvas=document.createElement('canvas')

canvas_wrapper._append=function(){
    arguments[0]._id=id()
    this.appendChild(arguments[0])
}

function insert(data) {
    canvas=canvas.cloneNode();
    canvas.width=data.width
    canvas.height=data.height
    canvas.getContext('2d').putImageData(data,0,0)
    canvas_wrapper.appendChild(canvas)
}

function getImage(src) {
    var img=new Image();
    img.src="image/1.png"
    img.onload=function(){
        //offset
        canvas=canvas.cloneNode();
        canvas.width=img.width
       canvas.height=img.height
       canvas.setAttribute('centered','')
       canvas.setAttribute('img','')
       canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height)
       canvas_wrapper._append(canvas)
    }
}

function id() {
    return "C"+Date.now()
}

function round(number, number_max, percentage) {
    // percentage = less than percentage (100)    (10,1000,100)
    percentage = percentage || 100;
    return Math.min((number*percentage)/number_max,percentage);
}

getImage()