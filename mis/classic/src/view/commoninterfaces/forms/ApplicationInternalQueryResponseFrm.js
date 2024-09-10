/**
 * Created by Kip on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationInternalQueryResponseFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationinternalqueryresponsefrm',
    controller: 'commoninterfacesVctr',
    
    scrollable: true,
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    defaults: {
        margin: 3,
        allowBlank: false,
		width: '99%',
		margin: 5,
        labelAlign: 'top'
    },
    items: [
       {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            columnWidth: 1,
            labelAlign: 'top'
        },
        items:[{
            xtype: 'combo',
            fieldLabel: 'Query Category Item',
            name: 'checklist_querycategory_id',
            forceSelection: true,
            columnWidth: 0.8,
            readOnly: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: true,
            listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_checklist_querycategories'
                                    }
                                }
                            },
                            isLoad: false
                        },
                         afterrender: function () {
                            var form = this.up('form'),
                                store = this.getStore(),
                                module_id = form.down('hiddenfield[name=module_id]').getValue(),
                                sub_module_id = form.down('hiddenfield[name=sub_module_id]').getValue();
                               if(module_id==4 || module_id===4 || module_id==12 || module_id===12){
                                       var filterObj = {module_id: module_id, sub_module_id: sub_module_id};
                                }else{
                                      filterObj = {module_id: module_id};
                                }
                                filterStr = JSON.stringify(filterObj);
                            store.removeAll();
                            store.load({params: {filters: filterStr}});
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: 'Query Checklist Item' ,
                    iconCls:'x-fa fa-plus',
                    columnWidth: 0.2,hidden:true,
                    winTitle: 'Add Query Checklist',
                    margin: '30 0 0 0',winWidth: '45%',
                    childXtype:'querychecklistitemsfrm',
                    handler:'funcAddquerychecklistitems',
                }
            ]
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Query/Observations/Finding',
            name: 'query',
            readOnly: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Query Response',
            name: 'query_response'
            //allowBlank: true,
            //readOnly: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sub_module_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'checklistitems_queries'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'module_id,sub_module_id,section_id,table_name,item_resp_id'
        }
    ],
     dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                
                '->',
                {
                    xtype: 'button',
                    text: 'Save Query',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-save',
                    formBind: true,
                    reload_base:1,
                    action: 'save_query',
                    action_url: 'saveInternalApplicationQuery',
                    handler: 'saveInternalApplicationQuery'
                }
            ]
        }
    ]
});
