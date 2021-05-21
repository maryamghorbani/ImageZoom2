(function (window) {

    let defineLibrary = () => ({
        init: function (imageId) {
            let image = document.querySelector(imageId)
            if (! image) {
                console.error(`Image element doesn't exist`);
                return;
            }

            let zoomContainer, zoomResult, zoomLens;

            image.addEventListener('mouseenter', function (e) {
                let imageBox = this.getBoundingClientRect();

                zoomContainer = document.createElement('div');
                zoomContainer.classList.add('zoom-container');
                zoomContainer.style.width = `${imageBox.width}px`
                zoomContainer.style.height = `${imageBox.height}px`
                zoomContainer.style.position = 'absolute';
                zoomContainer.style.top = `${imageBox.top + window.pageYOffset}px`
                zoomContainer.style.left = `${imageBox.left + window.pageXOffset}px`

                zoomLens = document.createElement('div')
                zoomLens.classList.add('img-zoom-lens')

                zoomResult = document.createElement('div');
                zoomResult.classList.add('img-zoom-result');
                zoomResult.style.position = 'absolute';
                zoomResult.style.top = `${imageBox.bottom + window.pageXOffset}px`


                zoomContainer.insertAdjacentElement('afterbegin', zoomLens)
                zoomContainer.insertAdjacentElement('afterbegin', zoomResult)

                document.querySelector('body').insertAdjacentElement('beforeend', zoomContainer);

                let cx = zoomResult.offsetWidth / zoomLens.offsetWidth;
                let cy = zoomResult.offsetHeight / zoomLens.offsetHeight;

                zoomResult.style.background = `url(${image.src})`
                zoomResult.style.backgroundSize = `${image.width * cx}px ${image.height * cy}px`;

                zoomContainer.addEventListener('mousemove', function (e) {
                    let x = e.clientX - imageBox.left;
                    let y = (e.clientY + window.pageYOffset) - imageBox.top;

                    x = x - (zoomLens.offsetWidth / 2)
                    y = y - (zoomLens.offsetHeight / 2)

                    if (x > image.width - zoomLens.offsetWidth) {x = image.width - zoomLens.offsetWidth}
                    if (x < 0) {x = 0}
                    if (y > image.height - zoomLens.offsetHeight) {y = image.height - zoomLens.offsetHeight}
                    if (y < 0) {y = 0}

                    zoomLens.style.top = `${y}px`;
                    zoomLens.style.left = `${x}px`;

                    zoomResult.style.backgroundPosition = `-${x * cx}px -${y * cy}px`
                })

                zoomContainer.addEventListener('mouseleave', function (e) {
                    this.remove()
                })


            })


        }
    })


    if (typeof(vanillaZoom) == 'undefined') {
        window.vanillaZoom = defineLibrary();
    } else {
        console.log('library already defined.')
    }
})(window)