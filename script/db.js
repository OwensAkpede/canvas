var project_name = 'my editor'
var app_id = 'canva editor'
var db = {
    log: void 0,
    style: void 0,
    object_thumb: void 0,
    object_thumb_medium: void 0,
    object: void 0,
    detail: void 0,
    projectList: void 0,
    db: new NimoDB()
}

var ready = new Promise(function (_r) {
    var n = Date.now()
    db.db.forceOpen(project_name, 'image logs').then(function (e) {
        db.log = e
        if (db.log.__new) void canvas_defaults(ready);
        return db.db.forceOpen(project_name, 'image object thumbs')
    }).then(function (e) {
        //thumb
        db.object_thumb = e
        return db.db.forceOpen(project_name, 'image object medium thumbs')
    }).then(function (e) {
        //medium thumb
        db.object = e
        return db.db.forceOpen(project_name, 'image objects')
    }).then(function (e) {
        // object
        db.object_thumb_medium = e
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
            void db.detail.setItem('date', Date.now());
            void db.projectList.setItem(project_name, Date.now());
        }
        _r()
    })
});

function size(w, h) {
    if ("number" !== typeof h) {
        h = w
    }
    return (w * 4) * h
}

