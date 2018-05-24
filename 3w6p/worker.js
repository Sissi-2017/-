importScripts('opencv.js');

self.onmessage = function (e) {
	console.log("successfully loading opencv.js");
	match(e.data.data0,e.data.data1,e.data.data2);
}

self.onerror = function (e) {
		console.log("loading error");
}

function match(ImageData0,ImageData1,ImageData2)
{
	let src = cv.matFromImageData(ImageData0);
	let temp1 = cv.matFromImageData(ImageData1);
	let temp2 = cv.matFromImageData(ImageData2);
	
	let dst1 = new cv.Mat();
	let mask1 = new cv.Mat();
	let dst2 = new cv.Mat();
	let mask2 = new cv.Mat();
	
	
	var maxvalue = new Array();
	
	cv.matchTemplate(src, temp1, dst1, cv.TM_CCOEFF, mask1);
	let result1 = cv.minMaxLoc(dst1, mask1);
	maxvalue[1] = result1.maxVal;
	cv.matchTemplate(src, temp2, dst2, cv.TM_CCOEFF, mask2);
	let result2 = cv.minMaxLoc(dst2, mask2);
	maxvalue[2] = result2.maxVal;
	
	if(maxvalue[1] > maxvalue[2])
	{
		var maxData = maxvalue[1];
		var num = 1;
		maxPoint = result1.maxLoc;
	  var col = temp1.cols;
	  var row = temp1.rows;
	}
	else
	{
		var maxData = maxvalue[2];
		var num = 2;
		maxPoint = result2.maxLoc;
	  var col = temp2.cols;
	  var row = temp2.rows;
	}
		
	
	
	//let point = new cv.Point(maxPoint.x + col, maxPoint.y + row);
	//console.log("the object number is "+num+", the point is : ("+point.x+","+point.y+")");
	if(maxData > 43000000)
	{
		let msg = {cmdd:1, mvalue:maxData, n:num, point1 : maxPoint.x, point2:maxPoint.y, point3:col, point4:row};
  	postMessage(msg);
	}
  
	src.delete(); 
	dst1.delete(); dst2.delete();
	mask1.delete();mask2.delete();
}