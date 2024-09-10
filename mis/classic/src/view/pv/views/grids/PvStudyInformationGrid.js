Ext.define('Admin.view.pv.views.grids.PvStudyInformationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'pvstudyinformationtGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-blue',
        childXtype: 'pvstudyinformationFrm',
        winTitle: 'Study Information',
        winWidth: '80%',
        bind: {
            hidden: '{isReadOnly}'
        },
        handler: 'showAddPvWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PV Study Information ',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_pv_study_information');
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                storeId: 'pvStudyInformationStr',
                proxy: {
                    url: 'pv/onLoadStudyInformation',
                    extraParams:{
                        is_config: 1,
                        table_name: 'tra_pv_study_information'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'study_type',
        text: 'Study type',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'study_name',
        text: 'Study Name',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sponsor_name',
        text: 'Study sponsor Name',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'study_registration_number',
        text: 'Study Registration Number',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        hidden:true,
        dataIndex: 'sponsor_number',
        text: 'Study sponsor number',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Remarks',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'widgetcolumn',
        name:'view_sites',
        width: 160,
        widget:{
            xtype: 'button',
            text: 'View all Details',
            childXtype: 'pvstudyinformationFrm',
            winTitle: 'Study Information',
            winWidth: '70%',
            ui: 'soft-green',
            iconCls: 'fa fa-eye',
            handler: 'viewPvWinFrm'
            }
        },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit',
                    action: 'edit',
                    childXtype: 'pvstudyinformationFrm',
                    winTitle: 'Study Information',
                    winWidth: '80%',
                    handler: 'showEditPvWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_pv_study_information',
                    storeID: 'pvStudyInformationStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    // bind: {
                    //     disabled: '{hideDeleteButton}'
                    // },
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }
    }]
});
