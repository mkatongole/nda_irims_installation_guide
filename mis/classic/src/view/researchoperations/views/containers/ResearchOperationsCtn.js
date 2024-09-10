/**
 * Created by Jeff on 09/02/2024.
 */
Ext.define('Admin.view.research_operations.views.containers.ResearchOperationsCtn', {
    extend: 'Ext.Container',
    xtype: 'researchoperationsctn',
    controller: 'researchoperationsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 34
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
        },
        {
            xtype: 'researchoperationsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'researchoperationstb',
            region: 'south'
        }
        ]
});