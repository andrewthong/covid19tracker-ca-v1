/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./epcalc.js":
/*!*******************!*\
  !*** ./epcalc.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var legendheight = 67;

function range(n) {
  return Array(n).fill().map(function (_, i) {
    return i;
  });
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

var sum = function sum(arr, bools) {
  var x = 0;

  for (var i = 0; i < arr.length; i++) {
    x = x + arr[i] * (bools[i] ? 1 : 0);
  }

  return x;
};

var Integrators = {
  Euler: [[1]],
  Midpoint: [[.5, .5], [0, 1]],
  Heun: [[1, 1], [.5, .5]],
  Ralston: [[2 / 3, 2 / 3], [.25, .75]],
  K3: [[.5, .5], [1, -1, 2], [1 / 6, 2 / 3, 1 / 6]],
  SSP33: [[1, 1], [.5, .25, .25], [1 / 6, 1 / 6, 2 / 3]],
  SSP43: [[.5, .5], [1, .5, .5], [.5, 1 / 6, 1 / 6, 1 / 6], [1 / 6, 1 / 6, 1 / 6, 1 / 2]],
  RK4: [[.5, .5], [.5, 0, .5], [1, 0, 0, 1], [1 / 6, 1 / 3, 1 / 3, 1 / 6]],
  RK38: [[1 / 3, 1 / 3], [2 / 3, -1 / 3, 1], [1, 1, -1, 1], [1 / 8, 3 / 8, 3 / 8, 1 / 8]]
}; // f is a func of time t and state y
// y is the initial state, t is the time, h is the timestep
// updated y is returned.

var integrate = function integrate(m, f, y, t, h) {
  for (var k = [], ki = 0; ki < m.length; ki++) {
    var _y = y.slice(),
        dt = ki ? m[ki - 1][0] * h : 0;

    for (var l = 0; l < _y.length; l++) {
      for (var j = 1; j <= ki; j++) {
        _y[l] = _y[l] + h * m[ki - 1][j] * k[ki - 1][l];
      }
    }

    k[ki] = f(t + dt, _y, dt);
  }

  for (var r = y.slice(), l = 0; l < _y.length; l++) {
    for (var j = 0; j < k.length; j++) {
      r[l] = r[l] + h * k[j][l] * m[ki - 1][j];
    }
  }

  return r;
};

var Time_to_death = 32;
var logN = Math.log(7e6);
var N = Math.exp(logN);
var I0 = 1;
var R0 = 2.2;
var D_incbation = 5.2;
var D_infectious = 2.9;
var D_recovery_mild = 14 - 2.9;
var D_recovery_severe = 31.5 - 2.9;
var D_hospital_lag = 5;
var D_death = Time_to_death - D_infectious;
var CFR = 0.02;
var InterventionTime = 100;
var OMInterventionAmt = 2 / 3;
var InterventionAmt = 1 - OMInterventionAmt;
var Time = 220;
var Xmax = 110000;
var dt = 2;
var P_SEVERE = 0.2;
var duration = 7 * 12 * 1e10; // dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration

function get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration) {
  var interpolation_steps = 40;
  var steps = 110 * interpolation_steps;
  var dt = dt / interpolation_steps;
  var sample_step = interpolation_steps;
  var method = Integrators["RK4"];

  function f(t, x) {
    // SEIR ODE
    if (t > InterventionTime && t < InterventionTime + duration) {
      var beta = InterventionAmt * R0 / D_infectious;
    } else if (t > InterventionTime + duration) {
      var beta = 0.5 * R0 / D_infectious;
    } else {
      var beta = R0 / D_infectious;
    }

    var a = 1 / D_incbation;
    var gamma = 1 / D_infectious;
    var S = x[0]; // Susectable

    var E = x[1]; // Exposed

    var I = x[2]; // Infectious 

    var Mild = x[3]; // Recovering (Mild)     

    var Severe = x[4]; // Recovering (Severe at home)

    var Severe_H = x[5]; // Recovering (Severe in hospital)

    var Fatal = x[6]; // Recovering (Fatal)

    var R_Mild = x[7]; // Recovered

    var R_Severe = x[8]; // Recovered

    var R_Fatal = x[9]; // Dead

    var p_severe = P_SEVERE;
    var p_fatal = CFR;
    var p_mild = 1 - P_SEVERE - CFR;
    var dS = -beta * I * S;
    var dE = beta * I * S - a * E;
    var dI = a * E - gamma * I;
    var dMild = p_mild * gamma * I - 1 / D_recovery_mild * Mild;
    var dSevere = p_severe * gamma * I - 1 / D_hospital_lag * Severe;
    var dSevere_H = 1 / D_hospital_lag * Severe - 1 / D_recovery_severe * Severe_H;
    var dFatal = p_fatal * gamma * I - 1 / D_death * Fatal;
    var dR_Mild = 1 / D_recovery_mild * Mild;
    var dR_Severe = 1 / D_recovery_severe * Severe_H;
    var dR_Fatal = 1 / D_death * Fatal; //      0   1   2   3      4        5          6       7        8          9

    return [dS, dE, dI, dMild, dSevere, dSevere_H, dFatal, dR_Mild, dR_Severe, dR_Fatal];
  }

  var v = [1 - I0 / N, 0, I0 / N, 0, 0, 0, 0, 0, 0, 0];
  var t = 0;
  var P = [];
  var TI = [];
  var Iters = [];
  var dataset = {
    "d": [],
    "h": [],
    "r": [],
    "i": [],
    "e": []
  };

  while (steps--) {
    if ((steps + 1) % sample_step == 0) {
      //    Dead   Hospital          Recovered        Infectious   Exposed
      P.push([N * v[9], N * (v[5] + v[6]), N * (v[7] + v[8]), N * v[2], N * v[2]]);
      Iters.push(v);
      TI.push(N * (1 - v[0])); //chartjs prpe

      dataset.d.push(N * v[9]);
      dataset.h.push(N * (v[5] + v[6]));
      dataset.r.push(N * (v[7] + v[8]));
      dataset.i.push(N * v[2]);
      dataset.e.push(N * v[2]); // console.log((v[0] + v[1] + v[2] + v[3] + v[4] + v[5] + v[6] + v[7] + v[8] + v[9]))
      // console.log(v[0] , v[1] , v[2] , v[3] , v[4] , v[5] , v[6] , v[7] , v[8] , v[9])
    }

    v = integrate(method, f, v, t, dt);
    t += dt;
  }

  return {
    "P": P,
    "dataset": dataset,
    "deaths": N * v[6],
    "total": 1 - v[0],
    "total_infected": TI,
    "Iters": Iters,
    "dIters": f
  };
}

function max(P, checked) {
  return P.reduce(function (max, b) {
    return Math.max(max, sum(b, checked));
  }, sum(P[0], checked));
}

global.Sol = get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration);
var P = Sol["P"].slice(0, 100);
var timestep = dt;
var tmax = dt * 100;
var deaths = Sol["deaths"];
var total = Sol["total"];
var total_infected = Sol["total_infected"].slice(0, 100);
var Iters = Sol["Iters"];
var dIters = Sol["dIters"]; // var Pmax           = max(P, checked)

var lock = false;
var colors = ["#386cb0", "#8da0cb", "#4daf4a", "#f0027f", "#fdc086"];
var Plock = 1;
console.log(global.Sol); // chart time
// generate numerical labels

var chart_labels = _toConsumableArray(Array(Sol.dataset.d.length).keys()); // number formatting


var number_with_commas = function number_with_commas(x) {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

global.chart_config = {
  type: 'bar',
  data: {
    labels: chart_labels,
    datasets: [{
      label: 'Deaths',
      data: global.Sol.dataset.d,
      backgroundColor: colors[0],
      hoverBackgroundColor: colors[0],
      hoverBorderWidth: 0
    }, {
      label: 'Hospital',
      data: global.Sol.dataset.h,
      backgroundColor: colors[1],
      hoverBackgroundColor: colors[1],
      hoverBorderWidth: 0
    }, {
      label: 'Recovered',
      data: global.Sol.dataset.r,
      backgroundColor: colors[2],
      hoverBackgroundColor: colors[2],
      hoverBorderWidth: 0
    }, {
      label: 'Infectious',
      data: global.Sol.dataset.i,
      backgroundColor: colors[3],
      hoverBackgroundColor: colors[3],
      hoverBorderWidth: 0
    }, {
      label: 'Exposed',
      data: global.Sol.dataset.e,
      backgroundColor: colors[4],
      hoverBackgroundColor: colors[4],
      hoverBorderWidth: 0
    }]
  },
  options: {
    animation: {
      duration: 10
    },
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function label(tooltipItem, data) {
          return data.datasets[tooltipItem.datasetIndex].label + ": " + number_with_commas(tooltipItem.yLabel);
        }
      }
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          callback: function callback(value) {
            return number_with_commas(value);
          }
        }
      }]
    },
    legend: {
      display: true
    }
  }
};
var ep_chart_id = document.querySelector('#ep-chart');
global.ep_chart = new Chart(ep_chart_id, global.chart_config);
var ep_range = document.querySelector('input#epRange');
ep_range.addEventListener('change', function (event) {
  var new_intervention = parseInt(event.target.value, 10); // console.log(new_intervention)
  // only recalculate if we have a valid integer

  if (!isNaN(new_intervention)) {
    global.Sol = get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, new_intervention, InterventionAmt, duration);
    global.ep_chart.data.datasets[0].data = global.Sol.dataset.d;
    global.ep_chart.data.datasets[1].data = global.Sol.dataset.h;
    global.ep_chart.data.datasets[2].data = global.Sol.dataset.r;
    global.ep_chart.data.datasets[3].data = global.Sol.dataset.i;
    global.ep_chart.data.datasets[4].data = global.Sol.dataset.e;
    global.ep_chart.update(); // console.log(" update chart ")
  }
}); // var drag_y = function (){
//   var dragstarty = 0
//   var Pmaxstart = 0
//   var dragstarted = function (d) {
//     dragstarty = event.y  
//     Pmaxstart  = Pmax
//   }
//   var dragged = function (d) {
//     Pmax = Math.max( (Pmaxstart*(1 + (event.y - dragstarty)/500)), 10)
//   }
//   return drag().on("drag", dragged).on("start", dragstarted)
// }
// var drag_x = function (){
//   var dragstartx = 0
//   var dtstart = 0
//   var Pmaxstart = 0
//   var dragstarted = function (d) {
//     dragstartx = event.x
//     dtstart  = dt
//     Plock = Pmax
//     lock = true
//   }
//   var dragged = function (d) {
//     dt = dtstart - 0.0015*(event.x - dragstartx)
//   }
//   var dragend = function (d) {
//     lock = false
//   }
//   return drag().on("drag", dragged).on("start", dragstarted).on("end", dragend)
// }
// var drag_intervention = function (){
//   var dragstarty = 0
//   var InterventionTimeStart = 0
//   var dragstarted = function (d) {
//     dragstarty = event.x  
//     InterventionTimeStart = InterventionTime
//     Plock = Pmax
//     lock = true
//   }
//   var dragged = function (d) {
//     // InterventionTime = Math.max( (*(1 + (event.x - dragstarty)/500)), 10)
//     // console.log(event.x)
//     InterventionTime = Math.min(tmax-1, Math.max(0, InterventionTimeStart + xScaleTimeInv(event.x - dragstarty)))
//   }
//   var dragend = function (d) {
//     lock = false
//   }
//   return drag().on("drag", dragged).on("start", dragstarted).on("end", dragend)
// }
// var drag_intervention_end = function (){
//   var dragstarty = 0
//   var durationStart = 0
//   var dragstarted = function (d) {
//     dragstarty = event.x  
//     durationStart = duration
//     Plock = Pmax
//     lock = true
//   }
//   var dragged = function (d) {
//     // InterventionTime = Math.max( (*(1 + (event.x - dragstarty)/500)), 10)
//     // console.log(event.x)
//     duration = Math.min(tmax-1, Math.max(0, durationStart + xScaleTimeInv(event.x - dragstarty)))
//   }
//   var dragend = function (d) {
//     lock = false
//   }
//   return drag().on("drag", dragged).on("start", dragstarted).on("end", dragend)
// }
// var parsed = "";
// onMount(async () => {
//   var drag_callback_y = drag_y()
//   drag_callback_y(selectAll("#yAxisDrag"))
//   var drag_callback_x = drag_x()
//   drag_callback_x(selectAll("#xAxisDrag"))
//   var drag_callback_intervention = drag_intervention()
//   // drag_callback_intervention(selectAll("#interventionDrag"))
//   drag_callback_intervention(selectAll("#dottedline"))
//   // var drag_callback_intervention_end = drag_intervention_end()
//   // drag_callback_intervention_end(selectAll("#dottedline2"))
//   if (typeof window !== 'undefined') {
//     parsed = queryString.parse(window.location.search)
//     if (!(parsed.logN === undefined)) {logN = parsed.logN}
//     if (!(parsed.I0 === undefined)) {I0 = parseFloat(parsed.I0)}
//     if (!(parsed.R0 === undefined)) {R0 = parseFloat(parsed.R0)}
//     if (!(parsed.D_incbation === undefined)) {D_incbation = parseFloat(parsed.D_incbation)}
//     if (!(parsed.D_infectious === undefined)) {D_infectious = parseFloat(parsed.D_infectious)}
//     if (!(parsed.D_recovery_mild === undefined)) {D_recovery_mild = parseFloat(parsed.D_recovery_mild)}
//     if (!(parsed.D_recovery_severe === undefined)) {D_recovery_severe = parseFloat(parsed.D_recovery_severe)}
//     if (!(parsed.CFR === undefined)) {CFR = parseFloat(parsed.CFR)}
//     if (!(parsed.InterventionTime === undefined)) {InterventionTime = parseFloat(parsed.InterventionTime)}
//     if (!(parsed.InterventionAmt === undefined)) {InterventionAmt = parseFloat(parsed.InterventionAmt)}
//     if (!(parsed.D_hospital_lag === undefined)) {D_hospital_lag = parseFloat(parsed.D_hospital_lag)}
//     if (!(parsed.P_SEVERE === undefined)) {P_SEVERE = parseFloat(parsed.P_SEVERE)}
//     if (!(parsed.Time_to_death === undefined)) {Time_to_death = parseFloat(parsed.Time_to_death)}
//   }
// });
// function lock_yaxis(){
//   Plock = Pmax
//   lock  = true
// }
// function unlock_yaxis(){
//   lock = false
// }
// const padding = { top: 20, right: 0, bottom: 20, left: 25 };
// let width  = 750;
// let height = 400;
// var xScaleTime = scaleLinear()
//   .domain([0, tmax])
//   .range([padding.left, width - padding.right]);
// var xScaleTimeInv = scaleLinear()
//   .domain([0, width])
//   .range([0, tmax]);
// var indexToTime = scaleLinear()
//   .domain([0, P.length])
//   .range([0, tmax])
// window.addEventListener('mouseup', unlock_yaxis);
// var checked = [true, true, false, true, true]
// var active  = 0
// var active_ = active >= 0 ? active : Iters.length - 1
// var Tinc_s = "\\color{#CCC}{T^{-1}_{\\text{inc}}} "
// var Tinf_s = "\\color{#CCC}{T^{-1}_{\\text{inf}}}"
// var Rt_s   = "\\color{#CCC}{\\frac{\\mathcal{R}_{t}}{T_{\\text{inf}}}} "
// var ode_eqn = katex.renderToString("\\frac{d S}{d t}=-" +Rt_s +"\\cdot IS,\\qquad \\frac{d E}{d t}=" +Rt_s +"\\cdot IS- " + Tinc_s + " E,\\qquad \\frac{d I}{d t}=" + Tinc_s + "E-" + Tinf_s+ "I, \\qquad \\frac{d R}{d t}=" + Tinf_s+ "I", {
//   throwOnError: false,
//   displayMode: true,
//   colorIsTextColor: true
// });
// function math_inline(str) {
//   return katex.renderToString(str, {
//   throwOnError: false,
//   displayMode: false,
//   colorIsTextColor: true
//   });
// }
// function math_display(str) {
//   return katex.renderToString(str, {
//   throwOnError: false,
//   displayMode: true,
//   colorIsTextColor: true
//   });
// }
// var p_num_ind = 40
// var get_d = function(i){
//   return dIters(indexToTime(i), Iters[i])
// }
// function get_milestones(P){
//   function argmax(x, index) {
//     return x.map((x, i) => [x[index], i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
//   }
//    //    Dead   Hospital          Recovered        Infectious   Exposed
//   var milestones = []
//   for (var i = 0; i < P.length; i++) {
//     if (P[i][0] >= 0.5) {
//       milestones.push([i*dt, "First death"])
//       break
//     }
//   }
//   var i = argmax(P, 1)
//   milestones.push([i*dt, "Peak: " + format(",")(Math.round(P[i][1])) + " hospitalizations"])
//   return milestones
// }
// var milestones = get_milestones(P)
// var log = true
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
const decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");
const splitOnFirst = __webpack_require__(/*! split-on-first */ "./node_modules/split-on-first/index.js");

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
		case 'separator':
			return key => (result, value) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (result.length === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
			};

		default:
			return key => (result, value) => {
				if (value === undefined || (options.skipNull && value === null)) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
		case 'separator':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;
				const newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function validateArrayFormatSeparator(value) {
	if (typeof value !== 'string' || value.length !== 1) {
		throw new TypeError('arrayFormatSeparator must be single character string');
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode(value, options) {
	if (options.decode) {
		return decodeComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function removeHash(input) {
	const hashStart = input.indexOf('#');
	if (hashStart !== -1) {
		input = input.slice(0, hashStart);
	}

	return input;
}

function getHash(url) {
	let hash = '';
	const hashStart = url.indexOf('#');
	if (hashStart !== -1) {
		hash = url.slice(hashStart);
	}

	return hash;
}

function extract(input) {
	input = removeHash(input);
	const queryStart = input.indexOf('?');
	if (queryStart === -1) {
		return '';
	}

	return input.slice(queryStart + 1);
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ',',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : options.arrayFormat === 'comma' ? value : decode(value, options);
		formatter(decode(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none',
		arrayFormatSeparator: ','
	}, options);

	validateArrayFormatSeparator(options.arrayFormatSeparator);

	const formatter = encoderForArrayFormat(options);

	const objectCopy = Object.assign({}, object);
	if (options.skipNull) {
		for (const key of Object.keys(objectCopy)) {
			if (objectCopy[key] === undefined || objectCopy[key] === null) {
				delete objectCopy[key];
			}
		}
	}

	const keys = Object.keys(objectCopy);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

exports.parseUrl = (input, options) => {
	return {
		url: removeHash(input).split('?')[0] || '',
		query: parse(extract(input), options)
	};
};

exports.stringifyUrl = (input, options) => {
	const url = removeHash(input.url).split('?')[0] || '';
	const queryFromUrl = exports.extract(input.url);
	const parsedQueryFromUrl = exports.parse(queryFromUrl);
	const hash = getHash(input.url);
	const query = Object.assign(parsedQueryFromUrl, input.query);
	let queryString = exports.stringify(query, options);
	if (queryString) {
		queryString = `?${queryString}`;
	}

	return `${url}${queryString}${hash}`;
};


/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 0:
/*!*************************!*\
  !*** multi ./epcalc.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/andrew/projects/covidtracking/Covid19TrackerCA/src/edit/epcalc/epcalc.js */"./epcalc.js");


/***/ })

/******/ });