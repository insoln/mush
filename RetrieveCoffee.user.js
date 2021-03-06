// ==UserScript==
// @name         Mush: 16 coffees, please!
// @version      0.8
// @description  Automatically retrieves coffee on cycle change if you're in refectory.
// @author       Innokentiy (insoln@ya.ru)
// @match        http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/RetrieveCoffee.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function RetrieveCoffee() {
    if ($('#input').attr('d_name')=='Refectory') {
        
        // We're in the kitchen. Sending GET request to "?action=RETRIEVE_COFFEE&params=<something>"
        $.get($('.roomItemActions').children().filter(function(index){ return $(this).attr("onmouseover").indexOf("Coffee!")>=0; }).find("a").attr("href"),function(data) {
            // Callback for GET response

            // Save response text
            div_response.html(data);

            // Schedule to run again after cycle change
            var re=/((\d{1,2})h)?(\d{2})m(\d{2})s/;
            var str_timeToCycle=div_response.find('.cdTimeStamp').text();
            var num_timeToCycle = str_timeToCycle.replace(re,"$2")*3600+str_timeToCycle.replace(re,"$3")*60+str_timeToCycle.replace(re,"$4")*1;
            setTimeout(RetrieveCoffee,(num_timeToCycle+30)*1000);
            console.log((new Date()).toLocaleString()+' Next coffee retrieve scheduled; str_timeToCycle: '+str_timeToCycle+'; num_timeToCycle: '+num_timeToCycle);
            
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
            
            div_response.empty();
        });
    }
    
}

var div_response = jQuery('<div/>', {id: 'mush_coffee_handler'});
console.log('Coffee retriever activated');
setTimeout(RetrieveCoffee,Main.tData.timeToCycle - (new Date()).getTime() + Main.tData.clientNow.getTime() + 30000);
