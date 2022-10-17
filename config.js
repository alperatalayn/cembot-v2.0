module.exports = {
    app: {
        token: 'token',
        playing: 'cembot',
        global: false,
        guild: 'guildId'
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
        url:"mongoURL"
    }
};
