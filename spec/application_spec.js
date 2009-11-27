Screw.Unit(function() {
    describe("UniPlay number extentions", function() {
        describe("zero padding digits", function() {
            it("should zeropad digits less than 10", function(){
                var digit = 8;
                expect(digit.zeroPad()).to(equal, "08");
            });
            it("should not zeropad digits bigger than 10", function() {
                var digit = 19;
                expect(digit.zeroPad()).to(equal, "19");
            });
        });
        describe("producing human time", function() {
            var seconds_45 = [45, 105, 165, 225];
            it("should format seconds correctly", function() {
                jQuery.each(seconds_45, function() {
                    expect(this.timer()).to(match, /^\d\d:45$/)
                });
            });
            it("should format the minutes correctly", function() {
                jQuery.each(seconds_45, function(i,val) {
                    regexp = new RegExp('^0'+i+':45$');
                    expect(this.timer()).to(match, regexp)
                });
            })
            it("should format the hours correctly", function() {
                var hour = 1 * 60 * 60;
                expect(hour.timer()).to(match, /^01:\d\d:\d\d$/);
            })
            it("should handle days correctly", function() {
                var day = 1 * 60 * 60 * 24;
                expect(day.timer()).to(match, /^01:\d\d:\d\d:\d\d$/);
            });
            it("should handle many days correctly", function() {
                var day = 1 * 60 * 60 * 24 * 2;
                expect(day.timer()).to(match, /^02:\d\d:\d\d:\d\d$/);
            });
            it("should handle many days correctly with details", function() {
                var day = 1 * 60 * 60 * 24 * 2 + 6;
                expect(day.timer()).to(match, /^02:\d\d:\d\d:06$/);
            });
        });
    });
});

