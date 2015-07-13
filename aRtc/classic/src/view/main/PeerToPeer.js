Ext.define('aRtc.view.main.PeerToPeer', {
    extend:'Ext.Panel',
    xtype: 'peer-to-peer',

    requires: [
        'aRtc.view.main.PeerToPeerController',
        'aRtc.view.main.PeerToPeerModel'
    ],

    controller: 'peer-to-peer',
    viewModel: 'peer-to-peer',

    title: 'Peer to Peer Communication with WebRTC',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            layout: 'hbox',
            margin: '10 0',
            items: [
                {
                    xtype: 'textfield',
                    name : 'remote',
                    fieldLabel: 'Remote',
                    allowBlank: false,
                    flex: 4
                },
                {
                    xtype: 'button',
                    text : 'Call',
                    formBind: true,
                    flex: 1,
                    handler: 'doCall'
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            margin: '10 0',
            items: [
                {
                    xtype: 'textfield',
                    name : 'session',
                    bind: {
                        value: '{name}'
                    },
                    fieldLabel: 'Session',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            margin: '10 0',
            items: [
                {
                    xtype: 'button',
                    text: 'Answer',
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'HangUp',
                    flex: 1,
                    handler: 'hangUp'
                }
            ]
        },
        {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            defaults: {flex: 1},
            items: [
                {
                    itemId: 'localVideo',
                    html:'<video autoplay muted height="100%" width="100%">'
                },
                {
                    itemId: 'remoteVideo',
                    html: '<video autoplay height="100%" width="100%">'
                }

            ]
        }
    ]

});
