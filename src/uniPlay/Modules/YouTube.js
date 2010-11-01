UniPlay.Modules.YouTube = function() {
        var width = 360;
        var height = 240;
        var getDom; //= function(){ return $("#asset_container")[0] }
        var domContainer; // = "asset_container";
        var swfPath = 'http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=ytplayer';
        var videoId;
        return {
            load: function(doc, domEl){
                domContainer = domEl.find('div').attr('id');
                getDom = function() { return $('#'+domContainer)[0] };
                window.onYouTubePlayerReady = function(){ 
                    UniPlay.playerInstance.player_loaded(doc.video_id);
                    UniPlay.playerInstance.timeMonitor();
                } 
                  
                videoId = doc._id;
                var opts = { 
                     params:     { allowfullscreen: true, 
                                   allowscriptaccess: "always"},
                     flashvars:  { 
                     },
                     attributes: { id: domContainer }
                }

                swfobject.embedSWF(swfPath, domContainer, (doc.width || width), (doc.height || height), "9.0.98", "expressInstall.swf", 
                                     opts.flashvars, opts.params, opts.attributes);
                

            },
            player_loaded: function(id) {
                getDom().cueVideoById(id, 0);
                getDom().addEventListener("onStateChange", "UniPlay.playerInstance.onStateChange");
            },
            onStateChange: function (state) {
                // key unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
                var states = ["ENDED", "PLAYING", "PAUSED", "BUFFERING", "UNSTARTED"];
                this.currentState = states[state] || states[states.length-state];
                registered = this.currentStateRegistered;
                if(registered) {
                    registered[1][0].innerHTML = this.currentState;
                }
                console.log(this.currentState);
            },
            play: function() {
                switch(this.currentState) {
                    case "PLAYING":
                        getDom().pauseVideo();
                        break;
                    case "PAUSED":
                        getDom().playVideo();
                        break;
                    default:
                        getDom().playVideo();
                }
            },
            seek: function(pos) {
                getDom().seekTo(pos, true);
                getDom().playVideo();
            },
            currentState: '',
            currentPosition: '',
            getDomElement: function() {
                return getDom();
            },
            individualUnload: function(){
                console.log("youtube unload");
                window.onYouTubePlayerReady = undefined;
                clearInterval(this.timeMonitorId);
            },
            publicMethod: function() {
            },
            timeMonitor: function() { 
                var that = this;
                this.timeMonitorId = setInterval( function() { 
                    var currentTime = getDom().getCurrentTime()
                    if(currentTime < 0) {
                        currentTime = 0;
                    }
                    that.currentPosition = currentTime; 
                    timer = that.timerRegistered;
                    if(timer) {
                        timer[1][0].innerHTML = that.currentPosition.secondsToTimer();
                    }
                    registered = that.currentPositionRegistered;
                    if(registered) {
                        registered[1][0].innerHTML = that.currentPosition;
                    }
                }, 250); 
            },
            currentVideoId: function() {return videoId},
        }
};

