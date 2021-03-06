"use strict";

System.register(["./bar-chart", "./periscope-widget-chartjs.css!"], function (_export, _context) {
  return {
    setters: [function (_barChart) {
      var _exportObj = {};

      for (var _key in _barChart) {
        if (_key !== "default") _exportObj[_key] = _barChart[_key];
      }

      _export(_exportObj);
    }, function (_periscopeWidgetChartjsCss) {}],
    execute: function () {
      function configure(aurelia) {
        aurelia.globalResources("./bar-chart");
      }

      _export("configure", configure);
    }
  };
});