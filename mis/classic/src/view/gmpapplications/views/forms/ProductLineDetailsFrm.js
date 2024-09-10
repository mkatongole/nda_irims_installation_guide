
Ext.define('Admin.view.gmpapplications.views.forms.ProductLineDetailsFrm', {
    extend: 'Admin.view.gmpapplications.views.forms.ProductLineAbstractFrm',
    xtype: 'productlinedetailsfrm',
    itemId:'productlinedetailsfrm',
    listeners: {
        afterrender: function () {
            var form = this,
                special_category_id = form.down('hiddenfield[name=special_category_id]').getValue(),
                inspection_category_id = form.down('hiddenfield[name=inspection_category_id]').getValue(),
                isSpecialCategory = form.down('hiddenfield[name=isSpecialCategory]').getValue(),
                productLineCategoryCombo = form.down('combo[name=category_id]'),
                productLineCategoryStr = form.down('combo[name=category_id]').getStore(),
                manufacturingSiteStr = form.down('combo[name=manufacturing_activity_id]').getStore();
                var filter = {'inspection_category_id':inspection_category_id};
                var filters = JSON.stringify(filter);
            if ((isSpecialCategory) && (isSpecialCategory == 1 || isSpecialCategory === 1)) {
                productLineCategoryStr.load({params:{filters:filters}});
                productLineCategoryCombo.setReadOnly(true);
                productLineCategoryCombo.setValue(special_category_id);
                manufacturingSiteStr.load({params:{filters:filters}});
            }else{
             productLineCategoryStr.load({params:{filters:filters}});
             manufacturingSiteStr.load({params:{filters:filters}});
            }
            
        }
    },
    initComponent: function () {
        this.callParent();
        this.add(
            {
            xtype: 'hiddenfield',
            name: 'manufacturingsite_block_id'
        },{
            xtype: 'hiddenfield',
            name: 'inspection_category_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isSpecialCategory'
        },
        {
            xtype: 'hiddenfield',
            name: 'special_category_id'
        }
        );
    }
});