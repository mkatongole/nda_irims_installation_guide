Ext.define('Admin.view.frontoffice.premise.grids.SpreadSheetPremiseTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
    width: '100%',
    xtype: 'spreadsheetpremisetypes',
    layout: 'fit',
    store: 'spreadsheetapplicationbusinesstypesstr',
    title: 'Select premise Application Sections',
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