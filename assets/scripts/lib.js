'use strict';

$(window).ready(function() {
	var start = "";
	var end   = "";
	var all   = [];

	var $tbody = $('table > tbody');

	var $tmp = '<tr><td><!--id--></td><td><!--time--></td></tr>';

	$('button[type="submit"]').on('click', function(e){
		e.preventDefault();


		start = $('#sunset').val()  || "00:00";
		end   = $('#sunrise').val() || "00:00";

		if(start == "00:00"){
			return;
		}

		start.toString();
		end.toString();

		var ft = new falakiTime(start, end);
		var result = ft.forEach();

		$tbody.empty();

		result.map(function(time, i){
			$tbody.append($tmp.replace(/<!--id-->/g, i).replace(/<!--time-->/g, time));
		});
	});
});
