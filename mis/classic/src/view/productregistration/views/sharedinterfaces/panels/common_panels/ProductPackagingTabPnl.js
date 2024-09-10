/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.ProductPackagingTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'productpackagingtabpnl',
    listeners: {
        beforetabchange: function(tabPanel, newCard, oldCard) {
            const selectedIndex = tabPanel.items.indexOf(newCard);
            if (selectedIndex === 5) {
                var grid = tabPanel.down('diluentProductPackagingGrid'),
                    pack_id = grid.down('hiddenfield[name=pack_id]').getValue();
                if (pack_id ==='' || pack_id=='') {
                    toastr.warning('Please add Primary Packaging Details first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
             if (selectedIndex === 1) {
                var grid = tabPanel.down('diluentProductPackagingGrid'),
                    pack_id = grid.down('hiddenfield[name=pack_id]').getValue();
                if (pack_id ==='' || pack_id=='') {
                    toastr.warning('Please add Primary Packaging Details first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
            if (selectedIndex === 2) {
                var grid = tabPanel.down('diluentProductPackagingGrid'),
                    pack_id = grid.down('hiddenfield[name=pack_id]').getValue();
                if (pack_id ==='' || pack_id=='') {
                    toastr.warning('Please add Primary Packaging Details first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
             if (selectedIndex === 3) {
                var grid = tabPanel.down('diluentProductPackagingGrid'),
                    pack_id = grid.down('hiddenfield[name=pack_id]').getValue();
                if (pack_id ==='' || pack_id=='') {
                    toastr.warning('Please add Primary Packaging Details first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }if (selectedIndex === 4) {
                var grid = tabPanel.down('diluentProductPackagingGrid'),
                    pack_id = grid.down('hiddenfield[name=pack_id]').getValue();
                if (pack_id ==='' || pack_id=='') {
                    toastr.warning('Please add Primary Packaging Details first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
        }
    },
    items: [
        {
            title: 'Primary Packaging Details',
            autoScroll:true,
            xtype: 'primarydrugsProductPackagingFrm'
        },
        {
            title: 'Secondary Packaging Details',
            autoScroll:true,
            xtype: 'secondarydrugsProductPackagingFrm'
        },
         {
            title: 'Tertiary Packaging Details(Optional)',
            autoScroll:true,
            xtype: 'tertiarydrugsProductPackagingFrm'
        },{
            title: 'Other(i) (Optional)',
            autoScroll:true,
            xtype: 'shipperdrugsProductPackagingFrm'
        },{
            title: 'Other(ii) (Optional)',
            autoScroll:true,
            xtype: 'otherdrugsProductPackagingFrm'
        },
        {
            title: 'Diluents(Optional',
            autoScroll:true,
            xtype: 'diluentProductPackagingGrid'
        }
    ]
});