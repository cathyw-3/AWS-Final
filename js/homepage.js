var len = 3;
var strs = [];
var userid = 'admin';

function get_data(user_id, data) {
	strs = data;
	userid = user_id;
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
	var str_arr = []
	var num1 = (num-1)*len;
	var num2 = num*len;
	document.getElementById("table1").innerHTML='';
	document.getElementById("table2").innerHTML='';
	document.getElementById("table3").innerHTML='';
	for(var i=num1;i<num2;i++){
		var str = '';
		var id = strs[i].flatid;
		str+='<td>'+strs[i].floor_size+'</td>';
		str+='<td>'+strs[i].furnishing+'</td>';
		var temp1 = '<input type="button" value="love" onclick="handleLove('+id+')"/>';
		str+='<td>'+temp1+'</td>';
		str_arr[i-num1] = str;
 	}
	document.getElementById("table1").innerHTML+='<tr>'+str_arr[0]+'</tr>';
	document.getElementById("table2").innerHTML+='<tr>'+str_arr[1]+'</tr>';
	document.getElementById("table3").innerHTML+='<tr>'+str_arr[2]+'</tr>';
}

function liminputcolor(choose){
 document.getElementById("inputs").childNodes[choose-1].style.backgroundColor="red";
}

function handleLove(userid) {
	alert(userid);
}
