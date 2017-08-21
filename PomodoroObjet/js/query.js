var timer = {
    time: 0,
    minute: 0,
    second: 0,
    status: "initial",
    set: function (total, minute, second) {
        this.time = total;
        this.minute = minute;
        this.second = second;
    },
    period: function (total, minute, second, status) {
        this.set(total, minute, second);
        this.status = status;
    }
}

function clock() {
    if (timer['time'] != 0) {
        timer['second']--;
        timer['time']--;
        if (timer['second'] < 0) {
            timer['minute']--;
            timer['second'] = 59
        }
        displayClear(timer['second'], timer['minute'])
    }
}

function displayClear(s, m) {
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    $("#time").text(m + " : " + s);
}

$(document).ready(function () {
    var interval;
    $("#start").click(function () {
        if (timer['status'] === "initial") {
            timer.period(1500, 25, 0, "on");
            displayClear(timer['second'], timer['minute']);
            $("#start").text("Pause");
            interval = setInterval(clock, 1000);
        } else if (timer['status'] === "on") {
            timer.status = "off";
            displayClear(timer['second'], timer['minute']);
            $("#start").text("Play");
            clearInterval(interval);
        } else {
            timer.status = "on";
            displayClear(timer['second'], timer['minute']);
            $("#start").text("Pause");
            interval = setInterval(clock, 1000);
        }
    });
    $("#reset").click(function () {
        timer.period(0, 0, 0, "initial");
        displayClear(timer['second'], timer['minute']);
        $("#start").text("Start");
        clearInterval(interval);
    });
    $("#300").click(function () {
        timer.period(300, 5, 0, "off");
        displayClear(timer['second'], timer['minute']);
    });
    $("#600").click(function () {
        timer.period(600, 10, 0, "off");
        displayClear(timer['second'], timer['minute']);
    });
    $("#1500").click(function () {
        timer.period(1500, 25, 0, "off");
        displayClear(timer['second'], timer['minute']);
    });
    $(document).keypress(function (e) {
        switch (e.which) {
            case 13: // Enter
                if (timer['status'] === "initial") {
                    timer.period(1500, 25, 0, "on");
                    displayClear(timer['second'], timer['minute']);
                    $("#start").text("Pause");
                    interval = setInterval(clock, 1000);
                } else if (timer['status'] === "on") {
                    timer.status = "off";
                    displayClear(timer['second'], timer['minute']);
                    $("#start").text("Play");
                    clearInterval(interval);
                } else {
                    timer.status = "on";
                    displayClear(timer['second'], timer['minute']);
                    $("#start").text("Pause");
                    interval = setInterval(clock, 1000);
                }
                break;
            case 32: // SPACE
                timer.period(0, 0, 0, "initial");
                displayClear(timer['second'], timer['minute']);
                $("#start").text("Start");
                clearInterval(interval);
                break;
            case 49: // SHIFT + &
                timer.period(300, 5, 0, "off");
                displayClear(timer['second'], timer['minute']);
                break;
            case 50: // SHIFT + é
                timer.period(600, 10, 0, "off");
                displayClear(timer['second'], timer['minute']);
                break;
            case 51: // SHIFT + "
                timer.period(1500, 25, 0, "off");
                displayClear(timer['second'], timer['minute']);
                break;
        }
    });
});
