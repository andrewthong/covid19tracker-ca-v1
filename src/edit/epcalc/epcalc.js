import queryString from "query-string";

const legendheight = 67 

  function range(n){
    return Array(n).fill().map((_, i) => i);
  }

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  var sum = function(arr, bools){
    var x = 0
    for (var i = 0; i < arr.length; i++) {
      x = x + arr[i]*(bools[i] ? 1 : 0)
    }
    return x
  }

  var Integrators = {
    Euler    : [[1]],
    Midpoint : [[.5,.5],[0, 1]],
    Heun     : [[1, 1],[.5,.5]],
    Ralston  : [[2/3,2/3],[.25,.75]],
    K3       : [[.5,.5],[1,-1,2],[1/6,2/3,1/6]],
    SSP33    : [[1,1],[.5,.25,.25],[1/6,1/6,2/3]],
    SSP43    : [[.5,.5],[1,.5,.5],[.5,1/6,1/6,1/6],[1/6,1/6,1/6,1/2]],
    RK4      : [[.5,.5],[.5,0,.5],[1,0,0,1],[1/6,1/3,1/3,1/6]],
    RK38     : [[1/3,1/3],[2/3,-1/3,1],[1,1,-1,1],[1/8,3/8,3/8,1/8]]
  };

  // f is a func of time t and state y
  // y is the initial state, t is the time, h is the timestep
  // updated y is returned.
  var integrate=(m,f,y,t,h)=>{
    for (var k=[],ki=0; ki<m.length; ki++) {
      var _y=y.slice(), dt=ki?((m[ki-1][0])*h):0;
      for (var l=0; l<_y.length; l++) for (var j=1; j<=ki; j++) _y[l]=_y[l]+h*(m[ki-1][j])*(k[ki-1][l]);
      k[ki]=f(t+dt,_y,dt); 
    }
    for (var r=y.slice(),l=0; l<_y.length; l++) for (var j=0; j<k.length; j++) r[l]=r[l]+h*(k[j][l])*(m[ki-1][j]);
    return r;
  }


  var Time_to_death     = 32
  var logN              = Math.log(7e6)
  var N                 = Math.exp(logN)
  var I0                = 1
  var R0                = 2.2
  var D_incbation       = 5.2       
  var D_infectious      = 2.9 
  var D_recovery_mild   = (14 - 2.9)  
  var D_recovery_severe = (31.5 - 2.9)
  var D_hospital_lag    = 5
  var D_death           = Time_to_death - D_infectious 
  var CFR               = 0.02  
  var InterventionTime  = 100  
  var OMInterventionAmt = 2/3
  var InterventionAmt   = 1 - OMInterventionAmt
  var Time              = 220
  var Xmax              = 110000
  var dt                = 2
  var P_SEVERE          = 0.2
  var duration          = 7*12*1e10

// dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration

  function get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration) {

    var interpolation_steps = 40
    var steps = 110*interpolation_steps
    var dt = dt/interpolation_steps
    var sample_step = interpolation_steps

    var method = Integrators["RK4"]
    function f(t, x){

      // SEIR ODE
      if (t > InterventionTime && t < InterventionTime + duration){
        var beta = (InterventionAmt)*R0/(D_infectious)
      } else if (t > InterventionTime + duration) {
        var beta = 0.5*R0/(D_infectious)        
      } else {
        var beta = R0/(D_infectious)
      }
      var a     = 1/D_incbation
      var gamma = 1/D_infectious
      
      var S        = x[0] // Susectable
      var E        = x[1] // Exposed
      var I        = x[2] // Infectious 
      var Mild     = x[3] // Recovering (Mild)     
      var Severe   = x[4] // Recovering (Severe at home)
      var Severe_H = x[5] // Recovering (Severe in hospital)
      var Fatal    = x[6] // Recovering (Fatal)
      var R_Mild   = x[7] // Recovered
      var R_Severe = x[8] // Recovered
      var R_Fatal  = x[9] // Dead

      var p_severe = P_SEVERE
      var p_fatal  = CFR
      var p_mild   = 1 - P_SEVERE - CFR

      var dS        = -beta*I*S
      var dE        =  beta*I*S - a*E
      var dI        =  a*E - gamma*I
      var dMild     =  p_mild*gamma*I   - (1/D_recovery_mild)*Mild
      var dSevere   =  p_severe*gamma*I - (1/D_hospital_lag)*Severe
      var dSevere_H =  (1/D_hospital_lag)*Severe - (1/D_recovery_severe)*Severe_H
      var dFatal    =  p_fatal*gamma*I  - (1/D_death)*Fatal
      var dR_Mild   =  (1/D_recovery_mild)*Mild
      var dR_Severe =  (1/D_recovery_severe)*Severe_H
      var dR_Fatal  =  (1/D_death)*Fatal

      //      0   1   2   3      4        5          6       7        8          9
      return [dS, dE, dI, dMild, dSevere, dSevere_H, dFatal, dR_Mild, dR_Severe, dR_Fatal]
    }

    var v = [1 - I0/N, 0, I0/N, 0, 0, 0, 0, 0, 0, 0]
    var t = 0

    var P  = []
    var TI = []
    var Iters = []
    var dataset = {
      "d": [],
      "h": [],
      "r": [],
      "i": [],
      "e": []
    }
    while (steps--) { 
      if ((steps+1) % (sample_step) == 0) {
            //    Dead   Hospital          Recovered        Infectious   Exposed
        P.push([ N*v[9], N*(v[5]+v[6]),  N*(v[7] + v[8]), N*v[2],    N*v[2] ])
        Iters.push(v)
        TI.push(N*(1-v[0]))

        //chartjs prpe
        dataset.d.push( N*v[9] )
        dataset.h.push( N*(v[5]+v[6]) )
        dataset.r.push( N*(v[7] + v[8]) )
        dataset.i.push( N*v[2] )
        dataset.e.push( N*v[2] )

        // console.log((v[0] + v[1] + v[2] + v[3] + v[4] + v[5] + v[6] + v[7] + v[8] + v[9]))
        // console.log(v[0] , v[1] , v[2] , v[3] , v[4] , v[5] , v[6] , v[7] , v[8] , v[9])
      }
      v =integrate(method,f,v,t,dt); 
      t+=dt
    }
    return {"P": P,
            "dataset": dataset,
            "deaths": N*v[6], 
            "total": 1-v[0],
            "total_infected": TI,
            "Iters":Iters,
            "dIters": f}
  }

  function max(P, checked) {
    return P.reduce((max, b) => Math.max(max, sum(b, checked) ), sum(P[0], checked) )
  }

  global.Sol            = get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, InterventionTime, InterventionAmt, duration)
  var P              = Sol["P"].slice(0,100)
  var timestep       = dt
  var tmax           = dt*100
  var deaths         = Sol["deaths"]
  var total          = Sol["total"]
  var total_infected = Sol["total_infected"].slice(0,100)
  var Iters          = Sol["Iters"]
  var dIters         = Sol["dIters"]
  // var Pmax           = max(P, checked)
  var lock           = false

  var colors = [ "#386cb0", "#8da0cb", "#4daf4a", "#f0027f", "#fdc086"]

  var Plock = 1

  console.log(global.Sol)

  // chart time
  // generate numerical labels
  var chart_labels = [...Array( Sol.dataset.d.length ).keys()]

  // number formatting
  var number_with_commas = function(x) {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  global.chart_config = {
    type: 'bar',
    data: {
        labels: chart_labels,
        datasets: [
        {
            label: 'Deaths',
            data: global.Sol.dataset.d,
            backgroundColor: colors[0],
            hoverBackgroundColor: colors[0],
            hoverBorderWidth: 0
        },
        {
            label: 'Hospital',
            data: global.Sol.dataset.h,
            backgroundColor: colors[1],
            hoverBackgroundColor: colors[1],
            hoverBorderWidth: 0
        },
        {
            label: 'Recovered',
            data: global.Sol.dataset.r,
            backgroundColor: colors[2],
            hoverBackgroundColor: colors[2],
            hoverBorderWidth: 0
        },
        {
            label: 'Infectious',
            data: global.Sol.dataset.i,
            backgroundColor: colors[3],
            hoverBackgroundColor: colors[3],
            hoverBorderWidth: 0
        },
        {
            label: 'Exposed',
            data: global.Sol.dataset.e,
            backgroundColor: colors[4],
            hoverBackgroundColor: colors[4],
            hoverBorderWidth: 0
        }
      ]
    },
    options: {
        animation: {
          duration: 10,
        },
        tooltips: {
          mode: 'label',
          callbacks: {
          label: function(tooltipItem, data) { 
            return data.datasets[tooltipItem.datasetIndex].label + ": " + number_with_commas(tooltipItem.yLabel);
          }
          }
         },
        scales: {
          xAxes: [{ 
            stacked: true, 
            gridLines: { display: false },
            }],
          yAxes: [{ 
            stacked: true, 
            ticks: {
              callback: function(value) { return number_with_commas(value); },
            }, 
            }],
        },
        legend: {display: true}
    }
  }

  var ep_chart_id = document.querySelector('#ep-chart')

  global.ep_chart = new Chart( ep_chart_id , global.chart_config )

  var ep_range = document.querySelector('input#epRange')
  ep_range.addEventListener('change', function(event) {
    var new_intervention = parseInt( event.target.value, 10 )
    // console.log(new_intervention)

    // only recalculate if we have a valid integer
    if( !isNaN( new_intervention ) ) {
      global.Sol = get_solution(dt, N, I0, R0, D_incbation, D_infectious, D_recovery_mild, D_hospital_lag, D_recovery_severe, D_death, P_SEVERE, CFR, new_intervention, InterventionAmt, duration)

      global.ep_chart.data.datasets[0].data = global.Sol.dataset.d;
      global.ep_chart.data.datasets[1].data = global.Sol.dataset.h;
      global.ep_chart.data.datasets[2].data = global.Sol.dataset.r;
      global.ep_chart.data.datasets[3].data = global.Sol.dataset.i;
      global.ep_chart.data.datasets[4].data = global.Sol.dataset.e;

      global.ep_chart.update()
      // console.log(" update chart ")

    }
  })

  // var drag_y = function (){
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
