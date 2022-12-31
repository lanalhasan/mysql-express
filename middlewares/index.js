const connection = require("../dataBase");

const isAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split("Bearer")[1];
    const json = JSON.parse(token);
    connection.query(
      `SELECT * FROM users WHERE username='${json.username}' AND id='${json.id}'`,
      (err, result) => {
        if (err) {
          return res.send({
            success: false,
            msg: "login first",
            data: [],
          });
        }
        if (result?.length > 0) {
          req.user = {
            ...result[0],
          };
          next();
        } else
          return res.send({
            success: false,
            msg: "login first",
            data: [],
          });
      }
    );
  } else
    return res.status(401).send({
      success: false,
      msg: "login first",
      data: [],
    });
};

module.exports = {
  isAuth,
};