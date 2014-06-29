/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

//PASSWORD : SyNr3GPg
var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
    /* TODO: Fill this out with your mysql username */
      user: "root",
    /* and password. */
      password: "SyNr3GPg",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("DELETE FROM " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:3500",
             headers: {'content-type' : 'application/json'},
             body: JSON.stringify({username: "Valjean",
                    text: "I dont know what goes on"
                    })
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              var queryString = "select * from messages";
              var queryArgs = [];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query(queryString, queryArgs,
                function(err, results, fields) {
                  if (err){
                    throw err;
                  }
                  console.log(queryString);
                  // Should have one result:
                  console.log("Results ", results);
                  // expect(results.length).to.equal(1);
                  // expect(results[0].username).to.equal("Valjean");
                  // expect(results[0].text).to.equal("I dont know what goes on");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "INSERT INTO Messages (username, message) VALUES (??, (WHERE ";
    // var queryArgs = ["Javert", "Men like you can never change!"];
    var queryString = "INSERT INTO Messages (username, text) VALUES ('Javert', 'Men like you can never change!');";
      // var queryArgs = '';
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString,
      function(err, results, fields) {
        if(err){
          throw err;
        }

        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:3500",
          function(error, response, body) {
            if(error){
              throw error
            }
            var messageLog = JSON.parse(body);
            expect(messageLog.results[0].username).to.equal("Javert");
            expect(messageLog.results[0].text).to.equal("Men like you can never change!");
            done();
          });
      });
  });
});
