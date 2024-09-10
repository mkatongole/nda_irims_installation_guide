/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gvpapplications.views.panels.cancellation.CancelGvpCommunicationPanel', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.panels.GvpManagersGenericPanel',
    xtype: 'cancelgvpcommunicationpanel',
    items: [
        {
            xtype: 'gvpwithdrawalcommunicationsgrid'
        }
    ]
});