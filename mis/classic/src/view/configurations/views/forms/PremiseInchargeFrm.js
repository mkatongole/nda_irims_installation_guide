
Ext.define('Admin.view.configurations.views.forms.PremiseInchargeFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseinchargeFrm',
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
        value: 'tra_premise_incharge_personnel',
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
    },
         {
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'NIN',
              allowBlank: false,
              labelAlign: 'left',
              margin: '5 0 5 5',
              name: 'nin_no',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                margin: '5 5 5 0',
                columnWidth: 0.1,
                tooltip: 'Link'
          }]
         },

      {
        xtype: 'textfield',
        fieldLabel: 'Full Name',
        name: 'name',
        allowBlank: false
    },{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Telephone No',
              allowBlank: false,
              labelAlign: 'left',
              margin: '5 0 5 2',
              name: 'telephone',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                margin: '5 5 5 0',
                columnWidth: 0.1,
                name: 'addTel',
                tooltip: 'Add',
                handler: function (btn) {
                var mFrM = btn.up('form'),
                telephone2 =mFrM.down('textfield[name=telephone2]'),
                telephone3 = mFrM.down('textfield[name=telephone3]');

                if (telephone2.isHidden() && telephone3.isHidden()) {
                    telephone2.setHidden(false);
                } else if (telephone3.isHidden() && !telephone2.isHidden()) {
                    telephone3.setHidden(false);
                    mFrM.down('button[name=addTel]').setDisabled(true);
                }else if (!telephone2.isHidden() && !telephone3.isHidden()) {
                    toastr.error('Maximum number of Telephone Numbers allowed is three', 'Failure Response');
                }else{
                   telephone2.setHidden(false); 
                }

             }
          }]
         },

    {
        xtype: 'textfield',
        name: 'telephone2',
        hidden:true,
        allowBlank: true,
        fieldLabel: 'Telephone No 2',
        listeners: {
            afterrender: function (textfield) {
                // Check if the textfield has a value
                var value = textfield.getValue();

                // If the value is not empty or null, set hidden to false
                if (value) {
                    textfield.setHidden(false);
                }
            }
        }

    },
    {
        xtype: 'textfield',
        name: 'telephone3',
        hidden:true,
        allowBlank: true,
        fieldLabel: 'Telephone No 3',
        listeners: {
            afterrender: function (textfield) {
                // Check if the textfield has a value
                var value = textfield.getValue();

                // If the value is not empty or null, set hidden to false
                if (value) {
                    textfield.setHidden(false);
                }
            }
        }

    },{
          xtype:'panel',
          layout:{
              type:'column',
              columns:2
          },
          items:[{
              xtype: 'textfield',
              fieldLabel:'Email Address',
              allowBlank: false,
              labelAlign: 'left',
              margin: '5 0 5 2',
              name: 'email',
              columnWidth: 0.9
          },{
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                margin: '5 5 5 0',
                columnWidth: 0.1,
                name: 'addMail',
                tooltip: 'Add',
                handler: function (btn) {
                var mFrM = btn.up('form'),
                email2 =mFrM.down('textfield[name=email2]'),
                email3 = mFrM.down('textfield[name=email3]');

                if (email2.isHidden() && email3.isHidden()) {
                    email2.setHidden(false);
                } else if (email3.isHidden() && !email2.isHidden()) {
                    email3.setHidden(false);
                    mFrM.down('button[name=addMail]').setDisabled(true);
                }else if (!email2.isHidden() && !email3.isHidden()) {
                    toastr.error('Maximum number of Email Addreses allowed is three', 'Failure Response');
                }else{
                   email2.setHidden(false); 
                }

             }
          }]
         },
    {
        xtype: 'textfield',
        name: 'email2',
        hidden:true,
        allowBlank: true,
        fieldLabel: 'Email Address 2',
        listeners: {
            afterrender: function (textfield) {
                // Check if the textfield has a value
                var value = textfield.getValue();

                // If the value is not empty or null, set hidden to false
                if (value) {
                    textfield.setHidden(false);
                }
            }
        }
                  
    },
    {
        xtype: 'textfield',
        name: 'email3',
        hidden:true,
        allowBlank: true,
        fieldLabel: 'Email Address 3',
        listeners: {
            afterrender: function (textfield) {
                // Check if the textfield has a value
                var value = textfield.getValue();

                // If the value is not empty or null, set hidden to false
                if (value) {
                    textfield.setHidden(false);
                }
            }
        }
                  
    }, 

       {
        xtype: 'combo',
        fieldLabel: 'Qualification',
        name: 'qualification_id',
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
                                table_name: 'par_personnel_qualifications'
                            }
                          }
                        },
                    isLoad: true
            }
                  
        }
    }, {
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
    }, 
          
    {
        xtype: 'textarea',
        fieldLabel: 'Physical Address',
        name: 'physical_address',
        allowBlank: true
    },{
        xtype: 'textarea',
        fieldLabel: 'Postal Address',
        name: 'postal_address',
        hidden:true,
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        hidden:true,
        uncheckedValue: 1,
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
        table_name: 'tra_premise_incharge_personnel',
        storeID: 'premiseinchargeStr',
    },{
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

