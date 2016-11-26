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
