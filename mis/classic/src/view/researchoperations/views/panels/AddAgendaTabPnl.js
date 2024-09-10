/**
 * Created by Jeff on 20/04/2024.
 */
Ext.define('Admin.view.research_operations.views.panels.AddAgendaTabPnl', {
    extend: 'Ext.form.Panel',
    xtype: 'addagendatabpnl',
    autoScroll: true,
    layout: 'form',
    bodyPadding: 8,
    frame: true,
    defaults: {
        labelAlign: 'top',
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'thematic_id'
        }, 
        {
        xtype: 'textfield',
        fieldLabel: 'Theme',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false,
    }, 
    {
        xtype: 'htmleditor',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save Theme',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_thematic_areas',
                    name: 'save_thematic_areas',
                    ui: 'soft-purple',
                    action: 'save_thematic_areas'
                },
                {
                    text: 'Edit Thematic Area',
                    iconCls: 'x-fa fa-lock',
                    action: 'edit_thematic_areas',
                    ui: 'soft-blue',
                    hidden: true,
                    name: 'edit_thematic_areas'
                    // handler: 'activateGrant'
                }, {
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        console.log(btn.up('form'));
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});