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
    var n = Date.now()
    db.db.forceOpen(project_name, 'image logs').then(function (e) {
        db.log = e
        if (db.log.__new) void canvas_defaults(ready);
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

var d = null
d = new Uint8ClampedArray(size(2000))
    var dt = Date.now();
    console.log('set');

    d.process(function(data){
        for (var i = 0; i < data.length; i+=4) {
            data[i]=2
            data[i+1]=2
            data[i+2]=2
            data[i+3]=9
        }
        console.log(data.length);
       data=void 0
    }).then(function () {
        console.log(Date.now() - dt,d[0],d[d.length-1]);
    }).catch(function(e){
        console.log(e);
    })