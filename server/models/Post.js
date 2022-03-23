const db = require("../dbConfig/init");
const User = require("./User");

class Post {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.user_id = data.user_id;
    this.name = data.name;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const posts = await db.query(
          `SELECT posts.*, users.name from posts INNER JOIN users ON posts.user_id=users.id;`
        );
        console.log(posts);
        const postData = posts.rows.map((p) => new Post(p));
        res(postData);
      } catch (error) {
        rej(`Unable to fetch Posts ${error}`);
      }
    });
  }


  static create(postObject) {
    return new Promise(async (res, rej) => {
      try {
        const { title, content, name } = postObject;
        const user = await User.findOrCreateByName(name);
        const result = await db.query(
          `INSERT INTO posts (title,content,user_id)
          values($1,$2,$3) RETURNING *;`,
          [title, content, user.id]
        );
        res(result.rows[0]);
      } catch (error) {
        rej(`Error creating new post ${error}`);
      }
    });
  }

}
// CREATE TABLE posts(
//     id serial PRIMARY KEY,
//     title varchar(100) NOT NULL,
//     content varchar(500) NOT NULL,
//     user_id int
//   );

module.exports = Post;
