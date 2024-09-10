
Ext.define('Admin.view.gmpapplications.views.panels.MdProductLineTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'mdproductlinetabpnl',
    listeners: {
        beforetabchange: function(tabPanel, newCard, oldCard) {
            const selectedIndex = tabPanel.items.indexOf(newCard);
            if (selectedIndex === 1) {
                var grid = tabPanel.down('mdproductLineDetailsaddgrid'),
                    block_id = grid.down('hiddenfield[name=block_id]').getValue();
                    inspection_category_id = grid.down('hiddenfield[name=inspection_category_id]').getValue();
                if (block_id ==='' || block_id=='') {
                    toastr.warning('Please add Block first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
                if (inspection_category_id ==='' || inspection_category_id=='') {
                    toastr.warning('Please add Inpection Manufacturing Category first!!', 'Warning Response');
                    return false; // Prevent tab change
                }
            }
        }
    },
    items: [
        {
            title: 'Manufacturing Site Blocks',
            autoScroll:true,
            xtype: 'mansiteblockdetailsfrm'
        },
        {
            title: 'Product Lines',
            autoScroll:true,
            xtype: 'mdproductLineDetailsaddgrid'
        }
    ]
});