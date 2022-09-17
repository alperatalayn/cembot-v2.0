module.exports = {
    app: {
        token: 'ODgwNTU0NjQ2OTAzNjExNDEz.GUpGuy.DA0Zt2MYnzaPnieG4OmP1apgqMeYrE6JOXFP4I',
        playing: 'cembot',
        global: false,
        guild: '541425378854436864'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        },
        prefix: '*'
    },
    mongo:{
        url:"mongodb+srv://cembot-admin:5Q86Tejzs8JCDdK1@cembot-v2.b8xjiod.mongodb.net/?retryWrites=true&w=majority"
    }
};
