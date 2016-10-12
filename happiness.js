$(function() {

	$( "#slider-salary" ).slider({
		value: 50000,
		// range: true,
		min: 1000,
		max: 500000,
		// values: [ 50000, 70000 ],
		slide: function( event, ui ) {
			$( "#user-salary" ).val( "$" + ui.value );
			// $( "#user-salary" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			updateTotal();
		}
	});

	$( "#slider-tax" ).slider({
		value: 25,
		min: 10,
		max: 40,
		slide: function( event, ui ) {
			$( "#user-tax" ).val( "$" + ui.values );
			updateTotal();
		}
	});

	$( "#slider-expense" ).slider({
		range: true,
		min: 0,
		max: 5000,
		values: [ 750, 1250 ],
		slide: function( event, ui ) {
			$( "#user-expense" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			updateTotal();
		}
	});

	$( "#user-salary" ).val( "$" + $( "#slider-salary" ).slider( "value" ) );
	$( "#user-expense" ).val( "$" + $( "#slider-expense" ).slider( "values", 0 )
	+ " - $" + $( "#slider-expense" ).slider( "values", 1 ) );



	function updateTotal() {
		$salary = $("#slider-salary").slider("value");
		$minExpense = $("#slider-expense").slider("values", 0);
		$maxExpense = $("#slider-expense").slider("values", 1);

		//assign tax bracket
		if ($salary <= 9225) { $taxBracket = 10; }
		else if ($salary >= 9226 && $salary <= 37450 ) { $taxBracket = 15; }
		else if ($salary >= 37451 && $salary <= 90750) { $taxBracket = 25; }
		else if ($salary >= 90751 && $salary <= 189300) { $taxBracket = 28; }
		else if ($salary >= 189301 && $salary <= 411500) { $taxBracket = 33; }
		else if ($salary >= 411501 && $salary <= 413200) { $taxBracket = 35; }
		else if ($salary >= 413201) { $taxBracket = 39.6; }

		//factor in tax
		$salary = $salary - (($taxBracket / 100) * $salary) ;

		//convert to biweekly
		$minBiWeekly = $salary / 26;
		$maxBiWeekly = $salary / 26;

		//convert to monthly
		$minTotal = Math.round(($minBiWeekly * 2) - $minExpense);
		$maxTotal = Math.round(($maxBiWeekly * 2) - $maxExpense);

		$("#user-tax").val($taxBracket + "%");
		$("#total").val("$" + $maxTotal + " to $" + $minTotal);
	}
});
