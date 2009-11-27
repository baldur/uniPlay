UniPlay = {};
UniPlay.Modules = {};
UniPlay.Helpers = {};

UniPlay.Player = (function(){
    var instance;
    return {
        name: "playerInstance",
        init: function(doc) {
            console.log("loading " + doc.player + " player");
            instance = UniPlay.Modules[doc.player]();
            instance.load(doc);
            instance.register = function(attribute, domEl){
                this[attribute+"Registered"] = [true, domEl];
            }
            return instance;
        }
    }

})();

Number.prototype.zeroPad = function(){
    var myNumber = this
    if(myNumber < 10) {
        myNumber = "0" + myNumber;
    }
    return myNumber;
}

Number.prototype.timer = function(){
    var ret;
    var remainingSeconds = (this % 60);
    var remainingMinutes = Math.floor(this / 60);
    var remainingHours   = Math.floor(remainingMinutes / 60);
    var remainingMinutes = remainingMinutes % 60;
    var remainingDays    = Math.floor(remainingHours / 24);
    var remainingHours   = remainingHours % 24;
    ret = remainingMinutes.zeroPad() + ":" + remainingSeconds.zeroPad();
    if(this >= 1 * 60 * 60 * 24) { 
        ret = remainingDays.zeroPad() + ":" + remainingHours.zeroPad() + ":" + ret;
    } else if(this >= 1 * 60 * 60) {
        ret = remainingHours.zeroPad() + ":" + ret;
    } else {
    }
    return ret;
}

