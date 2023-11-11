(function () {
	$(function () {
		$.get('https://steamul-scheduler.azurewebsites.net/api/scheduleAnnouncement', function (d) {
			if (d.announcement && d.announcement.text) {
				$('#messageBody').html(d.announcement.text);
				$('#popup_down').show(1500);
			}

			if (d.schedule) {
				daySchedule('monday', d.schedule.monday);
				daySchedule('tuesday', d.schedule.tuesday);
				daySchedule('wednesday', d.schedule.wednesday);
				daySchedule('thursday', d.schedule.thursday);
				daySchedule('friday', d.schedule.friday);
				daySchedule('saturday', d.schedule.saturday);
				daySchedule('sunday', d.schedule.sunday);
			}
		});
	});

	function daySchedule(day, data) {
		$('#' + day + ' td span[id="start"]').html(data.start);
		$('#' + day + ' td span[id="end"]').html(data.end);
		$('#' + day + ' td span[id="comment"]').html(data.comment);
	}
})();
