
Ext.define('Admin.view.configurations.views.grids.Unregistered_viewGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'unregistered_viewGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'unregistered_viewFrm',
        winTitle: 'Unregistered Products',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Unregistered Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
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
                storeId: 'investigator_catStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'tra_unregistered_products'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 0.5
    },{
        xtype: 'gridcolumn',
        dataIndex: 'copack',
        text: 'Co-Pack',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dose',
        text: 'Product FDC',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'proprietary_name',
        text: 'Proprietary Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        text: 'Product Strength',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'siunit',
        text: 'Product Strength',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'categories',
        text: 'Class Category',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'genericname',
        text: 'Generic Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'atccode',
        text: 'ATC Code',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'atc_desciption',
        text: 'ATC Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'therapeuticgroup',
        text: 'Therapeutic Group',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'distribution_category',
        text: 'Distribution Category Class',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'administarion',
        text: 'Route of Administration',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Enable',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'unregistered_viewFrm',
                    winTitle: 'Unregistered Products',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'tra_unregistered_products',
                    storeID: 'investigator_catStr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_unregistered_products',
                    storeID: 'investigator_catStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'tra_unregistered_products',
                    storeID: 'investigator_catStr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
