UniPlay = {};
UniPlay.Modules = {};

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

