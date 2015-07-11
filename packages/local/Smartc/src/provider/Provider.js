Ext.define('Smartc.provider.Provider', {
    extend: 'Ext.Base',

    mixins: ['Ext.mixin.Observable'],

    constructor: function (config) {
        this.initConfig(config);
        
        this.mixins.observable.constructor.call(this, config);
    }
});
