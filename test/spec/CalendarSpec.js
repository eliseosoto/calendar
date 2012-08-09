describe("Calendar", function() {
    var calendar = Object.create(Calendar);

    describe("eventCompareFunction", function() {
        it("sorts two events", function() {
            var eventA = {id: 1, start: 60, end: 120};
            var eventB = {id: 2, start: 30, end: 120};

            expect([eventA, eventB].sort(calendar.eventCompareFunction)).toEqual([eventB, eventA]);
        });

        it("sorts two events that start at the same time", function() {
            var eventA = {id: 1, start: 60, end: 220};
            var eventB = {id: 2, start: 60, end: 120};
            var eventC = {id: 3, start: 10, end: 120};

            expect([eventA, eventB, eventC].sort(calendar.eventCompareFunction)).toEqual([eventC, eventB, eventA]);
        });
    });

    describe("on layOutDay", function() {
        it("should only accept Arrays", function() {
            var event = {id: 1, start: 60, end: 120};  // an event from 10am to 11am

            expect(function() {
                calendar.layOutDay(event);
            }).toThrow();
        });

        it("should handle empty events array", function() {
            expect(calendar.layOutDay([])).toEqual([]);
        });

        it("should handle a single event", function() {
            var event = [
                {id: 1, start: 60, end: 120}
            ];  // an event from 10am to 11am
            var response = calendar.layOutDay(event);

            expect(response).toEqual([
                {id: 1, start: 60, end: 120, width: 600, left: 0, top: 60}
            ]);
        });

        it("should handle the example case", function() {
            var events = [
                {id: 1, start: 60, end: 120},
                {id: 2, start: 100, end: 240},
                {id: 3, start: 700, end: 720}
            ];

            var response = calendar.layOutDay(events);

            expect(response).toEqual([
                {id: 1, start: 60, end: 120, width: 300, left: 0, top: 60},
                {id: 2, start: 100, end: 240, width: 300, left: 300, top: 100},
                {id: 3, start: 700, end: 720, width: 600, left: 0, top: 700}
            ]);
        });
    });
});