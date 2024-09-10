Ext.define('Admin.view.promotionmaterials.views.containers.HerbalVetMedicinesPromoWrapper', {
    extend:'Ext.Container',
	xtype:'herbalvetmedicinespromowrapper',
	itemId:'herbalvetmedicinespromowrapper',
    layout: 'fit',
    items: [
        {
            xtype:'vetmedicinespromodashboard'
        }
    ]
});