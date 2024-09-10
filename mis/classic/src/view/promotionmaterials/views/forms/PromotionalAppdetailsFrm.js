Ext.define('Admin.view.promotionmaterials.views.forms.PromotionalAppdetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionalappdetailsfrm',
    layout: {
        type: 'column'
    },
    autoScroll: true,
    itemId:'promotionalappdetailsfrm',
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
            xtype:'fieldset',
            columnWidth: 0.99,
            //columnWidth: 1,
            itemId: 'main_fieldset',
            title: 'Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false
            },
            layout: 'column',
            items:[{
    			allowBlank:false,
                xtype: 'combo',
                fieldLabel: 'Type of Advertisement',
                name: 'advertisement_type_id',
                forceSelection: true,
                queryMode: 'local',
                columnWidth: 0.5,
                readOnly:true,
                value:1,
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
                                table_name: 'par_advertisement_types'
                            }
                        }
                    },
                    isLoad: true
                },
                change: 'onSelectionChangeAdvertseimentsTypes' 
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Type of Activity',
            columnWidth: 0.5,
            name: 'advertisement_channel_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Type of Activity',
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
                                table_name: 'par_advertisement_channel'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                    Others = form.down('textarea[name=other_advert_channels]');
                    if (newVal == 7|| newVal === 7) {
                        Others.setVisible(true);
                        Others.allowBlank = false;
                        Others.validate();
                    } else {
                        Others.reset();
                        Others.setVisible(false);
                        Others.allowBlank = true;
                        Others.validate();
                    }
                }
            }
        },
        {
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            hidden:true,
            allowBlank: true,
            name: 'other_advert_channels',  
            columnWidth: 0.99,  allowBlank: true,
            fieldLabel:'Specify the Type of Activity'
        },
        {
            xtype: 'tagfield',
            fieldLabel: 'Type of Advertisements Material',
            columnWidth: 0.99,
            name: 'promotions_material_id',
            allowBlank: true,
            hidden:true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Type of Advertisements Material',
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
                                table_name: 'par_promotion_material_items'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            Others = form.down('textfield[name=other_advert_materials]');
                        if (newVal == 10 || newVal === 10) {
                            Others.setVisible(true);
                            Others.allowBlank = false;
                            Others.validate();
                        } else {
                            Others.reset();
                            Others.setVisible(false);
                            Others.allowBlank = true;
                            Others.validate();
                        }
                }
            }
        },{
                xtype: 'textfield',
                name: 'other_advert_materials',
                fieldLabel: 'Specify the Advertisement Material',
                columnWidth:0.5,
                hidden: true,
                allowBlank: true
            },{
            xtype: 'tagfield',
            fieldLabel: 'Type of meetings',
            columnWidth: 0.99,
            name: 'meeting_types_id',
            allowBlank: true,
            hidden:true,
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
            name: 'other_promotion_meetingtype', 
            columnWidth: 0.99, 
            allowBlank: true,
            fieldLabel:'Other Type of meetings '
        },{
            xtype:'textfield',
            grow: true, 
            growMax: 200, 
            hidden:true,
            fieldLabel:'Name of premises where event is to be held ',  
            allowBlank: true,
            name: 'venue_of_exhibition',
			allowBlank:true,
        },{
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            hidden:true,
            name: 'physicaladdress_of_exhibition',  
            columnWidth: 0.99,  
            allowBlank: true,
            fieldLabel:' Plot No./ Street/ Municipal/ Town/ City/ Region '
        }, {
            xtype:'datefield',
            fieldLabel:'Start Date of the Event ',
            name: 'exhibition_start_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
			allowBlank:true,
        },{
            xtype:'datefield',
            fieldLabel:'End Date of the Event ',
            name: 'exhibition_end_date',
            hidden:true,
			allowBlank:true,submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            hidden:true,
            name: 'promotionameeting_other_information',  
            columnWidth: 0.99,  
            allowBlank: true,
            fieldLabel:' Other Information(Room Name / Area / Location)  '
        },{
            xtype:'textfield',
            hidden:true,
            fieldLabel:'Name of person / company responsible for event  ',
            name: 'events_responsible_person',
			allowBlank:true,
        },{
            xtype:'textfield',
            hidden:true,
            fieldLabel:'Responsible Person/Company Physical Address ',
            name: 'responsible_persons_physicaladdress',
			allowBlank:true,
        },{
            xtype:'textfield',
            hidden:true,
            fieldLabel:'Responsible Person/Company Contacts(Telephone Number & Email (if applicable)) ',
            name: 'responsible_persons_contacts',
			allowBlank:true,
        },  {
            xtype:'textarea',
            grow: true, 
            growMax: 200, 
            hidden:true,
            name: 'description_of_advert', columnWidth: 1,
            allowBlank: true,
            fieldLabel:'Description Promotion(Activities)'
        }, {
            xtype:'textarea',
            grow: true, 
            growMax: 200,
            hidden:true, 
            name: 'advert_language', 
            columnWidth: 1,
            allowBlank: true,
            fieldLabel:'Language of Publication or Advert'
        }, {
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Target audience',
            name: 'target_audience_id',
            forceSelection: true,
            queryMode: 'local',
            columnWidth: 1,
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
                                table_name: 'par_target_audiences'
                            }
                        }
                    },
                    isLoad: true
                },
              
            }
        },{
		
			allowBlank:true,
            xtype: 'combo',
            fieldLabel: 'Applicant as sponsor',
            name: 'applicant_as_sponsor',
            store: 'confirmationstr',
            valueField: 'id',
            hidden:true,
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            listeners:{
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                },
				//applicantAsSponsorHandler
				change: function (cbo, value) {
					
					
				
				var btn=cbo.up('form').down('button[name=sponsor_id_btn]');
				  
				if(value==1)
				 {
					 
					  btn.disable(true);
				 }else{
					  
					  btn.enable();
		        }
               }
				
            },
			
        },
		
		{
            xtype: 'fieldcontainer',
            layout: 'column',
            hidden:true,
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Sponsor Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'applicant_sponsor_name',
                    readOnly: true,
                    allowBlank: true,
                    columnWidth: 0.9
                },
                {
					bind:{disabled:'readOnly'},
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    allowBlank: true,
                    tooltip: 'Link to Sponsor',
                    name: 'sponsor_id_btn',
					//disabled:true,
                    handler: 'showSponsorSelectionList'
                }
            ]
          }
         ]
        }
		
    ]
});