Ext.define('Admin.view.dashboard.Todos', {
    extend: 'Ext.panel.Panel',
    controller: 'dashboardvctr',
    xtype: 'todo',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    cls: 'todo-list shadow-panel',
    title: 'TODO List',
    height: 280,
    bodyPadding: 15,
    layout: 'fit',
    tools: [
        {
         type: 'refresh',
         toggleValue: false,
          handler: function () {
            var panel = this.up('panel'),
            grid = panel.down('gridpanel'); 
            var store = grid.getStore();
            store.removeAll();
            store.reload();
         }
        }
    ],
    items: [
        {
            xtype: 'gridpanel',
            cls: 'dashboard-todo-list',
            header: false,
            hideHeaders: true,
            scrollable: {
                x: false,
                y: false
            },
            listeners: {
                    beforerender: {
                        fn: 'func_setStore',
                        config: {
                            pageSize: 1000,
                            storeId: 'taskgridstr',
                            proxy: {
                                url: 'dashboard/getTodoListItems',
                            }
                        },
                        isLoad: true
                }
            },
           columns: [ 
               {
                    xtype: 'gridcolumn',
                    width: 40,
                    hidden:true,
                    dataIndex: 'id',
                    text: '#'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'task',
                    text: 'Task',
                    flex: 1
                },{
                    xtype: 'widgetcolumn',
                    width: 40,
                    widget: {
                        width: 40,
                        textAlign: 'left',
                        xtype: 'button',
                        ui: 'soft-red',
                        action_url: 'configurations/deleteConfigRecord', 
                        iconCls: 'x-fa fa-trash',
                        handler: 'doDeleteTodo',
                        storeID: 'taskgridstr',
                        table_name: 'tra_todo'
                    }
                }
            ],

            dockedItems: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    dock: 'bottom',
                    padding: '10 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            fieldLabel: 'Add Task',
                            name: 'task',
                            hideLabel: true,
                            width:540,
                            padding: '10 0 10 0',
                            emptyText: 'Add New Task'
                        },
                        {
                            xtype: 'button',
                            ui: 'soft-green',
                            width: 40,
                            action_url: 'dashboard/saveTodo',
                            storeID: 'taskgridstr',
                            table_name: 'tra_todo',
                            handler: 'doCreate',
                            iconCls: 'x-fa fa-plus',
                            margin:'10 0 10 0'
                        }
                    ]
                }
            ]
        }
    ]
});
