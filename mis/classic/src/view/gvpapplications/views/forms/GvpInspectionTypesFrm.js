/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gvpapplications.views.forms.GvpInspectionTypesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gvpinspectiontypesfrm',
    controller: 'gvpapplicationsvctr',
    layout: 'form',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Inspection Type',
            margin: '0 20 20 0',
            name: 'inspection_type_id',
            valueField: 'id',
            required: true,
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setGvpApplicationCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            extraParams: {
                                model_name: 'InspectionType'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
    ],
    buttons:[
        {
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'gvpschedule_ispection_types',
            storeID: 'gvpinspectiontypesstr',
            action_url: 'gvpapplications/saveGvpScheduleInspectionTypes',
            handler: 'doCreateGvpApplicationParamWin'
        }
    ]
});