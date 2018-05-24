let utils = new Utils('errorMessage');
var wasmworker1 = new Worker ('worker.js');
var wasmworker2 = new Worker ('worker.js');
var wasmworker3 = new Worker ('worker.js');
let perfwasm0,perfwasm1;

utils.loadImageToCanvas('lena.jpg', 'imageCanvasInput');
utils.loadImageToCanvas('lenaFace1.png', 'templateCanvasInput1');
utils.loadImageToCanvas('lenaFace2.png', 'templateCanvasInput2');
utils.loadImageToCanvas('lenaFace3.png', 'templateCanvasInput3');
utils.loadImageToCanvas('lenaFace4.png', 'templateCanvasInput4');
utils.loadImageToCanvas('lenaFace5.png', 'templateCanvasInput5');
utils.loadImageToCanvas('lenaFace6.png', 'templateCanvasInput6');
utils.addFileInputHandler('fileInput', 'canvasInput');

let tryIt = document.getElementById('tryIt');
tryIt.addEventListener('click', () => {
	perfwasm0 = performance.now();               //��ʱt0
	
	let canvas0 = document.getElementById('imageCanvasInput');
	let ctx0 = canvas0.getContext('2d');
	let canvas1 = document.getElementById('templateCanvasInput1');
	let ctx1 = canvas1.getContext('2d');
	let canvas2 = document.getElementById('templateCanvasInput2');
	let ctx2 = canvas2.getContext('2d');
	let canvas3 = document.getElementById('templateCanvasInput3');
	let ctx3 = canvas3.getContext('2d');
	let canvas4 = document.getElementById('templateCanvasInput4');
	let ctx4 = canvas4.getContext('2d');
	let canvas5 = document.getElementById('templateCanvasInput5');
	let ctx5 = canvas5.getContext('2d');
	let canvas6 = document.getElementById('templateCanvasInput6');
	let ctx6 = canvas6.getContext('2d');
	
	let message1 = {data0:ctx0.getImageData(0,0,canvas0.width,canvas0.height),data1:ctx1.getImageData(0,0,canvas1.width,canvas1.height),data2:ctx2.getImageData(0,0,canvas2.width,canvas2.height)};
	let message2 = {data0:ctx0.getImageData(0,0,canvas0.width,canvas0.height),data1:ctx3.getImageData(0,0,canvas3.width,canvas3.height),data2:ctx4.getImageData(0,0,canvas4.width,canvas4.height)};
	let message3 = {data0:ctx0.getImageData(0,0,canvas0.width,canvas0.height),data1:ctx5.getImageData(0,0,canvas5.width,canvas5.height),data2:ctx6.getImageData(0,0,canvas6.width,canvas6.height)};
	wasmworker1.postMessage(message1);
	wasmworker2.postMessage(message2);
	wasmworker3.postMessage(message3);
});


wasmworker1.onmessage = function (e) {                	  
  var seq1 = e.data.n;
  
  if(e.data.cmdd = 1)
  {
	  var c = document.getElementById("imageCanvasInput");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;
	  ctx.rect(e.data.point1,e.data.point2,e.data.point3,e.data.point4);
		ctx.stroke();
	  perfwasm1 = performance.now();
	  console.log("the template num is : "+seq1);
	  console.log(`WASM: ${perfwasm1 - perfwasm0}`);
		document.getElementById("wasm-speed").innerText = String((perfwasm1 - perfwasm0).toFixed(2)) + " MS";
	}
}

wasmworker2.onmessage = function (e) {                	  
  var seq2 = e.data.n + 2;
  
  if(e.data.cmdd = 1)
  {
	  var c = document.getElementById("imageCanvasInput");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;
	  ctx.rect(e.data.point1,e.data.point2,e.data.point3,e.data.point4);
		ctx.stroke();
	  perfwasm1 = performance.now();
	  console.log("the template num is : "+seq2);
	  console.log(`WASM: ${perfwasm1 - perfwasm0}`);
		document.getElementById("wasm-speed").innerText = String((perfwasm1 - perfwasm0).toFixed(2)) + " MS";
	}
}

wasmworker3.onmessage = function (e) {                	  
  var seq3 = e.data.n + 4;
  
  if(e.data.cmdd = 1)
  {
	  var c = document.getElementById("imageCanvasInput");
		var ctx = c.getContext("2d");
		ctx.strokeStyle = "#ff0000";
		ctx.lineWidth = 3;
	  ctx.rect(e.data.point1,e.data.point2,e.data.point3,e.data.point4);
		ctx.stroke();
	  perfwasm1 = performance.now();
	  console.log("the template num is : "+seq3);
	  console.log(`WASM: ${perfwasm1 - perfwasm0}`);
		document.getElementById("wasm-speed").innerText = String((perfwasm1 - perfwasm0).toFixed(2)) + " MS";
	}
}