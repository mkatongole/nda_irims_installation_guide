Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    requires: ['Admin.view.plugins.Badge','Admin.view.plugins.CKeditor'],
    stores: [
        'ConfirmationStr'
    ],
    
    controllers:[
        'SharedUtilitiesCtr',
        'AdministrationCtr',
        'DashboardCtr',
        'UserManagementCtr',
        'ParametersCtr',
        'OrganisationConfigCtr',
        'WorkflowManagementCtr',
        'PremiseRegistrationCtr',
        'ProductRegistrationCtr',
        'ProductRecallAlertCtr',
        'ConfigurationsCtr',
        'GmpApplicationsCtr',
        'GvpApplicationsCtr',
        'ClinicalTrialCtr',
        'ReportsCtr',
        'SurveillanceCtr',
        'ImportExportpermitsCtr',
        'ProductNotificationsCtr',
		'PromoAndAdvertMaterialsController',
        'ProfileCtr',
        'OpenOfficeCtr',
        'OnlineServicesCtr',
        'RevenueManagementCtr',
        'SystemAdministrationProcessCtr',
        'DocumentContolManCtr',
        'PvCtr',
        'PsurCtr',
        'EnforcementCtr',
        'ResearchOperationsCtr'
    ],
    defaultToken : 'dashboard',

    launch: function () {
    if (is_logged_in) {
        // var confirmationWindow = Ext.create('Ext.window.Window', {
        //     bodyPadding: 3,
        //     width: '95%',
        //     height: '95%',
        //    // autoScroll: true,
        //     scrollable:true,
        //     closable: false,
        //     modal: true,
        //     draggable: false,
        //     resizable: false,
        //     requires: [
        //         'Ext.ux.layout.ResponsiveColumn'
        //     ],
        //     style: {
        //         border: 'none'
        //     },
        //     layout: 'responsivecolumn',
        //     items: [ {
        //      dockedItems: [ 
        //        {
        //             xtype: 'toolbar',
        //             cls: 'sencha-dash-dash-headerbar',
        //             height: 64,
        //             docked: 'top',
        //             itemId: 'headerBar',
        //             items: [
        //                 {
        //                 xtype: 'component',
        //                 reference: 'senchaLogo',
        //                 cls: 'sencha-logo',
        //                 html: '<div class="main-logo" style="color: #497d36 !important; font-weight: bold;"><img src="resources/images/nda_logo.png" style="width: 200px; height: 50px; margin-left: 0; margin-top: 0;"></div>',
        //                 width: 250
        //             },   
        //                 '->',
                        
        //                 {
        //                     xtype: 'splitbutton',
        //                     cls: 'header-right-profile-image',
        //                     ui: 'soft-green',
        //                     iconCls: 'x-fa fa-user',
        //                     text: (fullnames) ? fullnames : 'login',
        //                     menu: [{
        //                         text: 'Change Password',
        //                         iconCls: 'x-fa fa-unlock-alt',
        //                         handler: function () {
        //                             var me = this,
        //                             win = Ext.widget('passwordchangewin');
        //                             win.show();
        //                         }

        //                     },
        //                    {
        //                         text: 'Log Out',
        //                         iconCls: 'fa fa-power-off',
        //                         handler: function () {
        //                             var form = Ext.create('Ext.form.Panel', {}),
        //                              frm = form.getForm();
        //                              frm.submit({
        //                                 url: 'logout',
        //                                 headers: {
        //                                     'X-CSRF-Token': token
        //                                 },
        //                                 waitMsg: 'Logging out, Please wait...',
        //                                 success: function (fm, action) {
        //                                     setTimeout(function () {
        //                                         location.reload();
        //                                     }, 100);
        //                                 },
        //                                 failure: function (fm, action) {
        //                                     var resp = action.result;
        //                                     toastr.error(resp.message, 'Failure Response');
        //                                 }
        //                             });

        //                         }
        //                     }]
        //                 },{
        //                     xtype: 'image',
        //                     cls: 'header-right-profile-image',
        //                     height: 35,
        //                     width: 35,
        //                     src: profile_pic_url
        //                 }
        //             ]
        //              }
        //             ]
        //             },
        //             {
        //             xtype: 'panel',
        //             layout: 'fit',
        //             id: 'dashboardPnl',
        //             width: '100%',
        //             margin: '10 0',
        //             listeners: {
        //                 afterrender: function () {
        //                     Ext.getBody().mask('Loading Dashboard...'); 
        //                     var mainTabPanel = Ext.getCmp('dashboardPnl');
        //                     if (mainTabPanel) {
        //                         Ext.Ajax.request({
        //                             url: 'administration/getSystemNavigationMenuItems',
        //                             method: 'GET',
        //                             headers: {
        //                                 'Authorization': 'Bearer ' + access_token,
        //                                 'X-CSRF-Token': token
        //                             },
        //                             success: function (response) {
        //                                 var jsonData = Ext.decode(response.responseText);
        //                                 console.log(jsonData);

        //                                 // Create an array to hold button configurations
        //                                 var buttons = [];

        //                                 Ext.each(jsonData, function (dataItem) {
        //                                     var buttonConfig = {
        //                                         xtype: 'panel',
        //                                         userCls: 'big-20 small-50',
        //                                         title: '<span style="font-size: 11px;"><b>' + dataItem.name + '</b></span>',
        //                                         ui: 'light',
        //                                         iconCls: dataItem.iconCls,
        //                                         headerPosition: 'bottom',
        //                                         cls: 'quick-graph-panel shadow',
        //                                         style: {
        //                                             backgroundColor: '#F5F5F5',
        //                                         },
        //                                         height: 150,
        //                                         layout: 'fit',
        //                                         tbar: [
        //                                             {
        //                                                 xtype: 'button',
        //                                                 text: '<span style="font-size: 11px;color:white;">Proceed with ' + dataItem.name + '</span>', 
        //                                                 width: '100%', 
        //                                                 padding:0,
        //                                                 margin:0,
        //                                                 iconCls: 'fa fa-arrow-circle-right',
        //                                                 iconAlign: 'right', 
        //                                                 style: {
        //                                                     backgroundColor: dataItem.background
        //                                                 },
        //                                                 height: 75,
        //                                                 menu_id: dataItem.menu_id,
        //                                                 module_id: dataItem.tied_module_id,
        //                                                 handler: function () {
        //                                                     if (this.module_id==0 ||this.module_id===0) {
        //                                                         var module_id=31;
        //                                                     }else{
        //                                                         var module_id=this.module_id;
        //                                                     }
        //                                                     confirmationWindow.close();
        //                                                     // User accepted, open 'main-app'
        //                                                     Ext.create({
        //                                                         xtype: 'main-app'
        //                                                     });
        //                                                     checkUserSessionValidity(800000);
        //                                                     setupTimers();

        //                                                     var usersstr = Ext.getStore('usersstr'),
        //                                                     intraygrid = Ext.getCmp('intraygrid'),
        //                                                     //outtraygrid = Ext.getCmp('outtraygrid'),
        //                                                     summaryintraygrid = Ext.getCmp('summaryintraygrid'),
        //                                                     gmpproductlinestatusstr = Ext.getStore('gmpproductlinestatusstr'),
        //                                                     intrayStore = Ext.getStore('intraystr'),
        //                                                     confirmationstr = Ext.getStore('confirmationstr'),
        //                                                     navigationstr = Ext.getStore('navigationstr');
        //                                                     intraygrid.down('combo[name=module_id]').setValue(module_id);
        //                                                     intraygrid.down('combo[name=module_id]').setReadOnly(true);
        //                                                     //outtraygrid.down('combo[name=module_id]').setValue(module_id);
        //                                                     summaryintraygrid.down('combo[name=module_id]').setValue(module_id);
        //                                                    summaryintraygrid.down('combo[name=module_id]').setReadOnly(true);
        //                                                     usersstr.load();
        //                                                     gmpproductlinestatusstr.load();
        //                                                     confirmationstr.load();
        //                                                     intrayStore.load();
        //                                                     var filter = {'menu_id': this.menu_id};
        //                                                     var filters = JSON.stringify(filter);
        //                                                     navigationstr.removeAll();
        //                                                     navigationstr.getProxy().setExtraParams({
        //                                                         strict_check: true,
        //                                                         filters: filters
        //                                                     });
        //                                                     navigationstr.load();
        //                                                 }
        //                                             }
        //                                         ]
        //                                         // ,
        //                                         //  tools: [{
        //                                         //     type: 'maximize',
        //                                         //     tooltip: 'Proceed',
        //                                         //     handler: function () {
                                                        
        //                                         //     }
        //                                         // }]
        //                                     };


        //                                     // Push the button configuration into the buttons array
        //                                     buttons.push(buttonConfig);
        //                                 });

        //                                 // Create a button group containing the buttons
        //                                 var buttonGroup = Ext.create('Ext.container.ButtonGroup', {
        //                                     layout: 'column',
        //                                     width: '100%',
        //                                     defaults: {
        //                                         columnWidth: 0.25,
        //                                         padding: 10
        //                                     },
        //                                     style: {
        //                                         margin: '0 auto',
        //                                         border: 'none'
        //                                     },
        //                                      //columns: 5,
        //                                     items: buttons, 
        //                                     //width: '100%',
        //                                 });

        //                                 // Add the button group to mainTabPanel
        //                                 mainTabPanel.add(buttonGroup);
        //                                 mainTabPanel.updateLayout();
        //                                 Ext.getBody().unmask();
        //                             },
        //                             failure: function (response) {
        //                                 var resp = Ext.JSON.decode(response.responseText),
        //                                     message = resp.message;
        //                                 toastr.error(message, 'Failure Response');
        //                                 Ext.getBody().unmask();
        //                             },
        //                             error: function (jqXHR, textStatus, errorThrown) {
        //                                 Ext.getBody().unmask();
        //                                 toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
        //                                 Ext.getBody().unmask();
        //                          },
        //                     });
        //                 }
        //             }
        //         },
        //         }, {
        //             xtype: 'todo',
        //             userCls: 'big-60 small-100'
        //         },
        //         {
        //             xtype: 'assignedapplicationschart',
        //             userCls: 'big-40 small-100',
        //     }],
        // });
        // confirmationWindow.show();
        
         Ext.create({
                    xtype: 'main-app'
            });
               checkUserSessionValidity(800000);
                setupTimers();
                 var usersstr = Ext.getStore('usersstr'),
                gmpproductlinestatusstr  = Ext.getStore('gmpproductlinestatusstr'),
                confirmationstr = Ext.getStore('confirmationstr'),
                navigationstr = Ext.getStore('navigationstr');
                usersstr.load();
                gmpproductlinestatusstr.load();
                navigationstr.load();
                confirmationstr.load();
            
        
    } else if (is_reset_pwd) {
        Ext.create({
            xtype: 'resetpwdscreen'
        });
    } else {
        Ext.create({
            xtype: 'login'
        });
    }
},

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
