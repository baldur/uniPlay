(function( $ ){

  var methods = {
    embed : function( opts ) {  
      console.log( 'embedding' );
      return this.each(function() {
        var $this = $( this );
        $this.uniPlayer( 'unload' );
        var randomEnoughId = randomEnoughIdString();
        var domEl = $this.append( "<div id='"+randomEnoughId+"'></div>" );
        window.UniPlayerInstance = UniPlay.Player.init( opts, $("#"+randomEnoughId) );
      });
    },
    unload : function( opts ) {
      console.log( 'attempting unload' );
      if(window.UniPlayerInstance) {
          console.log( 'attempting unload on instance before' );
          // this clears Interval etc for youtube
          //window.UniPlayerInstance.unload();
          console.log( 'attempting unload on instance after' );
      }
          window.UniPlayerInstance = undefined;
          $( this ).empty();
    },
    register : function( opts ) {
      console.log("registering needs implementing");
    } 
  }; 

  function randomEnoughIdString() {
    var randomString = [];
    for(var i = 0; i < 5; i++){
      randomString.push(String.fromCharCode(Math.floor((Math.random()*100) % (90 - 65 + 1) + 65)));
      randomString.push(String.fromCharCode(Math.floor((Math.random()*100) % (122 - 97 + 1) + 97)));
    }
    return randomString.join("");
  }

  $.fn.uniPlayer = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.embed.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  };

})( jQuery );

UniPlay = {};
UniPlay.Modules = {};
UniPlay.Helpers = {};

UniPlay.Player = (function(){
    var instance;
    return {
        init: function( doc, domEl ) {
            console.log("loading " + doc.player + " player");
            instance = UniPlay.Modules[doc.player]();
            instance.foo = "really";
            instance.load(doc, domEl);
            instance.register = function(attribute, domEl){
                if(!this.registry) {
                    this.registry = [];
                }
                var opts = {  attribute: attribute,
                             domEl: domEl };
                this.registry.push(opts);
                this[attribute+"Registered"] = [true, domEl];
            }
            instance.unload = function() {
                this.individualUnload();
                $.map(this.registry, function(register) {
                    register.domEl[0].innerHTML = "empty";
                    this[register.attribute + "Registered"] = false;
                });
                $(this.getDomElement()).parent().empty().append($('<div id="asset_container">'))
            }
            // UniPlay.playerInstance is a referance here which 
            // I can rely on internally and/for telling flash 
            // what it should use for callback
            UniPlay.playerInstance = instance;
            return instance;
        }
    }

})();

Number.prototype.zeroPad = function(){
    var myNumber = parseInt(this, 10);
    if(myNumber < 10) {
        myNumber = "0" + myNumber;
    }
    return myNumber;
}

Number.prototype.secondsToTimer = function() {
    var remainingSeconds = (this % 60);
    var remainingMinutes = Math.floor(this / 60);
    var remainingHours   = Math.floor(remainingMinutes / 60);
    var remainingMinutes = remainingMinutes % 60;
    var remainingDays    = Math.floor(remainingHours / 24);
    var remainingHours   = remainingHours % 24;

    var ret = remainingMinutes.zeroPad() + ":" + remainingSeconds.zeroPad();

    if(this >= 1 * 60 * 60 * 24) { 
        ret = remainingDays.zeroPad() + ":" + remainingHours.zeroPad() + ":" + ret;
    } else if(this >= 1 * 60 * 60) {
        ret = remainingHours.zeroPad() + ":" + ret;
    } else {
    }
    return ret;
}

String.prototype.timerToSeconds = function() {
    if(!/^(\d{2}:?){1,4}$/.test(this)) {
        throw("bad input");
    }
    var numbers = this.split(":");
    var factor = [1, 60, 60*60, 60*60*24]
    var ret = 0;
    while(numbers.length > 0){
         ret += parseInt(numbers.pop(), 10) * factor.shift();
    }
    return ret;
}

