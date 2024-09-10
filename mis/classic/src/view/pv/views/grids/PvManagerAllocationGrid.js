Ext.define('Admin.view.pv.views.grids.PvManagerAllocationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'pvManagerAllocationGrid',
    cls: 'dashboard-todo-list',
    // header: false,
    controller: 'pvvctr',
    autoScroll: true,
    // autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Reports Found',
    },
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var grid = this.up('grid'),
                pnl = grid.up('panel'),
                module_id = pnl.down('hiddenfield[name=module_id]').getValue(),
                application_code = pnl.down('hiddenfield[name=active_application_code]').getValue(),
                workflow_stage_id = pnl.down('hiddenfield[name=workflow_stage_id]').getValue(),
                store = this.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                application_code: application_code,
                module_id: module_id,
                workflow_stage_id: workflow_stage_id
            }
        }
    }],

    selModel:{
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
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
                storeId: 'pvManagerAllocationGridStr',
                proxy: {
                    url: 'pv/getStagePvApplications',
                    
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
	    },

        {
        header: 'Report Category(ie AEFI,ADR,..)',
        dataIndex: 'report_category_id',
        flex: 1,
        renderer: function (value, metaData,record) {
            var report_category_id = record.get('report_category_id'),
             report_category = record.get('report_category');
            if (report_category_id==1 || report_category_id===1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return report_category;
            }else if(report_category_id==3 || report_category_id===3){
              metaData.tdStyle = 'color:white;background-color:blue';
              return report_category;
          }else if(report_category_id==2 || report_category_id===2){
              metaData.tdStyle = 'color:white;background-color:orange';
              return report_category;
          }else{
            return report_category;
           }
         }
       }, 

        {
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
	        dataIndex: 'reporter_name',
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
		                handler: 'showSelectedApplicationMoreDetails'
		            },{
	                    text: 'View Associated Documents',
	                    iconCls: 'fa fa-file-download',
	                    tooltip: 'View associated documents',
	                    action: 'view',
	                    winWidth: '70%',
	                    handler: 'showApplicationUploadedDocument',
	                    stores: '[]'
	                },
                    {
                        text: 'Comments',
                        iconCls: 'x-fa fa-weixin',
                        childXtype: 'applicationprevcommentsgrid',
                        winTitle: 'Assessment Comments',
                        comment_type_id: 1,
                        winWidth: '60%',
                        name: 'prev_comments',
                        handler: 'showApplicationComments',
                        stores: '[]'
                        }
	                ]
	            }
	        }
    }],
});
