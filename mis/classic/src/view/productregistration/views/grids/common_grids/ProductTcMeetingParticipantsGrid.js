/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductTcMeetingParticipantsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productTcMeetingParticipantsGrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'tcmeetingparticipantsstr',
                proxy: {
                    url: 'clinicaltrial/getTcMeetingParticipants'
                }
            },
            isLoad: false
        },
       afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_participant]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tc_meeting_participants',
                        storeID: 'tcmeetingparticipantsstr',
                        action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteClinicalTrialWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ];
            }
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    emptyMsg: 'No Records',
                    table_name: 'tra_clinical_trial_applications',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            pnl = grid.up('panel'),
                            mainTabPnl = pnl.up('#contentPanel'),
                            activeTab = mainTabPnl.getActiveTab(),
                            meeting_id = activeTab.down('hiddenfield[name=id]').getValue();
                        store.getProxy().extraParams = {
                            meeting_id: meeting_id
                        }
                    }
                }
            ]
        }
    ],
    plugins: [{
        ptype: 'gridexporter'
    },{
        ptype: 'cellediting',
        clicksToEdit: 1,
        editing: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
            {
                    xtype: 'button',
                    name: 'update_attendance',
                    text: 'Update Attendance',
                    ui: 'soft-blue',
                    //hidden: true,
                    iconCls: 'fa fa-save',
                    listeners: {
                        beforerender: function(btn){
                            var grid = btn.up('grid'),
                                is_meeting = grid.is_meeting;
                            if(is_meeting == 1){
                                btn.setVisible(true);
                                grid.columns[2].setVisible(true);
                            }else{
                                grid.columns[2].setVisible(false);
                            }

                        },
                    },
                    handler: 'updateMeetingAttendance'
                },'->',{
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    width: '80%',
                    emptyMsg: 'No Records',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            pnl = grid.up('panel'),
                            mainTabPnl = pnl.up('#contentPanel'),
                            activeTab = mainTabPnl.getActiveTab(),
                            meeting_id = activeTab.down('hiddenfield[name=id]').getValue();
                        store.getProxy().extraParams = {
                            meeting_id: meeting_id
                        }
                    }
                }
            ]
        }
    ],
    columns: [
        {
            text: 'Participant Name',
            dataIndex: 'participant_name',
            flex: 1
        },
        {
            text: 'Participant Contact',
            dataIndex: 'phone',
            flex: 1
        },
        {
        xtype: 'tbspacer',
        width: 5
        },
        {
        xtype: 'gridcolumn',
        dataIndex: 'role_id',
        text: 'Role',
        width: 100,
        editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setCompStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        table_name: 'par_meeting_participant_roles'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                
                renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                    var textVal = record.get('role');
                    if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                        textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                    }
                    return textVal;
                }
                
            },
      {
            text: 'Attendance',
            dataIndex: 'has_attended',
            width: 100,
            xtype: 'checkcolumn', 
            editor: {
                xtype: 'checkbox',
                inputValue: true, 
                uncheckedValue: false, 
            },
            renderer: function (value, metaData,record) {
                var has_attended = record.get('has_attended')
                if (has_attended==1 || has_attended===1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return 'Attended';
                }else if(has_attended==3 || has_attended===3){
                  metaData.tdStyle = 'color:white;background-color:red';
                  return 'Pending Meeting';
              }else{
                metaData.tdStyle = 'color:white;background-color:grey';
                return 'Missed';
               }
            }
          }, 

        {
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
                    items: [
                        {
                            text: 'Delete',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'tc_meeting_participants',
                            storeID: 'tcmeetingparticipantsstr',
                            action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                            action: 'actual_delete',
                            handler: 'doDeleteClinicalTrialWidgetParam',
                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                        }
                    ]
                }
            }
        }
    ]
});