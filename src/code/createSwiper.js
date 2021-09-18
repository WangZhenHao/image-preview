function createSwiper(options) {
    const html = createHtml(options)
    document.body.appendChild(html)
}

function createHtml(options) {
    const wrap = document.createElement('div')
    wrap.className = 'image-preview-wrap'

    let str = `
        <div>121212</div>
    `
    wrap.innerHTML = str
    
    return wrap;
}


export default createSwiper;