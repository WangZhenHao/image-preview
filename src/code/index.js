// import '../css/swiper.css'
// import '../css/index.css'

import createSwiper from './createSwiper.js';

function imagePreview() {}

imagePreview.instance = {}

imagePreview.open = function(options) {
    options.index = options.index ? options.index : 0
    options.list = options.list ? options.list : []
    
    imagePreview.instance = createSwiper(options);
    setTimeout(() => {
        imagePreview.instance.open = true;
    }, 500)
};

imagePreview.close = function(options) {
    imagePreview.instance.close();
}

export default imagePreview;
