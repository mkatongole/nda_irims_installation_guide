
Ext.define('Admin.view.personnelmanagement.views.forms.PharmacistBasicInfoFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pharmacistbasicinfofrm',
    bodyPadding: 8,
    controller: 'personelmanagementvctr',
    autoScroll: true,
    items: [
        {
            xtype: 'container',
            layout: 'column',
            margin: '0 0 10 0',
            items: [
                {
                    xtype: 'image',
                    cls: 'userProfilePic',
                    name: 'user_photo',
                    height: 120,
                    width: 120,
                    columnWidth: 0.1,
                    alt: 'profile-picture',
                    src: 'resources/images/placeholder.png'
                }, {
                    xtype: 'filefield',
                    buttonOnly: true,
                    name: 'profile_photo',
                    buttonText: 'Upload',
                    anchor: '100%',
                    margin: '0 0 0 5',
                    labelWidth: 200,
                    columnWidth: 0.85,
                    listeners: {
                        change: 'uploadPersonnelImage'
                    }
                },
                {
                    xtype: 'hiddenfield',
                    name: 'saved_name'
                }
            ]
        }, {
            xtype: 'container',
            layout: 'column',
            defaults: {
                labelAlign: 'top',
                labelStyle: {
                    'font-weight': 'bold'
                },
                allowBlank: true
            },
            fieldDefaults: {
                xtype: 'textfield',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                }
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 20 0',
                    name: 'id'
                }, {
                    xtype: 'textfield',
                    value: token,
                    name: '_token',
                    hidden: true
                }, {
                    xtype: 'hiddenfield',
                    margin: '0 20 20 0',
                    name: 'table_name',
                    value: 'tra_pharmacist_personnel',
                    allowBlank: true
                },
                 {
                xtype: 'fieldcontainer',
                layout: 'column',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                     xtype: 'textfield',
                      fieldLabel:'P.S.U No',
                      allowBlank: false,
                      labelAlign: 'top',
                      name: 'psu_no',
                      columnWidth: 0.9
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        columnWidth: 0.1,
                        tooltip: 'Link',
                        margin: '30 0 0 0'
                    }
                ]
            },


               {
                xtype: 'datefield',
                name: 'psu_date',
                columnWidth: 0.25,
                fieldLabel: 'P.S.U Registration Date',
                submitFormat: 'Y-m-d',
                format: 'd/m/Y',
                allowBlank: false,
                altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00|Y-m-d H:i:s'
                },

                {
                xtype: 'fieldcontainer',
                layout: 'column',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                     xtype: 'textfield',
                      fieldLabel:'NIN',
                      allowBlank: true,
                      labelAlign: 'top',
                      name: 'nin_no',
                      columnWidth: 0.9
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-link',
                        columnWidth: 0.1,
                        tooltip: 'Link',
                        margin: '30 0 0 0'
                    }
                ]
            },


              {
                xtype: 'textfield',
                fieldLabel: 'Full Name',
                name: 'name',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                allowBlank: false,
                listeners: {
                    change: 'updateModelPharmacistNameOnChange'
                }
             },
             {
                    xtype: 'combo',
                    fieldLabel: 'Gender',
                    displayField: 'name',
                    valueField: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'gender_id',
                    forceSelection: true,
                    allowBlank: true,
                    //hidden: true,
                    queryMode: 'local',
                    listeners: {
                        beforerender: {
                            fn: 'setUserCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Gender'
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
                defaults: {
                    labelAlign: 'top'
                },
                items: [
                    {
                     xtype: 'textfield',
                      fieldLabel:'Telephone No',
                      allowBlank: false,
                      name: 'telephone',
                      columnWidth: 0.9
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        columnWidth: 0.1,
                        margin: '30 0 0 0',
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
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

            },
            {
                xtype: 'fieldcontainer',
                layout: 'column',
                columnWidth: 0.25,
                margin: '0 20 0 0',
                defaults: {
                    labelAlign: 'top'
                },
                items: [{
                      xtype: 'textfield',
                      fieldLabel:'Email Address',
                      allowBlank: true,
                      name: 'email',
                      columnWidth: 0.9,
                      listeners: {
                        change: 'updateModelPharmacistEmailOnChange'
                    }
                  },{
                        xtype: 'button',
                        iconCls: 'x-fa fa-plus',
                        columnWidth: 0.1,
                        name: 'addMail',
                        tooltip: 'Add',
                        margin: '30 0 0 0',
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
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
                columnWidth: 0.25,
                margin: '0 20 0 0',
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
            }, 
            {
                xtype: 'combo',
                fieldLabel: 'District',
                name: 'district_id',
                 columnWidth: 0.25,
                readOnly:false,
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
                 columnWidth: 0.25,
                readOnly:false,
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
                xtype: 'textarea',
                fieldLabel: 'Physical Address',
                name: 'physical_address',
                columnWidth: 1,
                margin: '0 20 0 0',
                allowBlank: true
            },{
                xtype: 'textarea',
                fieldLabel: 'Postal Address',
                name: 'postal_address',
                columnWidth: 1,
                margin: '0 20 0 0',
                hidden:true,
                allowBlank: true
            },{
                xtype: 'checkbox',
                inputValue: 1,
                hidden:true,
                uncheckedValue: 1,
                fieldLabel: 'Is Active',
                name: 'is_active',
                allowBlank: false
            }

            ]
        }
    ]
});

