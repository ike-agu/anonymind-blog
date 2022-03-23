const db =require('../dbConfig/init')

class User {
  constructor(data){
    this.id = data.id
    this.name = data.name
  }

static get all(){
  return new Promise(async (res, rej) => {
    try{
      const  allUsers = await db.query(`SELECT * FROM users;`)
      const users = allUsers.rows.map(d => new User(d))
      res(users)
    }catch (err){
      rej(`Error retrieving users ${err}` )
    }
  })
}

}

module.exports = User
