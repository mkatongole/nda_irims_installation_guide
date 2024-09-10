Ext.define('Admin.view.frontoffice.gvp.grids.GvpInspectionTeamGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gvpinspectionteamgrid',
    scroll: true,
    width: '100%',
    title: 'Inspection Team Details',
     viewConfig: {
            emptyText: 'No information found for the inspection team'
        },
   // bbar: [{
   //      xtype: 'pagingtoolbar',
   //      width: '100%',
   //      displayInfo: true,
   //      displayMsg: 'Showing {0} - {1} of {2} total records',
   //      emptyMsg: 'No Records'
   //  }],
     listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'gvpInspectionTeamgridStr',
                proxy: {
                    url: 'openoffice/getGVPInspectionTeam',
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 50
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_name',
        text: 'Inspection Team Name',
        width: 150,
        tdCls: 'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_desc',
        text: 'Inspection Description',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'datecolumn',
        format: 'Y-m-d',
        dataIndex: 'start_date',
        text: 'Start Date',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        width: 150,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'inspectioncountry_list',
        text: 'Inspection Countries',
        width: 150,
        tdCls: 'wrap'
    }
    ]
});
