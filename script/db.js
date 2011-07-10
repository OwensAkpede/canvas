var store
var storeIMGD
var localStore
var project_name = 'my editor'
var db = {
    log: void 0,
    style: void 0,
    object: void 0
}
var ready = new Promise(function (_r) {
    new Promise(function (r) {
        new NimoDB().forceOpen(project_name, 'image logs').then(function (e) {
            db.log = e
            r()
        });
    }).then(function (e) {
        new NimoDB().forceOpen(project_name, 'image objects').then(function (e) {
            db.object = e
            _r()
            //     new NimoDB().openCreatedDatabase(project_name).then(function () {
            //         arguments[0].createTable('image objects').then(function () {
            //             _r()
            //         });
            //         setTimeout(function () {
            //             var img = new Image();
            //             img.src = "./image/1.png"
            //             img.onload = function () {
            //                 imageToCanvas(img)
            //             }
            //         }, 0)
            //     });
        });
    });
});

var dd = new NimoDB().forceOpen("a", "bsx").then(function (e) {
    // e.setItem("name",20)

    e.getItem('name').then(function (e) {

        console.log(e);
    });
})