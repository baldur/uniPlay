UniPlay.Modules.JWPlayer = function() {
        var width = 360;
        var height = 240;
        var getDom = function(){ return $("#player")[0] }
        var domContainer = "asset_container";
        var location = 'http://localhost/swf/player.swf';
        var videoId;
        return {
            load: function(doc){
                console.log("module");
                videoId = doc._id;
                var video_path = "http://localhost/" + doc.video_id;
                var opts = { 
                     params:     { movie: video_path,
                                   allowfullscreen: true, 
                                   allowscriptaccess: "always"},
                     flashvars:  { file: video_path,
                                   image: ""},
                     attributes: { id:"player",  
                                   name:"player"}
                }
                swfobject.embedSWF(location, domContainer, width, height, "9.0.98", "expressInstall.swf", 
                                     opts.flashvars, opts.params, opts.attributes);
                try {var myReady = playerReady} catch (err){};
                   playerReady = function(obj) {
                       getDom().addModelListener("TIME", "UniPlay."+ UniPlay.Player.name +".timeMonitor");
                       getDom().addModelListener("STATE", "UniPlay."+ UniPlay.Player.name +".stateTracker");
                try { myReady(obj); } catch (err){};
                   }
            },
            play: function() {
                getDom().sendEvent('PLAY');
            },
            seek: function(pos) {
                getDom().sendEvent('SEEK', pos);
            },
            currentPosition: '',
            currentState: '',
            unload: function(){
                $(getDom()).parent().empty().append($('<div id="asset_container">'))
            },
            publicMethod: function() {
            },
            timeMonitor: function(obj) { 
                if(obj.position) {
                    this.currentPosition = obj.position;
                }
                registered = this.currentPositionRegistered;
                if(registered) {
                    registered[1][0].innerHTML = this.currentPosition;
                }
            },
            stateTracker: function(obj) { 
                console.log("StateTracker");
                console.log(obj.newstate);
                if(obj.newstate) {
                    this.currentState = obj.newstate;
                    registered = this.currentStateRegistered;
                    if(registered) {
                        registered[1][0].innerHTML = this.currentState;
                    }
                }
            },
            seekTracker: function(el) { console.log(el); },
            getInstance: function(){ return $("#player")[0] },
            currentVideoId: function() {return videoId}
        }
};