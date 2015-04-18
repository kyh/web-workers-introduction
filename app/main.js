require('./main.css');
var WORKERS = [];
var app = document.getElementById('app');
var addWithTagBtn = document.getElementById('add-with-tag');
var addWithWorkerBtn = document.getElementById('add-with-worker');

addWithTagBtn.addEventListener('click', fetchImages);
addWithWorkerBtn.addEventListener('click', createWorker);

function fetchImages(){
	app.innerHTML = '';
	for (let i = 0; i < 100; i++) {
		_addImage(app, {
			w: _randomNum(10, 100),
			h: _randomNum(10, 150)
		});
	}

  function _addImage(node, imageConfig){
    var { w, h } = imageConfig;
    var img = document.createElement('img');
    img.src = `http://placehold.it/${w}x${h}`;
    node.appendChild(img);
  }
}

function createWorker(){
	app.innerHTML = '';
	for (let i = 0; i < 100; i++) {
		let worker = new Worker('worker.js');
		
    worker.addEventListener('message', (e) => {
			console.log('worker said', e.data);
		}, false);
		
    worker.postMessage({
      w: _randomNum(10, 100),
      h: _randomNum(10, 150)
    });
	}
}

function _randomNum(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (module.hot) {
  module.hot.accept();
}
