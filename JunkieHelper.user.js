// ==UserScript==
// @name         Junkie Helper
// @version      1.0
// @description  Retrieves coffee, utilizing sofa & apron
// @author       Volcher
// @include      http://mush.twinoid.com/
// @downloadURL  https://raw.githubusercontent.com/insoln/mush/master/JunkieHelper.user.js
// @grant        none
// ==/UserScript==

function getButton(item, string){
    var ser = Main.iid2Serial(item) || $("#myInventory").find("li[data-id='"+item+"']").attr("serial"); //iid2Serial doesn't works with own inventory.
    var buts = $(".cdActionRepository").find("div[webdata='"+ser+"']:not(.fake):contains('"+string+"') a"); //Gives active buttons of existing item, no additional checks required.
    return buts.length==0?null:buts[0];
}

function tryButton(item, string){
    var but = getButton(item, string);
    if(but !== null){
        but.click();
        return true;
    } else return false;
}

function onlyBeforeCoffee(what){
    var coffeeTakenLog = $(".cdChatPack:first div.cdChatLine:contains('has knocked over the Coffee.')");
    var beforeCoffee = coffeeTakenLog.nextAll("div:contains('"+what+"')").length>0;
    var afterCoffee = coffeeTakenLog.prevAll("div:contains('"+what+"')").length>0;
    return beforeCoffee&&!afterCoffee;
}

function favReport(thread, text){
    var coffeeThreadID = $(".cdFavWall .mainsaid:contains('"+thread+"')").parents('.unit').data('k');
    if(coffeeThreadID!=undefined) Main.ajaxChat("/wallReply?k=" + coffeeThreadID + "&msg=" + encodeURIComponent(text));
}

function JunkieHelper(){ // Yeah, i know how fucked up execution flow looks...
    if($("#input").attr("d_name") != "Refectory") return;
    $("#dialog_body:contains('That wasn't supposed to happen. In the heat of the action you hurt yourself...')").parent().find("a").click();
    $("#dialog_body:contains('Disgusting... You\'re filthy. (Not like that. Although...)')").parent().find("a").click();

    var coffee = getButton("COFFEE_DISPENSER", "Coffee!");
    if(coffee !== null){
        if(!tryButton("APRON", "Pick up")){
            coffee.click();
            favReport(/(coffee|кофе|food|еда|refectory|кухня)/i, $('.cycletime').text().replace(/[^DC0-9]/g, "")+": Coffee retrieved");
        }
    } else {
        var curHero = $("h1.who").text().trim();
        if (onlyBeforeCoffee(curHero+" wakes up calmly...")) tryButton("SOFA", "Lie Down");
        if (onlyBeforeCoffee(curHero+" has picked up the Stainproof Apron.")) tryButton("APRON", "Drop");
    }
    setTimeout(JunkieHelper, 5000);
}

JunkieHelper(); //Main loop.


setTimeout(function(){
    $("#timetomove").find("a")[0].click();
}, Main.tData.timeToCycle - (new Date()).getTime() + Main.tData.clientNow.getTime() + 15000); // Click "Next Cycle" when time comes.

