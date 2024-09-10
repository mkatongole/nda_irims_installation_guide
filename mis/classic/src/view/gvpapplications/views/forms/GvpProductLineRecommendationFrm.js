/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpProductLineRecommendationFrm', {
    extend: 'Admin.view.gvpapplications.views.forms.GvpProductLineAbstractFrm',
    xtype: 'gvpproductlinerecommendationfrm',
    scrollable:true,
    listeners: {
        afterrender: function () {
            var form = this,
            productLineCategoryStr = form.down('combo[name=category_id]').getStore(),
            manufacturingSiteStr = form.down('combo[name=manufacturing_activity_id]').getStore();
            productLineCategoryStr.load();
            manufacturingSiteStr.load();
            
        }
    },

    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'hiddenfield',
                name: 'inspection_stage',
                value: 1
            },  {
                xtype: 'combo',
                fieldLabel: 'Review Recommendation',
                name: 'prodline_tcmeetingstatus_id',
                store: 'gvpproductlinestatusstr',
                forceSelection: true,
                allowBlank: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            },{
                xtype: 'combo',
                fieldLabel: 'DG Recommendation',
                name: 'prodline_dgstatus_id',
                store: 'gvpproductlinestatusstr',
                forceSelection: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            },{
                xtype: 'combo',
                fieldLabel: 'Status',
                name: 'product_line_status_id',
                store: 'gvpproductlinerecommendationstr',
                forceSelection: true,
                allowBlank: true,
                hidden: true,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id'
            }
        );
    }
});