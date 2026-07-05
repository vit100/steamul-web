(function () {
	var walkInsAnnouncement = 'Walk-ins are always welcome. Standard entry is first come, first served. Bookings are required for private rooms only. Please note: A valid physical ID is required for all first-time visitors.';

	$(function () {
<<<<<<< Updated upstream
		$('#close, #close-confirm').on('click', function() {
			$('#popup_down').hide();
=======
		$.get('https://steamul-scheduler.azurewebsites.net/api/scheduleAnnouncement', function (d) {
			if (d.announcement && d.announcement.text) {
				$('#messageBody').html(announcementText(d.announcement.text));
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
>>>>>>> Stashed changes
		});

		$.get('https://steamul-scheduler.azurewebsites.net/api/scheduleAnnouncement')
			.done(function (d) {
				if (d && d.announcement && d.announcement.text) {
					$('#messageBody').html(d.announcement.text); //my text is safe
					$('#popup_down').show(1500);
				}

				if (d && d.schedule) {
					daySchedule('monday', d.schedule.monday);
					daySchedule('tuesday', d.schedule.tuesday);
					daySchedule('wednesday', d.schedule.wednesday);
					daySchedule('thursday', d.schedule.thursday);
					daySchedule('friday', d.schedule.friday);
					daySchedule('saturday', d.schedule.saturday);
					daySchedule('sunday', d.schedule.sunday);
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				console.error('Error loading schedule announcement:', textStatus, errorThrown);
				$('.schedule-start, .schedule-end').text('—');
				$('.schedule-comment').text('Call for details');
			});
	});

	function daySchedule(day, data) {
		const $row = $('#' + day);

		if (!data) {
			$row.find('.schedule-start, .schedule-end').text('—');
			$row.find('.schedule-comment').text('Call for details');
			return;
		}

		$row.find('.schedule-start').text(data.start || '—');
		$row.find('.schedule-end').text(data.end || '—');
		$row.find('.schedule-comment').text(data.comment || '');
	}

	function announcementText(text) {
		return /walk[\s-]?ins?/i.test(text) ? walkInsAnnouncement : text;
	}
})();
