Ext.define('Admin.view.promotionmaterials.views.containers.HerbalMedicalDevicesPromoAdverts', {
    extend: 'Ext.Container',
    xtype: 'herbalmedicaldevicespromoadverts',
	alias:'widget.medicaldevicespromoadverts',
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
            value: 8
        },
        {
            xtype: 'promotionadvertmedicaldeviceswrapper',
            region: 'center'
        },
        {
            xtype: 'herbalmedicaldevicespromoadvertstoolbar',
            region: 'south'
        }
    ]
});