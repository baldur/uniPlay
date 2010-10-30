<?php
/*
Plugin Name: UniPlay
Plugin URI: http://snitchmedia.com/blog
Description: Easy Adding of Video Embedding
Version: 1.1
Author: Baldur
Author URI: http://snitchmedia.com/blog
*/

/*
Copyright 2009 Snitchmedia Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// source : http://s3.amazonaws.com/baldur/uniPlay.js
/*
 *
 *
 * <div id="wrapper">
 *   <span class="video_id 4098148"></span>
 *   <span class="player Vimeo"></span>
 *   <div id="asset_container"></div>
 * </div>       
*/

?>

<?php 
  wp_enqueue_script("jquery", "", "1.4.3", true); 
  wp_enqueue_script("swfobject", "https://s3.amazonaws.com/baldur/swfobject.js", "", true); 
  wp_enqueue_script("uniPlay", "http://s3.amazonaws.com/baldur/uniPlay.js", "", true); 

  add_action('wp_footer', 'doSomething');
  function doSomething() {
?>
  <script type='text/javascript' >
    jQuery(document).ready(
      function(){
        var opts = {};
        var elements = jQuery("#wrapper").find("span");
        jQuery.each(elements, function(i){
            var cols = elements[i].className.split(" ");
            opts[cols[0]] = cols[1];
        });
        UniPlay.Player.init(opts);
      }
    );
  </script>
<?php
  }
?>

