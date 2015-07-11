Ext.define('Smartc.RTC', {
    extend: 'Ext.Base',

    mixins: ['Ext.mixin.Observable'],

    requires: ['Smartc.provider.Peer'],

    config: {
        provider: undefined
    },

    constructor: function(config) {
        this.initConfig(config);

        this.mixins.observable.constructor.call(this, config);

    },

    applyProvider: function(providerConfig) {
        var type,
            config;
        
        if (!providerConfig) return;

        if (Ext.isString(providerConfig)) {
            type = providerConfig;
        } else {
            type = providerConfig.type;
            delete providerConfig.type;

            config = providerConfig;
        }


        config = Ext.apply({
            call: this.onProviderCall,
            localstream: this.onProviderLocalStream,
            remotestream: this.onProviderRemoteStream,
            scope: this
        }, config || {});

        type = 'rtc-provider.' + type;

        return Ext.ClassManager.instantiateByAlias(type, config);
        
    },



    register: function (options) {
        this.getProvider().connect(options);
    },

    makeCall: function(remote) {
        var me = this,
            provider = me.getProvider();
    
        navigator.getUserMedia({video: true, audio: true},
            function(stream) {
                provider.makeCall(remote, stream);
            },
            function(err) {
              console.log('Failed to get local stream' ,err);
            }
        );
    },

    answer: function(call) {
        var me = this,
            provider = me.getProvider();

        navigator.getUserMedia({video: true, audio: true},
            function(stream) {
                provider.answer(remote, stream);
            },
            function(err) {
              console.log('Failed to get local stream' ,err);
            }
        );
    },

    onProviderCall: function (call) {
console.log('fire call')
        this.fireEvent('call', call);
    },

    onProviderLocalStream: function (stream) {
console.log('fire local')
        this.fireEvent('localstream', stream);
    },

    onProviderRemoteStream: function (stream) {
console.log('fire remote')        
        this.fireEvent('remotestream', stream);
    }

    


}, function(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
});
