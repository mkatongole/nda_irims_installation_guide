/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gvpapplications.views.maininterfaces.renewal.RenewGvpReceiving', {
    extend: 'Admin.view.gvpapplications.views.sharedinterfaces.main.GvpReceiving',
    xtype: 'renewgvpreceiving',
    items: [
        {
            xtype: 'renewgvpreceivingwizard'
        }
    ]
});