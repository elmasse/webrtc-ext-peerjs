Ext.define('aRtc.view.main.PeerToPeerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.peer-to-peer',

    requires: [
        "Smartc.RTC"
    ],

    rtc: undefined,

    init: function () {
        var name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        var me = this;

        me.getViewModel().set('name', name);

        me.rtc = Ext.create('Smartc.RTC', {
            provider: {
                type: 'peerjs',
                // key: '11nha49rnyu8fr'
                host: 'localhost',
                port: 9000,
                path: '/peer'
            },
            listeners: {
                call: me.doRTCAnswer,
                remotestream: me.onRemoteStream,
                localstream: me.onLocalStream,
                scope: me
            }
        });

        me.rtc.register({username: name});

    },

    doRTCAnswer: function (call) {
        this.rtc.answer(call);
    },

    onRemoteStream: function(stream, call) {
        this.doPlayRemoteStream(stream);
    },

    onLocalStream: function(stream, call) {
        this.doPlayLocalStream(stream);
    },

    doCall: function(btn) {
        var me = this;
        var remote = me.getView().down('textfield[name=remote]').getValue();
        
        me.rtc.makeCall(remote);
    },

    doPlayLocalStream: function(stream) {
        var remoteVideo = this.getView().down('#localVideo');

        var video = remoteVideo.getEl().down('video');

        video.dom.src = window.URL.createObjectURL(stream);
    },


    doPlayRemoteStream: function(stream) {
        var remoteVideo = this.getView().down('#remoteVideo');

        var video = remoteVideo.getEl().down('video');

        video.dom.src = window.URL.createObjectURL(stream);
    },

    hangUp: function () {
        // var me = this;
        // var call = me.currentCall;
        
        // if (call)
        //     call.close();
    }



});
