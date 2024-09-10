
Ext.define('Admin.view.productregistration.views.forms.common_forms.QualityOverallSummaryfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'qualityoverallsummaryfrm',
    //layout: 'form',
    frame: true,
    defaults: {
        allowBlank: false,
        labelStyle: 'font-weight:bold'
    },
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    layout: 'fit',
    items: [
     {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'report_section_id'
    },
   {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_quality_overrallsummaryreport',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },
    //  {
    //     xtype: 'hiddenfield',
    //     name: 'application_code'
    // },
      
        {
        xtype: 'htmleditor',
        name: 'report',
        contenteditable:true,
        focusable: true,
        enableFontSize: true,
        allowBlank: false
                     
    }
    ],
    buttons: [{
                text: 'Home',
                iconCls: 'x-fa fa-backward',
                action: 'back',
                currentPnlXtype: 'qualityoverallsummaryfrm',
                containerPnlXtype: 'drugqualityreportpnl',
                hiddenCompXtype: 'drugqualityreportgrid',
                containerType: 'drugqualityreportpnl',
                ui: 'soft-purple',
                handler: 'backToDashboardFromActive'
         },
         '->',
        {
            xtype: 'button',
            text: 'Save Report',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            action_url: 'productregistration/saveQualityReport',
            table_name: 'tra_quality_overrallsummaryreport',
            handler:'saveQualityReport',
        },
        {
            xtype: 'button',
            text: 'Clear',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});


