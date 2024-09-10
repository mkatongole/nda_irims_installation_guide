/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PrePremiseDetailsWinTabPnl', {
    extend: 'Admin.view.premiseregistration.views.panels.PremiseDetailsTabPnl',
    xtype: 'Prepremisedetailswintabpnl',
    itemId: 'Prepremisedetailswintabpnl',
    layout:'fit',
    items: [
        {
            title: 'Main Details',
            xtype: 'premisedetailsfrm'
        },
         {
            title: 'Particulars of Nearest Pharmancy',
            xtype: 'premisenearestpremisegrid'
        },
        {
            title: 'Premises Main Activities/Product Types',
            hidden: true,
            xtype: 'premiseotherdetailswingrid'
        },{
            xtype:'previewproductDocUploadsGrid',
            title: 'Application Uploaded Documents (All)'
        },
        {
            title: 'Manufacturing Site Product Lines(for Manufacturers Only)',
            hidden: true,
            xtype: 'premisesproductlinedetailsgrid'
        }
    ]
});