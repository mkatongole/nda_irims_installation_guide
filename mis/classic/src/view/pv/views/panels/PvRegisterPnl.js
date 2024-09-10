Ext.define('Admin.view.pv.views.panels.PvRegisterPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pvRegisterPnl',
    controller: 'pvvctr',
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'fit',
    title:'ADR Reports Register',
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'active_application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'pv_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'pvRegisterGrid'
        }],
   
});