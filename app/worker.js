self.addEventListener('message', (e) => {
  let { w, h } = e.data;
  let imageURL = `http://placehold.it/${w}x${h}`;
	ajaxImage(imageURL)
	  .then(function(dataURL){
      self.postMessage(dataURL);
      close();
    });
}, false);

function ajaxImage(url){
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        // Note: .response instead of .responseText
        var blob = new Blob([this.response], {type: 'image/png'});
        resolve(blob);
      }
    };
    
    xhr.send();
  });
}

/**
 * Convert an imageURL to a base64 dataURL via canvas
 * This implementation currently doesn't work because webworkers
 * don't support "Document"
 *
 * @param   {String}  url
 * @param   {Object}  options
 * @param   {String}  options.outputFormat [outputFormat='image/png']
 * @param   {Float}   options.quality [quality=1.0]
 * @return  {Promise}
 */
function imgURLToDataURL(url, options = {}) {
  return new Promise((resolve, reject) => {
    img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      dataURL = canvas.toDataURL(options.outputFormat, options.quality);
      resolve(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}