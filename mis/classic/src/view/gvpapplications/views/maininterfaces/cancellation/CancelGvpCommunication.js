/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.cancellation.CancelGvpCommunication', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpCommunication',
    xtype: 'cancelgvpcommunication',

    items: [
        {
            xtype: 'cancelgvpcommunicationpanel'
        }
    ]
});