
Ext.define('Admin.view.drugshopregistration.views.forms.PremiseRoomSizeFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseroomsizeFrm',
    scrollable:'true',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 1,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'hiddenfield',
            name: 'premise_id'
        },{
        xtype: 'hiddenfield',
        name: 'is_local',
        value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_premise_room_sizes'
        },
         {
            xtype: 'textfield',
            name: 'name', 
             fieldLabel: 'Room Name',
        },
        
        {
            xtype: 'textfield',
            name: 'length',
            fieldLabel: 'Length(Meters)'
        },
        {
            xtype: 'textfield',
            name: 'width', 
            fieldLabel: 'Width(Meters)',
     }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_premise_room_sizes',
            storeID: 'roomsizesstr',
            action_url: 'premiseregistration/savepremiseRoomSizes',
            handler: 'doCreatePremiseRegParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            name: 'reset_btn',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});