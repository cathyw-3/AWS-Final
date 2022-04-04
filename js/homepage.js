var len = 3;

function limits(data){
	var countLim = Math.ceil(data.length/len);
	document.getElementById("inputs").innerHTML='';
	for(var i=1;i<=countLim;i++){
 		document.getElementById("inputs").innerHTML+='<input type="button" value="'+i+'" onclick="limitinput(this)"/>';
	}
}

var choose = 0;
function limitinput(data, ids){
	choose = ids.value;
 	tablestr(data, choose);
 	limits(data);
  	ids.style.backgroundColor='red';
 	liminputcolor(choose);
}

function tablestr(data, num){
	var num1 = (num-1)*len;
	var num2 = num*len;
	document.getElementById("table").innerHTML='';
	for(var i=num1;i<num2;i++){
		var str = '';
		str+='<td>'+data[i].date.N+'</td>';
		str+='<td>'+data[i].message.S+'</td>';
		document.getElementById("table").innerHTML+='<tr>'+str+'</tr>';
 	}
}

function liminputcolor(choose){
 document.getElementById("inputs").childNodes[choose-1].style.backgroundColor="red";
}
