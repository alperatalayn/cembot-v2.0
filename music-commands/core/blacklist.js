var BlackList = require('../../mongo/BlackList')
module.exports = {
    name: 'blacklist',
    description: "yusuf kuyusuna atnma, seçenekler: *blacklist add username | *blacklist delete username | *blacklist list",

    async execute({ client, message }) {

        switch (message.content.split(' ')[1]) {
            case "add":
                var username =  message.content.split(' ').slice(2).join(' ');
                await BlackList.insert(username)
                break;
            case "delete":
                var username =  message.content.split(' ').slice(2).join(' ');
                await BlackList.remove(username)
                break;
            case "list":
                return message.reply((await BlackList.list())[0].username)
                break;
            default:
                break;
        }

        message.reply("gj!");
    },
};