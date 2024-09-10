
Ext.define('Admin.view.LandingDashboard.LandingDashboard', {
    extend: 'Ext.container.Viewport',
    // alias: 'widget.kgs-landingdashboard',
    xtype: 'landingdashboard',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ext.ux.TabReorderer',
        'Ext.ux.TabCloseMenu'
    ],
    reference: 'landingdashboard',
    id: 'landingdashboard',
    controller: 'main',
    viewModel: 'main',
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        render: 'onLandingViewRender',
        afterrender: 'afterMainPageRenders'
    },
    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar',
            height: 68,
            itemId: 'headerBar',
            items: [
              {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo" style="color: #497d36 !important; font-weight: bold;"><img src="resources/images/nda_logo.png" style="width: 250px; height: 58px; margin-left: 0; margin-top: 0;"></div>',
                width: 350
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
                    //text:' Technical Meeting',
                    text: '<span style="color: white;">Technical Meeting</span>',
                    //ui: 'soft-green',
                    style: {
                        backgroundColor: '#89cff0'
                        //color: 'white', 
                    },
                    handler: 'funcViewScheduledTcMeetingDetails',
                },
                   {
                    iconCls: 'x-fa fa-bell',
                    //tooltip: 'Notifications',badgeText: notifications_duecounter,
                    tooltip: 'Notifications',
                    badgeText: scheduledtcmeeting_counter,
                    text:'OverDue Applications',
                    ui: 'soft-red',
                    style: {
                        backgroundColor: '#900603',
                        color: 'white', 
                    }
                    //handler: 'funcShowServiceDeliveryTimesDuesDetails'
                    
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
            xtype: 'mainlandingcontainerwrap',
            id: 'main-view-landing_detail-wrap',
            reference: 'mainlandingContainerWrap',
            flex: 1,
            // autoScroll: true,
            items: [
            {
                autoScroll: true,
                overflowY: 'scroll',
                overflowX: 'scroll',
                split: true,
                xtype: 'container',
                flex: 1,
                height: Ext.Element.getViewportHeight() - 64,
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                bodyStyle: 'background-color: #F1F1F1 !important',

                items: [
                {
                    title: 'Dashboard',
                    xtype: 'admindashboard',
                    routeId: 'admindashboard',
                    viewType: 'admindashboard',
                    menu_id: 1,
                    reorderable: false
                }
                ]
            }
            ]
        }
    ]
});

