let glideMulti1 = new Glide('.multi1', {
    type: 'carousel',
    autoplay: 3500,
    perView: 5,
    breakpoints: {
        640: {
            perView: 2
        },
        768: {
            perView: 3
        },
        991: {
            perView: 4
        }
    },
    focusAt: 'center',
    hoverpause: true,
    keyboard: true,
});

glideMulti1.mount();