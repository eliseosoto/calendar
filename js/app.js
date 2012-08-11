(function() {
    'use strict';

    var windowLoadHandler = function() {
        render();
    };

    var createEventDiv = function(event) {
        // Create div
        var div = document.createElement('div');
        div.style.width = event.width + 'px';
        div.style.height = (event.end - event.start) + 'px';
        div.style.border = '1px solid';
        div.style.position = 'absolute'; // The container div must be 'relative'
        div.style.top = event.top + 'px';
        div.style.left = event.left + 'px';

        var span = document.createElement('span');
        div.textContent = event.id + "@" + event.start + ", " + event.end + " - w:" + event.width + " -l:" + event.left;

        div.appendChild(span);

        return div;
    };

    var render = function() {
        var calendarContainer = document.getElementById('calendarContainer');

        //show handle 3 events in 2 columns
//        var eventsSample = [
//            {id: 0, start: 60, end: 120, width: 300, left: 0, top: 60},
//            {id: 1, start: 100, end: 240, width: 300, left: 300, top: 100},
//            {id: 2, start: 200, end: 240, width: 300, left: 0, top: 200}
//        ];

//        var eventsSample = [
//            {id: 1, start: 60, end: 120, width: 300, left: 0, top: 60},
//            {id: 2, start: 100, end: 240, width: 300, left: 300, top: 100},
//            {id: 3, start: 200, end: 300, width: 300, left: 0, top: 200}
//        ];

        // should handle events of different widths in same group
//        var eventsSample = [
//            {id: 0, start: 60, end: 180, width: 200, left: 0, top: 60},
//            {id: 1, start: 100, end: 240, width: 200, left: 200, top: 100},
//            {id: 2, start: 150, end: 400, width: 200, left: 400, top: 150},
//            {id: 3, start: 250, end: 600, width: 400, left: 0, top: 250}
//        ];

        //should handle multiple collisions
//        var eventsSample = [
//            {id: 0, start: 60, end: 180, width: 200, left: 0, top: 60},
//            {id: 1, start: 100, end: 240, width: 200, left: 200, top: 100},
//            {id: 2, start: 150, end: 400, width: 200, left: 400, top: 150},
//            {id: 3, start: 185, end: 230, width: 200, left: 0, top: 185},
//            {id: 4, start: 250, end: 600, width: 400, left: 0, top: 250}
//        ];

        // mega test
        var eventsSample = [
            {id:0, start:10, end:550},
            {id:1, start:20, end:100},
            {id:2, start:25, end:100},
            {id:3, start:35, end:250},
            {id:4, start:110, end:200},
            {id:5, start:260, end:300},
            {id:6, start:600, end:700}
        ];

        eventsSample = Calendar.layOutDay(eventsSample);

        eventsSample.forEach(function(event) {
            var div = createEventDiv(event);
            calendarContainer.appendChild(div);
        });
    };

    window.addEventListener('load', windowLoadHandler, false);
})();
