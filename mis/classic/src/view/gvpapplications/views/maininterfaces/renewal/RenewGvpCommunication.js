/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpCommunication', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpCommunication',
    xtype: 'renewgvpcommunication',
    items: [
        {
            xtype: 'renewgvpcommunicationpanel'
        }
    ]
});