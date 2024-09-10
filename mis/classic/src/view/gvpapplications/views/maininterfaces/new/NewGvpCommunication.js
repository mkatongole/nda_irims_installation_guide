/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.new.NewGvpCommunication', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpCommunication',
    xtype: 'newgvpcommunication',
    items: [
        {
            xtype: 'newgvpcommunicationpanel'
        }
    ]
});