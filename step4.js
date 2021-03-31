window.onload = function() {
    main();
};

function main() {
    // Grund-Daten
    let strDebug = "";
    let datToday = new Date();
    strDebug += "datToday: " + datToday.toDateString() + "<br/>"; // Ausgabe
    let datTodayGerman = getDateGerman(datToday);
    strDebug += "datTodayGerman: " + datTodayGerman + "<br/>"; // Ausgabe

    // Wochentag
    let weekday = datToday.getDay(); // ergibt den Tag der Woche als Zahl 
                                     // (von 0 = Sonntag bis 6 = Samstag)
    strDebug += "weekday: " + weekday + "<br/>"; // Ausgabe
    let weekdayGerman = getWeekdayGerman(weekday);
    strDebug += "weekdayGerman: " + weekdayGerman + "<br/>";

    // Wievielte Wochentag dieser Art       
    let wievielte = Math.floor((datToday.getDate() - 1) / 7) + 1;
    let wievielteGerman = getWievielteGerman(wievielte);     

    //Month
    let monthGerman = getMonthGerman(datToday.getMonth() +1);

    //Year
    let yearGerman = datToday.getFullYear();
    //Days
    let lastOfMonth = new Date(datToday.getFullYear(), datToday.getMonth() + 1, 0);
    let days = lastOfMonth.getDate();

   // Feiertage
    let holidayHTML = '';
    let holidayArray = getHolidayArrayHessen(datToday);
    if (holidayArray.includes(datToday.getTime())) {
        holidayHTML = 'Der ' + datTodayGerman + ' ist ein gesetzlicher Feiertag.';
        } else {
        holidayHTML = 'Der ' + datTodayGerman + ' ist kein gesetzlicher Feiertag.';
        }


  // Wir füllen die Informationen in den HTML-Code
    document.getElementById("field1").innerHTML = datTodayGerman;
    document.getElementById("field2").innerHTML = datTodayGerman;
    document.getElementById("field3").innerHTML = weekdayGerman;
    document.getElementById("field4").innerHTML = weekdayGerman;
    document.getElementById("field5").innerHTML = wievielteGerman;
    document.getElementById("field6").innerHTML = monthGerman;
    document.getElementById("field7").innerHTML = datToday.getFullYear();
    document.getElementById("field8").innerHTML = days;
    document.getElementById("field9").innerHTML = holidayHTML;    

    // Ausgabe in das elDebug
    var elDebug = document.getElementById("debug");
    if (elDebug != null) {
        elDebug.innerHTML = strDebug;
    } else {
        console.log("Debug-Element nicht gefunden.");
    }
}

function getDateGerman(date) {
    day = date.getDate();
    month = date.getMonth();
    month = month + 1; // Warum auch immer ... Javascript speichert Monate 
                       // 0-basiert, also 0 = Januar, 11 = Dezember, daher hier 
                       // Korrektur + 1
    year = date.getFullYear();
    // Man beachte: Man könnte hier nachfolgend nach dem if {} benutzen, aber da 
    // es sich nur um EINE nachfolgende Anweisung handelt, geht es auch so 
    if (String(day).length == 1) day = "0" + day;
    // Nachfolgend alternativ MIT Klammern
    if (String(month).length == 1) {
        month = "0" + month;
    }
    dateGerman = day + "." + month + "." + year;
    return dateGerman;
}

function getHolidayArrayHessen(date) {
    let year = date.getFullYear();
    let array = [];
    array.push(new Date(year - 1, 11, 25).getTime()); // 1. Weihnachtstag Vorjahr
    array.push(new Date(year - 1, 11, 26).getTime()); // 2. Weihnachtstag Vorjahr
    array.push(new Date(year, 0, 1).getTime()); // Neujahr
    array.push(new Date(year, 4, 1).getTime()); // Tag der Arbeit
    array.push(new Date(year, 9, 3).getTime()); // Tag der Dt. Einheit
    array.push(new Date(year, 11, 25).getTime()); // 1. Weihnachtstag
    array.push(new Date(year, 11, 26).getTime()); // 2. Weihnachtstag
    array.push(new Date(year + 1, 0, 1).getTime()); // Neujahr nächstes Jahr
    let osterSonntag = getEasterSunday(year);
    array.push(osterSonntag.getTime());
    let osterMontag = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 1);
    array.push(osterMontag.getTime());
    let christiHimmelfahrt = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 39);
    array.push(christiHimmelfahrt.getTime());
    let pfingstMontag = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 50);
    array.push(pfingstMontag.getTime());
    let fronLeichnam = new Date(year, osterSonntag.getMonth(), osterSonntag.getDate() + 60);
    array.push(fronLeichnam.getTime());
    return array;
}

function calendarHTML_footer() {
    html = "</tbody></table>";
    return html;
}

function getEasterSunday(Jahr) { // Erstellt von Ralf Pfeifer (www.arstechnica.de)
    // Falls ausserhalb des gültigen Datumsbereichs, kein Ergebnis zurueckgeben
    if ((Jahr < 1970) || (2099 < Jahr)) return null;
    var a = Jahr % 19;
    var d = (19 * a + 24) % 30;
    var Tag = d + (2 * (Jahr % 4) + 4 * (Jahr % 7) + 6 * d + 5) % 7;
    if ((Tag == 35) || ((Tag == 34) && (d == 28) && (a > 10))) { Tag -= 7; }

    var OsterDatum = new Date(Jahr, 2, 22)
    OsterDatum.setTime(OsterDatum.getTime() + 86400000 * Tag)
    return OsterDatum;
}

function getWievielteGerman(number) { // zb. 1
    var arr = ["erste", "zweite", "dritte", "vierte", "fünfte"];
       return arr[number - 1];
}

function getWeekdayGerman(weekdayIndex) {
    if (weekdayIndex == 0) {
        return "Sonntag";
    } else if (weekdayIndex == 1) {
        return "Montag";
    } else if (weekdayIndex == 2) {
        return "Dienstag";
    } else if (weekdayIndex == 3) {
        return "Mittwoch";
    } else if (weekdayIndex == 4) {
        return "Donnerstag";
    } else if (weekdayIndex == 5) {
        return "Freitag";
    } else if (weekdayIndex == 6) {
        return "Samstag";
    }
}

function getMonthGerman(monthIndex) {
    var arr = [
        "Fehler",
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
    ];
    return arr[monthIndex];
}

