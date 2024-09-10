/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewDeskReviewSingleGmpApproval', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.SingleGmpApproval',
    xtype: 'newdeskreviewsinglegmpapproval',
    items: [
        {
            xtype: 'newsingledeskreviewgmpapprovalpanel'
        }
    ]
});