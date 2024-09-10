// File: Admin/view/research_operations/views/forms/JsuitesEditor.js

Ext.define('Admin.view.research_operations.views.forms.JsuitesEditor', {
    extend: 'Ext.Component',
    alias: 'widget.jsuiteseditor',

    initComponent: function () {
        var me = this;

        // Call the parent class's initComponent method
        me.callParent();

        // Use a callback function to ensure jsuites.editor is initialized after jsuites.js is loaded
        me.initializeJsuitesEditor();
    },

    initializeJsuitesEditor: function () {
        var me = this;

        // Check if jsuites.editor is defined
        if (typeof jsuites !== 'undefined' && typeof jsuites.editor !== 'undefined') {
            // Create and initialize the jsuites.editor plugin
            me.editor = jsuites.editor(me.getEl(), {
                // Options for the jsuites.editor plugin
                mode: 'html', // default mode
                toolbar: true, // show toolbar
                statusbar: true, // show statusbar
                placeholder: 'Type something here...', // placeholder text
                onchange: function () {
                    // Custom logic when the content changes
                }
            });
        } else {
            // If jsuites.editor is not yet defined, wait for a short interval and retry
            Ext.defer(me.initializeJsuitesEditor, 100, me);
        }
    }
});
