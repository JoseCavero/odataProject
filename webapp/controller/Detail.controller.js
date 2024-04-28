sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend(
      "jose.cavero.odatap.odataproject.controller.Detail",
      {
        onInit: function () {
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter
            .getRoute("RouteDetail")
            .attachPatternMatched(this._routeMatched, this);
        },
        _routeMatched: function (oEvent) {
          var sPath =
            "/ProductSet('" + oEvent.getParameter("arguments").ProductID + "')";
          this.getView().bindElement(sPath);
        },
      }
    );
  }
);
