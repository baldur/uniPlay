UniPlay.Modules.Vimeo = function() {
        var width = 360;
        var height = 240;
        var getDom; /* function(){ return $("#asset_container")[0] } */
        var domContainer;
        var swfPath = 'http://www.vimeo.com/moogaloop.swf';
        var videoId;
        return {
            load: function(doc, domEl){
                domContainer = domEl.attr('id');
                getDom = function() { return domEl };
                console.log("vimeoModule");
                videoId = doc._id;
                var opts = { 
                     params:     { allowfullscreen: true, 
                                   allowscriptaccess: "always"},
                     flashvars:  { 
                                   clip_id: doc.video_id,
                                   show_portrait: 0,
                                   show_byline: 0,
                                   show_title: 0,
                                   js_api: 1,
                                   js_onLoad: "UniPlay.playerInstance.player_loaded",
                                   js_swf_id: domContainer 
                     },
                     attributes: { }
                }
                swfobject.embedSWF(swfPath, domContainer, (doc.width || width), (doc.height || height), "9.0.98", "expressInstall.swf", 
                                     opts.flashvars, opts.params, opts.attributes);

            },
            player_loaded: function() {
                getDom().api_addEventListener('onProgress', "UniPlay.playerInstance.timeMonitor");
                getDom().api_addEventListener('onPlay',"UniPlay.playerInstance.onPlay");
                getDom().api_addEventListener('onPause',"UniPlay.playerInstance.onPause");
            },
            onPlay: function() {
                console.log("play");
                this.currentState = "PLAYING";
                registered = this.currentStateRegistered;
                if(registered) {
                    registered[1][0].innerHTML = this.currentState;
                }
            },
            onPause: function() {
                console.log("pause");
                this.currentState = "PAUSED";
                registered = this.currentStateRegistered;
                if(registered) {
                    registered[1][0].innerHTML = this.currentState;
                }
            },
            play: function() {
                console.log(this.currentState);
                switch(this.currentState) {
                    case "PLAYING":
                        getDom().api_pause();
                        break;
                    case "PAUSED":
                        getDom().api_play();
                        break;
                    default:
                        getDom().api_play();
                         
                }
            },
            seek: function(pos) {
                getDom().api_seekTo(pos);
            },
            currentPosition: '',
            currentState: '',
            getDomElement: function() {
                return getDom();
            },
            individualUnload: function(){
                console.log("vimeo unload");
            },
            publicMethod: function() {
            },
            timeMonitor: function(obj) { 
                this.currentPosition = obj;
                timer = this.timerRegistered;
                if(timer) {
                    timer[1][0].innerHTML = this.currentPosition.secondsToTimer();
                }
                registered = this.currentPositionRegistered;
                if(registered) {
                    registered[1][0].innerHTML = this.currentPosition;
                }
            },
            currentVideoId: function() {return videoId},
        }
};

