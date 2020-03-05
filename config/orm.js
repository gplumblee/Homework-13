var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = '"' + value + '"';
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  all: function(cb) {
    connection.query(`SELECT * FROM burgers`, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(val, cb) {
    connection.query(`INSERT INTO burgers (burger_name) VALUES (?)`, val, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  update: function(colVals, condition, cb) {
    connection.query('UPDATE burgers SET ? WHERE id = ?',[colVals, condition], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
