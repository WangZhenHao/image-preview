import Touches from './swiper'

function createSwiper(options) {
    const html = createHtml(options);
    document.body.appendChild(html);

    const slider = new Touches('imagePreveiw', {
        images: options.list
    });
}

function createHtml(options) {
    const wrap = document.createElement('div');
    wrap.className = 'image-preview'
    wrap.id = 'imagePreview'

    // let str = ``

    // wrap.innerHTML = ''
    
    return wrap;
}


export default createSwiper;