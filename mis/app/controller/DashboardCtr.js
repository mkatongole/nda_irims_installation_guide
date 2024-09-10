/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.controller.DashboardCtr', {
    extend: 'Ext.app.Controller',
    stores: [
        'Admin.store.dashboard.DashboardGridAbstractStore',
        'Admin.store.dashboard.InTrayStr',
        'Admin.store.dashboard.OnlineApplicationDashBoardGridStr',
        'Admin.store.dashboard.OnlineEvalQueryResponseAppDashboardGridStr',
        'Admin.store.dashboard.OnlineAppsSubmissionCounterStr',
        'Admin.store.dashboard.ExternalUserIntrayStr',
        'Admin.store.dashboard.ExternalUserOutTrayStr',
        'Admin.store.dashboard.OutTrayStr',
        'Admin.store.dashboard.OverDueTrayStr',
        'Admin.store.dashboard.OverDueSummaryTrayStr',
        'Admin.store.dashboard.UserTrayAssignmentsStr',

        'Admin.store.dashboard.SummaryIntrayGridStr',

		'Admin.store.Month_store',
        'Admin.store.Year_store'
    ],
    config: {
        refs: [{
            ref: 'mainPanel',
            selector: 'maincontainerwrap'
        }, {
            ref: 'mainTabPanel',
            selector: '#contentPanel'
        }],
        control: {
            'dashboardguidelinesgrid #newGuideline': {
                click: 'showAddGuidelineWin'
            },
            'systemguidelinesfrm button[action=save_guideline]': {
                click: 'doCreateDashboardGuideline'
            },

            // 'admindashboard': {
            //     afterrender: 'onAfterRenderLandingDashboard'
            // },
        }

    },



    /**
     * Called when the view is created
     */
    init: function () {

    },



    //  onAfterRenderLandingDashboard: function () {
    //     var me = this,
    //     mainTabPanel = me.getMainTabPanel();
    //     if (mainTabPanel) {
    //         //Ext.getBody().mask('Fetching Modules...');
    //         Ext.Ajax.request({
    //             url: 'administration/getSystemNavigationMenuItems',
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': 'Bearer ' + access_token,
    //                 'X-CSRF-Token': token
    //             },
    //             success: function (response) {
    //                 var jsonData = Ext.decode(response.responseText);
    //                 var cardContainer = Ext.create('Ext.container.Container', {
    //                     layout: 'column', 
    //                     width: '90%',
    //                     defaults: {
    //                         columnWidth: 0.25, 
    //                         padding: 10 
    //                     },
    //                     style: {
    //                         margin: '0 auto' 
    //                     }
    //                 });
    //                 Ext.each(jsonData, function (dataItem) {
                    
                            // var salesPanel = {
                            //     xtype: 'panel',
                            //     userCls: 'big-20 small-50',
                            //     title: '<span style="font-size: 10px;">' + dataItem.name + '</span>', // Apply font size inline
                            //     ui: 'light',
                            //     menu_id: dataItem.menu_id,
                            //     iconCls: dataItem.iconCls,
                            //     headerPosition: 'bottom',
                            //     cls: 'quick-graph-panel shadow',
                            //     height: 130,
                            //     layout: 'fit',
                            //     items: [
                            //          {
                            //             xtype: 'container', 
                            //             animation: !Ext.isIE9m && Ext.os.is.Desktop,
                            //             height: 75,
                            //             style: {
                            //                 backgroundColor: dataItem.background
                            //             },
                            //             bind: '{quarterlyGrowth}',
                            //             layout: 'fit', 
                            //         }
                            //     ],
                    //         listeners: {
                    //             itemdblclick: function () {
                    //                 console.log('yyyyy');
                    //                 window.location.href = 'main-app';
                    //             }
                    //         }
                    //         };

                    //         cardContainer.add(salesPanel);
                    // });

    //                 mainTabPanel.add(cardContainer);
    //                 mainTabPanel.updateLayout();
    //             },
    //             failure: function (response) {          
    //                 var resp = Ext.JSON.decode(response.responseText),
    //                     message = resp.message;
    //                     toastr.error(message, 'Failure Response');
    //                 //Ext.getBody().unmask();
    //             },
    //             error: function (jqXHR, textStatus, errorThrown) {
    //                 Ext.getBody().unmask();
    //                 toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                                
    //             },
    //             scope: this 
    //         });
    //     }
    // },


    onAfterRenderLandingDashboard: function () {
    var me = this,
        mainTabPanel = me.getMainTabPanel();

    if (mainTabPanel) {
        // Ext.getBody().mask('Fetching Modules...');
        Ext.Ajax.request({
            url: 'administration/getSystemNavigationMenuItems',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': token
            },
            success: function (response) {
                var jsonData = Ext.decode(response.responseText);
                var cardContainer = Ext.create('Ext.container.Container', {
                    layout: 'column',
                    width: '90%',
                    defaults: {
                        columnWidth: 0.25,
                        padding: 10
                    },
                    style: {
                        margin: '0 auto'
                    }
                });

                Ext.each(jsonData, function (dataItem) {
                    // Create a button instead of a panel
                    var salesButton = Ext.create('Ext.button.Button', {
                        text: '<span style="font-size: 10px;">' + dataItem.name + '</span>',
                        ui: 'light',
                        menu_id: dataItem.menu_id,
                        iconCls: dataItem.iconCls,
                        cls: 'quick-graph-panel shadow',
                        height: 130,
                        style: {
                            backgroundColor: dataItem.background
                        },
                        handler: function () {
                        Ext.create({
                            xtype:'main-app' 
                        });
                            
                        }
                    });

                    cardContainer.add(salesButton);
                });

                mainTabPanel.add(cardContainer);
                mainTabPanel.updateLayout();
            },
            failure: function (response) {
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message;
                toastr.error(message, 'Failure Response');
                // Ext.getBody().unmask();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
            },
            scope: this
        });
    }
},


// onAfterRenderLandingDashboard: function () {
//         var me = this,
//         mainTabPanel = me.getMainTabPanel();
//         if (mainTabPanel) {
//             //Ext.getBody().mask('Fetching Modules...');
//             Ext.Ajax.request({
//                 url: 'administration/getSystemNavigationMenuItems',
//                 method: 'GET',
//                 headers: {
//                     'Authorization': 'Bearer ' + access_token,
//                     'X-CSRF-Token': token
//                 },
//                 success: function (response) {
//                     var jsonData = Ext.decode(response.responseText);
//                     var cardContainer = Ext.create('Ext.container.Container', {
//                         layout: 'column', 
//                         width: '90%',
//                         defaults: {
//                             columnWidth: 0.25, 
//                             padding: 10 
//                         },
//                         style: {
//                             margin: '0 auto' 
//                         }
//                     });
//                     Ext.each(jsonData, function (dataItem) {
                    
//                             var salesPanel = {
//                                 xtype: 'panel',
//                                 userCls: 'big-20 small-50',
//                                 title: '<span style="font-size: 10px;">' + dataItem.name + '</span>', // Apply font size inline
//                                 ui: 'light',
//                                 menu_id: dataItem.menu_id,
//                                 iconCls: dataItem.iconCls,
//                                 headerPosition: 'bottom',
//                                 cls: 'quick-graph-panel shadow',
//                                 height: 130,
//                                 layout: 'fit',
//                                 items: [
//                                      {
//                                         xtype: 'container', 
//                                         animation: !Ext.isIE9m && Ext.os.is.Desktop,
//                                         height: 75,
//                                         style: {
//                                             backgroundColor: dataItem.background
//                                         },
//                                         bind: '{quarterlyGrowth}',
//                                         layout: 'fit', 
//                                     }
//                                 ]
//                             };

//                             cardContainer.add(salesPanel);
//                     });

//                     mainTabPanel.add(cardContainer);
//                     mainTabPanel.updateLayout();
//                 },
//                 failure: function (response) {          
//                     var resp = Ext.JSON.decode(response.responseText),
//                         message = resp.message;
//                         toastr.error(message, 'Failure Response');
//                     //Ext.getBody().unmask();
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                     Ext.getBody().unmask();
//                     toastr.error('Error fetching data: ' + errorThrown, 'Error Response');
                                
//                 },
//                 scope: this 
//             });
//         }
//     },




    showAddGuidelineWin: function () {
        var me = this,
            form = Ext.widget('systemguidelinesfrm'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            menu_id = activeTab.menu_id,
            menu_name = activeTab.title;
        form.down('hiddenfield[name=menu_id]').setValue(menu_id);
        funcShowCustomizableWindow('System Guidelines for: ' + menu_name, '40%', form, 'customizablewindow');
    },

    doCreateDashboardGuideline: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            frm = form.getForm(),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            guidelineGrid=activeTab.down('dashboardguidelinesgrid'),
            store=guidelineGrid.getStore();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    }

});