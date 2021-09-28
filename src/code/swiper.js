/*
     使用方法
     id:轮播容器的id;
     json: 各种配置参数json格式;
     var demo = new Touches('swiper',{
     autoPlay:true,
     interval:4000
     });
 */

function Touches(id, config) {
  /**
   * 初始化配置
   * @type {Object}
   */
  this.set = {
    speed: config.speed || 200, //动画执行的时间;
    slider_dis: config.slider_dis || 50, //滑动灵敏度;
    loop: config.loop || false, //是否开启无限轮播;
    images: config.images || []
  };

  this.ContainerId = id;
  //DOM初始化
  this.Init();
  // 触摸事件
  // this.touchEvent();

}
Touches.prototype = {
  /**
   *
   * @constructor
   */
  Init: function () {
    //总div容器元素
    this.container = document.getElementById(this.ContainerId);
    //图片容器元素
    this.createSwiperHTML()
    // 索引
    this.index = 0;
    // this.resize()
    // this.computeWidth('init');
  },
  createSwiperHTML() {
    const images = this.set.images;
    const div = document.createElement('div')
    div.className = 'swiper-wrap';
    
    let str = '';

    for(let i = 0; i < images.length; i++) {
      str += `
        <div class="swiper-wrap-item">
            <div class="swiper-wrap-preview__image">
                <img class="swiper-wrap__image" src="${images[i]}" />
            </div>
        </div>
      `
    }
    div.innerHTML = str;

    this.container.appendChild(div)
  },

  /**
   * 计算容器的宽度
   *
   */
  computeWidth: function (type) {
    //获取容器的宽度
    this.w = this.container.offsetWidth;
    if (type == 'init') {
      if (this.set.loop) {
        //是否循环轮播
        this.loopIndex = this.count + 2;
        this.createLi();
        this.translated(-this.w * (this.index + 1), this.index);
      } else {
        this.loopIndex = this.count;
        this.translated(-this.w * this.index, this.index);
      }
    } else {
      this.translated(-this.w * this.index, this.index);
    }

    this.swiperWrap.style.width = this.w * this.loopIndex + 'px';

    // 配置每张图片宽度
    for (var i = 0; i < this.loopIndex; i++) {
      this.swiperLi[i].style.width = this.w + 'px';
    }
  },




  /**
   *容器运动函数
   * @param left
   * @param index
   */
  translated: function (left, index) {
    this.swiperWrap.style.transform = 'translate3d(' + left + 'px,0,0)';
    this.showPointer(index);
  },
  /**
   *触摸事件
   */
  touchEvent: function () {
    var _this = this,
      w = 0;
    this.end = { x: 0 };

    /**
     * 触摸开始
     *
     */
    this.Tstart = function (e) {
      var e = e || event;
      var touch = e.targetTouches[0];
      _this.start = { x: touch.pageX };
      w = getNum(_this.swiperWrap.style.transform)[1];
    };

    /**
     * 触摸移动
     *
     */
    this.Tmove = function (e) {
      var e = e || event,
        touch = e.targetTouches[0];
      e.preventDefault();
    //   _this.clearAutoPlay();
      _this.end = { x: (touch.pageX - _this.start.x) * 0.7 };
      _this.swiperWrap.style.transitionDuration = 0 + 'ms';
      _this.translated(-w + _this.end.x, _this.index);
    };

    /**
     * 触摸结束
     */
    this.Tend = function () {
      if (_this.end.x < -_this.set.slider_dis) {
        _this.index++;
      } else if (_this.end.x > _this.set.slider_dis) {
        _this.index--;
      }
      _this.end.x = 0;
      _this.finished();
    //   _this.autoPlay();
    };
    /**
     * 获取图片容器的偏移量
     * @param  {string} str 传入字符串
     * @return {number}     返回图片容器的偏移数值
     */
    function getNum(str) {
      var re = /\d+/g;
      return str.match(re);
    }
    // 执行事件
    this.swiperWrap.addEventListener('touchstart', this.Tstart);
    this.swiperWrap.addEventListener('touchmove', this.Tmove);
    this.swiperWrap.addEventListener('touchend', this.Tend);
  },

  /**
   * 清除自动轮播计时器
   *
   */
//   clearAutoPlay: function () {
//     if (this.timer) {
//       clearInterval(this.timer);
//     }
//   },

  /**
   * 触摸结束执行的函数
   *
   */
  finished: function () {
    this.swiperWrap.style.transitionDuration = this.set.speed + 'ms';
    /**
     * 修改
     * @param  {[type]} this.set.loop [description]
     * @return {[type]}               [description]
     */
    if (this.set.loop) {
      this.loop();
    } else {
      if (this.index < 0) {
        this.index = 0;
      } else if (this.index > this.count - 1) {
        this.index = this.count - 1;
      }
      this.translated(-this.index * this.w, this.index);
    }
  },

  /**
   * 无限循环轮播执行函数
   * @return {[type]} [description]
   */
  loop: function () {
    if (this.index >= this.count) {
      this.translated(-(this.index + 1) * this.w, 0);
      this.index = 0;
      this.animateFinish();
    } else if (this.index < 0) {
      this.translated(0, this.count - 1);
      this.index = this.count - 1;
      this.animateFinish();
    } else {
      this.translated(-(this.index + 1) * this.w, this.index);
    }
  },
  /**
   * 动画执行完毕
   *
   */
  animateFinish: function () {
    setTimeout(
      function () {
        this.swiperWrap.style.transitionDuration = 0 + 'ms';
        this.translated(-this.w * (this.index + 1), this.index);
      }.bind(this),
      this.set.speed
    );
  },

  /*-----------------------------------------(不需要可以删除)*/
  /**
   * 初始化幻灯片位置从0开始
   * @param  {number} index 幻灯片位置
   *
   */
  sliderIndex: function (index) {
    var count = this.set.loop == true ? index + 1 : index;
    this.translated(-this.w * count, index);
    this.index = index;
  },
  /*初始化幻灯片位置从0开始-----------------------------------------(不需要可以删除)*/

  
};

export default Touches;
