Ext.define('Admin.view.parameters.views.grids.RevenueAccountsGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.revenueaccountsgrid',
    title: 'Fee Types',
    itemId: 'revenueaccountsgrid',
    store: 'revenueaccountsstr',
    tbar: [{
        xtype: "button",
        text: "Revenue Account",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'revenueaccountsfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: 'exportbtn',
    }],

    columns: [
        {
            xtype: 'rownumberer'
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'revenue_description',
            text: 'Revenue Description',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'code',
            text: 'Revenue Account',
            flex: 1
        },{
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Enabled',
        flex: 1,
        renderer: function (value, metaData) {
            if(value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    },
         {
            text: 'Options',
            xtype: 'widgetcolumn',
            width: 90,
            widget: {
                width: 75,
                ui: 'gray',
                iconCls: 'x-fa fa-th-list',
                textAlign: 'left',
                xtype: 'splitbutton',
                menu: {
                    xtype: 'menu',
                    items: []
                }
            }

        }],
    listeners:{
        beforerender:function(me){
            me.store.removeAll();
            me.store.clearFilter();
            me.store.proxy.extraParams = {all: 1};
            me.store.load();
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'revenueaccountsfrm',
                action: 'edit',
                action_url: 'parameters/revenueaccounts',
                entity: 'revenueaccounts',
                store: 'revenueaccountsstr',
                handler: 'showEditParameterFrm'
            },
           {
               text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'par_revenue_accounts',
                storeID: 'revenueaccountsstr',
                action: 'actual_delete',
                action_url: 'configurations/deleteConfigRecord',
                handler: 'doDeleteConfigWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
            }];
        }
    }
});