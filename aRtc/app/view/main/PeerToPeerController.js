Ext.define('aRtc.view.main.PeerToPeerController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.peer-to-peer',

    init: function () {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


        var name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        var me = this;

        me.getViewModel().set('name', name);

        me.peer = new Peer(name, {host: 'localhost', port: 9000, path: '/webrtc'});
        
        me.peer.on('call', function(call) {
            me.currentCall = call;
            navigator.getUserMedia({video: true, audio: true}, 
                function(stream) {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', function(remoteStream) {
                        me.doPlayRemoteStream(remoteStream);
                    });
                },
                function(err) {
                    console.log('Failed to get local stream' ,err);
                }
            );
        });
    },

    doCall: function(btn) {
        var me = this;
        var remote = me.getView().down('textfield[name=remote]').getValue();
        var peer = me.peer;

        if (me.currentCall) {
            me.currentCall.close();
        }

        navigator.getUserMedia({video: true, audio: true},
            function(stream) {
                var call = peer.call(remote, stream);

                call.on('stream',
                    function(remoteStream) {
                        // Show stream in some <video> element.
                        me.doPlayLocalStream(remoteStream)
                    }
                );
                
                me.currentCall = call;
            },
            function(err) {
              console.log('Failed to get local stream' ,err);
            }
        );

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
        var me = this;
        var call = me.currentCall;
        
        if (call)
            call.close();
    }



});
