
var project_name = 'my editor'
var app_id = 'canva editor'
var db = {
    log: void 0,
    style: void 0,
    object: void 0,
    project: void 0
}

var ready = new Promise(function (_r) {
    new NimoDB().forceOpen(project_name, 'image logs').then(function (e) {
        db.log = e
        new NimoDB().forceOpen(project_name, 'image objects').then(function (e) {
            db.object = e
            new NimoDB().forceOpen(project_name, 'image style').then(function (e) {
                db.style = e
                new NimoDB().open(app_id, project_name).then(function (e) {
                    if (e) {
                        db.project = e
                        _r()
                    } else {
                        new NimoDB().create(app_id, project_name).then(function (e) {
                            db.project = e
                            _r()
                            setTimeout(function () {
                                var img = new Image();
                                img.src = "./image/1.png"
                                img.onload = function () {
                                    imageToCanvas(img)
                                }
                            }, 0)
                        })
                    }
                })
            })
        });
    });
});
