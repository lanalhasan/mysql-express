const thinksyria = require("../dataBase");
const { isAuth } = require('../middlewares')

const signUp = (req, res) => {
  const { name, email, password, password_confirmation } = req.body;
  if (name?.length < 3)
    return res.send({
      sucess: false,
      meg: "name is invalid",
      data: [],
    });
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  )
    return res.send({
      sucess: false,
      meg: "email is invalid",
      data: [],
    });

  if (password?.length < 6)
    return res.send({
      sucess: false,
      meg: "password is invalid",
      data: [],
    });

  if (password.localeCompare(password_confirmation))
    return res.send({
      sucess: false,
      meg: "password and  passwordConfirmation are not  matched !",
      data: [],
    });

  thinksyria.query(
    `INSERT INTO users (username , email , password) VALUES ('${name}','${email}','${password}')`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: "this email or username are used",
        });
      } else
        return res.status(201).send({
          success: true,
          messages: "Account Created Successfully",
        });
    }
  );
};

const signin = (req, res) => {
  const { account, password } = req.body;
  if (!account && !password) {
    return res.send({
      success: false,
      messages: "username or email and password cant be empty !",
      data: [],
    });
  }
  thinksyria.query(
    `SELECT * FROM users WHERE (username='${account}' OR  email='${account}') AND ( password='${password}')`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          messages: "check the username or email and password !",
        });
      }
      if (result?.length > 0) {
        return res.status(200).send({
          sucess: true,
          messages: "Logged in Successfully",
          token: {
            id: result[0]?.id,
            username: result[0]?.username,
            email: result[0]?.email,
          },
        });
      }
      return res.status(401).send({
        sucess: false,
        messages: "check the username or email and password !",
      });
    }
  );
};

const update = (req, res) => {
    try{
        const { name, email, password } = req.body;
        const token = req.headers.authorization?.split("")[1]
        thinksyria.query(
          `UPDATE users SET (username='${name}' OR email='${email}') OR ( password='${password}') WHERE username='${token.username}' `,
          (err, result) => {
            if (err) {
              return res.send({
                success: false,
                messages: err.message,
      
              });
            }
            if(result?.length > 0 ){
              return res.send({
                  success:true,
                  messages:"Updated",
                  data:result
              })
            }
          }
        );
    }catch(err){
        console.error(err)
    }

};

module.exports = {
  signUp,
  signin,
  update,
};