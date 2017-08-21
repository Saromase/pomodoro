var time = 0;
var minute = 0;
var second = 0;
var interval = 0;
var set = "stop";
var i = 0;
var progress = 0;
$(document).ready(function () {
    $("#start").click(function () {
        if (set === "play") {
            $("#start").text("Play");
            clearInterval(interval);
            set = "stop";
        } else {
            $("#start").text("Pause");
            interval = setInterval(addSecond, 1000);
            set = "play";
        }
    });

    $("#reset").click(function () {
        set = "stop";
        time = 0;
        minute = 0;
        second = 0;
        i = 0;
        $("#start").text("Start");
        clearInterval(interval);
        $("#time").text("00 : 00");
        $("title").text("Pomodoro");
        $('.progress-bar').css('width', '0').attr('aria-valuenow', '0').attr('aria-valuemax', '100');
    });

    $("#300").click(function () {
        if (time != 0) {
            i = 0;
        }
        time = 300;
        minute = time / 60;
        second = 0;
        progress = 0.3333333;
        displayClearTime(minute, second);
    });

    $("#600").click(function () {
        if (time != 0) {
            i = 0;
        }
        time = 600;
        minute = time / 60;
        second = 0;
        progress = 0.1666666;
        displayClearTime(minute, second);
    });

    $("#1500").click(function () {
        if (time != 0) {
            i = 0;
        }
        time = 1500;
        minute = time / 60;
        second = 0;
        progress = 0.066666;
        displayClearTime(minute, second);
    });

    // Key Binding
    $(document).keydown(function (e) {
        switch (e.which) {
            case 13: // ENTER
                if (set === "play") {
                    $("#start").text("Play");
                    clearInterval(interval);
                    set = "stop";
                } else {
                    $("#start").text("Pause");
                    interval = setInterval(addSecond, 1000);
                    set = "play";
                }
                break;

            case 32: // SPACE
                set = "stop";
                time = 0;
                minute = 0;
                second = 0;
                i = 0;
                $("#start").text("Start");
                clearInterval(interval);
                $("#time").text("00 : 00");
                $("title").text("Pomodoro");
                $('.progress-bar').css('width', '0').attr('aria-valuenow', '0').attr('aria-valuemax', '100');
                break;

            case 49: // SHIFT + &
                if (time != 0) {
                    i = 0;
                }
                time = 300;
                minute = time / 60;
                second = 0;
                progress = 0.3333333;
                displayClearTime(minute, second);
                break;

            case 50: // SHIFT + é
                if (time != 0) {
                    i = 0;
                }
                time = 600;
                minute = time / 60;
                second = 0;
                progress = 0.1666666;
                displayClearTime(minute, second);
                break;
            case 51: // SHIFT + 
                if (time != 0) {
                    i = 0;
                }
                time = 1500;
                minute = time / 60;
                second = 0;
                progress = 0.066666;
                displayClearTime(minute, second);
                break;

            default:
                return;
        }
        e.preventDefault();
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
    i += progress;
    $('.progress-bar').css('width', i + '%').attr('aria-valuenow', i).attr('aria-valuemax', progress * time);

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
