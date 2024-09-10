Ext.define('Admin.view.psur.views.grids.RegisteredProductsListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'registeredProductsListGrid',
    cls: 'dashboard-todo-list',
    itemId: 'registeredProductsListGrid',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'psurVctr',
    autoScroll: true,
    sub_module_id: 0,
    section_id: 0,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Reports Found'
    },
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var grid = this.up('grid'),
                tracking_no = grid.down('textfield[name=tracking_no]').getValue(),
                store = this.getStore();
            store.removeAll();
            store.getProxy().extraParams = {
                tracking_no: tracking_no,
                section_id: grid.section_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2
        // mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 100,
                remoteFilter: true,
                proxy: {
                    url: 'productregistration/getApprovedProductsRegApplications',
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadPsurWizardFromRecord'
    },
    tbar: [{
    	xtype: 'textfield',
    	name: 'tracking_no',
    	fieldLabel: 'Tracking Number',
    	margin: '0 0 0 0'
    },{
    	xtype: 'button',
    	iconCls: 'fa fa-search',
    	handler: 'reloadParentGridOnChange',
    	ui: 'soft-blue'
    },
	{
		xtype: 'displayfield',
		value: 'Double click to select!!',
		fieldStyle: {
			'color': 'green',
			'font-weight': 'bold'}
	},],
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
	        flex: 1,
	        hidden: true
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'brand_name',
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
	        dataIndex: 'date_added',
	        text: 'Date Received',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'approved_by',
	        text: 'Approved By',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'approval_date',
	        text: 'Approved On',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'expiry_date',
	        text: 'Expiry Date',
	        flex: 1
	    }, {
	        xtype: 'gridcolumn',
	        dataIndex: 'decision_id',
	        text: 'Approval Validity',
	        flex: 1,
	        renderer: function (value, metaData) {
	            if (value == 1) {
	                metaData.tdStyle = 'color:white;background-color:green';
	                return "Active";
	            }else if(value == 2){
	            	metaData.tdStyle = 'color:white;background-color:red';
	            	return "Expired";
	            }

	            
	        }
    }],
});
