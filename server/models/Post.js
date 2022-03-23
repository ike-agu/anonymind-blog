const db = require("../dbConfig/init");

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
}

module.exports = Post;
