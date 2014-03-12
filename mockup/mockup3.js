
var DIV_TO_LABEL = {
	"slugline": "SLUGLINE",
	"dialogue": "DIALOGUE",
	"character": "CHARACTER",
	"line": "LINE",
	"parenthetical": "PARENTHETICAL",
	"action": "ACTION"
};

var LABEL_TO_COLOR = {
	"SLUGLINE": "red",
	"DIALOGUE": "blue",
	"CHARACTER": "green",
	"LINE": "orange",
	"PARENTHETICAL": "purple",
	"ACTION": "ltblue",
	"NONE": "gray"
}

var $makeTooltip = function() {
	$tooltip = $('<div>').addClass('tooltip');	
	$select = $('<select>');	
	$.each(LABEL_TO_COLOR, function(key, value) {
		$select.append($('<option>').val(key).text(key));
	});
	$tooltip.append($select);
	$tooltip.data('elt',this);
	return $tooltip;
}

$(document).ready(function() { 
	$('.doc_element').after($makeTooltip);
	$('.doc_element').on('click',null,function(event) {
		$(this).qtip({
			overwrite: false,
			content: {
				text: $(this).next('.tooltip').html()
			},
			events: {
				toggle: function(event, api) {
					if (event.originalEvent.target !== api.elements.target[0]) {
						event.preventDefault();
					}
				},
				hide: function(event, api) {
					api.destroy();
				}
			},	
			show: {
				event: event.type,
				ready: true
			},
			hide: {
				event: blur
			}
		}, event);
	}
	);
	$(document).click(function(event) {
		if ($(event.target).parents().index($('.qtip')) === -1) {
			$('.qtip').hide();	
		}
	});
	$('.qtip').click(function(event) {
		event.stopPropagation();
		return false;
	});
	$('.qtip').change(function() {
		alert('changed');
		var dat = $(this).data('elt');
		var newColor = $(this).children('select').first().val();
		$.each(LABEL_TO_COLOR, function(key, value) {
			dat.removeClass(value);
		});
		dat.addClass(newColor);
	});

	
	$('.doc_element').hover(
		function() {
			$(this).addClass('tomato');
		}, function() {
			$(this).removeClass('tomato');
		});
});
