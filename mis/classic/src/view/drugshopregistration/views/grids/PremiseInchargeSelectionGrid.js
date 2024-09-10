
Ext.define('Admin.view.configurations.views.grids.PremiseInchargeSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premiseinchargeselectiongrid',
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'premiseinchargeselectiongridstr',
                enablePaging: true,
                proxy: {
                    url: 'premiseregistration/getPremiseIncharge'
                }
            },
            isLoad: true
        },
      
    },
       tbar: [{
        text: 'Double Click to select Incharge'
    }],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
           var store = this.getStore();
           
            store.getProxy().extraParams = {
                
            }
        }
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'nin_no',
        text: 'NIN',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'incharge_name',
        text: 'Full Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_telephone_no',
        text: 'Telephone No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_telephone_no2',
        hidden:true,
        text: 'Telephone No 2',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_telephone_no3',
        hidden:true,
        text: 'Telephone No 3',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_email_address',
        text: 'Email Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_email_address2',
        hidden:true,
        text: 'Email Address 2',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_email_address3',
        hidden:true,
        text: 'Email Address 3',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_qualification',
        text: 'Qualification',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_country',
        text: 'Country',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_region',
        text: 'Region',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_district',
        text: 'District',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'incharge_physical_address',
        text: 'Physical Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }]
});

