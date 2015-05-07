# Angular Bootstrap Calendar

[![Build Status](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar)
[![Bower version](https://badge.fury.io/bo/angular-bootstrap-calendar.svg)](http://badge.fury.io/bo/angular-bootstrap-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar#info=devDependencies)
[![Codacy Badge](https://www.codacy.com/project/badge/92f23ec92cfb4594b0b94b39dc3d3ebb)](https://www.codacy.com/app/matt-lewis-private/angular-bootstrap-calendar)

## Please see the [release notes](https://github.com/mattlewis92/angular-bootstrap-calendar/releases/tag/0.10.0) for upgrading from 0.9.x to 0.10.x as there are many breaking changes.

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

All credits for the UI/UX of the calendar go to the original author.

Pull requests are welcome.

## Installation

The calendar has a few dependencies, these are as follows, and must be included BEFORE the plugin files:

* [AngularJS](https://angularjs.org/) 1.2+
* [Bootstrap](http://getbootstrap.com/) 3+ (CSS only)
* [Moment.js](http://momentjs.com/)
* [ui-bootstrap](http://angular-ui.github.io/bootstrap/) (optional, include for collapse animations and tooltips on the year and month views)

It is recommended that you install the plugin and its dependencies through bower:

```
bower install --save angular-bootstrap-calendar
```

You will then need to include the JS and CSS files for the plugin:

```
<link rel="stylesheet" href="bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css">
<script src="bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js">
```

And finally add the module dependency in your AngularJS app (you can remove ui.bootstrap if you don't want the extra dependency - it is only required for collapse animations and tooltips):

```javascript
angular.module('myModule', ['mwl.calendar', 'ui.bootstrap']);
```

## Documentation

There is a single directive exposed to create the calendar, use it like so:
```javascript
<mwl-calendar
    events="events"
    view="calendarView"
    view-title="calendarTitle"
    current-day="calendarDay"
    on-event-click="eventClicked(calendarEvent)"
    edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
    delete-event-html="'<i class=\'glyphicon glyphicon-remove\'></i>'"
    on-edit-event-click="eventEdited(calendarEvent)"
    on-delete-event-click="eventDeleted(calendarEvent)"
    auto-open="true">
</mwl-calendar>
```

An explanation of the properties is as follows:

### events

An array of events to display on the calendar. For example:
```javascript
$scope.events = [
  {
    title: 'My event title', // The title of the event
    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
    startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
    endsAt: new Date(2014,8,26,15), // A javascript date object for when the event ends
    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable
    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
    incrementsBadgeTotal: true //If set to false then will not count towards the badge total amount on the month and year view
  }
];
```

The 4 properties listed are required for all events.

### view

This variable is a string that can be either 'year', 'month', 'week' or 'day. Changing it will change the view of the calendar.

For the calendar to display this variable needs to be set like so:
```javascript
$scope.calendarView = 'month';
```

### current-day

This variable holds the current day the calendar is centralised on. Each view will decide on its current year / month / week / day depending on the value of this variable.

### view-title

This variable will be assigned to the calendar title. If you want to change the formatting you can use the calendarConfigProvider or just override the appropriate method in the calendarTitle factory.

### on-event-click 

This expression is called when an event is clicked on the calendar. calendarEvent contains the calendar event that was clicked on.

### edit-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to edit-event-click.

### delete-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to delete-event-click.

### on-edit-event-click 

This expression is called when an event edit link is clicked on the calendar. calendarEvent contains the calendar event that was clicked on.

### on-delete-event-click 

This expression is called when an event delete link is clicked on the calendar. calendarEvent contains the calendar event that was clicked on.

### on-timespan-click

This expression is called when a month or day on the calendar is clicked. calendarDate contains the start of the month or day that was clicked on.

### auto-open

Whether to auto open the year and month view breakdown to the current year / month. Default: false

### day-view-start

An interpolated string in the form of hh:mm to start the day view at, e.g. setting it to 06:00 will start the day view at 6am

### day-view-end

An interpolated string in the form of hh:mm to end the day view at, e.g. setting it to 22:00 will end the day view at 10pm

### day-view-split

The number of chunks to split the day view hours up into. Can be either 10, 15 or 30. Default: 30

### on-drill-down-click

An optional expression that is evaluated when the drilldown (clicking on a date to change the view) is triggered. Return false from the expression function to disable the drilldown. calendarDate is available as the date that was selected. calendarNextView is the view that the calendar will be changed to.  

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

The calendar directive uses moment.js to produce all months and days of the week etc. Therefore to change the language of the calendar just [follow this guide](http://momentjs.com/docs/#/i18n/).

tl;dr include the appropriate moment locale file (or all of them) and call ```moment.locale('YOUR_LOCALE_STRING')```.

To set Monday as the first day of the week configure it in moment like so:
```javascript
moment.locale('en', {
  week : {
    dow : 1 // Monday is the first day of the week
  }
});
```

## Configuring date formats

You can easily customise the date formats and i18n strings used throughout the calendar by using the calendarConfigProvider. Please note that all formats are those used by moment.js. Example usage:

```javascript
angular.module('myModule')
  .config(function(calendarConfigProvider) {
  
    calendarConfigProvider.setDateFormats({
      hour: 'HH:mm' //this will configure the hour view to display in 24 hour format rather than the default of 12 hour
    });
    
    calendarConfigProvider.setTitleFormats({
      day: 'ddd D MMM' //this will configure the day view title to be shorter
    });
    
    calendarConfigProvider.setI18nStrings({
      eventsLabel: 'Events', //This will set the events label on the day view
      timeLabel: 'Time' //This will set the time label on the time view
    });
    
  });
```

For a full list of all available formats and their defaults see [calendarConfig.js](https://github.com/mattlewis92/angular-bootstrap-calendar/blob/master/src/services/calendarConfig.js)

## Demo

http://mattlewis92.github.io/angular-bootstrap-calendar/

## Roadmap

* Add tests [#10](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/10)
* Drop angular 1.2 support to take advantage of bindToController and one time binding in templates [#58](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/58)

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `gulp watch` to start a development server on port 8000 with livereload. 

### Testing
Run `gulp test:src` to run tests once or `test:watch` to continually run tests (this is automatic when you run `gulp watch`). 

### Build
Run `gulp build` to build the project files in the dist folder

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
