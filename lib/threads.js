(function(){
    var thread=new Worker("workers/threads.js")
    var i=0;
     Thread=function(foo) {
        if ("function" === typeof foo) {
            foo = foo.toString().replace(/^[^\(]+(\()/, 'function $1')
        } else {
            foo = null
        }
        console.log(foo);
    }
})();

 Thread(function(){
    
})
