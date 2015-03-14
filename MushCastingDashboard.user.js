// ==UserScript==
// @name         Mush Casting Dashboard
// @namespace    http://www.kremlin.ru/
// @version      0.1
// @description  Mush Casting Dashboard
// @author       Innokentiy
// @match        http://mush.twinoid.com/g/leprosorium/center
// @grant        none
// @downloadURL https://raw.githubusercontent.com/insoln/mush/master/MushCastingDashboard.user.js

// ==/UserScript==

function startScript() {
    
    var data_in = document.getElementsByClassName("bgtablesummar")[0].childNodes[1];
    var data_out = document.getElementsByClassName("summar")[0];
    var txt="<tr><td>Name</td><td>Status</td><td>Last ship</td><tr>";
    var i;
    var status;
    var req = new XMLHttpRequest();

    for ( i = 1; i< data_in.childNodes.length-1; i++) {
        txt = txt + "<td>"+data_in.childNodes[i].childNodes[1].childNodes[1].innerHTML + "</td>";
        status=data_in.childNodes[i].childNodes[3].getAttribute("src").substring(14,30);
        status=status.substring(0,status.length-4);
        txt = txt + "<td>"+status+"</td>";
        
        req.open('GET', 'http://mush.twinoid.com/u/profile/'+data_in.childNodes[i].childNodes[1].childNodes[1].getAttribute("tid_id"), false);
        req.send(null);
        response = req.responseText;
        var el1 = document.createElement( 'div' );
        el1.innerHTML = response;
        txt=txt+"<td>"+el1.getElementsByClassName("butmini")[0].getAttribute("href").substring(8,12)+"</td>";
        txt=txt + "</tr>";
    }

    data_out.innerHTML=txt;
}

window.addEventListener('load', startScript, false);