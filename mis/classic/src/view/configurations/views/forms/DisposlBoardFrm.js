
Ext.define('Admin.view.configurations.views.forms.DisposlBoardFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposlboardfrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'left',
        labelWidth: 108,
        margin: 5,
        xtype: 'textfield',
        width: '100%'
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [
        {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_disposal_bodies',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'License No',
        name: 'license_no',
        allowBlank: false
    },
    {
        xtype: 'datefield',
        name: 'expiry_date',
        fieldLabel: 'License Expiry Date',
        submitFormat: 'Y-m-d',
        format: 'd/m/Y',
        allowBlank: false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
    }, 
      {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name',
        allowBlank: false
    },
     {
        xtype: 'textfield',
        name: 'telephone',
        allowBlank: false,
        fieldLabel: 'Telephone No'

    },
    {
        xtype: 'textfield',
        name: 'email',
        allowBlank: true,
        fieldLabel: 'Email Address'
                  
    },
    {
        xtype: 'combo',
        fieldLabel: 'License Type',
        name: 'licence_type_id',
        allowBlank: false,
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
                                extraParams:{
                                table_name: 'par_disposal_license_types'
                            }
                          }
                        },
                    isLoad: true
            }
                  
        }
    }, 

    {
        xtype: 'combo',
        fieldLabel: 'Waste Handled',
        name: 'waste_type_id',
        allowBlank: false,
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
                                extraParams:{
                                table_name: 'par_disposal_waste_types'
                            }
                           }
                        },
                    isLoad: true
                  
        }
       }
    },
       
   {
        xtype: 'combo',
        fieldLabel: 'Country',
        name: 'country_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        allowBlank: false,
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
                            regionStore = form.down('combo[name=region_id]').getStore(),
                            filterObj = {country_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        regionStore.removeAll();
                        regionStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'Region',
                name: 'region_id',
                //store: 'regionsstr',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                allowBlank: false,
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
                            }
                        },
                        isLoad: false
                    },
                    change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                            districtStore = form.down('combo[name=district_id]').getStore(),
                            filterObj = {region_id: newVal},
                            filterStr = JSON.stringify(filterObj);
                        districtStore.removeAll();
                        districtStore.load({params: {filter: filterStr}});
                    }
                }
            },
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                allowBlank: false,
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
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
            }
                  
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Physical Address',
        name: 'physical_address',
        allowBlank: true
    },     
    {
        xtype: 'textarea',
        fieldLabel: 'Postal Address',
        name: 'postal_address',
        hidden:true,
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Active',
        name: 'is_enabled',
        allowBlank: false
    }
       ],
    buttons: [
     {
        xtype: 'button',
        formBind: true,
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        handler: 'doCreateConfigParamWin',
        action_url: 'configurations/saveConfigCommonData',
        table_name: 'tra_disposal_bodies',
        storeID: 'disposalbodieStr',
    }, {
        xtype: 'button',
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-times',
        name: 'reset_btn',
        handler: function () {
            this.up('form').getForm().reset();
         }
        }]
});

