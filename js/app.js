(function() {
    'use strict';

    var createEventDiv = function(event) {
        // Create div
        var div = document.createElement('div');
        div.className = 'event';
        div.style.width = event.width + 'px';
        div.style.height = (event.end - event.start) + 'px';
        div.style.top = event.top + 'px';
        div.style.left = event.left + 'px';

        var eventTitle = document.createElement('div');
        eventTitle.className = 'eventTitle';
        eventTitle.textContent = "Sample Item"

        var eventLocation = document.createElement('div');
        eventLocation.className = 'eventLocation';
        eventLocation.textContent = "Sample Location";

        div.appendChild(eventTitle);
        div.appendChild(eventLocation);

        return div;
    };

    var createTimeline = function() {
        var timeline = document.getElementById("timeline");

        var fragment = document.createDocumentFragment();

        for (var i = 9; i <= 21; i += 0.5) {
            var span = document.createElement('span');
            span.className = (i % 1 === 0) ? 'hour' : 'halfHour';
            span.appendChild(timeToText(i));
            fragment.appendChild(span);
        }

        timeline.appendChild(fragment);
    };

    var timeToText = function(time) {
        var timeFragment = document.createDocumentFragment();
        var hour = Math.floor((time >= 13) ? time - 12 : time);
        var minutes = time % 1 === 0 ? ":00" : ":30"
        var textNode = document.createTextNode(hour + minutes + ' ');
        var amPm = document.createElement('span');
        amPm.className = 'amPm';
        amPm.textContent = time >= 12 ? "PM" : "AM";
        timeFragment.appendChild(textNode);
        if (time % 1 === 0) {
            timeFragment.appendChild(amPm);
        }
        return timeFragment;
    };

    var render = function() {
        var calendarContainer = document.getElementById('calendarDay');

        var eventsSample = [
            {id: 0, start: 30, end: 150},
            {id: 1, start: 540, end: 600},
            {id: 2, start: 560, end: 620},
            {id: 3, start: 610, end: 660}
        ];

        eventsSample = Calendar.layOutDay(eventsSample);

        var eventsFragment = document.createDocumentFragment();
        eventsSample.forEach(function(event) {
            var div = createEventDiv(event);
            eventsFragment.appendChild(div);
        });
        calendarContainer.appendChild(eventsFragment);

        createTimeline();
    };

    window.addEventListener('load', render, false);
})();
