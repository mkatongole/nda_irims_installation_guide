Ext.define('Admin.view.promotionmaterials.views.containers.HerbalMedicinePromoMats', {
    extend: 'Ext.Container',
    xtype: 'herbalmedicinepromomats',
	alias:'widget.medicinepromomats',
    controller: 'promotionmaterialviewcontroller',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 14
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 6
        },
        {
            xtype: 'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'herbalmedicinepromomaterialstoolbar',//'drugspremregtb',
            region: 'south'
        }
    ]
});