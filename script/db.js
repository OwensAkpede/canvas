
        var store
        var storeIMGD
        var localStore
        var project_name = 'my editor'

        var ready = new Promise(function (_r) {
            new Promise(function (r) {
                new NimoDB().open(project_name, 'image logs').then(function (e) {
                    if (e) {
                        r(e)
                    } else {
                        new NimoDB().create(project_name, 'image logs').then(r);
                    }
                });
            }).then(function (e) {
                store = e
                new NimoDB().open(project_name, 'image objects').then(function (e) {
                    if (e) {
                        storeIMGD = e
                        _r(e)
                    } else {
                        new NimoDB().openCreatedDatabase(project_name).then(function () {
                            arguments[0].createTable('image objects').then(function () {
                                _r()
                            });
                            setTimeout(function () {
                                var img = new Image();
                                img.src = "./image/1.png"
                                img.onload = function () {
                                    imageToCanvas(img)
                                }
                            }, 0)
                        });
                    }
                });
            });
        });
    
        var dd=new NimoDB().forceOpen("a","bsx").then(function(e){
            // e.setItem("name",20)

e.getItem('name').then(function(e){

    console.log(e);
});
        })