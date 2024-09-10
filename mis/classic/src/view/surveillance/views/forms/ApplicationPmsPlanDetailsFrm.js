/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.ApplicationPmsPlanDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationpmsplandetailsfrm',
    controller: 'surveillancevctr',
    layout: 'column',
    //frame: true,
    scrollable: true,
    bodyPadding: 5,
    itemId: 'applicationpmsplandetailsfrmRefID',
    defaults: {
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Annual PMS Program Implementation',
            style: 'background:white',
            collapsible: true,
            checkboxToggle: true,
            layout: 'column',
            defaults: {
                columnWidth: 0.33,
                margin: 2,
                labelAlign: 'top',
                allowBlank: false
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'program_id'
                },{
                    xtype: 'hiddenfield',
                    name: 'program_implementation_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Annual Plan Implementation',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'program_implementation',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search',
                            name: 'link_pms_plan',
                            childXtype: 'pmsprogramsappselectiongrid',
                            winTitle: 'PMS Plan Selection List',
                            winWidth: '90%'
                        }
                    ]
                },{
                    xtype: 'textfield',
                    name: 'program_name',
                    fieldLabel:'Program Name',
                    readOnly: true
                },{
                    xtype: 'textfield',
                    name: 'program_description',
                    fieldLabel:'Program Description',
                    readOnly: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Implementation Start Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'implementationstart_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Implementation End Date',
                    submitFormat: 'Y-m-d',
                    readOnly: true,
                    format: 'd/m/Y',
                    name: 'implementationend_date',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },{
                    xtype: 'combo',
                    fieldLabel: 'Type/Category of Sampling Site',
                    forceSelection: true,
                    readOnly: false,
                    queryMode: 'local',
                    valueField: 'id',
                    allowBlank: true,
                    /* 
                        Could not load the sample Categories correctly hence the
                        allowBlank true for now
                    */
                    displayField: 'sampling_site',
                    name: 'sampling_site_id',
                    anyMatch: true,
                    listeners: {
                        beforerender: {
                            fn: 'setSurveillanceCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'surveillance/getPmsProgramSamplingSites',
                                    extraParams: {
                                        table_name: 'pms_program_samplingsites'
                                    }
                                }
                            },
                            isLoad: false
                        },
                        
                    }
                    },
                     {
                        xtype: 'combo',
                        fieldLabel: 'District',
                        name: 'district_id',
                        //store: 'regionsstr',
                        readOnly:false,
                         allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setSurveillanceCombosStore',
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
                            afterrender: function (cmbo) {
                                 var grid = cmbo.up('grid'),
                                 store = cmbo.getStore(),
                                 filterObj = {country_id: 37},
                                 filterStr = JSON.stringify(filterObj);
                                 store.removeAll();
                                 store.load({params: {filters: filterStr}});
                              },
                            change: function (cmbo, newVal) {
                                var form = cmbo.up('form'),
                                regionStore = form.down('combo[name=region_id]').getStore(),
                                filterObj = {district_id: newVal},
                                filterStr = JSON.stringify(filterObj);
                                regionStore.removeAll();
                                regionStore.load({params: {filters: filterStr}});
                               
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
                        readOnly:false,
                        allowBlank:true,
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        listeners: {
                                    beforerender: {
                                        fn: 'setSurveillanceCombosStore',
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
                    
                }
            ]
        },
    ]
});