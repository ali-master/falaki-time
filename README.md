# Falaki Time(ساعت صورت فلکی)
falaki-time.js exposes a simple API for Calculate hours of constellation

### Dependencies
- [Moment js](http://momentjs.com/): Parse, validate, manipulate, and display dates in JavaScript.
- [preciseDiff](https://github.com/codebox/moment-precise-range): A moment.js plugin to display human-readable date/time ranges  
```javascript
var ft = new falakiTime("6.10", "19.50");
```
- Make Diff between both **6.10** and **19:50** time
```javascript
var diff = ft.diff();
// return: { years: 0, months: 0, days: 0, hours: 13, minutes: 40, seconds: 0, firstDateWasLater: false }
```
- The second stage: Get total number of Sunrise and Sunset time
```javascript
var total = ft.total();
// return: 820
```
- The third stage: find Every hour constellation
```javascript
var ehconst = ft.ehconst();
// return: moment("2016-11-26T01:08:00.000")
```
- The last step: Calculate the constellation hours
```javascript
var resultOfCalc = ft.forEach();
// return: [ '7:18', '8:26', '9:34', '10:42', '11:50', '12:58', '14:6', '15:14', '16:22', '17:30', '18:38', '19:46', '20:54', '22:2', '23:10', '0:18', '1:26', '2:34' ]
```
### Usage

#### HTML/Browser
To use the plugin in a web page, add a <script> tag referencing the moment.js and moment-precise-range.js files, ensuring that the tag appears after the tag used to include the falaki-time.js library:
```html
<script type="text/javascript" src="/scripts/moment.js"></script>
<script type="text/javascript" src="/scripts/moment-precise-range.js"></script>
<script type="text/javascript" src="/scripts/falaki-time.js"></script>
```
#### Node.js
To use the plugin within a node.js application, add the following require statement into your code:
```sh
$ npm install falaki-time
```
```javascript
require('falaki-time');
```
You can try out the Node package online at [tonicdev](https://runkit.com/alimaster/5839549f97657a0014e1a70c)
