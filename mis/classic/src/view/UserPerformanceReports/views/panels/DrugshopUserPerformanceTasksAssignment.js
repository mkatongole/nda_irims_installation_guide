Ext.define('Admin.view.dashboard.DrugshopUserPerformanceTasksAssignment', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugshopuserperformancetasksassignment',
    margin: 2,
    itemId:'drugshopuserperformancetasksassignment',
    reference:'drugshopuserperformancetasksassignment',
    //id:'dashboard',
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: 'userperformancereportsvctr',
    viewModel: {
        type: 'dashboard'
    },
    module_id: 29,
    layout: 'fit',
    listeners: {
        hide: 'onHideView'
    }, 
    items: [{
            xtype:'tabpanel',
            layout: 'fit',
            listeners:{
                    beforerender:function(pnl){
                            var panel = pnl.up('panel'),
                                module_id = panel.module_id, 
                                userperformancetasksasssummarygrid = panel.down('userperformancetasksasssummarygrid'),
                                usercompletedperformancetasksassgrid = panel.down('usercompletedperformancetasksassgrid');

                                userperformancetasksasssummarygrid.down('combo[name=module_id]').setValue(module_id).setDisabled(true);

                                usercompletedperformancetasksassgrid.down('combo[name=module_id]').setValue(module_id).setDisabled(true);


                    }
            },
            items:[{
                xtype:'userperformancetasksasssummarygrid', 
                title: 'User Performance Summary Report'
            },{
                xtype: 'usercompletedperformancetasksassgrid',
                region: 'center',
                title: 'My Completed Assignment'
            }]
    }
    ]
});
