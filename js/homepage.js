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
		if (i < strs.length) {
			var str = '';
			var id = strs[i].flatid;
			str+='<td>'+strs[i].flatid+'</td>';
			str+='<td>'+strs[i].clike+'</td>';
			var temp1 = "<input type=\"button\" value=\"love\" onclick='handleLove(\""+id+"\")'/>";
			alert(temp1);
			str+='<td>'+temp1+'</td>';
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

function handleLove(id) {
	AWS.config.update({
      		region: "us-east-1",
      		endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      		accessKeyId: "AKIASOPIXUSO34GCI4DP",
      		secretAccessKey: "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"
    	});
    	var dynamodb = new AWS.DynamoDB();
    	var docClient = new AWS.DynamoDB.DocumentClient();
	
	var table = "User";

      	var orilove;
      	var params = {
        	TableName : "User",
          	KeyConditionExpression: "#userid = :id",
          	ExpressionAttributeNames:{
              		"#userid": "userid"
          	},
          	ExpressionAttributeValues: {
              		":id":"8"
          	}
      	};

	var data = docClient.query(params).Items;
	alert(data.userid)
}
