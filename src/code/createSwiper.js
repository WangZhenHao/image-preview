import Touches from './swiper'

function createSwiper(options) {
    const html = createHtml(options);
    document.body.appendChild(html);

    const slider = new Touches('Image-preveiw');
}

function createHtml(options) {
    const wrap = document.createElement('div');
    wrap.className = 'image-preview-wrap'
    wrap.id = 'Image-preveiw'

    // let str = ``
    wrap.innerHTML = str
    
    return wrap;
}


export default createSwiper;