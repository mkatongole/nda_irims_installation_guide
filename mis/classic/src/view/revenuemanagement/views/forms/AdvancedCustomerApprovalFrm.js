Ext.define('Admin.view.RevenueManagement.views.forms.AdvancedCustomerApprovalFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'advancedCustomerApprovalFrm',
    layout: 'column',
    // height: Ext.Element.getViewportHeight() - 118,
    bodyPadding: 5,
    controller: 'revenuemanagementvctr',
    defaults: {
        margin: 5,
        labelAlign: 'top',
        width: '100%',
        allowBlank: false,
        columnWidth: 1
    },
    scrollable: true,
    autoScroll: true,
    items: [{   
            xtype: 'hiddenfield',
            name: 'id',
            allowBlank: true
        },
        {   
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {   
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {   
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {   
            xtype: 'hiddenfield',
            name: 'customer_id'
        },
        {   
            xtype: 'hiddenfield',
            name: 'applicant_id'
        },
        {   
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        }, {
            xtype: 'combo', anyMatch: true,
            name: 'approval_decision_id',
            allowBlank: true,
            queryMode: 'local',
            fieldLabel: 'Decision',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setCompStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            extraParams:{
                                table_name: 'par_approval_decisions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'htmleditor',
            columnWidth: 1,
            name: 'remarks',
            isFocusable: true,
            fieldLabel:'Remarks',
            emptyText: 'Any Remarks...',
            allowBlank: false,
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Decision',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: '',
                storeID: 'advancedCustomerManagerApprovalGridStr',
                formBind: true,
                ui: 'soft-blue',
                action_url: 'revenuemanagement/onSaveAdvancedCustomerApproval',
                handler: 'saveAdvancedCustomerApprovaldetails'
            }
        ]
    }
    ]
});