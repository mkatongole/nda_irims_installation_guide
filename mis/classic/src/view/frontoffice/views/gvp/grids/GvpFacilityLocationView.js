 Ext.define('Admin.view.frontoffice.gvp.grids.GvpFacilityLocationView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   collapsible: true,
   titleCollapse: true,
   width: '100%',
    xtype: 'gvpfacilitylocationview',
   layout: 'fit',
    store: 'gvpspreadsheetfacilitylocationstr',
    title: 'Facility Location',
      viewConfig: {
            emptyText: 'No Locations'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        name: 'id',
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
       flex: 1
    }],
     listeners:{
        select: 'loadGvpFacilityLocation'
     }


  });