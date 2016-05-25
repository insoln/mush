// ==UserScript==
// @name         Mush Linkify
// @namespace    http://www.networkeducation.ru/
// @version      0.1
// @description  Converts text links to hyperlinks
// @author       Innokentiy
// @match        http://mush.twinoid.com/
// @grant        none
// ==/UserScript==


$(".mainsaid p").add(".reply p").add(".talks p").html(function() {
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    return $(this).html().replace(urlPattern, '<a href="$&">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>');
});
