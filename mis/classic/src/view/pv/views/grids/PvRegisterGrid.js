Ext.define('Admin.view.pv.views.grids.PvRegisterGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pvRegisterGrid',
    cls: 'dashboard-todo-list',
    // header: false,
    controller: 'pvvctr',
    autoScroll: true,
    // autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No REports Found',
    },
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
    }],

    // selModel:{
    //     selType: 'checkboxmodel',
    //     mode: 'MULTI'
    // },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                storeId: 'pvRegisterGridStr',
                proxy: {
                    url: 'pv/getPvRegisterApplications',
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                panel = grid.up('panel'),
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                panel.down('button[name=process_submission_btn]').setDisabled(false);
            }else{
                panel.down('button[name=process_submission_btn]').setDisabled(true);
            }
    
         }
    },
    columns: [{
	    	xtype: 'rownumberer'
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'tracking_no',
	        text: 'Tracking No',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'adr_type',
	        text: 'Report Type',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'patient_name',
	        text: 'Patient Name',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'applicant_name',
	        text: 'Reporter',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'date_added',
	        text: 'Date Received',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'submitted_by',
	        text: 'Submitted By',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'submitted_on',
	        text: 'Submitted On',
	        flex: 1
	    },{
	        text: 'Options',
	        xtype: 'widgetcolumn',
	        width: 90,
	        widget: {
	            width: 75,
	            textAlign: 'left',
	            xtype: 'splitbutton',
	            iconCls: 'x-fa fa-th-list',
	            ui: 'gray',
	            menu: {
	                xtype: 'menu',
	                items: [{
		                text: 'View Report Details',
		                iconCls: 'fa fa-eye',
		                name: 'more_app_details',
		                ui: 'soft-blue',
		                isReadOnly: true,
		                handler: 'showPvRegisterMoreDetails'
		            },{
	                    text: 'View Associated Documents',
	                    iconCls: 'fa fa-file-download',
	                    tooltip: 'View associated documents',
	                    action: 'view',
	                    winWidth: '70%',
	                    handler: 'showApplicationUploadedDocument',
	                    stores: '[]'
	                }
	                ]
	            }
	        }
    }],
});
