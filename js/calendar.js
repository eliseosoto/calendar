'use strict';

var Calendar = {
    DAY_WIDTH: 600,

    /**
     * Compares two events and the event that starts first is place before the other.
     * @param evtA
     * @param evtB
     * @return {*}
     */
    eventCompareFunction: function(evtA, evtB) {
        return evtA.start - evtB.start;
    },

    /**
     Lays out events for a single  day

     @param evts  events
     An array of event objects. Each event object consists of a start time, end
     Time (measured in minutes) from 9am, as well as a unique id. The
     Start and end time of each event will be [0, 720]. The start time will
     Be less than the end time.  The array is not sorted.

     @return array
     An array of event objects that has the width, the left and top positions set,
     In addition to start time, end time, and id.

     **/
    layOutDay: function layOutDay(evts) {
        if (!Array.isArray(evts)) {
            throw new Error("events must be an Array!");
        }

        //find collisions
        var self = this;
        var events = [];
        var len = evts.length;
        var columnPositions = {};
        var totalColumns = 0;

        if (len > 0) {
            // Copy the events array
            events = evts.slice(0);

            //sort events
            events.sort(this.eventCompareFunction);

            columnPositions[events[0].id] = 0;

            // Calculate the columnPosition for each event and the number of columns
            var event;
            for (var i = 1; i < len; i++) {
                var maxColumn = 0;
                event = events[i];

                for (var j = 0; j < i; j++) {
                    var prevEvent = events[j];

                    if (event.start >= prevEvent.start && event.start < prevEvent.end) {
                        if (columnPositions[prevEvent.id] <= maxColumn) {
                            maxColumn++;
                        }
                    }

                    columnPositions[event.id] = maxColumn;
                    totalColumns = Math.max(totalColumns, maxColumn);
                }
            }

            var colWidth = self.DAY_WIDTH / (totalColumns + 1);

            for (i = 0; i < len; i++) {
                event = events[i];
                var posI = columnPositions[event.id];
                var eventWidth = totalColumns - posI + 1;
                for (j = 0; j < len; j++) {
                    // Don't check the same event
                    if (i !== j) {
                        var otherEvent = events[j];
                        var posJ = columnPositions[otherEvent.id];
                        if (posJ >= posI &&
                            (event.start >= otherEvent.start && event.start < otherEvent.end) ||
                            (otherEvent.start >= event.start && otherEvent.start < event.end)) {

                            eventWidth = Math.min(eventWidth, posJ - posI);
                            if (eventWidth === 1) {
                                break;
                            }
                        }

                    }
                }

                event.top = event.start;
                event.width = Math.max(eventWidth, 1) * colWidth;
                event.left = posI * colWidth; // + padding;
            }
        }

        return events;
    }
};
