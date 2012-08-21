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

            expect([eventA, eventB, eventC].sort(calendar.eventCompareFunction)).toEqual([eventC, eventA, eventB]);
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
                {id: 1, start: 60, end: 120, width: 600, left: 10, top: 60}
            ]);
        });

        it("show handle 2 events that start at the same time", function() {
            var events = [
                {id: 1, start: 100, end: 120},
                {id: 2, start: 100, end: 240}
            ];

            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 100, end: 120, width: 300, left: 10, top: 100},
                {id: 2, start: 100, end: 240, width: 300, left: 310, top: 100}
            ]);
        });

        it("show handle 2 contiguous events", function() {
            var events = [
                {id: 1, start: 60, end: 120},
                {id: 2, start: 100, end: 240}
            ];

            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 60, end: 120, width: 300, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 300, left: 310, top: 100}
            ]);
        });

        it("show handle 2 contiguous events, second fully inside first", function() {
            var events = [
                {id: 1, start: 60, end: 700},
                {id: 2, start: 100, end: 240}
            ];

            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 60, end: 700, width: 300, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 300, left: 310, top: 100}
            ]);
        });

        it("should handle 3 events in 2 columns", function() {
            var events = [
                {id: 0, start: 60, end: 120},
                {id: 1, start: 100, end: 240},
                {id: 2, start: 200, end: 240}
            ];

            expect(calendar.layOutDay(events)).toEqual([
                {id: 0, start: 60, end: 120, width: 300, left: 10, top: 60},
                {id: 1, start: 100, end: 240, width: 300, left: 310, top: 100},
                {id: 2, start: 200, end: 240, width: 300, left: 10, top: 200}
            ]);
        });

        it("should handle 3 contiguous events", function() {
            var events = [
                {id: 1, start: 60, end: 120},
                {id: 2, start: 100, end: 240},
                {id: 3, start: 200, end: 300}
            ];

            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 60, end: 120, width: 300, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 300, left: 310, top: 100},
                {id: 3, start: 200, end: 300, width: 300, left: 10, top: 200}
            ]);
        });

        it("should handle events of different widths in same group", function() {
            var events = [
                {id: 1, start: 60, end: 180},
                {id: 2, start: 100, end: 240},
                {id: 3, start: 150, end: 400},
                {id: 4, start: 250, end: 600}
            ];
            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 60, end: 180, width: 200, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 200, left: 210, top: 100},
                {id: 3, start: 150, end: 400, width: 200, left: 410, top: 150},
                {id: 4, start: 250, end: 600, width: 400, left: 10, top: 250}
            ]);
        });

        it("should handle multiple collisions", function() {
            var events = [
                {id: 1, start: 60, end: 180},
                {id: 2, start: 100, end: 240},
                {id: 3, start: 150, end: 400},
                {id: 4, start: 185, end: 230},
                {id: 5, start: 250, end: 600}
            ];
            expect(calendar.layOutDay(events)).toEqual([
                {id: 1, start: 60, end: 180, width: 200, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 200, left: 210, top: 100},
                {id: 3, start: 150, end: 400, width: 200, left: 410, top: 150},
                {id: 4, start: 185, end: 230, width: 200, left: 10, top: 185},
                {id: 5, start: 250, end: 600, width: 400, left: 10, top: 250}
            ]);
        });

        it("should pass mega test", function() {
            var events = [
                {id: 4, start: 110, end: 200},
                {id: 2, start: 25, end: 100},
                {id: 0, start: 10, end: 550},
                {id: 5, start: 260, end: 300},
                {id: 6, start: 600, end: 700},
                {id: 3, start: 35, end: 250},
                {id: 1, start: 20, end: 100}
            ];
            expect(calendar.layOutDay(events)).toEqual([
                {id: 0, start: 10, end: 550, width: 150, left: 10, top: 10},
                {id: 1, start: 20, end: 100, width: 150, left: 160, top: 20},
                {id: 2, start: 25, end: 100, width: 150, left: 310, top: 25},
                {id: 3, start: 35, end: 250, width: 150, left: 460, top: 35},
                {id: 4, start: 110, end: 200, width: 300, left: 160, top: 110},
                {id: 5, start: 260, end: 300, width: 450, left: 160, top: 260},
                {id: 6, start: 600, end: 700, width: 600, left: 10, top: 600}
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
                {id: 1, start: 60, end: 120, width: 300, left: 10, top: 60},
                {id: 2, start: 100, end: 240, width: 300, left: 310, top: 100},
                {id: 3, start: 700, end: 720, width: 600, left: 10, top: 700}
            ]);
        });
    });
});