//var generic_pool = require('generic-pool');

var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'AWS RDS Endpoint',
    user     : 'ksj0495',
	  port     : '3306',
    password : 'RDS instance password',
    database : 'RDS instance name'
  });

// var connection = mysql.createConnection(db_config);


const createResponse = (status, body) => ({
  statusCode: status,
  body: JSON.stringify(body)
});

exports.readUserList = (event, context, callback) => {
  context.callbackWatisForEmptyEventLoop = false;
  
  pool.getConnection(function(error, connection){
	  
	if(error){
	  console.log("pool Error!");
	  console.log(error);
	}else{
		console.log("pool Connection Success");
	}
	
	var sql = 'SELECT uid from users';
	
	connection.query(sql, function (error, results, fields) {
      connection.release();
  
      if (error){
        console.log('connection Error !');
        console.log(error);
        context.succeed("done");
      }
      else {
		    console.log(JSON.stringify(results));
		    context.succeed(createResponse(200, results));
		    //callback(null, "SJ KIM");
	    }
	  });
  });	
  //context.succeed();
};

exports.readUser = (event, context, callback) => {
  context.callbackWatisForEmptyEventLoop = false;
  
  pool.getConnection(function(error, connection){
	  
	if(error){
	  console.log("pool Error!");
	  console.log(error);
	}else{
		console.log("pool Connection Success");
	}
	
	var sql = 'SELECT uid from users where grade = ? && country = ?';
	var value = [event.grade, event.country];
	
	connection.query(sql, value, function (error, results, fields) {
      connection.release();
	  
	  console.log("01", event.grade);
	  console.log("02", event.country);
  
      if (error){
        console.log('connection Error !');
        console.log(error);
        context.succeed("done");
      }
      else {
		    console.log(JSON.stringify(results));
		    context.succeed(createResponse(200, results));
		    //callback(null, "SJ KIM");
	    }
	  });
  });	
};

exports.createUser = (event, context, callback) => {
  context.callbackWatisForEmptyEventLoop = false;
  
  pool.getConnection(function(error, connection){
	  
	if(error){
	  console.log("pool Error!");
	  console.log(error);
	}else{
		console.log("pool Connection Success");
	}
	
	var sql = 'INSERT into users (uid, pwd, country, creDate, grade, lno)' +
			  'values (?, ?, ?, ?, ?, ?)';
	
	var value = [event.body.uid, event.body.pwd, event.body.country, event.body.creDate, event.body.grade, event.body.lno];
	
	connection.query(sql, value, function (error, results, fields) {
      connection.release();
	  
	  console.log("01", JSON.stringify(event));
  
      if (error){
        console.log('connection Error !');
        console.log(error);
        context.succeed("done");
      }
      else {
		    console.log(JSON.stringify(results));
		    context.succeed(createResponse(200, results));
		    //callback(null, "SJ KIM");
	    }
	  });
  });	
};

/*
pool.getConnection(function(error, connection) {
  // Use the connection
  connection.query('SELECT uid from users where grade=1', function (error, results, fields) {
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) throw error;
    else console.log(JSON.stringify(results));
    process.exit();
  });
});
*/