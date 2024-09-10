Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.kgs-main-app',
    xtype: 'main-app',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ext.ux.TabReorderer',
        'Ext.ux.TabCloseMenu'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        render: 'onMainViewRender',
        afterrender: 'afterMainPageRenders'
    },
    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo" style="color: #497d36 !important; font-weight: bold;"><img src="resources/images/nda_logo.png" style="width: 200px; height: 50px; margin-left: 0; margin-top: 0;"></div>',
                width: 250
            },
                 {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-bars',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
           
                {
                  xtype: 'tbspacer',
                  width: 10
                },
                {
                    xtype: 'displayfield',
                    value: 'You are here:',
                    hidden: true,
                    fieldStyle: {
                        'font-weight':'bold',
                        'font-style':'italic',
                        'font-size':'10px'
                    }
                },
                    {
                    iconCls: 'x-fa fa-home',
                    xtype:'button',
                    //hidden:true,
                    tooltip: 'Back',
                    name: 'dashboardback_btn',
                    text: '<span style="color: white;">Back</span>',
                    style: {
                        backgroundColor: '#32404E'
                    },
                   handler: function () {

                     window.location.reload();
                     
                    //     var confirmationWindow = Ext.create('Ext.window.Window', {
                    //     //title: 'Terms and Conditions',
                    //     bodyPadding: 3,
                    //     width: '90%',
                    //     height: '90%',
                    //     autoScroll: true,
                    //     closable: false,
                    //     modal: true,
                    //     draggable: false,
                    //     resizable: false,
                    //     style: {
                    //         border: 'none'
                    //     },
                    //     layout: 'fit',
                    //     items: [{
                    //             xtype: 'panel',
                    //             layout: 'fit',
                    //             id: 'dashboardPnl',
                    //             width: '100%',
                    //             listeners: {
                    //                 afterrender: function () {
                    //                     var mainTabPanel = Ext.getCmp('dashboardPnl');
                    //                     if (mainTabPanel) {
                    //                         Ext.getBody().mask('Loading Dashboard...');
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
                    //                                         text: '<span style="font-size: 12px;color:white;">' + dataItem.name + '</span>',
                    //                                         iconCls: dataItem.iconCls,
                    //                                         height: 50,
                    //                                         menu_id: dataItem.menu_id,
                    //                                         module_id: 1,
                    //                                         style: {
                    //                                             margin: '10px',
                    //                                             backgroundColor: dataItem.background
                    //                                         },
                    //                                         handler: function () {
                    //                                             console.log(this.module_id);
                    //                                             confirmationWindow.close();
                                                        
                    //                                             checkUserSessionValidity(800000);
                    //                                             setupTimers();

                    //                                             var usersstr = Ext.getStore('usersstr'),
                    //                                             intraygrid = Ext.getCmp('intraygrid'),
                    //                                             //outtraygrid = Ext.getCmp('outtraygrid'),
                    //                                             summaryintraygrid = Ext.getCmp('summaryintraygrid'),
                    //                                             gmpproductlinestatusstr = Ext.getStore('gmpproductlinestatusstr'),
                    //                                             confirmationstr = Ext.getStore('confirmationstr'),
                    //                                             navigationstr = Ext.getStore('navigationstr');
                    //                                             intraygrid.down('combo[name=module_id]').setValue(this.module_id);
                    //                                             //outtraygrid.down('combo[name=module_id]').setValue(this.module_id);
                    //                                             summaryintraygrid.down('combo[name=module_id]').setValue(this.module_id);
                    //                                             var filter = {'menu_id':this.menu_id};
                    //                                             var filters = JSON.stringify(filter);
                    //                                             navigationstr.removeAll();
                    //                                             navigationstr.getProxy().setExtraParams({
                    //                                                 strict_check: true,
                    //                                                 filters: filters
                    //                                             });
                    //                                             navigationstr.load();
                    //                                             usersstr.load();
                    //                                             gmpproductlinestatusstr.load();
                    //                                             //navigationstr.load();
                    //                                             confirmationstr.load();
                    //                                         }
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
                    //             },
                    //         },
                    //     }],
                    // });
                    // confirmationWindow.show();
                            
                    }
                },

                {
                    xtype: 'displayfield',
                    value: 'Dashboard',
                    itemId: 'active_tab_display_id',
                    reference: 'active_tab_display_ref',
                    fieldStyle: {
                        'color':'green',
                        'font-weight':'bold',
                        'font-size':'12px',
                        'margin': '17px 0 0 0'
                    }
                },
                {
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Reload All Stores',
                    hidden: true,
                    handler: function () {
                        var appStores = Ext.StoreManager.getRange();
                        Ext.each(appStores, function (item) {
                            item.load();
                        });
                    }
                },
                '->',
                {
                    iconCls: 'x-fa fa-users',
                    tooltip: 'Notifications',
                    name: 'tcmeeting_btn',
                    badgeText: 12,
                    //text:' Scheduled Technical Meeting ('+ scheduledtcmeeting_counter +')',
                    itemId: 'tcmeeting_btn',
                    text:' Technical Meeting',
                    ui: 'soft-green',
                    handler: 'funcViewScheduledTcMeetingDetails',
                },
                  {
                    iconCls: 'x-fa fa-calendar',
                    tooltip: 'Notifications',
                    name: 'tcmeeting_btn',
                    badgeText: scheduledtcmeeting_counter,
                    //text:' Scheduled Technical Meeting ('+ scheduledtcmeeting_counter +')',
                    itemId: 'tcmeeting_btn',
                    //text:' Technical Meeting',
                    text: '<span style="color: white;">Technical Meeting</span>',
                    style: {
                        backgroundColor: '#89cff0'
                        //color: 'white', 
                    },
                    handler: 'funcViewScheduledTcMeetingDetails',
                },

                {
                    xtype: 'splitbutton',
                    cls: 'header-right-profile-image',
                    ui: 'soft-green',
                    iconCls: 'x-fa fa-user',
                    text: (fullnames) ? fullnames : 'login',
                    menu: [{
                        text: 'Change Password',
                        iconCls: 'x-fa fa-unlock-alt',
                        handler: 'onChangePasswordClick'

                    },
                    {
                        text: 'Edit Profile',
                        iconCls: 'fa fa-user',
                        handler: 'onEditProfileClick'

                    }, {
                        text: 'Log Out',
                        iconCls: 'fa fa-power-off',
                        handler: 'onLogoutClick'
                    }]
                },{
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    src: profile_pic_url
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            // autoScroll: true,
            items: [{
                width: 250,
                minWidth: 64,
                maxWidth: 450,
                split: true,
                reference: 'treelistContainer',
                height: Ext.Element.getViewportHeight() - 50,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                resizable: true,
                autoScroll: true,
                overflowY: 'scroll',
                overflowX: 'scroll',

                bodyStyle: "background-color:#32404E;",
                items: [{
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    id: 'kgsnavtree', overflowY: 'scroll',
                    overflowX: 'scroll',
                    store: 'navigationstr',
                    expanderFirst: false,
                    expanderOnly: false,
                    singleExpand: true,
                    autoScroll:true,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }]
            }, {
                split: true,
                xtype: 'tabpanel',
                flex: 1,
                height: Ext.Element.getViewportHeight() - 64,
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                plugins: [{
                    ptype: 'tabreorderer'
                }, {
                    ptype: 'tabclosemenu'
                }
                ],
                layout: {
                    type: 'card',
                    anchor: '100%'
                },
                autoScroll: true,
                listeners: {
                    beforetabchange: 'beforeTabChange',
                    beforeadd: function (tp, c, index) {
                        if (tp.items.length >= 8) {
                            Ext.Msg.alert('Many Tabs Opened Warning', 'You have opened many tabs, this can easily confuse you. Please close some of the unused tabs!!');
                        }
                    }
                },
                bodyStyle: 'background-color: #F1F1F1 !important',

                items: [{
                    title: 'Dashboard',
                    xtype: system_dashboard,
                    routeId: 'dashboard',
                    viewType: 'dashboard',
                    menu_id: 1,
                    reorderable: false
                }]
            }
            ]
        }
    ]
});
