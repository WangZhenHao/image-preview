(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.ImagePreview = factory());
}(this, (function () { 'use strict';

    function imagePreview() {}

    imagePreview.prototype = {
      open: function open(options) {
        var index = options.index || 0;
        var list = options.list || [];
      },
      close: function close() {}
    };

    var instance = new imagePreview();

    return instance;

})));
