import Touches from './swiper'
const imagePreveiwId = 'imagePreveiw'

function createSwiper(options) {
    const html = createHtml(options);
    document.body.appendChild(html);

    const slider = new Touches(imagePreveiwId, options);
}

function createHtml(options) {
    const wrap = document.createElement('div');
    wrap.className = 'image-preview'
    wrap.id = imagePreveiwId

    // let str = ``

    // wrap.innerHTML = ''
    
    return wrap;
}


export default createSwiper;