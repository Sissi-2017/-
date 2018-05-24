importScripts('opencv.js');

self.onmessage = function (e) {
	console.log("successfully loading opencv.js");
	match(e.data.data0,e.data.data1,e.data.data2,e.data.data3);
}

self.onerror = function (e) {
		console.log("loading error");
}

function match(ImageData0,ImageData1,ImageData2,ImageData3)
{
	let src = cv.matFromImageData(ImageData0);
	let temp1 = cv.matFromImageData(ImageData1);
	let temp2 = cv.matFromImageData(ImageData2);
	let temp3 = cv.matFromImageData(ImageData3);
	
	let dst1 = new cv.Mat();
	let mask1 = new cv.Mat();
	let dst2 = new cv.Mat();
	let mask2 = new cv.Mat();
	let dst3 = new cv.Mat();
	let mask3 = new cv.Mat();
	
	var maxvalue = new Array();
	
	cv.matchTemplate(src, temp1, dst1, cv.TM_CCOEFF, mask1);
	let result1 = cv.minMaxLoc(dst1, mask1);
	maxvalue[1] = result1.maxVal;
	cv.matchTemplate(src, temp2, dst2, cv.TM_CCOEFF, mask2);
	let result2 = cv.minMaxLoc(dst2, mask2);
	maxvalue[2] = result2.maxVal;
	cv.matchTemplate(src, temp3, dst3, cv.TM_CCOEFF, mask3);
	let result3 = cv.minMaxLoc(dst3, mask3);
	maxvalue[3] = result3.maxVal;
	
	
	var maxData = maxvalue[1];
	for (var i = 1; i < 4; i++) 
	{
		//console.log(i+" :"+maxvalue[i]);
		if (maxvalue[i] >= maxData) 
		{
			maxData = maxvalue[i]; 
			var num = i;
		}
	}
	
	var maxPoint;
	var col,row;
	switch(num)
	{
	case 1:
	  maxPoint = result1.maxLoc;
	  col = temp1.cols;
	  row = temp1.rows;
	  break;
	case 2:
	  maxPoint = result2.maxLoc;
	  col = temp2.cols;
	  row = temp2.rows;
	  break;
	case 3:
	  maxPoint = result3.maxLoc;
	  col = temp3.cols;
	  row = temp3.rows;
	  break;
	}
	
	
	//let point = new cv.Point(maxPoint.x + col, maxPoint.y + row);
	//console.log("the object number is "+num+", the point is : ("+point.x+","+point.y+")");
	if(maxData > 43000000)
	{
		let msg = {cmdd:1, mvalue:maxData, n:num, point1 : maxPoint.x, point2:maxPoint.y, point3:col, point4:row};
  	postMessage(msg);
	}
  
	src.delete(); 
	dst1.delete(); dst2.delete();dst3.delete();
	mask1.delete();mask2.delete();mask3.delete();
}