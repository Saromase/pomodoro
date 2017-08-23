var Timer = {
    time: 0,
    minute: 0,
    second: 0,
    status: "initial",
    period: function (total, minute, second, status) {
        this.time = total;
        this.minute = minute;
        this.second = second;
        this.status = status;
        if (typeof interval !== "undefined") {
            clearInterval(interval);
            $("#start").text("Start");
        }
        Timer.displayClear();
    },
    clock: function () {
        if (Timer['time'] != 0) {
            Timer['second']--;
            Timer['time']--;
            if (Timer['second'] < 0) {
                Timer['minute']--;
                Timer['second'] = 59
            }
            Timer.displayClear();
        }
    },
    displayClear: function () {
        var s = this.second < 10 ? "0" + this.second : this.second;
        var m = this.minute < 10 ? "0" + this.minute : this.minute;
        $("#time").text(m + " : " + s);
        $("title").text(m + " : " + s + " - Pomodoro");
    },
    start: function () {
        if (Timer['status'] === "initial") {
            Timer.period(1500, 25, 0, "on");
            Timer.displayClear();
            $("#start").text("Pause");
            interval = setInterval(Timer.clock, 1000);
        } else if (Timer['status'] === "on") {
            Timer.status = "off";
            Timer.displayClear();
            $("#start").text("Play");
            clearInterval(interval);
        } else if (Timer['status'] === "set") {
            Timer.status = "on";
            Timer.displayClear();
            $("#start").text("Pause");
            interval = setInterval(Timer.clock, 1000);
        } else {
            Timer.status = "on";
            Timer.displayClear();
            $("#start").text("Pause");
            interval = setInterval(Timer.clock, 1000);
        }
    },
    reset: function () {
        Timer.period(0, 0, 0, "initial");
        $("#start").text("Start");
        clearInterval(interval);
    }
}
$(document).ready(function () {
    var interval;
    $("#start").click(function () {
        Timer.start();
    });
    $("#reset").click(function () {
        Timer.reset();
    });
    $("#300").click(function () {
        Timer.period(300, 5, 0, "set");
    });
    $("#600").click(function () {
        Timer.period(600, 10, 0, "set");
    });
    $("#1500").click(function () {
        Timer.period(1500, 25, 0, "set");
    });
    $(document).keypress(function (e) {
        switch (e.which) {
            case 13: // Enter
                Timer.start();
                break;
            case 32: // SPACE
                Timer.reset();
                break;
            case 49: // SHIFT + &
                Timer.period(300, 5, 0, "off");
                break;
            case 50: // SHIFT + é
                Timer.period(600, 10, 0, "off");
                break;
            case 51: // SHIFT + "
                Timer.period(1500, 25, 0, "off");
                break;
        }
    });
});
