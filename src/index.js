const imageLoad = (images, cb) => {
  if (!Array.isArray(images) && images.tagName !== 'IMG') {
    images = Array.from(images.getElementsByTag('img'));
  } else if (images.tagName === 'IMG') {
    images = [images];
  }

  let waitingForLoad = 0;

  const handleProgress = () => {    
    if (waitingForLoad === 0) {
      cb();
    }
  }

  const onImageComplete = () => {
    waitingForLoad--;
    handleProgress();
  }

  images.forEach((image) => {
    if (image.complete) {
      return;
    }

    waitingForLoad++;

    image.addEventListener('load', onImageComplete)
    image.addEventListener('error', onImageComplete)
  });

  handleProgress();
};

if (typeof jQuery !== 'undefined') {
  jQuery.fn.imageLoad = function (cb) {
    return imageLoad(jQuery(this).find('img').toArray(), cb);
  }
}
