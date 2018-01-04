'use strict';

var imageLoad = function imageLoad(images, cb) {
  if (!Array.isArray(images) && images.tagName !== 'IMG') {
    images = Array.from(images.getElementsByTag('img'));
  } else if (images.tagName === 'IMG') {
    images = [images];
  }

  var waitingForLoad = 0;

  var handleProgress = function handleProgress() {
    if (waitingForLoad === 0) {
      cb();
    }
  };

  var onImageComplete = function onImageComplete() {
    waitingForLoad--;
    handleProgress();
  };

  images.forEach(function (image) {
    if (image.complete) {
      return;
    }

    waitingForLoad++;

    image.addEventListener('load', onImageComplete);
    image.addEventListener('error', onImageComplete);
  });

  handleProgress();
};

if (typeof jQuery !== 'undefined') {
  jQuery.fn.imageLoad = function (cb) {
    return imageLoad(jQuery(this).find('img').toArray(), cb);
  };
}