var project_name = 'my editor'
var app_id = 'canva editor'
var db = {
    __proto__:{
        log: void 0,
        style: void 0,
        object_thumb: void 0,
        object_thumb_medium: void 0,
        object: void 0,
        detail: void 0,
        projectList: void 0,
        db: new NimoDB()
    }
}

var ready = new Promise(function (_r) {
    var n = Date.now()
    db.db.forceOpen(project_name, 'image logs').then(function (e) {
        db.__proto__.log = e
        // if (db.__proto__.log.__new) void canvas_defaults(ready);
        return db.db.forceOpen(project_name, 'image object thumbs')
    }).then(function (e) {
        //thumb
        db.__proto__.object_thumb = e
        return db.db.forceOpen(project_name, 'image object medium thumbs')
    }).then(function (e) {
        //medium thumb
        db.__proto__.object_thumb_medium = e
        return db.db.forceOpen(project_name, 'image objects')
    }).then(function (e) {
        // object
        db.__proto__.object = e
        if (db.log.__new) void canvas_defaults(_r),_r=new Function();
        return db.db.forceOpen(project_name, 'image style')
    }).then(function (e) {
        db.__proto__.style = e
        return db.db.forceOpen(project_name, 'image details')
    }).then(function (e) {
        db.__proto__.detail = e
        return db.db.forceOpen(app_id, 'project lists')
    }).then(function (e) {
        db.__proto__.projectList = e;
        if (db.log.__new) {
            void db.detail.setItem('date', Date.now());
            void db.projectList.setItem(project_name, Date.now());
        }else{
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

