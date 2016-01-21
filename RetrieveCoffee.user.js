// ==UserScript==
// @name         Кофедоставатель
// @version      0.3
// @description  Дежурный по эскалатору справок не дает!
// @author       Innokentiy
// @match        http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/RetrieveCoffee.user.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

function RetrieveCoffee() {
    if ($('#input').attr('d_name')=='Refectory') {
        if ($('#timetomove').find('a').length>0) {
            $.get($('.roomItemActions').children().filter(function(index){if ($(this).attr("onmouseover").indexOf("Coffee!")>=0) return true;}).find("a").attr("href"),function(data) {});
        }
    }
    setTimeout(RetrieveCoffee,3600000);
}

alert('Кофедоставатель будет пытаться доставать кофе каждый час, начиная со следующего цикла');
RetrieveCoffee();
