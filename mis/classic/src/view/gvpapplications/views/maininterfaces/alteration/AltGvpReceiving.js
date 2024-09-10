/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.alteration.AltGvpReceiving', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'altgvpreceiving',
    items: [
        {
            xtype: 'altgvpreceivingwizard'
        }
    ]
});