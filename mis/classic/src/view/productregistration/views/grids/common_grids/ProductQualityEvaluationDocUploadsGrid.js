/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductQualityEvaluationDocUploadsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.QualityEvaluationApplicationDocUploadsGrid',
    xtype:'productqualityevaluationDocUploadsGrid',
    upload_tab:'productDocUploadsGrid',
    table_name:'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    }
});
