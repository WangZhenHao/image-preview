import Swiper from './swiper'
import ScaleImage from './scaleImage';

const imagePreveiwId = 'imagePreveiw'

function createSwiper(options) {
    const html = createHtml(options);
    document.body.appendChild(html);

    const sliderInstence = new Swiper(imagePreveiwId, options);
    const scaleImageInstence =  new ScaleImage(sliderInstence)

    return scaleImageInstence;
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