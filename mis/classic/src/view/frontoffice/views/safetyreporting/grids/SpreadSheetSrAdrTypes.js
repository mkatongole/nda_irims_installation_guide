Ext.define('Admin.view.frontoffice.safetyreporting.grids.SpreadSheetSrAdrTypes', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    titleCollapse: true,
   width: '100%',
    xtype: 'spreadsheetsradrtypes',
    layout: 'fit',
    store: 'spreadsheetadrtypesstr',
    title: 'Select Sr Application Sections',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'section_id',
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