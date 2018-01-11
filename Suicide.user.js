// ==UserScript==
// @name         Suicider
// @version      0.1
// @description  Secretly drops health to 1 or 2 by dropping and picking up the iTrackie
// @author       Innokentiy (insoln@ya.ru)
// @match        http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/Suicide.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */

(function() {
    'use strict';

    // Your code here...
})();

function DropRadio() {
        $('.heroSerialActions [webdata="'+$('*[data-id="SUPER_TALKY"]').attr("serial")+'"] a:contains("Drop")').click();
}
function PickRadio() {
        $('.roomItemActions [webdata="'+$('*[data-id="SUPER_TALKY"]').attr("serial")+'"] a:contains("Pick up")').click();
}
function ToggleRadio() {
    // Actions are asynchronous, so only one happens;
    DropRadio();
    PickRadio();
}

function PullTheTrigger() {
    $("#dialog_body:contains('That wasn't supposed to happen. In the heat of the action you hurt yourself...')").parent().find("a").click();
    if ($(".pvsmbar").find("span")[0].innerHTML>2) {
        ToggleRadio();
        setTimeout(PullTheTrigger,500);
    }
}
console.log('Suicider activated');
setTimeout(PullTheTrigger,5000);
