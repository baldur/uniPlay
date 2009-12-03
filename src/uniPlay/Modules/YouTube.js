UniPlay.Modules.YouTube = function() {
        var width = 360;
        var height = 240;
        var getDom = function(){ return $("#asset_container")[0] }
        var domContainer = "asset_container";
        var location = 'http://www.youtube.com/apiplayer?enablejsapi=1&playerapiid=ytplayer';
        var videoId;
        return {
            load: function(doc){
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

                swfobject.embedSWF(location, domContainer, width, height, "9.0.98", "expressInstall.swf", 
                                     opts.flashvars, opts.params, opts.attributes);
                

            },
            player_loaded: function(id) {
                getDom().cueVideoById(id, 0);
                getDom().addEventListener("onStateChange", "UniPlay.playerInstance.onStateChange");
            },
            onStateChange: function (state) {
                // key unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
                var states = ["ENDED", "PLAYING", "PAUSED", "BUFFERING"];
                this.currentState = states[state];
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
            currentPosition: '',
            currentState: '',
            unload: function(){
                console.log(this);
                window.onYouTubePlayerReady = undefined;
                clearInterval(this.timeMonitorId);
                $(getDom()).parent().empty().append($('<div id="asset_container">'))
            },
            publicMethod: function() {
            },
            timeMonitor: function() { 
                var that = this;
                this.timeMonitorId = setInterval( function() { 
                    that.currentPosition = getDom().getCurrentTime(); 
                    registered = that.currentPositionRegistered;
                    if(registered) {
                        registered[1][0].innerHTML = that.currentPosition;
                    }
                }, 250); 
            },
            currentVideoId: function() {return videoId},
        }
};

