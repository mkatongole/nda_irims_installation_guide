 Ext.define('Admin.view.frontoffice.drugshop.grids.DrugshopPersonnelInfo', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'drugshoppersonnelinfo',
   layout: 'fit',
    store: 'spreadsheetdrugshoppersonnelinfostr',
    title: 'Drug Shop Personnel Details',
     viewConfig: {
            emptyText: 'No information found for the Drug Shop under set creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Name',
        name: 'Name',
        text: 'Personnel Name',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Qualifications',
        name: 'Qualifications',
        text: 'Qualifications',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'StudyField',
        name: 'StudyField',
        text: 'Study Field',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'start_date',
        name: 'start_date',
        text: 'Start Date',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        name: 'end_date',
        text: 'End Date',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });