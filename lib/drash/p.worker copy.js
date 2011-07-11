
onmessage=function(data){
    data=data.data
    for (var i = 0; i < data.data.length; i+=4) {
        data.data[i]=2
        data.data[i+1]=2
        data.data[i+2]=2
        data.data[i+3]=9
    }
    self.postMessage(data)
    data=void 0
}
