import createSwiper from './createSwiper.js';

function imagePreview() {}

imagePreview.open = function(options) {
    options.index = options.index ? options.index : 0
    options.list = options.list ? options.list : []
    
    createSwiper(options);
};

imagePreview.close = function(options) {
    
}

export default imagePreview;
