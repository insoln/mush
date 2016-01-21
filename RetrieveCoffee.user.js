// ==UserScript==
// @name         Кофедоставатель
// @version      0.1
// @description  Дежурный справок не дает!
// @author       Innokentiy
// @match        http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/MushHacks.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function RetrieveCoffee() {
    if ('New cycle') {
        $.get($('.roomItemActions').children().filter(function(index){if ($(this).attr("onmouseover").indexOf("Coffee!")>=0) return true;}).find("a").attr("href"),function(data) {});
    }
    setTimeout(RetrieveCoffee,3600000);
}

alert('Кофедоставатель активирован');
RetrieveCoffee();
