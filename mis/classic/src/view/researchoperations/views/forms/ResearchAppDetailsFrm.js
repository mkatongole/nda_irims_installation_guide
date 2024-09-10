Ext.define('Admin.view.research_operations.views.forms.ResearchAppdetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'researchappdetailsfrm',
    layout: {
        type: 'column'
    },
    autoScroll: true,
    itemId:'researchappdetailsfrm',
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top'
    },
	
		 dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'top',
            margin: 3,
            items:[
                {
                    xtype: 'tbspacer',
                    width: 2
                }
             
            ]
        }
    ],
	
    items: [
	    {
            xtype: 'hiddenfield',
            name: 'registered_promotionalapp_id'
        }, {
            xtype: 'hiddenfield',
            name: 'reg_application_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Type of Research',
            name: 'research_type_id',
            forceSelection: true,
            queryMode: 'local',columnWidth: 0.5,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_research_types'
                            }
                        }
                    },
                    isLoad: true
                },
            }
        },{
            xtype:'textfield',
            fieldLabel:'Aim of the research',
            columnWidth: 0.5,
            name: 'aim_research',
            hidden:false,
            allowBlank:true
        },{
            xtype:'textfield',
            fieldLabel: 'Purpose of the Research Project',
            name: 'research_purpose',
            allowBlank: false
        },
        {
            xtype:'textfield',
            fieldLabel: 'Primary Investigator or Project Lead',
            name: 'project_lead',
            allowBlank: false
        },
        {
            fieldLabel: 'Expected Duration (in months)',
            name: 'project_duration',
            xtype: 'numberfield',
            allowBlank: false,
            minValue: 1
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Key Objectives of the Research Project',
            name: 'research_objectives',
            columnWidth:0.5,
            allowBlank: false
        }, 
        {
            xtype: 'textarea',
            fieldLabel: 'Methods of Research',
            name: 'research_id',
            columnWidth:0.5,
            allowBlank: false
           
        },
        {
                xtype: 'textfield',
                name: 'other_advert_materials',
                fieldLabel: 'Specify the research Material',
                columnWidth:0.5,
                minValue: 1,
                hidden: true,
                allowBlank: true
            },
            {
            xtype: 'combo',
            fieldLabel: 'Type of meetings',
            columnWidth: 0.99,
            name: 'meeting_types_id',
            allowBlank: true,
            hidden:false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Type of meetings',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_advertisementmeeting_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            hidden:true,
            name: 'other_promotion_meetingtype',  columnWidth: 0.99,  allowBlank: true,
            fieldLabel:'topic of meetings'
        },{
            xtype:'textfield',
            grow: true, 
            growMax: 200, 
            hidden:true,
            fieldLabel:'Place where event is to be held ',  allowBlank: true,
            name: 'venue_of_exhibition',
			allowBlank:true,
        },
        {
            xtype: 'timefield', 
            fieldLabel: 'Start Time of the Event', 
            name: 'exhibition_start_time', 
            hidden: false,
            allowBlank: true,
            submitFormat: 'H:i:s', 
            format: 'H:i', 
            altFormats: 'H:i:s'
        },{
            xtype: 'timefield', 
            fieldLabel: 'End Time of the Event',
            name: 'exhibition_end_time', 
            hidden: false,
            allowBlank: true,
            submitFormat: 'H:i:s', 
            format: 'H:i',
            altFormats: 'H:i:s', 
        },
    {
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            name: 'description_language', 
            allowBlank: false,
            columnWidth:0.5,
            minValue: 1,
            fieldLabel:'Description'
        
     }
		
    ]
});


