Ext.define('Admin.view.gvpapplications.views.grids.SelectInspectionTypeWindow', {
    extend: 'Ext.window.Window',
    xtype: 'selectinspectiontypewindow',
    
    title: 'Select Inspection Type',
    width: 400,
    height: 300,
    layout: 'fit',
    modal: true,
    closeAction: 'destroy',
    
    items: [{
        xtype: 'grid',
        columns: [
            { text: 'ID', dataIndex: 'id', flex: 1 },
            { text: 'Name', dataIndex: 'name', flex: 2 }
        ],
        store: 'YourInspectionTypeStore',
        selModel: {
            mode: 'SINGLE' // Allow selection of only one item
        },
        listeners: {
            beforerender: {
                fn: 'setGvpApplicationGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'inspectionTypestr',
                    proxy: {
                        url: 'gvpapplications/getOnlineApplications'
                    }
                },
                isLoad: true
            },
            itemdblclick: 'onInspectionTypeSelect'
        }
    }],


    buttons: [{
        text: 'Select',
        handler: 'onSelectButtonClick'
    }, {
        text: 'Cancel',
        handler: 'onCancelButtonClick'
    }]
});