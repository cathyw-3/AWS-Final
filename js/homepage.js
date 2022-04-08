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
		var id = strs[i].date.N;
		str+='<td>'+strs[i].date.N+'</td>';
		str+='<td>'+strs[i].message.S+'</td>';
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

const AWS = require('aws-sdk');
AWS.config.update({
      region: "us-east-1",
      endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
      accessKeyId: "AKIASOPIXUSO34GCI4DP",
      secretAccessKey: "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"
    });
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


// ############################ function for create new flat
function createItem(flatid, flattype, location, level, floor_size, furnishing, price) {
    var params = {
        TableName :"Flat",
        Item:{
            "flatid": flatid,
            "flattype": flattype,
            "location_": location,
            "level_": level,
            "floor_size": floor_size,
            "furnishing": furnishing,
            "price": price,
            'clike':0
            // "love": ['a','b','c'],
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            // document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
						console.log("Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            // document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
						console.log("PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2))
        }
    });
}

function create_button()
{
	createItem('1','HDB','west coat', '5', '100', 'Unfurnished', '2500')
}


// ############################ function for delete flat

function deleteItem(flatid) {
    var params = {
        TableName :"Flat",
        Key:{
            "flatid": 'a'+flatid,
            // "flattype": flattype,
            // "location": location,
            // "level": level,
            // "floor_size": floor_size,
            // "furnishing": furnishing,
            // "price": price,
            // 'clike':0
            // // "love": ['a','b','c'],
        }
    };
    docClient.delete(params, function(err, data) {
      if (err) {
          // document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
          console.log("Unable to delete item: " + "\n" + JSON.stringify(err, undefined, 2));
      } else {
          // document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
          console.log("DeleteItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2))
      }
  });
}

function delete_button()
{
	deleteItem('7')
}

// ############################ function for get all flat sorted by clike
function scanData() {
    var params = {
        TableName: "Flat",
        ProjectionExpression: "flatid, clike, location_, level_, floor_size, furnishing, price",
        "QueryFilter": { "ScanIndexForward": false}
        // FilterExpression: "#yr between :start_yr and :end_yr",
        // ExpressionAttributeNames: {
            // "#yr": "year"
        // },
        // ExpressionAttributeValues: {
            // ":start_yr": 1950,
            // ":end_yr": 1975
        // }
    };

    return await docClient.scan(params).promise();

    //function onScan(err, data) {
        //if (err) {
            // document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
            //alert("Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2));
        //} else {
            //console.log("Scan succeeded: ");
            // sort clike
            //data.Items.sort(function(a, b){
              //return b.clike - a.clike;
            //});
	    //return data.Items;

            //data.Items.forEach(function(flat) {
                // document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + movie.info.rating + "\n";
                //console.log(flat.flatid, flat.clike)
                // console.log(flat)
            //});

            // Continue scanning if we have more movies (per scan 1MB limitation)
            // document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
            // params.ExclusiveStartKey = data.LastEvaluatedKey;
            // docClient.scan(params, onScan);
        //}
    //}
}
function scan_button()
{
	scanData()
}

// ############################ function for query flat given flat id
function queryData(flatid) {

    var params = {
        TableName : "Flat",
        KeyConditionExpression: "flatid = :f",
        // ExpressionAttributeNames:{
        //     "#yr": "year"
        // },
        ExpressionAttributeValues: {
            ":f":flatid,
          }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            // document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
            console.log("Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
          console.log(data.Items)
            data.Items.forEach(function(flat) {
                // document.getElementById('textarea').innerHTML += "\n" + movie.year + ": " + movie.title;
                console.log(flat.flatid, flat.clike)
            });

        }
    });
}
function query_button()
{
	queryData('1')
}
