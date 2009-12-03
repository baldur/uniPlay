Screw.Unit(function() {
    describe("UniPlay String extentions", function() {
        it("should bomb with bad input", function(){
            var bad_time_string = "0000:43:4545";
            var raised_error = false;
            try {
                bad_time_string.timerToSeconds();
            }
            catch(err) {
                raised_error = true;
            }
            expect(raised_error).to(equal, true);
        });
        it("should know seconds", function() {
            var timer = "00:45";
            expect(timer.timerToSeconds()).to(equal, 45);
        });
        it("should know minutes and seconds", function() {
            var timer = "01:45";
            expect(timer.timerToSeconds()).to(equal, 60+45);
        });
        it("should know hours minutes and seconds", function() {
            var timer = "01:01:45";
            expected = 45 + 60 + 3600;
            expect(timer.timerToSeconds()).to(equal, expected);
        });
        it("should know days hours minutes and seconds", function() {
            var timer = "02:02:02:45";
            expected = 45 + 2*60 + 2*(3600) + 2*(24 * 3600);
            expect(timer.timerToSeconds()).to(equal, expected);
        });
    });
    describe("UniPlay Number extentions", function() {
        describe("floating correctly", function(){
            it("should round correctly", function() {
                var digit = 8.111;
                expect(digit.zeroPad()).to(equal, "08");
            });
            it("should round correctly", function(){
                var digit = 18.111;
                expect(digit.zeroPad()).to(equal, "18");
            });
        });
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
                    expect(this.secondsToTimer()).to(match, /^\d\d:45$/)
                });
            });
            it("should format the minutes correctly", function() {
                jQuery.each(seconds_45, function(i,val) {
                    regexp = new RegExp('^0'+i+':45$');
                    expect(this.secondsToTimer()).to(match, regexp)
                });
            })
            it("should format the hours correctly", function() {
                var hour = 1 * 60 * 60;
                expect(hour.secondsToTimer()).to(match, /^01:\d\d:\d\d$/);
            })
            it("should handle days correctly", function() {
                var day = 1 * 60 * 60 * 24;
                expect(day.secondsToTimer()).to(match, /^01:\d\d:\d\d:\d\d$/);
            });
            it("should handle many days correctly", function() {
                var day = 1 * 60 * 60 * 24 * 2;
                expect(day.secondsToTimer()).to(match, /^02:\d\d:\d\d:\d\d$/);
            });
            it("should handle many days correctly with details", function() {
                var day = 1 * 60 * 60 * 24 * 2 + 6;
                expect(day.secondsToTimer()).to(match, /^02:\d\d:\d\d:06$/);
            });
        });
    });
});

