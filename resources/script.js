//It's messy code. pls no bully.
//Features to implement: 
//Number prefix actions - Easy mode
//Link search (the "/" button)
//Fix 'undefined' on line 53
//Author: luna c
var dirName = new Array(); 
var dirLink = new Array();
var div = document.createElement("div");
var displayID = 0; //Which directory to display
var focus = 0;
div.setAttribute('id', "link-container");
readFromFile();

function readFromFile() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
           interpret(this);
       }
   };
   xhttp.open("GET", "resources/web.xml", true);
   xhttp.send();
 }
function interpret(xml) {
    var x, xmlDoc, txt, y; //i - looping var, txt - extracted text from xmldoc
    var siteList = new Array();
    xmlDoc = xml.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName("directory");
    for (var i = 0; i < x.length; i++) {
        txt = x[i].getAttribute("category");
        dirName.push(txt);
    }
    for (var i = 0; i < x.length; i++) {
        y = x[i].children;
        siteList = new Array();
        for (var j = 0; j < y.length; j++) {
            var z = y[j].children;
            var site = {name:z[0].childNodes[0].nodeValue, url:z[1].childNodes[0].nodeValue};
            siteList.push(site); 
        }
        dirLink.push(siteList);
    }
    render();
}

function render() {
    var p, t, br;
    if (dirLink[displayID].length <= focus)
        focus = 0;
    if (0 > focus)
        focus = dirLink[displayID].length - 1;
    div.innerHTML = "";
    p = document.createElement("p");
    if (displayID - 1 < 0) 
        t = document.createTextNode(dirName[dirLink.length - 1] + " " + dirName[displayID] + "  " + dirName[displayID + 1]);
    else if (displayID + 1 >= dirName.length)
       t = document.createTextNode(dirName[displayID - 1] + " " + dirName[displayID] + " " + dirName[0]);
    else
        t = document.createTextNode(dirName[displayID - 1] + "  " + dirName[displayID] + " " + dirName[displayID + 1]);
    p.appendChild(t);
    div.appendChild(p);
    div.appendChild(document.createElement("br"));
    document.getElementById("topcontainer").appendChild(div);
    for (var i = 0; i < dirLink[displayID].length; i++)
    {
        p = document.createElement("a");
        p.setAttribute('href', dirLink[displayID][i].url);
        if (i === focus)
            p.setAttribute('id', "focus")
        else
            p.setAttribute('id', i);
        t = document.createTextNode(dirLink[displayID][i].name);
        p.appendChild(t);
        div.appendChild(p);
        div.appendChild(document.createElement("br"));
        document.getElementById("topcontainer").appendChild(div);
    }
    keys();
}
function keys() {
   window.removeEventListener('keyup', keyHandler, false);
   window.addEventListener('keyup', keyHandler, false);
}

function keyHandler(e)
{
   if (document.activeElement !== document.getElementById("search")) {
       switch (e.which) {
       case 73:
           document.getElementById("search").focus();
           break;
       case 76:
           if (displayID + 1 < dirName.length)
               displayID = displayID + 1;
           else
               displayID = 0;
           render();
           break;
        case 72:
           if (displayID - 1 >= 0)
               displayID = displayID - 1;
           else 
               displayID = dirName.length - 1;
           render();
           break;
        case 74:
            focus = focus + 1;
            render();
            break;
        case 75:
            focus = focus - 1;
            render(); 
            break;
        case 79: 
           temp = document.getElementById("focus").href +  document.getElementById('search').value; //fix later! window.location = focus.href + search.value doesn't work - research this
           window.location = temp;
           break;
        case 59:
        case 13:
           window.location = document.getElementById("focus").href;
           break;
       }
    }
   else 
       if (e.which === 27)
           document.getElementById("search").blur();
}
function search()
{
        var query = document.getElementById('search').value; 
        switch (query.substring(0, 4)) {
            case "-nav":
                window.location = query.substring(5);
                break;
            case "-goo":
                window.location = "https://encrypted.google.com/search?q=" + query.substring(4);
                break;
            case "-yt ":
                window.location = "https://youtube.com/results?search_query=" + query.substring(4);
                break;
            default: window.location = 'https://searx.good.one.pl/?q=' + query;
        }
}

