// ==UserScript==
// @name        Mush Profile Analyser
// @namespace   Mush Profile Analyser
// @description Adds some statistics to Mush user profile 
// @author      Innokentiy
// @description Analyses the profile of a Mush player
// @include     http://mush.twinoid.com/u/profile/*
// @include     http://mush.twinoid.com/me
// @version     1.3
// @downloadURL https://raw.githubusercontent.com/insoln/mush/master/MushProfileAnalyzer.user.js
// ==/UserScript==

// This script uses some techniques from https://greasyfork.org/en/scripts/5172-mush-profile-analyser
// The author of original script is Steve De Jonghe (seutje@gmail.com).

var $ = unsafeWindow.jQuery;

var scriptVersion = '1.3';

function charaToClassChar(str)
{
    str = str.toLowerCase();
    str = str.replace(' ', '_');

    return str;
}

function Analyse_AddTable(n)
{
    var infos = Analyse_Analyse(n);
    var bgtablesummar = document.createElement('div');
    bgtablesummar.classList.add("bgtablesummar");
    var twinstyle = document.createElement('div');
    twinstyle.classList.add("twinstyle");
    bgtablesummar.appendChild(twinstyle);
    var header = document.createElement('h3');
    var headercorner = document.createElement('div');
    headercorner.classList.add("cornerright");
    headercorner.appendChild(document.createTextNode('Profile Analysis'));
    header.appendChild(headercorner);
    twinstyle.appendChild(header);

    var table = document.createElement('table');
    table.classList.add("summar");

    var tr1 = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.appendChild(document.createTextNode("Character"));
    tr1.appendChild(th1);
    infos['allCharacters'].forEach(function(d){
        var th = document.createElement('th');
        var img= document.createElement('img');
        img.setAttribute("src", "//data.twinoid.com/proxy/mush.twinoid.com/img/icons/ui/" + charaToClassChar(d.name).replace('_','') + ".png");
        th.appendChild(img);
        tr1.appendChild(th);
    });
    table.appendChild(tr1);

    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode("Flights"));
    tr2.appendChild(td2);
    infos['allCharacters'].forEach(function(d){
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(d.number));
        tr2.appendChild(td);
    });
    table.appendChild(tr2);

    var tr3 = document.createElement('tr');
    var td3 = document.createElement('td');
    td3.appendChild(document.createTextNode("Days alive"));
    tr3.appendChild(td3);
    infos['allCharacters'].forEach(function(d){
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(d.days));
        tr3.appendChild(td);
    });

    table.appendChild(tr3);
    twinstyle.appendChild(table);

    var results = document.createElement('div');
    results.classList.add("paddingue");
    resHeader = document.createElement('h4');
    resHeader.appendChild(document.createTextNode('Achievements:'));
    results.appendChild(resHeader);
    infos['allAchievements'].forEach(function(d){
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(d.name+': '+d.number));
        results.appendChild(p);
    });

    twinstyle.appendChild(results);

    $('#profile > div.column2 > div.data > .bgtablesummar:first').after(bgtablesummar);
}

function Analyse_Analyse(n)
{
    var infos = new Array();
    infos['allDeaths'] = new Array();
    infos['allCharacters'] = [
        {name:'Ian',days:0,number:0},
        {name:'Kuan Ti',days:0,number:0},
        {name:'Roland',days:0,number:0},
        {name:'Gioele',days:0,number:0},
        {name:'Paola',days:0,number:0},
        {name:'Hua',days:0,number:0},
        {name:'Raluca',days:0,number:0},
        {name:'Andie',days:0,number:0},
        {name:'Derek',days:0,number:0},
        {name:'Eleesha',days:0,number:0},
        {name:'Frieda',days:0,number:0},
        {name:'Janice',days:0,number:0},
        {name:'Chun',days:0,number:0},
        {name:'Finola',days:0,number:0},
        {name:'Jin Su',days:0,number:0},
        {name:'Chao',days:0,number:0},
        {name:'Terrence',days:0,number:0},
        {name:'Stephen',days:0,number:0}
    ];
    infos['allAchievements'] = [
        {name:'Total Flights',number:0},
        {name:'Total Glory',number:0},
        {name:'Cycles as a Mush',number:0},
        {name:'Beta Mush',number:0},
        {name:'Expeditions',number:0}
    ];

    $('#cdTrips > table.summar > tbody > tr.cdTripEntry').each(function(index,elem){
        //Character, Day, Explo, search, projets, scan, titres, triomphe, mort, vaisseau
        var death = $(this).children('td:eq(8)').text();

        if(jQuery.grep(infos['allDeaths'],function(el){return el.cause==death;}).length > 0)
        {jQuery.grep(infos['allDeaths'],function(el){return el.cause==death;})[0].number++;}
        else {infos['allDeaths'].push({cause:death,number:1});}
        infos['allDeaths'].sort(function(a,b){return b.number - a.number;});

        var character = $(this).children('td:eq(0)').children('span.charname').text();

        jQuery.grep(infos['allCharacters'],function(el){return el.name==character;})[0].number++;
        infos['allCharacters'].sort(function(a,b){return b.number - a.number;});

        var t = $(this).children('td:eq(7)').text();
        jQuery.grep(infos['allAchievements'],function(el){return el.name=='Total Glory';})[0].number += parseInt(t);
        jQuery.grep(infos['allAchievements'],function(el){return el.name=='Total Flights';})[0].number += 1;
    });
    var stats=fillStats();

    stats.chars.forEach(function(char){
        jQuery.grep(infos['allCharacters'],function(el){return el.name==char.name;})[0].days=char.days;
    });
    stats.achievements.forEach(function(ack){
        jQuery.grep(infos['allAchievements'],function(el){return el.name==ack.name;})[0].number=ack.number;
    });

    return infos;
}

fillStats = function() {
    var stats={chars:[],achievements:[]};
    $(".tid_goalListWrapper").first().find("tr").each(function(){
        var cells=$(this).find("td");
        var value = parseInt(cells[2].textContent.slice(1), 10);
        switch (cells[1].textContent.trim()) {
            case 'Number of cycles spent cultivating psychotropic plants':
                stats.chars.push({name:'Ian',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won contemplating your work':
                stats.chars.push({name:'Kuan Ti',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won running round in circles':
                stats.chars.push({name:'Roland',days:Math.floor(value/8)});
                break;
            case 'Number of turns spent counting your cash':
                stats.chars.push({name:'Gioele',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent surfing the lowest frequencies':
                stats.chars.push({name:'Paola',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won, spent with the others':
                stats.chars.push({name:'Hua',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent stroking your cat':
                stats.chars.push({name:'Raluca',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent honoring the SDF.':
                stats.chars.push({name:'Andie',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent as an intergalactic Don Juan.':
                stats.chars.push({name:'Derek',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent fixing your barnet fair.':
                stats.chars.push({name:'Eleesha',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won reading the cards':
                stats.chars.push({name:'Frieda',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won... listening to others':
                stats.chars.push({name:'Janice',days:Math.floor(value/8)});
                break;
            case "Number of cycles you've spent providing blood samples":
                stats.chars.push({name:'Chun',days:Math.floor(value/8)});
                break;
            case 'Number of cycles examining the infinitely small':
                stats.chars.push({name:'Finola',days:Math.floor(value/8)});
                break;
            case 'Number of cycles won playing as the chief':
                stats.chars.push({name:'Jin Su',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent taking stuff out':
                stats.chars.push({name:'Chao',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent sulking in a corner.':
                stats.chars.push({name:'Terrence',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent cooking up suspect dishes':
                stats.chars.push({name:'Stephen',days:Math.floor(value/8)});
                break;
            case 'Number of cycles spent fungifying in a dark corner':
                stats.achievements.push({name:'Cycles as a Mush',number:value});
                break;
            case 'Infected':
                stats.achievements.push({name:'Beta Mush',number:value});
                break;
            case 'Explorer':
                stats.achievements.push({name:'Expeditions',number:value});
                break;

            default:
                //console.log(text);
                break;
        }
    });
    return stats;
};

function waitForStats(){
    if ($(".tid_goalListWrapper").length<2) {
        setTimeout(function(){waitForStats();},100);
    } else {
        Analyse_AddTable(0);
    }
}

waitForStats();
