# Angular Bootstrap Calendar

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mattlewis92/angular-bootstrap-calendar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar)
[![codecov](https://codecov.io/gh/mattlewis92/angular-bootstrap-calendar/branch/master/graph/badge.svg)](https://codecov.io/gh/mattlewis92/angular-bootstrap-calendar)
[![Bower version](https://badge.fury.io/bo/angular-bootstrap-calendar.svg)](http://badge.fury.io/bo/angular-bootstrap-calendar)
[![npm version](https://badge.fury.io/js/angular-bootstrap-calendar.svg)](http://badge.fury.io/js/angular-bootstrap-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/issues)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-bootstrap-calendar/master/LICENSE)

## Table of contents

- [Demo](#demo)
- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## Demo

https://mattlewis92.github.io/angular-bootstrap-calendar/

## About

This plugin is an AngularJS port of the original jQuery bootstrap calendar that can be found here:
http://bootstrap-calendar.azurewebsites.net/

The layout and functionality is intended to be exactly the same, but without the overhead of including jQuery just for a calendar.

All credits for the UI/UX and the less files of the calendar go to the original author.

Pull requests are welcome.

Looking for an angular 2.0+ version of this library? Check this out: https://github.com/mattlewis92/angular-calendar

## Installation

The calendar has a few dependencies, these are as follows, and must be included before this libraries files:

* [AngularJS](https://angularjs.org/) 1.3.x, 1.4.x, 1.5.x and 1.6.x are supported
* [Bootstrap](http://getbootstrap.com/) 3+ (CSS only)
* [Moment.js](http://momentjs.com/)

**Optional dependencies:**
* [ui-bootstrap](http://angular-ui.github.io/bootstrap/) (0.14.0+, optional, include for collapse animations and tooltips.
* [interactjs](http://interactjs.io/) (optional, include to allow drag and drop on the calendar)
* [ngTouch](https://docs.angularjs.org/api/ngTouch) (optional, include if using the calendar on mobile devices. You will also need to enable `$touchProvider.ngClickOverrideEnabled(true)` on angular 1.5.0+)

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
    view-date="viewDate"
    events="events"
    view-title="calendarTitle"
    on-event-click="eventClicked(calendarEvent)"
    on-event-times-changed="calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd"
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
    startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
    endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
    color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
      primary: '#e3bc08', // the primary event color (should be darker than secondary)
      secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
    },
    actions: [{ // an array of actions that will be displayed next to the event title
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
      cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
      onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
        console.log('Edit event', args.calendarEvent);
      }
    }],
    draggable: true, //Allow an event to be dragged and dropped
    resizable: true, //Allow an event to be resizable
    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    allDay: false // set to true to display the event as an all day event on the day view
  }
];
```

`title`, `color` and `startsAt` are required for all events.

### view-title

This variable will be assigned to the calendar title. If you want to change the formatting you can use the `calendarConfig` or just override the appropriate method in the `calendarTitle` factory.

### on-event-click

This expression is called when an event is clicked on the calendar. `calendarEvent` can be used in the expression and contains the calendar event that was clicked on.

### on-event-times-changed

This expression is called when an event is dragged and dropped or resized into a different date / time on the calendar. The available values that are passed to the expression are: `calendarEvent`, `calendarNewEventStart`, `calendarNewEventEnd` and `calendarDraggedFromDate` (month view only). The directive won't change the event object and leaves that up to you to implement. Please note drag and drop is only available by including the [interactjs](http://interactjs.io/) library.

### on-timespan-click

This expression is called when a month, day or hour on the calendar is clicked on the year, month and day views respectively. `calendarDate` can be used in the expression and contains the start of the month, day or hour that was clicked on. If on the month or year view `calendarCell` will contain cell data for the clicked day or month which you can then modify.

### on-date-range-select

This expression is called when a range of hours selected on the day view respectively. `calendarRangeStartDate` can be used in the expression and contains the start of the range, `calendarRangeEndDate` can be used in the expression and contains the end of the range.

### cell-is-open

A 2 way bound variable that when set to true will open the year or month view cell that corresponds to the date passed to the date object passed to `view-date`.

### day-view-start

An interpolated string in the form of hh:mm to start the day view at, e.g. setting it to 06:00 will start the day view at 6am. Any minutes must be divisible by the `day-view-split` value.

### day-view-end

An interpolated string in the form of hh:mm to end the day view at, e.g. setting it to 22:59 will end the day view at 11pm.

### day-view-split

The number of chunks to split the day view hours up into. Can be either 10, 15 or 30. Default: 30

### day-view-event-chunk-size

The number of pixels to "snap" event drag and resizes to. Default: 30

### day-view-event-width

The width of day view events. Default: 150

### on-view-change-click

An optional expression that is evaluated when the view is changed by clicking on a date. Return false from the expression function to disable the view change. `calendarDate` can be used in the expression and contains the date that was selected. `calendarNextView` is the view that the calendar will be changed to.

### cell-modifier

An optional expression that is evaluated on each cell generated for the year, month and day views. `calendarCell` can be used in the expression and is an object containing the current cell data which you can modify (see the `calendarHelper` service source code or just console.log it to see what data is available). If you add the `cssClass` property it will be applied to the cell.

### cell-auto-open-disabled

If set it true it will disable the auto opening and closing of the slidebox on the month and year views

### custom-template-urls

An object where the key is the template name to override and the value is a path to a custom template for that calendar instance. If not set it will fallback to the value of `calendarConfig.templates`.

For example, to change the month view template on just one instance of the month view:
```
// in your controller
$templateCache.put('my-custom-template.html', 'Custom month view template here');

// in your template
<mwl-calendar custom-template-urls="{calendarMonthView: 'my-custom-template.html'}"></mwl-calendar>
```

### template-scope
An object containing a set of variables that will be available in a custom template as `vm.templateScope`

### draggable-auto-scroll
Passed to the [autoScroll](http://interactjs.io/docs/#autoscroll) option of interactjs. Unlike interact this defaults to `true` if not set.

## Configuring the calendar default config

You can easily customise the date formats and i18n strings used throughout the calendar by using the `calendarConfig` value. Please note that these example formats are those used by moment.js and these won't work if using angular as the date formatter. Example usage:

```javascript
angular.module('myModule')
  .config(['calendarConfig', function(calendarConfig) {

    // View all available config
    console.log(calendarConfig);

    // Change the month view template globally to a custom template
    calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; 

    // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    calendarConfig.dateFormatter = 'moment';

    // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

    // This will configure the day view title to be shorter
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

    // This will set the week number hover label on the month view
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';

    // This will display all events on a month view even if they're not in the current month. Default false.
    calendarConfig.displayAllMonthEvents = true;

    // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
    calendarConfig.showTimesOnWeekView = true;

  }]);
```

## Custom directive templates

All calendar template urls can be changed using the `calendarConfig` as illustrated above.

Please note that even patch releases may change templates which could break your app, so if using a custom template it is recommended that you pin the version of this module and review all changes when updating the version.

## The mwl-date-modifier directive

There is also a helper directive that you can use for the next, today and previous buttons. Use it like so:

```html
<button
  class="btn btn-primary"
  mwl-date-modifier
  date="viewDate"
  decrement="calendarView">
  Previous
</button>

<button
  class="btn btn-default"
  mwl-date-modifier
  date="viewDate"
  set-to-today>
  Today
</button>

<button
  class="btn btn-primary"
  mwl-date-modifier
  date="viewDate"
  increment="calendarView">
  Next
</button>
```

## Internationalization and localization

You can either use angular's date filter or moment.js to format dates. The default is to use angular. You can change the formatter to be moment like so:

```javascript
angular.module('myModule')
  .config(['calendarConfig', function(calendarConfig) {

    calendarConfig.dateFormatter = 'moment'; // use moment to format dates

  }]);
```

Then you just need to include the appropriate locale files for your app.

If you want to dynamically change the locale for angular and not include all of the available angular locale files [try this library](https://github.com/lgalfaso/angular-dynamic-locale).

Otherwise if using moment you can call `moment.locale('YOUR_LOCALE_STRING')` to change the locale and the calendar will auto update.

To set Monday as the first day of the week, configure it in moment like so (even if using angular for formatting dates):
```javascript
moment.locale('en_gb', {
  week : {
    dow : 1 // Monday is the first day of the week
  }
});
```

For a full list of all available formats and their defaults see [calendarConfig.js](https://github.com/mattlewis92/angular-bootstrap-calendar/blob/master/src/services/calendarConfig.js)

## Hiding the calendar
When hiding the calendar it is recommended to use ng-if instead of ng-show/hide otherwise drag, drop, resize and date range selection will not work properly.

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
