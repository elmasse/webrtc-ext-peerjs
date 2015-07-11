Ext.define('Smartc.provider.Peer', {
    extend: 'Smartc.provider.Provider',
    alias: 'rtc-provider.peerjs',

    config: {
        host: undefined,

        port: undefined,

        path: undefined
    },

    peer: undefined,

    connect: function(options) {
        var name = options.username,
            host = options.host || this.getHost(),
            port = options.port || this.getPort(),
            path = options.path || this.getPath();

        this.peer = new Peer(name, {host: host, port: port, path: path});
        this.bindPeerEvents();

    },


    bindPeerEvents: function () {
        var me = this,
            peer = me.peer;

        peer.on('call', function(call){
            me.fireEvent('call', call);
        })
    },

    makeCall: function (remote, stream) {
        var me = this,
            peer = me.peer,
            call;
console.log('peer: makeCall')

        call = peer.call(remote, stream);
        call.on('stream', function(localStream) {
console.log('peer: makeCall:call on stream')
            me.fireEvent('localstream', localStream);
        });
    },

    answer: function (call, stream) {
        var me = this,
            peer = me.peer;
console.log('peer: answer')
        peer.answer(call, stream);
        call.on('stream', function(remoteStream) {
console.log('peer: answer:call on stream')
            me.fireEvent('remotestream', remoteStream);
        });
    }

});
