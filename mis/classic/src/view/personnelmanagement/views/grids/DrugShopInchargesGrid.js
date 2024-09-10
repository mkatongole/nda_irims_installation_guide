
Ext.define('Admin.view.personnelmanagement.views.grids.DrugShopInchargesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'personelmanagementvctr',
    xtype: 'drugshopinchargesgrid',
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
        text: 'Add incharge Personnel',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'inchargepnl',
        handler: 'showSimplePersonnelModuleGridForm',
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
    export_title: 'DrugShop Incharges',
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
                storeId: 'premiseinchargeStr',
                proxy: {
                    url: 'personnelmanagement/getDrugShopInchargesDetails',
                    extraParams:{
                        table_name: 'tra_premise_incharge_personnel'
                    }
                }
            },
            isLoad: true
        },
        itemdblclick: 'showEditSystemPersonnel'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'saved_name',
        text: 'Photo',
        width: 100,
        renderer: function (val) {
            if (val) {
                return '<img src="' + base_url + '/resources/images/personnel-profile/' + val + '" width="75" height="50">';
            } else {
                return '<img src="' + base_url + '/resources/images/placeholder.png" width="75" height="50">';
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'nin_no',
        text: 'NIN',
        flex: 1
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Full Name',
        flex: 1
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'supervising_premise',
        text: 'Supervising Drugshop/Premise',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_no',
        text: 'Premise No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone',
        text: 'Telephone No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone1',
        hidden:true,
        text: 'Telephone No 2',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone3',
        hidden:true,
        text: 'Telephone No 3',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email Address',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email2',
        hidden:true,
        text: 'Email Address 2',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'email3',
        hidden:true,
        text: 'Email Address 3',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'qualification_name',
        text: 'Qualification',
        flex: 1
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'gender',
        text: 'Gender',
        flex: 1
        //,hidden: true
    },
    // {
    //     xtype: 'gridcolumn',
    //     dataIndex: 'country_name',
    //     text: 'Country',
    //     flex: 1
   // },
    {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'District',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        hidden:true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_active',
        text: 'Active',
        flex: 1,
        renderer: function (value, metaData) {
            if (value==1 || value==1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Active";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Deactivated";
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
                    text: 'Update Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Update Details',
                    handler: 'showUserEditSystemPersonnel'
                }
                ]
            }
        }

    }]
});
