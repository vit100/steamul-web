const visitorCountUrl = 'https://steamul-pos.azurewebsites.net/Reports/GetVisitorCount';
const termSensorsUrl = 'https://thermo-sensor.azurewebsites.net/api/Thermo/6164FB7E?id=1&id=2&id=3&id=4&id=5';

// Initialize gauge and temperature indicators when document is ready
$(function () {
	// Create visitor gauge with improved configuration
	const visitorGauge = new JustGage({
		id: 'gauge',
		value: 0,
		min: 0,
		max: 150,
		label: 'Visitors now',
		labelFontColor: '#000000',
		hideMinMax: true,
		// Color zones for capacity visualization
		staticZones: [
			{strokeStyle: "#30B32D", min: 0, max: 130},    // Green: Normal capacity
			{strokeStyle: "#FFDD00", min: 130, max: 140},  // Yellow: High capacity
			{strokeStyle: "#F03E3E", min: 140, max: 150}   // Red: Near maximum
		],
		// Improved animation settings
		startAnimationTime: 700,
		refreshAnimationTime: 700,
		counter: true
	});
	// Fetch visitor count with improved error handling and caching
	fetch(visitorCountUrl, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Cache-Control': 'no-cache'
		}
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		visitorGauge.refresh(data.data);
		$('#gauge').fadeIn(800);
	})
	.catch(error => {
		console.error('Error fetching visitor count:', error);
		$('#gauge').hide();
	});

	var initParam = {
		gaugeType: steelseries.GaugeType.TYPE4,
		size: 80,
		// area: [steelseries.Section(100, 125, 'rgba(220, 0, 0, 0.3)')],
		unitString: '°C',
		maxValue: 120,
		minValue: 10,
	};
	var radials = [
		new steelseries.Radial(
			'canvasRadial0',
			$.extend(initParam, {
				titleString: $('#canvasRadial0')[0].title,
				area: [steelseries.Section(100, 140, 'rgba(220, 0, 0, 0.3)')],
			})
		),
		new steelseries.Radial(
			'canvasRadial1',
			$.extend(initParam, {
				titleString: $('#canvasRadial1')[0].title,
				area: null,
			})
		),
		new steelseries.Radial(
			'canvasRadial2',
			$.extend(initParam, {
				titleString: $('#canvasRadial2')[0].title,
				area: [steelseries.Section(80, 90, 'rgba(220, 0, 0, 0.3)')],
			})
		),
		new steelseries.Radial(
			'canvasRadial3',
			$.extend(initParam, {
				titleString: $('#canvasRadial3')[0].title,
				area: [steelseries.Section(50, 70, 'rgba(220, 0, 0, 0.3)')],
			})
		),
		new steelseries.Radial(
			'canvasRadial4',
			$.extend(initParam, {
				titleString: $('#canvasRadial4')[0].title,
				area: [steelseries.Section(90, 100, 'rgba(220, 0, 0, 0.3)')],
			})
		),
	];
	$.each(radials, function (index, element) {
		element.setBackgroundColor(steelseries.BackgroundColor.BROWN);
		element.setPointerType(steelseries.PointerType.TYPE11);
		element.setFrameDesign(steelseries.FrameDesign.GLOSSY_METAL);
	});

	$.get({
		url: termSensorsUrl,
		success: function (d) {
			radials[0].setValueAnimated(d.find((e) => e.id == 1).v);
			radials[1].setValueAnimated(d.find((e) => e.id == 2).v);
			radials[2].setValueAnimated(d.find((e) => e.id == 5).v);
			radials[3].setValueAnimated(d.find((e) => e.id == 4).v);
			radials[4].setValueAnimated(d.find((e) => e.id == 3).v);
		},
	});
});
