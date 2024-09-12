let glideMulti1 = new Glide('.multi1', {
    type: 'carousel',
    autoplay: 3500,
    perView: 4,
    breakpoints: {
        640: {
            perView: 2
        },
        768: {
            perView: 2
        },
        991: {
            perView: 3
        }
    },
    focusAt: 'center',
    hoverpause: true,
    keyboard: true,
});

glideMulti1.mount();