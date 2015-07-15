Ext.define('Smartc.provider.Peer', {
    extend: 'Smartc.provider.Provider',
    alias: 'rtc-provider.peerjs',

    config: {
        key: undefined, 

        host: undefined,

        port: undefined,

        path: undefined
    },

    peer: undefined,

    connect: function(options) {
        var name = options.username,
            peerConfig = this.getPeerConfig();

        this.peer = new Peer(name, peerConfig);
        this.bindPeerEvents();

    },

    getPeerConfig: function() {
        var me = this,
            key = me.getKey();

        if (key) {
            return { key: key };    
        }

        return {
            host: me.getHost(),
            port: me.getPort(),
            path: me.getPath()
        }
        
    },


    bindPeerEvents: function () {
        var me = this,
            peer = me.peer;

        peer.on('call', function(call){          
            me.fireEvent('call', call);
        });
    },

    makeCall: function (remote, stream) {
        var me = this,
            peer = me.peer,
            call;

        call = peer.call(remote, stream);

        call.on('stream', function(remoteStream) {
            me.fireEvent('remotestream', remoteStream);
        });
    },

    answer: function (call, stream) {
        var me = this,
            peer = me.peer;

        call.answer(stream);
        call.on('stream', function(remoteStream) {
            me.fireEvent('remotestream', remoteStream);
        });
    }

});
