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
                // Create a new model
                var oModel = new JSONModel();
				oModel.setData({
					Total: 0,
					Ok: 0,
					Heavy: 0,
					Overweight: 0
				});

				this.getView().setModel(oModel, "itbModel");
				this._onUpdateFinished();
            }, 
            _onUpdateFinished: function(oEvent) {
				var oViewModel = this.getView().getModel("itbModel");
				var oDataModel = this.getOwnerComponent().getModel();

				oDataModel.read("/ProductSet/$count", {

					success: function(oData) {
						oViewModel.setProperty("/Total", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "LT", "1")],
					success: function(oData) {
						oViewModel.setProperty("/Ok", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "BT", "1", "5")],
					success: function(oData) {
						oViewModel.setProperty("/Heavy", oData);
					}
				});

				oDataModel.read("/ProductSet/$count", {
					filters: [new Filter("WeightMeasure", "GT", "5")],
					success: function(oData) {
						oViewModel.setProperty("/Overweight", oData);
					}
				});

			},
			onFilterSelect:function(oEvent){
				var oBinding = this.getView().byId("listTable").getBinding("items");
				
				var sKey = oEvent.getParameter("key");
				
				if( sKey === "Ok" ){
					oBinding.filter(
						new Filter("WeightMeasure", "LT", "1") );
				} else if( sKey === "Heavy" ){
						oBinding.filter(
						new Filter("WeightMeasure", "BT","1","5") );
				} else if( sKey === "Overweight" ){
						oBinding.filter(
						new Filter("WeightMeasure", "GT", "5") );
				} else if ( sKey === "All") {
                    oBinding.filter([]);
                }
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
			},
            
    });
    }
);