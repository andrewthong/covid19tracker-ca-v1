/*
	estimates cases based on mortality rate
	adapted from actual_cases_from_mortality.ipynb
*/
window.estimateCases = function()
{
	// execute only if we have case results first
	if( typeof window.case_results !== 'object' ) {
		console.log('No case results');
		return;
	}

	// some controls
	var mort_mean  = 1.0,
		mort_stdev = 0.1,
		mort_range = [mort_mean-mort_stdev, mort_mean, mort_mean+mort_stdev],
		d_range    = [3,5,7],
		ttd_range  = [11, 14, 17],
		total_days = 20;

	// pull from latest data
	num_deaths = parseInt( case_results.totalCases.death, 10 );

	// more variables
	var high = 0,
		low  = Infinity,
		cases = {};

	// calculate
	// a bunch of loops
	// jQuery.each( object, callback( index, value ) )
	$.each( ttd_range, function( ti, t ) {
		$.each( d_range, function( di, d ) {
			// console.log(d);
			var num_double = ttd_range[t] / d_range[d];
			var d_arr = {};
			$.each( mort_range, function( mi, m ) {
				var init_cases = num_deaths / ( m / 100.0 );
				// console.log( m );
				var m_arr = [];
				// JS version of range()
				var the_range = [...Array( t ).keys()];
				$.each( the_range, function( si, s ) {
					var num_doubles = s / d;
					var growth_coeff = (2 ** num_doubles);
					var growth_value = init_cases * growth_coeff;

					if( growth_value > high )
						high = growth_value;

					if( growth_value < low )
						low = growth_value;

					if( !growth_value )
						growth_value = 0;

					m_arr.push( growth_value );
				});
				d_arr[ "m"+String(m) ] = m_arr;
			});
			cases[ "d"+String(d) ] = d_arr;
		});
	});

	// console.log( cases );

	// render chart
	var chartConfig = {
		type: 'line',
		data: {
			labels: [...Array( total_days ).keys()],
			datasets: []
		}
	}

	$.each( cases, function( index, c ) {
		// console.log(c[m1]);
		var arr = {
			label: String( index ),
			data: c.m1
		}
		chartConfig.data.datasets.push( arr );
	});

	// console.log(chartConfig);

	var estCaseChart = new Chart( $('#estimated-cases').first(), chartConfig);

}