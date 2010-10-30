UniPlay.Modules.JWPlayer = function() {
        var width = 360;
        var height = 240;
        var getDom = function(){ return $("#player")[0] }
        var domContainer = "asset_container";
        var swfPath = 'http://127.0.0.1:4567/swf/player.swf';
        var videoId;
        return {
            load: function(doc){
                videoId = doc._id;
                var video_path;
                if( doc.url ) {
                    video_path = doc.url;
                } else {
                    video_path = "http://127.0.0.1:4567/" + doc.video_id;
                }
                console.log(video_path);
                var opts = { 
                     params:     { movie: video_path,
                                   allowfullscreen: true, 
                                   allowscriptaccess: "always"},
                     flashvars:  { file: video_path,
                                   image: doc.image},
                     attributes: { id:"player",  
                                   name:"player"}
                }
                swfobject.embedSWF(swfPath, domContainer, (doc.width || width), (doc.height || height), "9.0.98", "expressInstall.swf", 
                                     opts.flashvars, opts.params, opts.attributes);
                try {var myReady = playerReady} catch (err){};
                   playerReady = function(obj) {
                       getDom().addModelListener("TIME", "UniPlay.playerInstance.timeMonitor");
                       getDom().addModelListener("STATE", "UniPlay.playerInstance.stateTracker");
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
            getDomElement: function() {
                return getDom();
            },
            individualUnload: function(){
                console.log("jwplayer unload");
            },
            publicMethod: function() {
            },
            timeMonitor: function(obj) { 
                if(obj.position) {
                    this.currentPosition = obj.position;
                }
                timer = this.timerRegistered;
                if(timer) {
                    timer[1][0].innerHTML = this.currentPosition.secondsToTimer();
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

