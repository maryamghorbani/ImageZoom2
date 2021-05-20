(function (window) {

    let defineLibrary = () => ({
        init: function (imageId) {
            console.log(imageId);
        }
    })


    if (typeof(vanillaZoom) == 'undefined') {
        window.vanillaZoom = defineLibrary();
    } else {
        console.log('library already defined.')
    }
})(window)