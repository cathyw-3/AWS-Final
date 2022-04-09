var len = 3;
var strs = [];
var user_id = 'admin';

function get_data(id, data) {
	strs = data;
	user_id = id;
}

function limits(){
	var countLim = Math.ceil(strs.length/len);
	document.getElementById("inputs").innerHTML='';
	for(var i=1;i<=countLim;i++){
 		document.getElementById("inputs").innerHTML+='<input type="button" value="'+i+'" onclick="limitinput(this)"/>';
	}
}

function limitshistory(){
	var countLim = Math.ceil(strs.length/len);
	document.getElementById("inputs").innerHTML='';
	for(var i=1;i<=countLim;i++){
 		document.getElementById("inputs").innerHTML+='<input type="button" value="'+i+'" onclick="limithistoryinput(this)"/>';
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

function limithistoryinput(ids){
	choose = ids.value;
 	tablehistory(choose);
 	limitshistory();
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
		if (i < strs.length) {
			var str = '';
			var flat_id = strs[i].flatid;
			str+='<tr><td>'+'flat id: '+'</td>';
			str+='<td>'+strs[i].flatid+' </td>';
			str+='<td> flat type: </td>';
			str+='<td>'+strs[i].flattype+'</td></tr>';

			str+='<tr><td> Location: </td>';
			str+='<td>'+strs[i].location_+'</td></tr>';

			str+='<tr><td>'+'flat level: '+'</td>';
			str+='<td>'+strs[i].level_+' </td>';
			str+='<td> floor size: </td>';
			str+='<td>'+strs[i].floor_size+'</td></tr>';

			str+='<tr><td>'+'Furnished or not: '+'</td>';
			str+='<td>'+strs[i].furnishing+' </td>';
			str+='<td> Price: </td>';
			str+='<td>'+strs[i].price+'</td></tr>';
			
			str+='<tr><td>Likes: </td>';
			str+='<td>'+strs[i].clike+'</td>';
			var temp1 = "<input type=\"button\" value=\"love\" onclick='handleLove(\""+user_id+"\",\""+flat_id+"\")'/>";
			str+='<td>'+temp1+'</td></tr>';
			str_arr[i-num1] = str;
		}
 	}
	var table_arr = ["table1", "table2", "table3"];
	for (var j = 0; j < str_arr.length; ++j) {
		document.getElementById(table_arr[j]).innerHTML+='<tr>'+str_arr[j]+'</tr>';
	}
}

function tablehistory(num){
	var str_arr = []
	var num1 = (num-1)*len;
	var num2 = num*len;
	document.getElementById("table1").innerHTML='';
	document.getElementById("table2").innerHTML='';
	document.getElementById("table3").innerHTML='';
	for(var i=num1;i<num2;i++){
		if (i < strs.length) {
			var str = '';
			var flat_id = strs[i].flatid;
			str+='<tr><td>'+'flat id: '+strs[i].flatid+'</td>';
			str+='<td> flat type: '+strs[i].flattype+'</td>';

			str+='<td> Location: '+strs[i].location_+'</td>';

			str+='<td>'+'flat level: '+strs[i].level_+'</td>';
			str+='<td> floor size: '+strs[i].floor_size+'</td></tr>';
			
			str+='<tr><td>'+'Furnished or not: '+strs[i].furnishing+' </td>';
			
			str+='<td> Price: '+strs[i].price+'</td></tr>';
			
			str+='<td>Likes: '+strs[i].clike+'</td></tr>';
			
			str_arr[i-num1] = str;
		}
 	}
	var table_arr = ["table1", "table2", "table3"];
	for (var j = 0; j < str_arr.length; ++j) {
		document.getElementById(table_arr[j]).innerHTML+='<tr>'+str_arr[j]+'</tr>';
	}
}

function liminputcolor(choose){
 document.getElementById("inputs").childNodes[choose-1].style.backgroundColor="red";
}


