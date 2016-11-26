'use strict';

var moment      = require('moment');
var preciseDiff = require("moment-precise-range-plugin");

/**
 * Calculate hours constellation
 * @param  {[string]} start [Sunrise time]
 * @param  {[string]} end   [sunset time]
 */
var falakiTime = function(start, end) {
    this.start = start;
    this.end   = end;

    this._format = "HH:mm";
    this._total  = 0;
}
// 1th Stage [get diff from start and end times]
falakiTime.prototype.diff = function () {
    // we assume the Sunrise time is 6:10min
    // and the Sunset time is 19:15min

    var start  = this.start || "00:00";
    var end    = this.end   || "00:00";

    var mStart = moment(start, this._format);
    var mEnd   = moment(end, this._format);

    // diffTime = start - end
    var diffTime = moment.preciseDiff(mStart, mEnd, true);
    return diffTime || "00.00";
};

// 2th Stage [Calculate Times]
falakiTime.prototype.total = function () {
    // multiply hours to 60
    // then total hours with minutes
    var hours = this.diff().hours * 60;
    var minutes = this.diff().minutes;

    this._total = hours + minutes;
    return this._total || 0;
};

// 3th Stage [find Every hour constellation]
falakiTime.prototype.ehconst = function () {
    var ehconst = this._total / 12;

    // Convert number of seconds into time
    var numbertoTime = this._rectime(ehconst.toFixed(0));

    // make new time from numbertoTime variable value and equal to ehconst
    ehconst = moment(numbertoTime, "HH:mm");
    return ehconst || 0;
}

/**
 * Convert number of seconds into time object
 *
 * @param integer secs Number of seconds to convert
 * @return object
 */
falakiTime.prototype._rectime = function (secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = secs - (hr * 3600) - (min * 60);

    while (min.length < 2) {min = '0' + min;}
    while (sec.length < 2) {sec = '0' + min;}
    if (hr) hr += ':';

    return hr + min + ':' + sec;
};

// 4th stage [add iterate number the value of 3th stage to start time until the 00:00 hours]
falakiTime.prototype.forEach = function() {
    this.diff.call(this);
    this.total.call(this);

    var iterate = this.ehconst.call(this);
    var hours   = iterate.get("hours");
    var minutes = iterate.get("minutes");

    var startTime = moment(this.start, "HH:mm"),
        all       = new Array();
    for (var i = startTime.get("hours"); i < 24; i++) {
        startTime = startTime.add(hours, "hours").add(minutes, 'minutes');
        all.push(startTime.get("hours") + ":" + startTime.get("minutes"));
    }
    return all;
}
