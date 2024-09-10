/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpCommunication', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpCommunication',
    xtype: 'altgvpcommunication',

    items: [
        {
            xtype: 'altgvpcommunicationpanel'
        }
    ]
});