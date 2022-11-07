var project_name = 'my editor'
var app_id = 'canva editor'
var db = {
    log: void 0,
    style: void 0,
    object: void 0,
    detail: void 0,
    projectList: void 0,
    db: new NimoDB()
}

var ready = new Promise(function (_r) {
var n=Date.now()
    _r(db.db.forceOpen(project_name, 'image logs').then(function (e) {
        db.log = e
        if (db.log.__new) canvas_defaults(ready);
        return db.db.forceOpen(project_name, 'image objects')
    }).then(function (e) {
        db.object = e
        return db.db.forceOpen(project_name, 'image style')
    }).then(function (e) {
        db.style = e
        return db.db.forceOpen(project_name, 'image details')
    }).then(function (e) {
        db.detail = e
        return db.db.forceOpen(app_id, 'project lists')
    }).then(function (e) {
        db.projectList = e;
        if (db.log.__new) {
            db.detail.setItem('date',Date.now());
            db.projectList.setItem(project_name,Date.now());
        }
        // console.log(Date.now()-n+"ms");
    }))
    // db.db.forceOpen(project_name, 'image logs').then(function (e) {
    //     db.log = e
    //     console.log(e);
    //     if (db.log.__new) canvas_defaults();
    //     _r();
    // });
    // db.db.forceOpen(project_name, 'image objects').then(function (e) {
    //     db.object = e
    // });

    // db.db.forceOpen(project_name, 'image style').then(function (e) {
    //     db.style = e
    // })

    // db.db.forceOpen(project_name, 'image details').then(function (e) {
    //     db.detail = e
    // })

    // db.db.forceOpen(app_id, 'project lists').then(function (e) {
    //     db.projectList = e;
    // })
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
//         },400)
//         }).then(function(){
//             console.log(999);
//             // console.dir(arguments.callee);
//         })
// }).then(new Promise(function(r){
//     setTimeout(function(){
//         r(800)
//     },9000)
// })).then(function(e){
//     console.log('ooo');

// });