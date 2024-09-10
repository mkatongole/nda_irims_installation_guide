Ext.define('Admin.view.promotionmaterials.views.containers.HerbalVetVetMedicinesPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'herbalvetmedicinespromoadverts',
	alias:'widget.vetmedicinespromoadverts',
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
            value: 7
        },
        {
            xtype: 'vetmedicinespromowrapper',//'promotionmaterialswrapper',
            region: 'center'
        },
        {
            xtype: 'herbalvetmedicinespromotoolbar',
            region: 'south'
        }
    ]
});