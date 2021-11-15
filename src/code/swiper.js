// import scaleImage from "./scaleImage";


function getNum(str) {
  var re = /\d+/g;
  var arr = str.match(re);
  return arr
}
function Touches(id, config) {
  /**
   * 初始化配置
   * @type {Object}
   */
  this.set = {
    speed: config.speed || 200, //动画执行的时间;
    slider_dis: config.slider_dis || 50, //滑动灵敏度;
    images: config.list || [],
  };

  this.index = config.index || 0
  this._swiperDisable = false;
  this.containerId = id;
  this.swiperLis = []
  //DOM初始化
  this.init();
  
}
Touches.prototype = {
  init: function () {

    if(this.set.images.length === 1) {
      this.index = 0;
      this._swiperDisable = true;
    }

    // 总div容器元素
    this.container = document.getElementById(this.containerId);
    // 图片容器元素
    this.createSwiperHTML();
    // 计算容器高度
    this.computeWidth();
    // 事件委托
    this.touchEvent();

    this.sliderIndex(this.index)

    
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
  computeWidth: function () {
    const h = this.container.offsetHeight;  
    this.w = this.container.offsetWidth;    
    this.swiperWrap = this.container.getElementsByClassName('swiper-wrap')[0];
    this.swiperLis = this.swiperWrap.getElementsByClassName('swiper-wrap-item');
    this.loopCount = this.swiperLis.length;

    this.swiperWrap.style.width = this.w * this.loopCount + 'px';

    // 配置每张图片宽度
    for (var i = 0; i < this.loopCount; i++) {
      this.swiperLis[i].style.width = this.w + 'px';
    }
  },
  /**
   *容器运动函数
   * @param left
   * @param index
   */
  translated: function (left) {
    this.swiperWrap.style.transform = 'translate3d(' + left + 'px,0,0)';
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
      if(_this.swiperDisable) return

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
      if(_this.swiperDisable) return

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
      if(_this.swiperDisable) return

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
    if (this.index < 0) {
      this.index = 0;
    } else if (this.index > this.loopCount - 1) {
      this.index = this.loopCount - 1;
    }
    this.translated(-this.index * this.w, this.index);
  },

  /**
   * 初始化幻灯片位置从0开始
   * @param  {number} index 幻灯片位置
   *
   */
  sliderIndex: function (index) {
    this.translated(-this.w * index);
    this.index = index;
  },
  disable() {
    this.swiperDisable = true;
  },
  enable() {
    if(this._swiperDisable) {
      this.swiperDisable = true;
    } else {
      this.swiperDisable = false;
    }
  }
};

export default Touches;
