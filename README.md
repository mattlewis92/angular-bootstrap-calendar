# Angular Bootstrap Calendar

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mattlewis92/angular-bootstrap-calendar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar)
[![Bower version](https://badge.fury.io/bo/angular-bootstrap-calendar.svg)](http://badge.fury.io/bo/angular-bootstrap-calendar)
[![npm version](https://badge.fury.io/js/angular-bootstrap-calendar.svg)](http://badge.fury.io/js/angular-bootstrap-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-bootstrap-calendar/master/LICENSE)

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Demo](#demo)
- [Development](#development)
- [License](#licence)

## About

This plugin is an AngularJS port of the original jQuery bootstrap calendar that can be found here:
http://bootstrap-calendar.azurewebsites.net/

The layout and functionality is intended to be exactly the same, but without the overhead of including jQuery just for a calendar. 

All credits for the UI/UX and the less files of the calendar go to the original author.

Pull requests are welcome.

## Installation

The calendar has a few dependencies, these are as follows, and must be included before this libraries files:

* [AngularJS](https://angularjs.org/) 1.3.x, 1.4.x and 1.5.x are supported
* [Bootstrap](http://getbootstrap.com/) 3+ (CSS only)
* [Moment.js](http://momentjs.com/)
* [ui-bootstrap](http://angular-ui.github.io/bootstrap/) (0.14.0+, optional, include for collapse animations and tooltips.
* [interact.js](http://interactjs.io/) (optional, include to allow drag and drop on the calendar)
* [ngTouch](https://docs.angularjs.org/api/ngTouch) (optional, include if using the calendar on mobile devices)

You can install through bower:

```
bower install --save angular-bootstrap-calendar
```

You will then need to include the JS and CSS files for the plugin:

```
<link href="bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css" rel="stylesheet">
<script src="bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js"></script>
```

And finally add the module dependency in your AngularJS app (you can remove ui.bootstrap if you don't want the extra dependency - it is only required for collapse animations and tooltips):

```javascript
angular.module('myApp', ['mwl.calendar', 'ui.bootstrap']);
```

Alternatively you can install through npm:
```
npm install --save angular-bootstrap-calendar
```

Or if using npm 3+ where peer dependencies aren't automatically installed:
```
npm install --save angular-bootstrap-calendar angular bootstrap moment angular-ui-bootstrap
```

Then add as a dependency to your app:

```javascript
angular.module('myApp', [require('angular-bootstrap-calendar'), require('angular-ui-bootstrap')]);
```

## Documentation

There is a single directive exposed to create the calendar, use it like so:
```javascript
<mwl-calendar
    view="calendarView"
    view-date="calendarDate"
    events="events"
    view-title="calendarTitle"
    on-event-click="eventClicked(calendarEvent)"
    on-event-times-changed="calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd"
    edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
    delete-event-html="'<i class=\'glyphicon glyphicon-remove\'></i>'"
    on-edit-event-click="eventEdited(calendarEvent)"
    on-delete-event-click="eventDeleted(calendarEvent)"
    cell-is-open="true">
</mwl-calendar>
```

An explanation of the properties is as follows:

### view (required attribute)

This variable is a string that can be either `year`, `month`, `week` or `day`. Changing it will change the view of the calendar.

For the calendar to display this variable needs to be set like so:
```javascript
$scope.calendarView = 'month';
```

### view-date (required attribute)

This variable holds the current date the calendar is centralised on. Each view will decide on its current year / month / week / day depending on the value of this variable.

### events (required attribute)

An array of events to display on the calendar. For example:
```javascript
$scope.events = [
  {
    title: 'My event title', // The title of the event
    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
    startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
    endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
    draggable: true, //Allow an event to be dragged and dropped
    resizable: true, //Allow an event to be resizable
    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
  }
];
```

`title`, `type` and `startsAt` are required for all events.

### view-title

This variable will be assigned to the calendar title. If you want to change the formatting you can use the `calendarConfig` or just override the appropriate method in the `calendarTitle` factory.

### on-event-click 

This expression is called when an event is clicked on the calendar. `calendarEvent` can be used in the expression and contains the calendar event that was clicked on.

### on-event-times-changed

This expression is called when an event is dragged and dropped or resized into a different date / time on the calendar. The available values that are passed to the expression are: `calendarEvent`, `calendarNewEventStart`, `calendarNewEventEnd` and `calendarDraggedFromDate` (month view only). The directive won't change the event object and leaves that up to you to implement. Please note drag and drop is only available by including the [interact.js](http://interactjs.io/) library.

### edit-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to edit-event-click.

### delete-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to delete-event-click.

### on-edit-event-click 

This expression is called when an event edit link is clicked on the calendar. `calendarEvent` can be used in the expression and contains the calendar event that was clicked on.

### on-delete-event-click 

This expression is called when an event delete link is clicked on the calendar. `calendarEvent` can be used in the expression and contains the calendar event that was clicked on.

### on-timespan-click

This expression is called when a month, day or hour on the calendar is clicked on the year, month and day views respectively. `calendarDate` can be used in the expression and contains the start of the month, day or hour that was clicked on. If on the month or year view `calendarCell` will contain cell data for the clicked day or month which you can then modify.

### cell-is-open

A 2 way bound variable that when set to true will open the year or month view cell that corresponds to the date passed to the date object passed to `view-date`.

### day-view-start

An interpolated string in the form of hh:mm to start the day view at, e.g. setting it to 06:00 will start the day view at 6am

### day-view-end

An interpolated string in the form of hh:mm to end the day view at, e.g. setting it to 22:00 will end the day view at 10pm

### day-view-split

The number of chunks to split the day view hours up into. Can be either 10, 15 or 30. Default: 30

### on-view-change-click

An optional expression that is evaluated when the view is changed by clicking on a date. Return false from the expression function to disable the view change. `calendarDate` can be used in the expression and contains the date that was selected. `calendarNextView` is the view that the calendar will be changed to.  

### cell-modifier

An optional expression that is evaluated on each cell generated for the year and month views. `calendarCell` can be used in the expression and is an object containing the current cell data which you can modify (see the `calendarHelper` service source code or just console.log it to see what data is available). If you add the `cssClass` property it will be applied to the cell.

### slide-box-disabled

If set it true it will disable the slidebox on the month and year views

## Configuring the calendar default config

You can easily customise the date formats and i18n strings used throughout the calendar by using the `calendarConfig` value. Please note that these example formats are those used by moment.js and these won't work if using angular as the date formatter. Example usage:

```javascript
angular.module('myModule')
  .config(function(calendarConfig) {

    console.log(calendarConfig); //view all available config

    calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template to a custom template

    calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    calendarConfig.i18nStrings.weekNumber = 'Week {week}'; //This will set the week number hover label on the month view

    calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

  });
```

## Custom directive templates

All calendar template urls can be changed using the `calendarConfig` as illustrated above. 

## The mwl-date-modifier directive

There is also a helper directive that you can use for the next, today and previous buttons. Use it like so:

```html
<button
  class="btn btn-primary"
  mwl-date-modifier
  date="calendarDay"
  decrement="calendarView">
  Previous
</button>

<button
  class="btn btn-default"
  mwl-date-modifier
  date="calendarDay"
  set-to-today>
  Today
</button>

<button
  class="btn btn-primary"
  mwl-date-modifier
  date="calendarDay"
  increment="calendarView">
  Next
</button>
```

## Internationalization and localization

You can either use angular's date filter or moment.js to format dates. The default is to use angular. You can change the formatter to be moment like so:

```javascript
angular.module('myModule')
  .config(function(calendarConfig) {
  
    calendarConfig.dateFormatter = 'moment'; // use moment to format dates
 
  });
```   

Then you just need to include the appropriate locale files for your app. 

If you want to dynamically change the locale for angular and not include all of the available angular locale files [try this library](https://github.com/lgalfaso/angular-dynamic-locale).

Otherwise if using moment you can call `moment.locale('YOUR_LOCALE_STRING')` to change the locale and the calendar will auto update.

To set Monday as the first day of the week, configure it in moment like so (even if using angular for formatting dates):
```javascript
moment.locale('en', {
  week : {
    dow : 1 // Monday is the first day of the week
  }
});
```

For a full list of all available formats and their defaults see [calendarConfig.js](https://github.com/mattlewis92/angular-bootstrap-calendar/blob/master/src/services/calendarConfig.js)

## Demo

http://mattlewis92.github.io/angular-bootstrap-calendar/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + run tests. 

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests (this is automatic when you run `npm start`). 

### Build
Run `npm run build` to build the project files in the dist folder

## License

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
