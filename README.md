# Angular Bootstrap Calendar

[![Build Status](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar.svg?branch=master)](https://travis-ci.org/mattlewis92/angular-bootstrap-calendar)
[![Bower version](https://badge.fury.io/bo/angular-bootstrap-calendar.svg)](http://badge.fury.io/bo/angular-bootstrap-calendar)
[![npm version](https://badge.fury.io/js/angular-bootstrap-calendar.svg)](http://badge.fury.io/js/angular-bootstrap-calendar)
[![Dependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar)
[![devDependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar/dev-status.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar#info=devDependencies)
[![optionalDependency Status](https://david-dm.org/mattlewis92/angular-bootstrap-calendar/optional-status.svg)](https://david-dm.org/mattlewis92/angular-bootstrap-calendar#info=optionalDependencies)
[![Codacy Badge](https://www.codacy.com/project/badge/92f23ec92cfb4594b0b94b39dc3d3ebb)](https://www.codacy.com/app/matt-lewis-private/angular-bootstrap-calendar)
[![GitHub issues](https://img.shields.io/github/issues/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/issues)
[![GitHub forks](https://img.shields.io/github/forks/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/network)
[![GitHub stars](https://img.shields.io/github/stars/mattlewis92/angular-bootstrap-calendar.svg)](https://github.com/mattlewis92/angular-bootstrap-calendar/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mattlewis92/angular-bootstrap-calendar/master/LICENSE)

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

All credits for the UI/UX and the less files of the calendar go to the original author.

Pull requests are welcome.

## Installation

The calendar has a few dependencies, these are as follows, and must be included BEFORE the plugin files:

* [AngularJS](https://angularjs.org/) 1.2.x, 1.3.x or 1.4.x are all supported
* [Bootstrap](http://getbootstrap.com/) 3+ (CSS only)
* [Moment.js](http://momentjs.com/)
* [ui-bootstrap](http://angular-ui.github.io/bootstrap/) (optional, include for collapse animations and tooltips on the year and month views. Please note that if using angular 1.4.x that ui-bootstrap animations are broken for ui-bootstrap 0.13.0 and you should use ui-bootstrap 0.12.1 instead)
* [interact.js](http://interactjs.io/) (optional, include to allow drag and drop on the calendar)

It is recommended that you install the plugin and its dependencies through bower:

```
bower install --save angular-bootstrap-calendar
```

but it is also possible to install through npm so you can use with browserify etc:
```
npm install --save angular-bootstrap-calendar
```

You will then need to include the JS and CSS files for the plugin:

```
<link href="bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css" rel="stylesheet">
<script src="bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js"></script>
```

And finally add the module dependency in your AngularJS app (you can remove ui.bootstrap if you don't want the extra dependency - it is only required for collapse animations and tooltips):

```javascript
angular.module('myModule', ['mwl.calendar', 'ui.bootstrap']);
```

## Documentation

There is a single directive exposed to create the calendar, use it like so:
```javascript
<mwl-calendar
    view="calendarView"
    current-day="calendarDay"
    events="events"
    view-title="calendarTitle"
    on-event-click="eventClicked(calendarEvent)"
    on-event-drop="calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd"
    edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
    delete-event-html="'<i class=\'glyphicon glyphicon-remove\'></i>'"
    on-edit-event-click="eventEdited(calendarEvent)"
    on-delete-event-click="eventDeleted(calendarEvent)"
    auto-open="true">
</mwl-calendar>
```

An explanation of the properties is as follows:

### view (required attribute)

This variable is a string that can be either 'year', 'month', 'week' or 'day. Changing it will change the view of the calendar.

For the calendar to display this variable needs to be set like so:
```javascript
$scope.calendarView = 'month';
```

### current-day (required attribute)

This variable holds the current day the calendar is centralised on. Each view will decide on its current year / month / week / day depending on the value of this variable.

### events (required attribute)

An array of events to display on the calendar. For example:
```javascript
$scope.events = [
  {
    title: 'My event title', // The title of the event
    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
    startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
    endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable. If set to false will also prevent the event from being dragged and dropped.
    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
    cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
  }
];
```

The 4 properties listed are required for all events.

### view-title

This variable will be assigned to the calendar title. If you want to change the formatting you can use the calendarConfigProvider or just override the appropriate method in the calendarTitle factory.

### on-event-click 

This expression is called when an event is clicked on the calendar. calendarEvent contains the calendar event that was clicked on.

### on-event-drop

This expression is called when an event is dragged and dropped into a different date / time on the calendar. The available parameters are: calendarEvent, calendarNewEventStart and calendarNewEventEnd. The directive won't change the event object and leaves that up to you to implement. Set event.editable to false to disable drag and drop on a particular event. Please note drag and drop is only available by including the [interact.js](http://interactjs.io/) library.

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

You can either use angular's date filter or moment.js to format dates. The default is to use angular. You can change the formatter to be moment like so:

```javascript
angular.module('myModule')
  .config(function(calendarConfigProvider) {
  
    calendarConfigProvider.setDateFormatter('moment'); // use moment to format dates
 
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

## Configuring date formats

You can easily customise the date formats and i18n strings used throughout the calendar by using the calendarConfigProvider. Please note that these example formats are those used by moment.js and these won't work if using angular as the date formatter. Example usage:

```javascript
angular.module('myModule')
  .config(function(calendarConfigProvider) {
  
    calendarConfigProvider.setDateFormatter('moment'); // use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
  
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
    
    calendarConfigProvider.setDisplayAllMonthEvents(true); //This will display all events on a month view even if they're not in the current month. Default false.

  });
```

For a full list of all available formats and their defaults see [calendarConfig.js](https://github.com/mattlewis92/angular-bootstrap-calendar/blob/master/src/services/calendarConfig.js)

## Demo

http://mattlewis92.github.io/angular-bootstrap-calendar/

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
