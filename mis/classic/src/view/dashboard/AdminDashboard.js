Ext.define('Admin.view.dashboard.AdminDashboard', {
    extend: 'Ext.container.Container',
    xtype: 'admindashboard',
    overflowX: 'scroll',
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    controller: 'main',
    viewModel: {
        type: 'dashboard'
    },

    layout: 'responsivecolumn',
    listeners: {
        hide: 'onHideView',
    //     afterrender: function() {
    //     var me = this,
    //     mainTabPanel = me.up('container');

    // if (mainTabPanel) {
    //     Ext.Ajax.request({
    //         url: 'administration/getSystemNavigationMenuItems',
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + access_token,
    //             'X-CSRF-Token': token
    //         },
    //         success: function (response) {
    //             var jsonData = Ext.decode(response.responseText);
    //             var cardContainer = Ext.create('Ext.container.Container', {
    //                 layout: 'column',
    //                 width: '90%',
    //                 defaults: {
    //                     columnWidth: 0.25,
    //                     padding: 10
    //                 },
    //                 style: {
    //                     margin: '0 auto'
    //                 }
    //             });

    //             Ext.each(jsonData, function (dataItem) {
    //                 // Create a button instead of a panel
    //                 var salesButton = Ext.create('Ext.button.Button', {
    //                     text: '<span style="font-size: 10px;">' + dataItem.name + '</span>',
    //                     ui: 'light',
    //                     menu_id: dataItem.menu_id,
    //                     iconCls: dataItem.iconCls,
    //                     cls: 'quick-graph-panel shadow',
    //                     height: 130,
    //                     style: {
    //                         backgroundColor: dataItem.background
    //                     },
    //                     handler: function () {

    //                     setCurrentView('main-app');
    //                     // Ext.create({
    //                     //     xtype:'main-app' 
    //                     // });
                            
    //                     }
    //                 });

    //                 cardContainer.add(salesButton);
    //             });

    //             mainTabPanel.add(cardContainer);
    //             mainTabPanel.updateLayout();
    //         },
    //         failure: function (response) {
    //             var resp = Ext.JSON.decode(response.responseText),
    //                 message = resp.message;
    //             toastr.error(message, 'Failure Response');
    //             // Ext.getBody().unmask();
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             Ext.getBody().unmask();
    //             toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
    //         },
    //         scope: this
    //     });
    //         }
    //     },
    },

    items: [
         {
                    iconCls: 'x-fa fa-home',
                    xtype:'button',
                    tooltip: 'Back',
                    name: 'dashboardback_btn',
                    text: '<span style="color: white;">Back</span>',
                    style: {
                        backgroundColor: '#32404E'
                    },
                    handler: 'onLoadModule'
                }
        
    ]
});
