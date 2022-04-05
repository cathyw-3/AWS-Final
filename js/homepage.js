var len = 3;
var strs = [];

function get_data(data) {
	strs = data;
}

function limits(){
	var countLim = Math.ceil(strs.length/len);
	document.getElementById("inputs").innerHTML='';
	for(var i=1;i<=countLim;i++){
 		document.getElementById("inputs").innerHTML+='<input type="button" value="'+i+'" onclick="limitinput(this)"/>';
	}
}

var choose = 0;
function limitinput(ids){
	choose = ids.value;
 	tablestr(choose);
 	limits();
  	ids.style.backgroundColor='red';
 	liminputcolor(choose);
}

function tablestr(num){
	var num1 = (num-1)*len;
	var num2 = num*len;
	document.getElementById("table").innerHTML='';
	for(var i=num1;i<num2;i++){
		var str = '';
		str+='<td>'+strs[i].date.N+'</td>';
		str+='<td>'+strs[i].message.S+'</td>';
		document.getElementById("table").innerHTML+='<tr>'+str+'</tr>';
 	}
}

function liminputcolor(choose){
 document.getElementById("inputs").childNodes[choose-1].style.backgroundColor="red";
}
