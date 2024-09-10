
Ext.define('Admin.view.configurations.views.grids.PremisePharmacistSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisepharmacistselectiongrid',
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'premisepharmacistselectiongridstr',
                enablePaging: true,
                proxy: {
                    url: 'premiseregistration/getPremisePharmacist'
                }
            },
            isLoad: true
        },
      
    },
       tbar: [{
        text: 'Double Click to select Pharmacist'
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
        dataIndex: 'psu_no',
        text: 'PSU No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },
     {
        xtype: 'datecolumn',
        dataIndex: 'supervising_psu_date',
        text: 'P.S.U Registration Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'supervising_name',
        text: 'Full Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_telephone_no',
        text: 'Telephone No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_telephone_no2',
        hidden:true,
        text: 'Telephone No 2',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_telephone_no3',
        hidden:true,
        text: 'Telephone No 3',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_email_address',
        text: 'Email Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_email_address2',
        hidden:true,
        text: 'Email Address 2',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    } ,{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_email_address3',
        hidden:true,
        text: 'Email Address 3',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_qualification',
        text: 'Qualification',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_country',
        text: 'Country',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_region',
        text: 'Region',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_district',
        text: 'District',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'supervising_physical_address',
        text: 'Physical Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }]
});

