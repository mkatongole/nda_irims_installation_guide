/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductBioequivalenceTrialEvaluationDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.BioequivalenceTrialEvaluationApplicationDocUploadsGrid',
    xtype:'productbioequivalencetrialevaluationDocUploadsGrid',
    upload_tab:'productDocUploadsGrid',
    table_name:'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    }
});
