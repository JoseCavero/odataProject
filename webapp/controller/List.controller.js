sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("jose.cavero.odatap.odataproject.controller.List", {
            onInit: function () {

            }, 
            onSearch: function (oEvent) {
                // Get data
                var sQuery = oEvent.getParameter("query");
				var oTable = this.getView().byId("listTable");
				var oBinding = oTable.getBinding("items");

                // Build filters
				var aFilter = [];
				aFilter.push(new Filter(
					[new Filter("ProductID", FilterOperator.Contains, sQuery), new Filter("Category", FilterOperator.Contains, sQuery)],
					false
				));
                // Apply filters
				oBinding.filter(aFilter);
            },
            onListItemPress: function(oEvent) {
				/*var oRouter = sap.ui.core.UIComponent.getRouterFor(this);*/
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteDetail", {
					ProductID: oEvent.getSource().getBindingContextPath().split("'")[1]
				});
			}
    });
    }
);