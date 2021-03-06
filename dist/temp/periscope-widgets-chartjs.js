'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarChart = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _barChart = require('./bar-chart');

Object.keys(_barChart).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _barChart[key];
    }
  });
});
exports.configure = configure;

var _chartist = require('chartist');

var _chartist2 = _interopRequireDefault(_chartist);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _periscopeFramework = require('periscope-framework');

require('chartist/dist/chartist.css!');

require('./periscope-widget-chartjs.css!');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_HEIGHT = 450;

var BarChart = exports.BarChart = function (_Chart) {
  _inherits(BarChart, _Chart);

  function BarChart(settings) {
    _classCallCheck(this, BarChart);

    return _possibleConstructorReturn(this, _Chart.call(this, settings));
  }

  BarChart.prototype.refresh = function refresh() {
    var _this2 = this;

    _Chart.prototype.refresh.call(this);
    var query = new _periscopeFramework.Query();
    query.filter = this.dataFilter;
    this.dataSource.getData(query).then(function (dH) {
      _this2.chartData = _this2.mapData(dH.data, _this2.categoriesField);
      _this2.createChart();
    });
  };

  BarChart.prototype.mapData = function mapData(data, categoryField) {
    var lbl = [],
        d = [];
    _.forOwn(_.groupBy(data, categoryField), function (v, k) {
      lbl.push(k);
      d.push(v.length);
    });
    return {
      labels: lbl,
      series: [d]
    };
  };

  BarChart.prototype.createChart = function createChart() {
    var options = {
      width: '100%',
      height: this.minHeight ? this.minHeight : DEFAULT_HEIGHT,
      seriesBarDistance: 100,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 85
      }
    };
    if (this.chartElement) new _chartist2.default.Bar(this.chartElement, this.chartData, options);
  };

  _createClass(BarChart, [{
    key: 'chartData',
    get: function get() {
      return this._chartData;
    },
    set: function set(value) {
      this._chartData = value;
    }
  }]);

  return BarChart;
}(_periscopeFramework.Chart);

function configure(aurelia) {
  aurelia.globalResources("./bar-chart");
}