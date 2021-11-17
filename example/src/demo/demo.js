import imagePrevew from '@imagePreview/index.js'
// import '@imagePreview/image-preview.css'
import VConsole from 'vconsole';

// const vConsole = new VConsole();

const showBtn = document.querySelector('#showBtn')

showBtn.onclick = function() {
  imagePrevew.open({
    list: [
      'https://wx-test.51yxm.com/html5/root/MiniPragram/udream/images/test.jpg',
      'https://img01.yzcdn.cn/vant/apple-2.jpg',
      'http://img1.baidu.com/it/u=1027312569,4018762616&fm=26&fmt=auto&gp=0.jpg',
      // 'http://img0.baidu.com/it/u=3796573490,363191689&fm=26&fmt=auto',
      // 'http://img0.baidu.com/it/u=1910698665,1420124624&fm=26&fmt=auto',
      // 'http://i.loli.net/2021/10/09/OnZusbJDpQNgBHo.jpg'
    ],
    index: 0
  })
}



// import VConsole from 'vconsole';

// const vConsole = new VConsole();