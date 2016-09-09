// ==UserScript==
// @name         Mush Linkify
// @namespace    http://www.networkeducation.ru/
// @version      0.3
// @description  Converts text links to hyperlinks
// @author       Innokentiy
// @match        http://mush.twinoid.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/Linkify.user.js

// ==/UserScript==

$(".mainsaid p").add(".reply p").add(".talks p").html(function() {
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return $(this).html().replace(urlPattern, '<a href="$&" style="text-shadow: none; font-style: normal;" target="_blank">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>');
});
