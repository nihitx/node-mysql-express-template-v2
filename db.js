var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
if(env=="development"){
  var connection = mysql.createConnection({
      host     : '127.0.0.1', // Your host - either local or cloud
      user     : 'root', // your username
      password : 'root', // your password
      database : 'your-db-name' // database name
  });
}else{
  var connection = mysql.createConnection({
        host     : 'us-cdbr-iron-east-05.cleardb.net', // I am using clear db
        user     : 'b0350d64c4deb3',
        password : 'ae902617',
        database : 'heroku_98b4d00635d887c'
    });
}

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
