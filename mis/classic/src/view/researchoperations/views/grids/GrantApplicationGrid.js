
Ext.define('Admin.view.research_operations.views.grids.GrantApplicationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'researchoperationsvctr',
    xtype: 'grantapplicationgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_active = record.get('is_active');
            if (is_active==1 || is_active==1) {
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Grant Application',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'grantapplicationwizardfrm',
        handler: 'showSimpleGrantApplicationGridForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 60
    }, {
        xtype: 'displayfield',
        value: 'Double click to view details!!',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Grant Applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: 'usersstr',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'grantsApplicationStr',
                proxy: {
                    url: 'researchoperations/getGrantApplicationDetails',
                    extraParams:{
                        table_name: 'tra_grants'
                    }
                }
            },
            isLoad: true
        },
        itemdblclick: 'showEditGrantApplications'
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Organization Name',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'grant_reference_no',
        text: 'Grant Reference No',
        flex: 1,
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'grant_name',
        text: 'Grant Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'project_title',
        text: 'Project Title',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'funding_amount',
        text: 'Amount of Funding Requested',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'start_date',
        text: 'Start Date',
        flex: 1,
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        flex: 1,
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'status_id',
        text: 'Status',
        flex: 1,
        renderer: function (value, metaData) {
            if (value==1) {
                metaData.tdStyle = 'color:black;background-color:yellow'
                return "In Progress";
            }else if(value==2){
                metaData.tdStyle= 'color:white;background-color:green'
                return "Fully Allocated"
            }else{
            metaData.tdStyle = 'color:white;background-color:red'
            return "Closed"
            }
        }
    },{
        xtype: 'widgetcolumn',
        text: 'Options',
        //hidden: true,
        width: 100,
        widget: {
            textAlign: 'left',
            xtype: 'splitbutton',
            ui: 'gray',
            width: 75,
            iconCls: 'x-fa fa-th-list',
            // text: 'Action',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Details',
                    handler: 'showEditGrantApplicationsSplitButton'
                }
                ]
            }
        }

    }]
});
