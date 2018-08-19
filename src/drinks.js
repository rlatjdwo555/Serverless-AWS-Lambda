var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'AWS RDS Endpoint',
    user     : 'ksj0495',
	  port     : '3306',
    password : 'RDS instance password',
    database : 'RDS instance name'
  });

const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});


exports.readDrink = (event, context, callback) => {
  context.callbackWatisForEmptyEventLoop = false;
  
  pool.getConnection(function(error, connection){
	  
	if(error){
	  console.log("pool Error!");
	  console.log(error);
	}else{
		console.log("pool Connection Success");
	}
	
	var sql = 'select * from drink where title = ?';
	var value = event.title;
	
	connection.query(sql, value, function (error, results, fields) {
      connection.release();
	  
	  console.log("01", event.title);
  
      if (error){
        console.log('connection Error !');
        console.log(error);
        context.succeed("done");
      }
      else {
		    console.log(JSON.stringify(results));
		    context.succeed(createResponse(200, results));
	    }
	  });
  });	
};