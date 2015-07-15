Ext.define('Smartc.provider.OpenTok', {
    extend: 'Smartc.provider.Provider',
    alias: 'rtc-provider.opentok',

    config: {
        sessionId: undefined,
        apiKey: undefined,
        token: undefined,
        url: undefined
    },

    connect: function(options) {},

    makeCall: function(remote, stream) {},

    answer: function(call, stream) {}

});
