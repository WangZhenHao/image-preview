(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ImagePreview = factory());
}(this, (function () { 'use strict';

  // import scaleImage from "./scaleImage";
  function getNum(str) {
    var re = /\d+/g;
    var arr = str.match(re);
    return arr;
  }

  function Touches(id, config) {
    /**
     * 初始化配置
     * @type {Object}
     */
    this.set = {
      speed: config.speed || 200,
      //动画执行的时间;
      slider_dis: config.slider_dis || 50,
      //滑动灵敏度;
      images: config.list || []
    };
    this.index = config.index || 0;
    this._swiperDisable = false;
    this.containerId = id;
    this.swiperLis = []; //DOM初始化

    this.init();
  }

  var verticalClass = 'swiper-wrap-preview__image--vertical';
  var hideClass = 'swiper-wrap-preview__hide';
  Touches.prototype = {
    init: function init() {
      if (this.set.images.length === 1) {
        this.index = 0;
        this._swiperDisable = true;
      } // 总div容器元素


      this.container = document.getElementById(this.containerId); // 图片容器元素

      this.createSwiperHTML(); // 计算容器高度

      this.computeWidth(); // 事件委托

      this.touchEvent();
      this.sliderIndex(this.index);
    },
    createSwiperHTML: function createSwiperHTML() {
      var images = this.set.images;
      var div = document.createElement('div');
      div.className = 'swiper-wrap';
      var str = '';

      for (var i = 0; i < images.length; i++) {
        str += "\n        <div class=\"swiper-wrap-item\">\n            <div class=\"swiper-wrap-preview__image ".concat(hideClass, "\">\n                <img class=\"swiper-wrap__image\" src=\"").concat(images[i], "\" />\n                <div class=\"loading swiper-wrap__image--loading\"></div>\n            </div>\n        </div>\n      ");
      }

      div.innerHTML = str;
      this.container.appendChild(div);
      this.imageLoad();
    },
    imageLoad: function imageLoad() {
      var imageList = this.container.getElementsByClassName('swiper-wrap__image'); // console.log(imageList instanceof Array)

      for (var i = 0; i < imageList.length; i++) {
        imageList[i].onload = function (event) {
          var _event$target = event.target,
              naturalWidth = _event$target.naturalWidth,
              naturalHeight = _event$target.naturalHeight;
          var parentNode = event.target.parentNode;
          var vertical = naturalHeight / naturalWidth > window.innerHeight / window.innerWidth;

          if (vertical) {
            parentNode.classList.add(verticalClass);
          }

          parentNode.classList.remove(hideClass);
          parentNode.removeChild(event.target.nextElementSibling);
        };
      } // imageList.forEach(item => {
      //   item.onLoad = function(event) {
      //     console.log(event)
      //   }
      // })

    },

    /**
     * 计算容器的宽度
     *
     */
    computeWidth: function computeWidth() {
      var h = this.container.offsetHeight;
      this.w = this.container.offsetWidth;
      this.swiperWrap = this.container.getElementsByClassName('swiper-wrap')[0];
      this.swiperLis = this.swiperWrap.getElementsByClassName('swiper-wrap-item');
      this.loopCount = this.swiperLis.length;
      this.swiperWrap.style.width = this.w * this.loopCount + 'px'; // 配置每张图片宽度

      for (var i = 0; i < this.loopCount; i++) {
        this.swiperLis[i].style.width = this.w + 'px';
      }
    },

    /**
     *容器运动函数
     * @param left
     * @param index
     */
    translated: function translated(left) {
      this.swiperWrap.style.transform = 'translate3d(' + left + 'px,0,0)';
    },

    /**
     *触摸事件
     */
    touchEvent: function touchEvent() {
      var _this = this,
          w = 0;

      this.end = {
        x: 0
      };
      /**
       * 触摸开始
       *
       */

      this.Tstart = function (e) {
        if (_this.swiperDisable) return;
        var e = e || event;
        var touch = e.targetTouches[0];
        _this.start = {
          x: touch.pageX
        };
        w = getNum(_this.swiperWrap.style.transform)[1];
      };
      /**
       * 触摸移动
       *
       */


      this.Tmove = function (e) {
        if (_this.swiperDisable) return;
        var e = e || event,
            touch = e.targetTouches[0];
        e.preventDefault(); //   _this.clearAutoPlay();

        _this.end = {
          x: (touch.pageX - _this.start.x) * 0.7
        };
        _this.swiperWrap.style.transitionDuration = 0 + 'ms';

        _this.translated(-w + _this.end.x, _this.index);
      };
      /**
       * 触摸结束
       */


      this.Tend = function () {
        if (_this.swiperDisable) return;

        if (_this.end.x < -_this.set.slider_dis) {
          _this.index++;
        } else if (_this.end.x > _this.set.slider_dis) {
          _this.index--;
        }

        _this.end.x = 0;

        _this.finished(); //   _this.autoPlay();

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
    destrory: function destrory() {
      this.swiperWrap.removeEventListener('touchstart', this.Tstart);
      this.swiperWrap.removeEventListener('touchmove', this.Tmove);
      this.swiperWrap.removeEventListener('touchend', this.Tend);
      var imagePreveiw = document.querySelector('#imagePreveiw');
      imagePreveiw.parentNode.removeChild(imagePreveiw);
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
    finished: function finished() {
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
    sliderIndex: function sliderIndex(index) {
      this.translated(-this.w * index);
      this.index = index;
    },
    disable: function disable() {
      this.swiperDisable = true;
    },
    enable: function enable() {
      if (this._swiperDisable) {
        this.swiperDisable = true;
      } else {
        this.swiperDisable = false;
      }
    }
  };

  function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  function getDistance(start, stop) {
    return Math.hypot(stop.x - start.x, stop.y - start.y);
  }

  var MAXSCALENUM = 5;

  function scaleImage(swiper) {
    this.swiper = swiper;
    this.store = {
      scale: 1
    };
    this.move = {
      moving: false,
      startX: '',
      startY: '',
      startMoveX: 0,
      startMoveY: 0,
      moveX: 0,
      moveY: 0
    };
    this.documentEvent();
  }

  scaleImage.prototype = {
    documentEvent: function documentEvent() {
      var _this = this;

      // const self = this;
      this._dblclick = 0;

      this.documnetTouchStart = function (event) {
        // console.log(event.touches)
        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1]; // event.preventDefault();

        _this.store.pageX = events.pageX;
        _this.store.pageY = events.pageY;
        _this.move.moveable = true;
        _this.move.moveing = touches.length === 1;
        _this.move.startMoveX = _this.move.moveX;
        _this.move.startMoveY = _this.move.moveY;
        _this.move.startX = events.clientX;
        _this.move.startY = events.clientY;

        if (events2) {
          _this.store.pageX2 = events2.pageX;
          _this.store.pageY2 = events2.pageY;

          _this.swiper.disable();
        }

        _this.store.originScale = _this.store.scale || 1;

        _this.imgageSacaleAnimate(false);

        _this.imageScale();
      };

      this.documnetTouchMove = function (event) {
        if (!_this.move.moveable) {
          return;
        }

        var touches = event.touches;
        var events = touches[0];
        var events2 = touches[1]; // console.log(touches, events2)
        // return

        if (events2) {
          _this.swiper.disable();

          if (!_this.store.pageX2) {
            _this.store.pageX2 = events2.pageX;
          }

          if (!_this.store.pageY2) {
            _this.store.pageY2 = events2.pageY;
          }

          var zoom = getDistance({
            x: events.pageX,
            y: events.pageY
          }, {
            x: events2.pageX,
            y: events2.pageY
          }) / getDistance({
            x: _this.store.pageX,
            y: _this.store.pageY
          }, {
            x: _this.store.pageX2,
            y: _this.store.pageY2
          });
          var newScale = _this.store.originScale * zoom;

          if (newScale > MAXSCALENUM) {
            newScale = MAXSCALENUM;
          } // if(newScale < 1) {
          //     newScale = 1;
          // }


          _this.store.scale = newScale;

          _this.imageScale();
        }

        if (_this.move.moveing) {
          var deltaX = events.clientX - _this.move.startX;
          var deltaY = events.clientY - _this.move.startY;
          var moveX = deltaX + _this.move.startMoveX;
          var moveY = deltaY + _this.move.startMoveY;
          _this.distanceX = _this.maxMoveX();
          _this.distanceY = _this.maxMoveY(); // console.log(this.store.scale, moveX, distance, '----------------->', range(moveX, -distance, distance))
          // console.log(distanceY)

          _this.move.moveX = range(moveX, -_this.distanceX, _this.distanceX);
          _this.move.moveY = range(moveY, -_this.distanceY, _this.distanceY);

          _this.imgageSacaleAnimate(false);

          _this.imageScale(); // event.preventDefault();

        }

        event.preventDefault();
      };

      this.documnetTouchEnd = function (event) {
        console.log('触摸结束');

        if (_this.store.scale < 1) {
          _this.store.scale = 1;
        }

        if (_this.store.scale === 1) {
          _this.swiper.enable();
        } else {
          _this.swiper.disable();
        }

        if (!event.touches.length) {
          // event.preventDefault();
          _this.distanceX = _this.maxMoveX();
          _this.distanceY = _this.maxMoveY();
          _this.move.moveX = range(_this.move.moveX, -_this.distanceX, _this.distanceX);
          _this.move.moveY = range(_this.move.moveY, -_this.distanceY, _this.distanceY);

          _this.imgageSacaleAnimate(true);

          _this.imageScale();
        }

        _this.move.moveing = false;
        _this.move.moveable = false; // this.move.moveX = range(this.move.moveX, -this.distanceX, this.distanceX);
        // this.move.moveY = range(this.move.moveX, -this.distanceY, this.distanceY);
        // this.imgageSacaleAnimate(true)
        // this.imageScale();
      };

      this.documentDblClick = function (event) {
        _this._dblclick++;
        setTimeout(function () {
          _this._dblclick = 0;
        }, 500);

        if (_this._dblclick > 1) {
          _this.store.scale = _this.store.scale === MAXSCALENUM ? 1 : MAXSCALENUM;
          _this.move.moveX = 0;
          _this.move.moveY = 0;

          _this.imgageSacaleAnimate(true);

          _this.imageScale();

          if (_this.store.scale === 1) {
            _this.swiper.enable();
          } else {
            _this.swiper.disable();
          }
        }

        setTimeout(function () {
          if (_this._dblclick === 1) {
            _this.open && _this.close();
          }
        }, 300);
      };

      document.addEventListener('touchstart', this.documnetTouchStart, {
        passive: false
      });
      document.addEventListener('touchmove', this.documnetTouchMove, {
        passive: false
      });
      document.addEventListener('touchend', this.documnetTouchEnd, {
        passive: false
      });
      this.swiper.container.addEventListener('click', this.documentDblClick);
    },
    close: function close() {
      this.open = false;
      document.removeEventListener('touchstart', this.documnetTouchStart);
      document.removeEventListener('touchmove', this.documnetTouchMove);
      document.removeEventListener('touchend', this.touchend);
      this.swiper.container.removeEventListener('click', this.documentDblClick);
      this.swiper.destrory();
    },
    imageScale: function imageScale() {
      var _this$swiper = this.swiper,
          index = _this$swiper.index,
          swiperLis = _this$swiper.swiperLis;
      var scale = this.store.scale; // if (scale !== 1) { 

      var offsetX = this.move.moveX / scale;
      var offsetY = this.move.moveY / scale;
      var image = swiperLis[index].querySelector('.swiper-wrap-preview__image');
      image.style.transform = "scale(".concat(scale, ", ").concat(scale, ") translate(").concat(offsetX, "px, ").concat(offsetY, "px)"); // }
      // alert(window.innerWidth)
    },
    imgageSacaleAnimate: function imgageSacaleAnimate(type) {
      var _this$swiper2 = this.swiper,
          index = _this$swiper2.index,
          swiperLis = _this$swiper2.swiperLis;
      var image = swiperLis[index].querySelector('.swiper-wrap-preview__image');

      if (type) {
        image.style['transitionDuration'] = '.3s';
      } else {
        image.style['transitionDuration'] = '0s'; // console.log(image.style['transitionDuration'])
      }
    },
    maxMoveX: function maxMoveX() {
      var maxMoveX = 0;
      var _this$swiper3 = this.swiper,
          index = _this$swiper3.index,
          swiperLis = _this$swiper3.swiperLis;
      var image = swiperLis[index].querySelector('.swiper-wrap-preview__image');
      var width = image.offsetWidth;

      if (image.offsetHeight === window.innerHeight) {
        maxMoveX = 0;
      } else if (width * this.store.scale > window.innerWidth) {
        maxMoveX = (width * this.store.scale - window.innerWidth) / 2;
        maxMoveX = Math.max(0, maxMoveX);
      }

      console.log(maxMoveX);
      return maxMoveX;
    },
    maxMoveY: function maxMoveY() {
      var maxMoveY = 0;
      var _this$swiper4 = this.swiper,
          index = _this$swiper4.index,
          swiperLis = _this$swiper4.swiperLis;
      var image = swiperLis[index].querySelector('.swiper-wrap-preview__image');
      var height = image.offsetHeight; // console.log(height * this.store.scale > window.innerHeight)

      if (height * this.store.scale > window.innerHeight) {
        maxMoveY = (height * this.store.scale - window.innerHeight) / 2;
        maxMoveY = Math.max(0, maxMoveY);
      }

      return maxMoveY;
    }
  };

  var imagePreveiwId = 'imagePreveiw';

  function createSwiper(options) {
    var html = createHtml();
    document.body.appendChild(html);
    var sliderInstence = new Touches(imagePreveiwId, options);
    var scaleImageInstence = new scaleImage(sliderInstence);
    return scaleImageInstence;
  }

  function createHtml(options) {
    var wrap = document.createElement('div');
    wrap.className = 'image-preview';
    wrap.id = imagePreveiwId; // let str = ``
    // wrap.innerHTML = ''

    return wrap;
  }

  // import '../css/swiper.css'

  function imagePreview() {}

  imagePreview.instance = {};

  imagePreview.open = function (options) {
    options.index = options.index ? options.index : 0;
    options.list = options.list ? options.list : [];
    imagePreview.instance = createSwiper(options);
    setTimeout(function () {
      imagePreview.instance.open = true;
    }, 500);
  };

  imagePreview.close = function (options) {
    imagePreview.instance.close();
  };

  // import './css/index.css'

  return imagePreview;

})));
