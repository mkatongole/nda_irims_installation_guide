/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGVPConsitionalApprovals', {
    extend: 'Ext.panel.Panel',
    xtype: 'newgvpconditionalapprovals',
    layout:'fit',
    dockedItems: [
        {
            xtype: 'batchprocesstoolbar',
            
    }],
    items: [
        {
            xtype: 'newgvpconditionalapprovalspanel'
        }
    ]
});