
Ext.define('Admin.view.premiseregistration.views.forms.PremiseInspectionRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseinspectionrecommfrm',
    itemId:'premiseinspectionrecommfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    scrollable:true,
    //autoScroll:true,
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
        name: 'locationcouncils_definations'
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
        name: 'premise_id'
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
                allowBlank: true,
                readOnly:true,
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
                readOnly:true,
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
                        readOnly:true,
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
                        readOnly:true,
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
            readOnly:true,
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
                readOnly:true,
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
                    readOnly:true,
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
                //readOnly:true,
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
                //readOnly:true,
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
               // readOnly:true,
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
                //readOnly:true,
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
                //readOnly:true,
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
                //readOnly:true,
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
                        villageStore = form.down('combo[name=village_id]').getStore(),
                        filterObj = {parish_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                        villageStore.removeAll();
                        villageStore.load({params: {filters: filterStr}});
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
                //readOnly:true,
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
               // readOnly:true,
                allowBlank:true,
                fieldLabel: 'Street/Road'
            },

            {
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                allowBlank:true,
                //readOnly:true,
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
                         allowBlank:true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
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
            name: 'state_of_walls',
            fieldLabel: 'State of finishing: (i) Walls',
            allowBlank: false
        }, {
            xtype: 'textarea',
            columnWidth: 1,
            name: 'state_of_roof',
            fieldLabel: 'State of finishing: (ii) Roof',
            allowBlank: false
        }, {
            xtype: 'textarea',
            columnWidth: 1,
            name: 'state_of_floor',
            fieldLabel: 'State of finishing:(iii) Floor',
            allowBlank: false
        },
        {
            xtype: 'textarea',
            columnWidth: 1,
            name: 'premise_nature',
            fieldLabel: 'Brief Description of the nature of the Premise(Permanent,Under Construction,etc)',
            allowBlank: false
         },
          {
                xtype: 'fieldcontainer',
                name:'new_room',
                columnWidth: 1,
                //fieldLabel: 'Size of premises in square meters (Recommended Size for Whole sale is  )',
                layout: 'fit',
                listeners: {
                    afterrender: function (fieldcontainer) {
                        var recommendedSizeField = Ext.ComponentQuery.query('hiddenfield[name=recommended_room_size]')[0];
                        var premiseTypeField = Ext.ComponentQuery.query('hiddenfield[name=premise_type]')[0];
                        if (recommendedSizeField) {
                            var recommendedSize = recommendedSizeField.getValue();
                            var premiseType = premiseTypeField.getValue();
                            fieldcontainer.setFieldLabel('Size of premises in square meters (Recommended Size for ' + premiseType + ' is: ' + recommendedSize + ')');
                        }
                    }
                },
                items:[{
                    xtype:'grid',
                tbar: [

                    {
                    xtype: 'button',
                    text: 'Add Room Size',
                    iconCls: 'x-fa fa-plus',
                    name: 'new_room',
                    ui: 'soft-green',
                    childXtype: 'premiseroomsizeFrm',
                    winWidth: '30%',
                    winTitle:'Add New Room'
                     },
                     {
                        xtype: 'exportbtn'
                    }
                    ],
                    plugins: [
                        {
                            ptype: 'gridexporter'
                        }
                    ],
                    features: [{
                        ftype: 'summary'
                    },{
                        ftype: 'searching',
                        minChars: 2,
                        mode: 'local'
                    }],
                    bbar: [{
                        xtype: 'pagingtoolbar',
                        width: '70%',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        beforeLoad: function () {
                            var store = this.getStore(),
                            grid = this.up('grid'),
                            form= grid.up('form');
                            premise_id = Ext.ComponentQuery.query("#premisedetailsfrm")[0].down('hiddenfield[name=premise_id]').getValue();
                            store.getProxy().extraParams = {
                                premise_id: premise_id
                            };
                        }
                    }
                    ],
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
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'width',
                        text: 'width(Meters)',
                        flex: 1
                    },
                    {
                        xtype: 'gridcolumn',
                        dataIndex: 'totalArea',
                        text: 'Total Area(square meters)',
                        flex: 1,
                        renderer: function (value, metaData, record) {
                            var length = record.get('length');
                            var width = record.get('width');
                            var totalArea = length * width;

                            var decimalArea = parseFloat(totalArea.toFixed(2));
                            totalArea = totalArea === decimalArea ? totalArea.toString() : decimalArea.toFixed(2);

                            return totalArea;
                        },
                        summaryType: function (records) {
                            var totalSum = 0;

                            Ext.each(records, function (record) {
                                var totalArea = record.get('length') * record.get('width');
                                totalSum += totalArea;
                            });

                            return totalSum;
                        },
                        summaryRenderer: function (val) {
                            var decimaltotalArea = parseFloat(val.toFixed(2));
                            val = val === decimaltotalArea ? val.toString() : decimaltotalArea.toFixed(2);
                            //val = Ext.util.Format.number(val, '0,000.00');
                            var recommendedSizeField = Ext.ComponentQuery.query('hiddenfield[name=recommended_room_size]')[0];
                            var recommendedSizeStatusDisplay = Ext.ComponentQuery.query('displayfield[name=recommended_room_status]')[0];
                            var recommendedSize = recommendedSizeField.getValue();
                            var valAsInteger = parseInt(val);
                            var recommendedSizeAsInteger = parseInt(recommendedSize);
                            if (valAsInteger >= recommendedSizeAsInteger) {
                                  recommendedSizeStatusDisplay.setValue('<div style="text-align: center;color:green;">Total Area  is ' + val + ' (square meters) which meets  Recommended Area of ' + recommendedSize + ' (square meters)</div>');
                            }else if (valAsInteger < recommendedSizeAsInteger){
                                 recommendedSizeStatusDisplay.setValue('<div style="text-align: center;color:red;">Total Area  is ' + val + ' (square meters) which Does not meet  Recommended Area of ' + recommendedSize + ' (square meters)</div>');

                            }else{
                               recommendedSizeStatusDisplay.setValue(' '); 
                            }
                            return 'Total Area ' + val;
                        }
                    },
                    {
                        text: 'Options',
                        xtype: 'widgetcolumn',
                        name: 'room_actions',
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
                                    handler: 'showEditPremiseRegParamWinFrm',
                                    storeID: 'roomsizesstr',
                                    stores: '[]'
                                }, {
                                    text: 'Delete',
                                    iconCls: 'x-fa fa-trash',
                                    table_name: 'tra_premise_room_sizes',
                                    storeID: 'roomsizesstr',
                                    action_url: 'premiseregistration/deletePremiseRegRecord',
                                    action: 'actual_delete',
                                    handler: 'doDeleteNonAppPremiseOtherDetailsWin'
                             }]
                          }
                     }
                },]
                },
                {
                    xtype: 'displayfield',
                    name: 'recommended_room_status',
                    columnWidth: 1
                }]
            },

             {
                xtype: 'fieldcontainer',
                columnWidth: 1,
                layout: {
                    type: 'column',
                },
                defaults: {
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        emptyText: '0. or -0.',
                        name: 'premise_latitude',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        emptyText: '3  ',
                        name: 'premise_longitude',
                        allowBlank: false
                    },
                    {
                        xtype: 'button',
                        columnWidth: 0.3,
                        margin:'10 0 0 0',
                        name:'capture_location',
                        iconCls: 'fa fa-location-arrow',
                        iconAlign: 'right', 
                        text: 'Capture Location',
                        handler: function () {
                        if (window.location.protocol === 'https:' || window.location.hostname !='localhost') {
                            if ("geolocation" in navigator) {
                                navigator.geolocation.getCurrentPosition(
                                    function (position) {
                                        var latitude = position.coords.latitude;
                                        var longitude = position.coords.longitude;
                                        // Populate the textfields
                                        Ext.ComponentQuery.query('textfield[name=premise_latitude]')[0].setValue(latitude);
                                        Ext.ComponentQuery.query('textfield[name=premise_longitude]')[0].setValue(longitude);
                                    },
                                    function (error) {
                                        Ext.Msg.alert("Geolocation Error", error);
                                    }
                                );
                            } else {
                                 Ext.Msg.alert("Geolocation Error", "Geolocation not available");
                                
                            }
                            } else {
                            Ext.Msg.alert("Security Error", "This feature requires a secure (HTTPS) connection.");
                         }
                        }
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
                        var locationDefinitionField = Ext.ComponentQuery.query('hiddenfield[name=locationcouncils_definations]')[0];
                        var premiseTypeField = Ext.ComponentQuery.query('hiddenfield[name=premise_type]')[0];
                        if (recommendedDistanceField) {
                            var recommendedDistance = recommendedDistanceField.getValue();
                            var premiseType = premiseTypeField.getValue();
                            var locationDefinition = locationDefinitionField.getValue();
                            fieldcontainer.setFieldLabel('Particulars of Nearest Pharmancy (Recommended Distance for ' + premiseType + ' ' + locationDefinition + ' is: ' + recommendedDistance + ')');
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
            value: new Date(),
            maxValue: new Date(),
            readOnly:true,
            format: 'd/m/Y',
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
            allowBlank:true,
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        }, {
        xtype: 'combo',
        name: 'inspection_type_id',
        fieldLabel: 'Inspection Type',
        queryMode: 'local',
        readOnly: true,
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
            },
            afterrender: function (cmbo) {
                var grid = cmbo.up('form'),
                    store = cmbo.getStore(),
                    filterObj = { id: 2 },
                    filterStr = JSON.stringify(filterObj);
                store.removeAll();
                store.load({ params: { filters: filterStr },
                    callback: function(records, operation, success) {
                        if (success && records && records.length > 0) {
                            var selectedRecord = records[0];
                            cmbo.setValue(selectedRecord.get('id'));
                        }
                    }
                });
              },
            }
        },
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: "Inspector's Recommendation",
            queryMode: 'local',
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
                                table_name: 'par_premiseinspection_recommendations'
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
                columnWidth: 1,
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: 'Reason for Your Choice (Above)',
                        name: 'recomendation_reason_id',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        columnWidth: 0.9,
                        allowBlank: false,
                        labelAlign: 'top',
                        displayField: 'name',
                        listeners: {
                            afterrender: {
                                fn: 'setParamCombosStore',
                                config: {
                                    pageSize: 100,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                        extraParams: {
                                            table_name: 'par_recommendation_reasons'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        name: 'btn_addrecommendation',
                        childXtype: 'premiseaddrecommendataionfrm',
                        columnWidth: 0.1,
                        disabled:true,
                        table_name: 'par_recommendation_reasons',
                        storeId: 'parrecommendationreasonstr',
                        margin: '30 0 0 0'
                    }
                ]
            }

        ]
     },

      {
            xtype:'fieldset',
            columnWidth: 1,
            hidden:true,
            name:'inspector_drugs',
            title: 'Inspector of Drug',
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
            name: 'inspector_drugs_recommendation_id',
            fieldLabel: "Inspector of Drug's Recommendation",
            queryMode: 'local',
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
            name: 'Inspector_drugs_remarks',
            allowBlank: true
        }

        ]
      },
      
      {
            xtype:'fieldset',
            columnWidth: 1,
            hidden:true,
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
            name: 'regional_inspector_remarks',
            allowBlank: true
        }

        ]
      },
      {
            xtype:'fieldset',
            columnWidth: 1,
            hidden:true,
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
            name: 'chiefregional_inspector_remarks',
            allowBlank: true
        }

        ]
     }
        
    ],
    buttons: [
        {
            text: 'Save Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            name:'btn_preminsprecommendation',
            handler: 'doSaveInspectionRecommendationDetails',
            action_url: 'premiseregistration/savePremiseInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        }
    ]
});