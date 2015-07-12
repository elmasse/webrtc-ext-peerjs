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
                host: 'localhost',
                port: 9000,
                path: '/webrtc'
            },
            listeners: {
                call: me.doRTCAnswer,
                remotestream: me.onRemoteStream,
                localstream: me.onLocalStream,
                scope: me
            }
        });

        me.rtc.register({username: name});
        
        // me.peer = new Peer(name, {host: 'localhost', port: 9000, path: '/webrtc'});

//         me.peer.on('call', function(call) {
//             me.currentCall = call;
//             navigator.getUserMedia({video: true, audio: true}, 
//                 function(stream) {
//                     call.answer(stream); // Answer the call with an A/V stream.
//                     call.on('stream', function(remoteStream) {
// console.log('remoteStream')
//                         me.doPlayRemoteStream(remoteStream);
//                     });
//                 },
//                 function(err) {
//                     console.log('Failed to get local stream' ,err);
//                 }
//             );
//         });
    },

    doRTCAnswer: function (call) {
console.log('answering')
        this.rtc.answer(call);
    },

    onRemoteStream: function(stream, call) {
        console.log('got remote stream')
        this.doPlayRemoteStream(stream);
    },

    onLocalStream: function(stream, call) {
        console.log('got local stream')
        this.doPlayLocalStream(stream);
    },

    doCall: function(btn) {
        var me = this;
        var remote = me.getView().down('textfield[name=remote]').getValue();
        
        me.rtc.makeCall(remote);

//         var peer = me.peer;

//         if (me.currentCall) {
//             me.currentCall.close();
//         }

//         navigator.getUserMedia({video: true, audio: true},
//             function(stream) {
//                 var call = peer.call(remote, stream);

//                 call.on('stream',
//                     function(localStream) {
// console.log('localStream')                        
//                         // Show stream in some <video> element.
//                         me.doPlayLocalStream(localStream);
//                     }
//                 );
                
//                 me.currentCall = call;
//             },
//             function(err) {
//               console.log('Failed to get local stream' ,err);
//             }
//         );

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
