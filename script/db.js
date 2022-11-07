
var project_name = 'my editor'
var app_id = 'canva editor'
var db = {
    log: void 0,
    style: void 0,
    object: void 0,
    project: void 0,
    db:new NimoDB()
}

var ready = new Promise(function (_r) {
    db.db.forceOpen(app_id, project_name).then(function (e) {
        if (e) {
            db.project = e;
        } else {
            return db.db.create(app_id, project_name).then(function (e) {
                db.project = e;
            })
        }
    }).then(function(){
    db.db.forceOpen(project_name, 'image logs').then(function (e,exist) {
        db.log = e
        db.db.forceOpen(project_name, 'image objects').then(function (e) {
            db.object = e
            db.db.forceOpen(project_name, 'image style').then(function (e) {
                db.style = e
                _r()
            })
        });
    });
})
});


// var img = new Image();
// img.src = "./image/1.png"
// console.log(db);
// img.onload = function () {imageToCanvas(img)}


// var d=new Promise(function(r){
// r(7)
// }).then(function(e){
// console.log(e);

//     return new Promise(function(r){
//         setTimeout(function(){
//             r(3)
//         },4000)
//         }).then(function(){
//             console.log(999);
//             // console.dir(arguments.callee);
//         })
// }).then(function(e){
// console.log(e);
// }).then(function(e){
//     console.log(e);

// });