Ext.define('Admin.view.psur.views.grids.PsurDirectorReviewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'psurdirectorreviewGrid',
    cls: 'dashboard-todo-list',
    // header: false,
    controller: 'psurVctr',
    autoScroll: true,
    // autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Report Found',
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
                process_id = pnl.down('hiddenfield[name=process_id]').getValue(),
                store = this.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                application_code: application_code,
                module_id: module_id,
                workflow_stage_id: workflow_stage_id,
                process_id: process_id
            }
        }
    }],
     tbar: [{
        xtype: 'tbspacer',
        width: 5
     },{
        text:'Batch Feedback Sharing',
        name:'share_feedback',
        iconCls: 'fa fa-mail-bulk',
        ui: 'soft-green',
        table_name: 'tra_psur_pbrer_applications',
        handler:'batchfeedbackReport',
        margin: 5
        
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
                storeId: 'psurDirectorGridStr',
                proxy: {
                    url: 'psur/getStagePsurApplications',
                    
                }
            },
            isLoad: true
        },
       afterrender: function(grid) {
                var pnl = grid.up('panel'),
                subModuleId = pnl.down('hiddenfield[name=sub_module_id]').getValue();
                grid.columns.forEach(function(column) {
            	if(subModuleId==116 || subModuleId===116){
		                    if (column.dataIndex === 'from_date') {
		                        column.setHidden(false);
		                    } 
		                    if (column.dataIndex === 'to_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'report_approval_date') {
		                        column.setHidden(true);
		                    }
		                    if (column.dataIndex === 'international_birth_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'data_log_point') {
		                        column.setHidden(false);
		                    }   
		              }else if(subModuleId==128 || subModuleId===128){
		                    if (column.dataIndex === 'from_date') {
		                        column.setHidden(true);
		                    } 
		                    if (column.dataIndex === 'to_date') {
		                        column.setHidden(true);
		                    }
		                    if (column.dataIndex === 'report_approval_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'international_birth_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'data_log_point') {
		                        column.setHidden(false);
		                    } 
		                  }else if(subModuleId==129 || subModuleId===129){
		                    if (column.dataIndex === 'from_date') {
		                        column.setHidden(false);
		                    } 
		                    if (column.dataIndex === 'to_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'report_approval_date') {
		                        column.setHidden(true);
		                    }
		                    if (column.dataIndex === 'international_birth_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'data_log_point') {
		                        column.setHidden(true);
		                    } 
		                  }else{
		                    if (column.dataIndex === 'from_date') {
		                        column.setHidden(false);
		                    } 
		                    if (column.dataIndex === 'to_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'report_approval_date') {
		                        column.setHidden(true);
		                    }
		                    if (column.dataIndex === 'international_birth_date') {
		                        column.setHidden(false);
		                    }
		                    if (column.dataIndex === 'data_log_point') {
		                        column.setHidden(false);
		                    }  
		                  }
		            });
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
         xtype: 'widgetcolumn',
         width: 120,
         widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            itemId: 'prints',
            ui: 'soft-green',
            text: 'Print Letter',
            iconCls: 'x-fa fa-certificate',
            backend_function: 'printPremiseRegistrationCertificate',
            handler: 'printTCPDFColumnPsurPermit',
            // bind: {
            //     disabled: '{record.is_notified <= 0 || record.is_notified === null}'
            //     //disabled: '{record.decision_id !== 1}'
            // }
        }
    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'tracking_no',
	        text: 'Tracking No',
	        flex: 1
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'applicant_name',
	        text: 'Applicant',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'report_type',
	        text: 'Report Type',
	        flex: 1
	    },  {
		    xtype: 'gridcolumn',
		    dataIndex: 'from_date',
		    text: 'Reporting Period From',
		    flex: 1
		},
		{
		    xtype: 'gridcolumn',
		    dataIndex: 'to_date',
		    text: 'Reporting Period To',
		    flex: 1
		},
		{
		    xtype: 'gridcolumn',
		    dataIndex: 'report_approval_date',
		    text: 'Approval Date',
		    flex: 1
		},
		{
		    xtype: 'gridcolumn',
		    dataIndex: 'international_birth_date',
		    text: 'International Birth Date',
		    flex: 1
		},
		{
		    xtype: 'gridcolumn',
		    dataIndex: 'data_log_point',
		    text: 'Data lock point',
		    flex: 1
		},
		{
		    xtype: 'gridcolumn',
		    dataIndex: 'version_no',
		    text: 'Version No',
		    flex: 1
		},{
	        xtype: 'gridcolumn',
	        dataIndex: 'is_notified',
	        text: 'Feedback Shared',
	        width: 120,
	        renderer: function (value, metaData) {
	            if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Yes";
	            }
	            metaData.tdStyle = 'color:white;background-color:gray';
	            return "Pending";
	        }
	    },{
	        xtype: 'widgetcolumn',
	        width: 150,
	        widget: {
	            width: 150,
	            textAlign: 'left',
	            xtype: 'button',
	            ui: 'soft-red',
	            text: 'Share Feedback',
	            iconCls: 'fa fa-mail-bulk',
	            handler: 'shareReportFeedback',
	            stores: '["psurDirectorGridStr"]',
	            table_name: 'tra_psur_pbrer_applications'
	        }
	    }, {
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
                        text: 'Comments/Recommendation',
                        iconCls: 'fa fa-clipboard-check',
                        childXtype: 'evaluationcommentspnl',
                        winTitle: '1st Assessment Comments',
                        winWidth: '90%',
                        handler: 'showApplicationCommentsGeneric',
                        childXtype: 'applicationprevcommentsgrid',
                        winWidth: '80%',
                        comment_type_id: 2,
                        stores: '[]',
                        isWin: 1
                      },
					{
	                    text: 'Preview Assessment Details',
	                    iconCls: 'fa fa-medkit',
	                    storeID:'psurManagerReviewGridStr',
	                    tooltip: 'Preview Assessment Details',
	                    childXtype: 'psurpreviewEvaluationFrm',
	                    winTitle: 'Assessment Details',
	                    winWidth: '90%',
	                    isReadOnly: 1,
	                    handler: 'previewpsureAssessmentDetails'
	                }
	                ]
	            }
	        }
    }],
});
