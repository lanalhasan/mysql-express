const thinksyria = require("../dataBase");

const allPosts = (req, res) => {
  thinksyria.query(`SELECT * FROM posts `, (err, result) => {
    if (err) {
      return res.send({
        success: false,
        msg: err.message,
        data: [],
      });
    }
    if (result?.length > 0)
      return res.send({ 
        success: true, 
        msg: "all posts",
        data: result ,

    });
    else return res.send({ success: false, msg: "no posts found", data: [] });
  });
};

const createPost = (req, res) => {
  const { content, userId } = req.body;
  if (content?.length < 10) {
    return res.send({
      success: false,
      msg: "content must at least be 10 characters",
    });
  }
  thinksyria.query(
    `INSERT INTO posts (content, userId) VALUES ('${content}',(SELECT ${userId} FROM users WHERE id='${userId}'))`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          msg: err.message,
        });
      }

      return res.send({ 
        success: true,
         msg: " post created",
         });
    }
  );
};

const getSinglePost = (req, res) => {
  const id = req.params.id;
  thinksyria.query(
    `SELECT content,userId FROM posts WHERE userId= '${id}'`,
    (err, result) => {
      if (err) {
        return res.send({
          success: false,
          msg: err.message,
          data: [],
        });
      }
      if(result?.length > 0)
      return res.send({ 
        success: true,
         msg:"here are the post",
        data: result,
     });
     else return res.send({
        success: false,
        msg:"user not found",
     })
    }
  );
};

const deletePost = (req,res) => {
    const {postId} = req.body

};

const editPost = (req,res) => {
    const {content,postId, userId} = req.body
if (content?.length < 10) {
   return res.send ({
    success: false,
     msg:'post must have at least 10 characters',
   })
}
    thinksyria.query(
        `UPDATE posts SET content = '${content}' WHERE id='${postId}' AND userId='${userId}'`,
        (err, result) => {
            if (err) {
              return res.send({
                success: false,
                msg:'userId or postId is missing',
                data: [],
              });
            }
            return res.send({ 
              success: true,
               msg:"post edited!",
              data: result
           });
        }
        )
}

module.exports = {
  allPosts,
  createPost,
  getSinglePost,
  deletePost,
  editPost,
};
