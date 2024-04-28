sap.ui.define([],function(){
	"use strict";
	return {
		formatterFunction:function(WeightMeasure,WeightUnit){
			if(WeightMeasure<1){
				return "Success";
			}else if(WeightMeasure>1 && WeightMeasure<5){
				return "Warning";
			}else{
               return "Error";
         }
		}
	};
});