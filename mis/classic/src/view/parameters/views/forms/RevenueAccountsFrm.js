Ext.define('Admin.view.parameters.views.forms.RevenueAccountsFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.revenueaccountsfrm',
    frame: false,
    bodyPadding: 10,
    controller: 'parametervctr',
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'form'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_revenue_accounts',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
    }, {
        xtype: 'combobox',
        forceSelection: true,
        name: 'gl_code_id',
        displayField: 'name',
        allowBlank: false,
        fieldLabel: 'Revenue Description',
        margin: '0 20 0 0',
        valueField: 'id',
        queryMode: 'local',
        listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        pageSize: 10000,
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'par_gl_accounts',
                                is_enabled: 1
                            }
                        }
                    },
                    isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Revenue Account',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'code'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Description',
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'description'
    },
    {
        xtype: 'checkboxfield',
        name: 'is_enabled',
        fieldLabel: 'Is enabled',
        inputValue: '1',
        uncheckedValue: '0',

    }
    ],
    action_url: 'parameters/revenueaccounts',
    store: 'revenueaccountsstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'revenueaccountsgrid',
        form: 'revenueaccountsfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        action: 'save',
        table_name: 'par_revenue_accounts',
        storeID: 'revenueaccountsstr',
        formBind: true,width: 150,
        height: 35,
        padding: '5 5 5 5',
        ui: 'soft-purple',
        action_url: 'configurations/saveConfigCommonData',
        handler: 'doCreateConfigParamWin'

    }, {
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-close',
        width: 15,
        height: 35,
        padding: '5 5 5 5',
        handler: function (btn) {
            btn.up('form').getForm().reset();
        }
    }]
});