import Swiper from './swiper'
import ScaleImage from './scaleImage';

const imagePreveiwId = 'imagePreveiw'

function createSwiper(options) {
    const html = createHtml(options);
    document.body.appendChild(html);

    const slider = new Swiper(imagePreveiwId, options);
    new ScaleImage(slider)
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