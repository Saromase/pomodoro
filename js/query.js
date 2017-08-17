var time = 0;
var minute = 0;
var second = 0;
var interval = 0;
var set = 1;

$(document).ready(function () {
    $("#start").click(function () {
        if (time == 0) {
            $("#time").text("00 : 00");
        }
        if (set == 0) {
            $("#start").text("Play");
            clearInterval(interval);
            set = 1;
        } else {
            $("#start").text("Pause");
            interval = setInterval(addSecond, 1000);
            set = 0;
        }
    });

    $("#reset").click(function () {
        set = 1;
        time = 0;
        minute = 0;
        second = 0;
        $("#start").text("Start");
        clearInterval(interval);
        $("#time").text("00 : 00");
        $("title").text("Pomodoro");
    });

    $("#300").click(function () {
        time = 300;
        minute = time / 60;
        second = 0;
        displayClearTime(minute, second);
    });

    $("#600").click(function () {
        time = 600;
        minute = time / 60;
        second = 0;
        displayClearTime(minute, second);
    });

    $("#1500").click(function () {
        time = 1500;
        minute = time / 60;
        second = 0;
        displayClearTime(minute, second);
    });
    
    $(document).keypress(function (e) {
        if (e.which == 32) {
            if (set == 0) {
                clearInterval(interval);
                set = 1;
            } else {
                interval = setInterval(addSecond, 1000);
                set = 0;
            }
        }
    });


});


function displayClearTime(m, s) {
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    return $("#time").text(m + " : " + s) + $("title").text(m + " : " + s + " - Pomodoro");
}

function addSecond() {
    if (time != 0) {
        if (second == 0) {
            minute--;
            second = 59;
            time--;
        } else {
            second--;
            time--;
        }
    }
    if (time <= 0) {
        time = 0
        $("#time").text(time);
        clearInterval(interval);
        $("#sound")[0].play();
    }
    displayClearTime(minute, second);
}
