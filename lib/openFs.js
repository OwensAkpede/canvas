function openFs() {
    return new Promise(function (r, j) {
        openFs.fs.value = ""
        openFs.fs.click()
        openFs.fs.onchange = function () {
            r(openFs.fs.files[0])
        }
    });
}

openFs.fs = document.createElement("input")
openFs.fs.type = "file"
openFs.fs.accept = "image/png, image/jpg, image/webp, image/jpeg"
