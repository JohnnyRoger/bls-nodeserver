const express = require("express");
const crypto = require("crypto");
const router = express.Router();
//* Login API
router.post("/", function (req, res, next) {
  const { performance } = require("perf_hooks");
  const mysql = require("mysql2");
  const config = {
    host: "207.148.76.241",
    user: "root",
    password: "gwapo",
    database: "blssystem",
  };
  const connection = mysql.createConnection(config);

  //* Crypto Encryption
  const password = req.body.setpassword;
  const hash = crypto.createHash("sha256", password).update(req.body.setpassword).digest("hex");
  connection.connect((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database is up and running.");
    }
  });
  connection.query(
    "SELECT * FROM useraccount WHERE username = '" + req.body.setusername + "' AND mpassword = '" + req.body.setpassword + "'",
    function (err, rows, field) {
      if (!err) {
        if (rows.length > 0) {
          var startTime = performance.now();
          const privilege = rows[0]['privilege'];
          if (privilege == "ADMIN") {
            res.status(200).send();
            res.end;
          } else {
            res.status(201).send();
            res.end;
          }
          var endTime = performance.now();
          console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
          console.log("Authentication Success!");

        } else {
          res.status(202).send();
          res.end;
          console.log("Authentication Failed!");
        }
      } else {
        res.status(203).send();
        res.end;
        console.log("Invalid MySQL Query!");
      }
    }
  );
  connection.end();
});
module.exports = router;
