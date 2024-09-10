 Ext.define('Admin.view.frontoffice.safetyreporting.grids.SrMedicalHistoryView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'srmedicalhistoryview',
   layout: 'fit',
    store: 'spreadsheetsrmedicalhistorystr',
    title: 'SR Site Product Details',
     viewConfig: {
            emptyText: 'No information found for the Sr product under criteria'
        },
     columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'relevant_history',
        text: 'Relevant History(MedDRA)',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'datecolumn',
        dataIndex: 'start_date',
        format: 'Y-m-d',
        text: 'Start Date',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        format: 'Y-m-d',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'continuing',
        text: 'Continuing',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'family_history',
        text: 'Family history',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'relevant_history',
        text: 'Relevant medical history',
        tdCls: 'wrap-text',
        flex: 1,
        tdCls: 'wrap-text'
    },
    ]
  });