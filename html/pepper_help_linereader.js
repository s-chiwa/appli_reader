var lineMapManual = {};

function lineReader(obj) {
	sendCommands = "";
	id = obj.id;
	//alert(id);
	data = id.split(parent.spliterKey);

	action = "";
	operateId = "";
	dataType = "";
	goMthod = "";
	sendValue = "";
	
	switch(data.length){
		case 3:
			action = data[0];
			operateId = data[1];
			dataType = data[2];
			break;
		case 4:
			action = data[0];
			operateId = data[1];
			dataType = data[2];
			goMethod = data[3];
			break;
		default:
			alert("『"+spliterKey+"』でつなぐべきデータの要素が多すぎるか少なすぎます。:::" + id);
			failureData = true;
			break;
	}
	
	//alert(action);
	//alert(operateId);
	//alert(dataType);
	
	operateObj = document.getElementById(operateId);
	
	if(dataType.indexOf("TextElement") == 0){
		sendValue = operateObj.innerText;
		if(action.indexOf("SayLine") != -1){
			splitChar = sendValue.substring(0,1);
			splitCont = sendValue.split(splitChar);
			if(operateId in lineMapManual){
				l = lineMapManual[operateId]; 
				l = l+1;
				
				if(l>splitCont.length-1){
					l=1;
				}
				lineMapManual[operateId] = l;
			}
			else{
				lineMapManual[operateId] = 1;
			}
			sendValue = splitCont[lineMapManual[operateId]];
			
			action = "sendPepperSay";
		}
	}

	//alert(action);
	//alert(operateId);
	//alert(dataType);

	sendCommands = sendCommands + '["' + action  + '","'  + operateId +  '","' + sendValue + '"]';

	//alert(sendCommands);

	parent.sendPepperFromTabletByCommand(sendCommands);	
}
