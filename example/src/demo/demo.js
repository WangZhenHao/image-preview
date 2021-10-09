import imagePrevew from '@imagePreview/image-preview.js'
import '@imagePreview/image-preview.css'

console.log(imagePrevew)

imagePrevew.open({
    list: [
      'https://img0.baidu.com/it/u=3919770115,4269125285&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750',
      'https://img1.baidu.com/it/u=1027312569,4018762616&fm=26&fmt=auto&gp=0.jpg',
      'https://img0.baidu.com/it/u=3796573490,363191689&fm=26&fmt=auto',
      'https://img0.baidu.com/it/u=1910698665,140124624&fm=26&fmt=auto'
    ],
    index: 1
  })