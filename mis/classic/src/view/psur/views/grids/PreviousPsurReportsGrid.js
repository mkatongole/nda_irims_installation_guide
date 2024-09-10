Ext.define('Admin.view.psur.views.grids.PreviousPsurReportsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'previousPsurReportsGrid',
    cls: 'dashboard-todo-list',
    height: Ext.Element.getViewportHeight() - 118,
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
                product_id = pnl.down('hiddenfield[name=product_id]').getValue(),
                store = this.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                product_id: product_id,
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
                storeId: 'PreviousPsurReportGridStr',
                proxy: {
                    url: 'psur/getPreviousPsurReportApplications',
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
    
         }
    },
    columns: [{
	    	xtype: 'rownumberer'
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'tracking_no',
	        text: 'Tracking No',
	        flex: 1
	    },{
	        xtype: 'gridcolumn',
	        dataIndex: 'reference_no',
	        text: 'Ref Number',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'product_name',
	        text: 'Product Name',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'common_name',
	        text: 'Common Name',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'prodclass_category',
	        text: 'Product Category',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'applicant_name',
	        text: 'Applicant',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'from_date',
	        text: 'From Date',
	        flex: 1
	    },  {
	        xtype: 'gridcolumn',
	        dataIndex: 'to_date',
	        text: 'To date',
	        flex: 1
	    },{
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
		                text: 'View ReportDetails',
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
	                },{
	                    text: 'View Assessment Recommendations and Comments',
	                    iconCls: 'fa fa-clipboard-check',
	                    tooltip: 'view Assessment Recommendations and Comments',
	                    name: 'view_recommendation',
	                    winWidth: '70%',
	                    ui: 'soft-blue',
	                    handler: 'viewApplicationRecommendationLogs',
	                    stores: '[]'
	                },
					{
	                    text: 'Preview PSUR/PBRER Assessment Details',
	                    iconCls: 'fa fa-medkit',
	                    tooltip: 'Preview Assessment Details',
	                    childXtype: 'psurEvaluationFrm',
	                    winTitle: 'PSUR/PBRER Assessment Details',
	                    winWidth: '70%',
	                    isReadOnly: 1,
	                    handler: 'previewpsureAssessmentDetails'
	                }
	                ]
	            }
	        }
    }],
});
