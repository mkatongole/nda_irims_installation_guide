 Ext.define('Admin.view.frontoffice.drugshop.grids.DrugshopBsnInfo', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'drugshopbsninfo',
    layout:{
        type:'fit',
        align:'stretch',
        pack:'start'
      },
    store: 'spreadsheetdrugshopbsninfostr',
    title: 'Drug Shop Business Details',
     viewConfig: {
            emptyText: 'No information found for the premise under set creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Type',
        name: 'Type',
        text: 'Business Type',
        flex: 1
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'details',
        name: 'details',
        text: 'Details',
        flex: 1
    }
    ]


  });