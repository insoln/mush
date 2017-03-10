// ==UserScript==
// @name        Mush Flight Analyser
// @namespace   Mush Flight Analyser
// @author      Innokentiy
// @description Analyses a Mush flight
// @include     http://mush.twinoid.com/theEnd/*
// @version     0.2
// @downloadURL https://raw.githubusercontent.com/insoln/mush/master/MushFlightAnalyzer.user.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

function getUserCycles(character){
    var totalCycles=0;
    var cycles=$("#myDialog_"+character).find("table.histr").find("tr:last-child").find("td:last-child").find("li:contains(Cycle)").each(function (i,el) {totalCycles+=(parseInt(el.innerText.substring(0,el.innerText.indexOf(' '))));}).length;
    return (totalCycles/8|0)+" days "+(totalCycles%8)+ " cycles";
}

$(".dude,.boxextra").find("h3").each(function (i,el) {
    var isMush = $(el)[0].style.color=="rgb(255, 64, 89)";
    const row = $('<div>').append(isMush?"Hive has no limits":getUserCycles(el.innerText.substring(0,el.innerText.indexOf('\n')).toUpperCase().replace(' ','_').replace('-','_').replace(' ','_')));
    row.appendTo(el);
});
