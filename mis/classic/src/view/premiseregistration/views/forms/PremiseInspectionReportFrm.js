
Ext.define('Admin.view.premiseregistration.views.forms.PremiseInspectionReportFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseinspectionreportfrm',
    itemId:'premiseinspectionreportfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    scrollable:true,
    viewModel: {
        type: 'premiseregistrationvm'
    },
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name:'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'id'
    },{
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
    },
     {
        xtype: 'hiddenfield',
        name: 'premise_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'recommended_room_size'
        //par_recommended_roomsizes
    },
    {
        xtype: 'hiddenfield',
        name: 'recommended_distance'
        //par_recommended_distances
    },

    {
        xtype: 'hiddenfield',
        name: 'premise_type'
    },

     {
            xtype: 'hidden',
            name: '_token',
            value: token
        }, 
    {
        xtype: 'hiddenfield',
        name: 'record_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'report_type_id'
    },
     {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Premises Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[
            {
                xtype: 'combo',
                name: 'business_type_id',
                fieldLabel: 'Premise Type',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                 beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_business_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },
       

          {
                xtype: 'combo',
                name: 'applicant_type_id',
                fieldLabel: 'Application  made for?',
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                 beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseapplications_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
           },

            {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'name',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Name of the Premise'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        action: 'search_premise',
                        childXtype: 'premiseselectiongrid',
                        winTitle: 'Premises Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'column',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'tpin_no',
                        columnWidth: 0.9,
                        allowBlank: false,
                        fieldLabel: 'Tin No'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-search',
                        disabled: true,
                        columnWidth: 0.1,
                        tooltip: 'Search',
                        disabled:true,
                        action: 'search_tinno',
                        childXtype: 'tinnoeselectiongrid',
                        winTitle: 'Tin No Selection List',
                        winWidth: '90%',
                        margin: '30 0 0 0'
                    }
                ]
            }, 
             {
                xtype: 'textfield',
                name: 'company_registration_no',
                fieldLabel: 'Company Registration',
                allowBlank: true
            },  
            {
            xtype: 'datefield',
            name: 'registration_date',
            fieldLabel: 'Business Registration Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            hidden:true,
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
           },
           
            
               {
                xtype: 'combo',
                fieldLabel: 'Product Classification',
                name: 'product_classification_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                allowBlank: true,
                forceSelection: true,
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_premise_class'
                                }
                            }
                        },
                        isLoad: true
                    },
                        change: function(cmbo,newVal){
                            var form=cmbo.up('form'),
                            other_classification=form.down('textfield[name=other_classification]');
                            if(newVal==3||newVal===3){
                                var is_visible = true;
                            }else{
                                var is_visible = false;
                            }
                            other_classification.setVisible(is_visible);
                        }
                    }
                },
                 {
                    xtype: 'textarea',
                    name: 'other_classification',
                    columnWidth: 1,
                    fieldLabel: 'Other Classifications',
                    allowBlank:true,
                    hidden: true
                },
                {
                    xtype: 'textarea',
                    name: 'premise_reg_no',
                    columnWidth: 1,
                    fieldLabel: 'Permit Reg No',
                    allowBlank:true,
                    hidden: true
                },
                {
                    xtype: 'textarea',
                    name: 'permit_no',
                    columnWidth: 1,
                    fieldLabel: 'Permit No',
                    allowBlank:true,
                    hidden: true
                }
           

            ]
          },

        {
            xtype:'fieldset',
            columnWidth: 1,
            itemId: 'Location_fieldset',
            title: 'Location Details',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
                readOnly:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/country'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=district_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filters: filterStr}});
                    }
                }
            },
              {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                //store: 'regionsstr',
                readOnly:true,
                allowBlank:false,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_premise_districts'
                                }
                               }
                            },
                                isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        countyStore = form.down('combo[name=county_id]').getStore(),
                        filterObj = {district_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filters: filterStr}});
                        countyStore.removeAll();
                        countyStore.load({params: {filters: filterStr}});
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },

             {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
                readOnly:true,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_premise_regions'
                                }
                               }
                            },
                         isLoad: false
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },

             {
                xtype: 'combo',
                fieldLabel: 'County/Division',
                name: 'county_id',
                readOnly:true,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_county'
                                }
                               }
                            },
                         isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        subCountyStore = form.down('combo[name=sub_county_id]').getStore(),
                        filterObj = {county_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        subCountyStore.removeAll();
                        subCountyStore.load({params: {filters: filterStr}});
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },

            {
                xtype: 'combo',
                fieldLabel: 'Sub County',
                name: 'sub_county_id',
                readOnly:true,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_sub_county'
                                }
                               }
                            },
                         isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        parishStore = form.down('combo[name=parish_id]').getStore(),
                        filterObj = {sub_county_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        parishStore.removeAll();
                        parishStore.load({params: {filters: filterStr}});
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Parish',
                name: 'parish_id',
                readOnly:true,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_parishes'
                                }
                               }
                            },
                         isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        subCountyStore = form.down('combo[name=sub_county_id]').getStore(),
                        filterObj = {parish_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        subCountyStore.removeAll();
                        subCountyStore.load({params: {filters: filterStr}});
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },


             {
                xtype: 'combo',
                fieldLabel: 'Village',
                name: 'village_id',
                readOnly:true,
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                            beforerender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                         url: 'commonparam/getCommonParamFromTable',
                                         extraParams: {
                                         table_name: 'par_villages'
                                }
                               }
                            },
                         isLoad: false
                    }
                },
                triggers: {
                    clear: {
                        type: 'clear',
                        hideWhenEmpty: true,
                        hideWhenMouseOut: false,
                        clearOnEscape: true
                    }
                }
            },

           // {
           //      xtype: 'textfield',
           //      fieldLabel: 'village',
           //      allowBlank:true,
           //      readOnly:true,
           //      name: 'village'
           //  },
           {
                xtype: 'textarea',
                columnWidth: 1,
                name: 'street',
                readOnly:true,
                allowBlank:true,
                fieldLabel: 'Street/Road'
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                allowBlank:true,
                readOnly:true,
                columnWidth: 1,
                name: 'physical_address'
            },
            {
                xtype:'fieldcontainer',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                        readOnly:true,
                         allowBlank:true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        readOnly:true,
                        name: 'longitude',
                         allowBlank:true
                    }
                ]
            } 
           ]

          },

        {
            xtype:'fieldset',
            columnWidth: 1,
            title: 'Recommendations',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[
        {
            xtype: 'textarea',
            columnWidth: 1,
            readOnly:true,
            name: 'state_of_walls',
            fieldLabel: 'State of finishing: (i) Walls',
            allowBlank: false
        }, {
            xtype: 'textarea',
            columnWidth: 1,
            readOnly:true,
            name: 'state_of_roof',
            fieldLabel: 'State of finishing: (ii) Roof',
            allowBlank: false
        }, {
            xtype: 'textarea',
            columnWidth: 1,
            readOnly:true,
            name: 'state_of_floor',
            fieldLabel: 'State of finishing:(iii) Floor',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            readOnly:true,
            name: 'premise_nature',
            fieldLabel: 'Brief Description of the nature of the Premise(Permanent,Under Construction,etc)',
            allowBlank: false
         },
          {
                xtype: 'fieldcontainer',
                name:'new_room',
                columnWidth: 1,
                fieldLabel: 'Size of premises in square meters (indicate dimensions)',
                layout: 'fit',
                items:[{
                    xtype:'grid',
                tbar: [
                    {
                    xtype: 'button',
                    text: 'Add Room Size',
                    iconCls: 'x-fa fa-plus',
                    name: 'new_room',
                    hidden:true,
                    ui: 'soft-green',
                    childXtype: 'premiseroomsizeFrm',
                    winWidth: '30%',
                    winTitle:'Add New Room'
                     }
                    ],
                    bbar: [{
                        xtype: 'pagingtoolbar',
                        width: '100%',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        beforeLoad: function () {
                            var store = this.getStore(),
                            grid = this.up('grid'),
                            form= grid.up('form'),
                            premise_id = Ext.ComponentQuery.query("#premiseinspectionreportfrm")[0].down('hiddenfield[name=premise_id]').getValue();
                            store.getProxy().extraParams = {
                                premise_id: premise_id
                            };
                        }
                    }],
                    listeners: {
                        beforerender: {
                            fn: 'setPremiseRegGridsStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'roomsizesstr',
                                proxy: {
                                    url: 'premiseregistration/getPremiseRoomSizes'
                                }
                            },
                            isLoad: true
                     }
                    },
                        columns:[{
                        xtype: 'gridcolumn',
                        dataIndex: 'name',
                        text: 'Room Name',
                        flex: 1
   
                    },{
                        xtype: 'gridcolumn',
                        dataIndex: 'length',
                        text: 'length(Meters)',
                        flex: 1
                    },{
                        xtype: 'gridcolumn',
                        dataIndex: 'width',
                        text: 'width(Meters)',
                        flex: 1
                    },{
                        text: 'Options',
                        xtype: 'widgetcolumn',
                        width: 90,
                        widget: {
                            width: 75,
                            textAlign: 'left',
                            xtype: 'splitbutton',
                            iconCls: 'x-fa fa-th-list',
                            ui: 'gray',
                            menu: {
                                xtype: 'menu',
                                items: [{
                                   text: 'Edit',
                                    iconCls: 'x-fa fa-edit',
                                    winTitle: 'Update Room Size',
                                    childXtype: 'premiseroomsizeFrm',
                                    winWidth: '30%',
                                    hidden:true,
                                    handler: 'showEditPremiseRegParamWinFrm',
                                    storeID: 'roomsizesstr',
                                    stores: '[]'
                                }, {
                                    text: 'Delete',
                                    iconCls: 'x-fa fa-trash',
                                    table_name: 'tra_premise_room_sizes',
                                    storeID: 'roomsizesstr',
                                    hidden:true,
                                    action_url: 'premiseregistration/deletePremiseRegRecord',
                                    action: 'actual_delete',
                                    handler: 'doDeleteNonAppPremiseOtherDetailsWin'
                             }]
                          }
                     }
                },]
                }]
            },
             {
                xtype:'fieldcontainer',
                columnWidth: 1,
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: true
                    }
                ]
            }, 
             {
                xtype: 'fieldcontainer',
                name:'nearest_pharmacy',
                columnWidth: 1,
                //fieldLabel: 'Particulars of Nearest Pharmancy',
                layout: 'fit',
                listeners: {
                    afterrender: function (fieldcontainer) {
                        var recommendedDistanceField = Ext.ComponentQuery.query('hiddenfield[name=recommended_distance]')[0];
                        var premiseTypeField = Ext.ComponentQuery.query('hiddenfield[name=premise_type]')[0];
                        if (recommendedDistanceField) {
                            var recommendedDistance = recommendedDistanceField.getValue();
                            var premiseType = premiseTypeField.getValue();
                            fieldcontainer.setFieldLabel('Particulars of Nearest Pharmancy (Recommended Distance for ' + premiseType + ' is: ' + recommendedDistance + ')');
                        }
                    }
                },
                items:[{
                xtype: 'premiseinspectornearestpremisegrid'

             }]
         },
         {
            xtype: 'textarea',
            name: 'premise_size',
            columnWidth: 1,
            hidden:true,
            fieldLabel: 'Size of premises in square meters (indicate dimensions)',
            allowBlank: true
        },
        {
            xtype: 'textarea',
            name: 'proposed_changes',
            columnWidth: 1,
            fieldLabel: 'Proposed changes/adjustments to premises if any',
            allowBlank: true
        },

        {
            xtype: 'htmleditor',
            fieldLabel: 'Storage Details',
            columnWidth: 1,
            hidden:true,
            name: 'storage_details',
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Type of Storage Available',
            columnWidth: 1,
            hidden:true,
            name: 'storage_available',
            allowBlank: true
        },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Cold Storage Facilities(describe number and type)',
            columnWidth: 1,
            hidden:true,
            name: 'cold_storage_facilities',
            allowBlank: true
        },
        // {
        //     xtype: 'textarea',
        //     columnWidth: 1,
        //     name: 'remarks',
        //     fieldLabel: 'Any other comments',
        //     allowBlank: true
        // },
        {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            name: 'remarks',
            allowBlank: true
        },
        {
            xtype: 'datefield',
            name: 'actual_start_date',
            fieldLabel: 'Inspection Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
             value: new Date(),
            maxValue: new Date(),
            readOnly:true,
            bind: {
                readOnly: '{isReadOnly}'
            },
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            listeners: {
                change: function (field, newVal, oldVal) {
                    var form = field.up('form'),
                        end_date = form.down('datefield[name=actual_end_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            name: 'actual_end_date',
            fieldLabel: 'Actual End Date',
            submitFormat: 'Y-m-d',
            hidden:true,
            format: 'd/m/Y',
            bind: {
                readOnly: '{isReadOnly}'
            },
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'combo',
            name: 'inspection_type_id',
            fieldLabel: 'Inspection Type',
            queryMode: 'local',
            bind: {
                readOnly: '{isReadOnly}'
            },
            forceSelection: true,
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
                                table_name: 'par_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'htmleditor',
            columnWidth: 1,
            readOnly:true,
            name: 'remarks',
            fieldLabel: 'Any other comments',
            allowBlank: true
        },
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: "Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            bind: {
                readOnly: '{isReadOnly}'
            },
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
        ]
     },  {
            xtype:'fieldset',
            columnWidth: 1,
           // hidden:true,
            name:'regional_inspector',
            title: 'Regional Inspector Recommendations',
            collapsible: true,
            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[ {
            xtype: 'combo',
            name: 'regional_inspector_recommendation_id',
            fieldLabel: "Regional Inspector's Recommendation",
            queryMode: 'local',
            forceSelection: true,
            readOnly:true,
            allowBlank: true,
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
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
         {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            readOnly:true,
            name: 'regional_inspector_remarks',
            allowBlank: true
        }

        ]
      },
      {
            xtype:'fieldset',
            columnWidth: 1,
            //hidden:true,
            name:'chiefregional_inspector',
            title: 'Chief Regional Inspector Recommendations',
            collapsible: true,

            defaults: {
                labelAlign: 'top',
                allowBlank: false,
                labelAlign: 'top',
                margin: 5,
                xtype: 'textfield',
                allowBlank: false,
                columnWidth: 0.33,
            },
            layout: 'column',
            items:[ {
            xtype: 'combo',
            name: 'chiefregional_inspector_recommendation_id',
            fieldLabel: "Chief Regional Inspector's Recommendation",
            queryMode: 'local',
            readOnly:true,
            forceSelection: true,
            allowBlank: true,
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
                                table_name: 'par_premiseinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
         {
            xtype: 'htmleditor',
            fieldLabel: 'Comment',
            columnWidth: 1,
            readOnly:true,
            name: 'chiefregional_inspector_remarks',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: "Recommended By",
            readOnly:true,
            name: 'report_by',
            },

             {
            xtype: 'datefield',
            format: 'Y-m-d H:i:s',
            altFormats: 'Y-m-d H:i:s|Y-m-d',
            name: 'report_date',
            readOnly:true,
            fieldLabel: 'Report Recommended on',
            allowBlank: false
            }

        ]
     }
        
    ],
    buttons: [
        {
            text: 'Save Inspection Details & Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            bind: {
              hidden: '{isReadOnly}'
            },
            ui: 'soft-purple',
            name:'btn_preminsprecommendation',
            handler: 'doSaveInspectionRecommendationDetails',
            action_url: 'premiseregistration/savePremiseInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        }
    ]
});