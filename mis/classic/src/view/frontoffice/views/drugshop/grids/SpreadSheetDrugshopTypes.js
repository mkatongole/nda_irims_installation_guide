Ext.define('Admin.view.frontoffice.drugshop.grids.SpreadSheetDrugshopTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
    width: '100%',
    xtype: 'spreadsheetdrugshoptypes',
    layout: 'fit',
    store: 'spreadsheetapplicationbusinesstypesstr',
    title: 'Select Drug Shop Application Types',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'business_type_id',
        name: 'id',
        hidden: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        flex:1
    }],
     listeners:{
        select: 'loadApplicationColumns'
     }
});