var len = 3;
var strs = [
 {
 "id":123,
 "pwd":456
 },
 {
 "id":456,
 "pwd":123
 },
 {
 "id":4681,
 "pwd":9815
 },
 {
 "id":471,
 "pwd":4981
 },
 {
 "id":1234789,
 "pwd":156
 },
 {
 "id":789,
 "pwd":158
 },
 {
 "id":"vgwh",
 "pwd":"vgsya"
 },
 {
 "id":1,
 "pwd":"tcv"
 },
 {
 "id":256,
 "pwd":"vtc0"
 }
];

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
		str+='<td>'+strs[i].id+'</td>';
		str+='<td>'+strs[i].pwd+'</td>';
		document.getElementById("table").innerHTML+='<tr>'+str+'</tr>';
 	}
}

function liminputcolor(choose){
 document.getElementById("inputs").childNodes[choose-1].style.backgroundColor="red";
}
