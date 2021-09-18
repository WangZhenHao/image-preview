(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ImagePreview = factory());
}(this, (function () { 'use strict';

    function createSwiper(options) {
      var html = createHtml();
      document.body.appendChild(html);
    }

    function createHtml(options) {
      var wrap = document.createElement('div');
      wrap.className = 'image-preview-wrap';
      var str = "\n        <div>121212</div>\n    ";
      wrap.innerHTML = str;
      return wrap;
    }

    function imagePreview() {}

    imagePreview.open = function (options) {
      options.index = options.index ? options.index : 0;
      options.list = options.list ? options.list : [];
      createSwiper();
    };

    imagePreview.close = function (options) {};

    return imagePreview;

})));
