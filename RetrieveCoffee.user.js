// ==UserScript==
// @name         Mush: 16 coffees, please!
// @version      0.5
// @description  Automatically retrieves coffee on cycle change.
// @author       Innokentiy
// @match        http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/RetrieveCoffee.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function RetrieveCoffee() {
    if ($('#input').attr('d_name')=='Refectory') {
        $.get($('.roomItemActions').children().filter(function(index){ return $(this).attr("onmouseover").indexOf("Coffee!")>=0; }).find("a").attr("href"),function(data) {
            // Callback for GET response
            div_response.html(data);
            if (div_response.find('.cdChatPack:first').children('.cdContent').find(".what_happened:contains("+$('.who').html().trim()+' primes the machine.'+")").length>0) { // Check for log
                // Coffee retrieved by me in this cycle
                $('.cdFavWall .unit').each(function(){
                    if($(this).find(".mainsaid").html().search(/(coffee|кофе|food|еда|refectory|кухня)/i) != -1){
                        Main.ajaxChat("/wallReply?k=" + $(this).data("k") + "&msg=" + encodeURIComponent(div_response.find('.cycletime').text().trim().replace(/Day (\d{1,2}) - Cycle (\d)/,"D$1C$2")+": Coffee retrieved"));
                        return false;
                    }
                });
                console.log(div_response.find('.cycletime').text()+': сoffee retrieved');
            }
        });
    }
    // Schedule to run again after cycle change
    var re=/((\d{1,2})h)?(\d{2})m(\d{2})s/;
    var str_timeToCycle=div_response.find('.cdTimeStamp').text();
    var timeToCycle = str_timeToCycle.replace(re,"$2")*3600+str_timeToCycle.replace(re,"$3")*60+str_timeToCycle.replace(re,"$4")*1;
    setTimeout(RetrieveCoffee,(timeToCycle+5)*1000);
}

var div_response = jQuery('<div/>', {id: 'mush_coffee_handler'});
console.log('Coffee retriever activated');
setTimeout(RetrieveCoffee,Main.tData.timeToCycle - (new Date()).getTime() + Main.tData.clientNow.getTime() + 5000);
