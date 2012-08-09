var Calendar = {
    DAY_WIDTH: 600,

    /**
     * Compares two events and the event that starts first is place before the other.
     * If the two events start at the same time then the shortest event wins.
     * @param evtA
     * @param evtB
     * @return {*}
     */
    eventCompareFunction: function(evtA, evtB) {
        if (evtA.start < evtB.start) {
            return -1;
        } else if (evtA.start === evtB.start) {
            return (evtA.end - evtA.start) - (evtB.end - evtB.start);
        } else {
            return 1;
        }
    },

    /**
     Lays out events for a single  day

     @param array  events
     An array of event objects. Each event object consists of a start time, end
     Time (measured in minutes) from 9am, as well as a unique id. The
     Start and end time of each event will be [0, 720]. The start time will
     Be less than the end time.  The array is not sorted.

     @return array
     An array of event objects that has the width, the left and top positions set,
     In addition to start time, end time, and id.

     **/
    layOutDay: function(events) {
        if (!Array.isArray(events)) {
            throw new Error("events must be an Array!");
        }
        var evts = events.slice(0); // clone the original array

        var result = [];

        // Sort the events
        evts.sort(this.eventCompareFunction);

        // See what are the events that collide
        if(evts.length > 1) {
            var event = evts[0];

            // Create collision groups

            // Count how many collision an event has

            for(var i = 1; i < evts.length; i++) {
                var ev = evts[i];

                if(ev.start < event.end && ev.start > event.start) {

                }
            }

        } else {
            if(evts.length === 1) {
                var event = evts[0];
                event['width'] = this.DAY_WIDTH;
                event['left'] = 0;
                event['top'] = event.start;
                result.push(event);
            }
        }

        return result;
    }
};

(function() {

})();