var DBConnection = require('./DBConnection');
var BlackList = function(){
    async function insert(username) {
        try {
            let db = await DBConnection.Get();
            let result = await db.db("cembot").collection("blacklist").updateOne(
                { username: username},
                {'$set': {
                    username: username
                      }
                },
                { upsert: true}
             )

            return result;
        } catch (e) {
            return console.log(e);
        }
    }    
    async function remove(username) {
        try {
            let db = await DBConnection.Get();
            let result = await  db.db("cembot").collection("blacklist").remove({username});

            return result;
        } catch (e) {
            return console.log(e);
        }
    }

    async function list() {
        try {
            let db = await DBConnection.Get();
            var userlist = await db.db("cembot").collection("blacklist").find({}).toArray();
            return userlist;
        } catch (e) {
            return console.log(e);
        }
    }
    return {
        list:list,
        remove:remove,
        insert:insert
    }
}

module.exports = BlackList();