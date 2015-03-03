# Angular Bootstrap Calendar

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
* [ui-bootstrap](http://angular-ui.github.io/bootstrap/) (tooltip and collapse plugins only if you want a custom build)

It is recommended that you install the plugin and its dependencies through bower:

```
bower install --save angular-bootstrap-calendar
```

You will then need to include the JS and CSS files for the plugin:

```
<link rel="stylesheet" href="bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css">
<script src="bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.min.js">
```

And finally add the module dependency in your AngularJS app:

```javascript
angular.module('myModule', ['mwl.calendar']);
```

## Documentation

There is a single directive exposed to create the calendar, use it like so:
```javascript
<mwl-calendar
    calendar-events="events"
    calendar-view="calendarView"
    calendar-current-day="calendarDay"
    calendar-control="calendarControl"
    calendar-event-click="eventClicked($event)"
    calendar-edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
    calendar-delete-event-html="'<i class=\'glyphicon glyphicon-remove\'></i>'"
    calendar-edit-event-click="eventEdited($event)"
    calendar-delete-event-click="eventDeleted($event)"
    calendar-auto-open="true"
    ></mwl-calendar>
```

An explanation of the properties is as follows:

### calendar-events

An array of events to display on the calendar. For example:
```javascript
$scope.events = [
  {
    title: 'My event title', // The title of the event
    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
    starts_at: new Date(2013,5,1,1), // A javascript date object for when the event starts
    ends_at: new Date(2014,8,26,15), // A javascript date object for when the event ends
    editable: false, // If calendar-edit-event-html is set and this field is explicitly set to false then dont make it editable
    deletable: false // If calendar-delete-event-html is set and this field is explicitly set to false then dont make it deleteable
  }
];
```

The 4 properties listed are required for all events.

### calendar-view

This variable is a string that can be either 'year', 'month', 'week' or 'day. Changing it will change the view of the calendar.

### calendar-current-day

This variable holds the current day the calendar is centralised on. Each view will decide on its current year / month / week / day depending on the value of this variable.

### calendar-control

The directive will instantiate this variable for you and add the following methods to it:
* prev - Goes to the previous page of the view
* next - Goes to the next page of the view
* getTitle - Gets the title of the calendar depending on the current date and view.

### calendar-event-click 

This expression is called when an event is clicked on the calendar. $event contains the calendar event that was clicked on.

### calendar-edit-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to edit-event-click.

### calendar-delete-event-html 

If provided this piece of html will be displayed next to an event on the year and month view and will fire the function passed to delete-event-click.

### calendar-edit-event-click 

This expression is called when an event edit link is clicked on the calendar. $event contains the calendar event that was clicked on.

### calendar-delete-event-click 

This expression is called when an event delete link is clicked on the calendar. $event contains the calendar event that was clicked on.

### calendar-timespan-click

This expression is called when a month or day on the calendar is clicked. $date contains the start of the month or day that was clicked on.

### calendar-auto-open

Whether to auto open the year and month view breakdown to the current year / month. Default: false

### calendar-use-iso-week

Whether the calendar should use the the ISO week standard (i.e. the calendar month and week views start on Monday and not Sunday).

If not set the calendar will look at what is set in the locale by moment. You can set this globally via:

```javascript
moment.locale('en', {
    week : {
        dow : 1 // Monday is the first day of the week
    }
});
```

### calendar-event-label

An interpolated locale string to use as the column header on the day view for the events column. Default: 'Events'.

### calendar-time-label

An interpolated locale string to use as the column header on the day view for the time column. Default: 'Time'.

### calendar-week-title-label

An interpolated local string to use in the week view title. Default: 'Week {week} of {year}'

### calendar-day-view-start
A string in the form of hh:mm to start the day view at, e.g. setting it to 06:00 will start the day view at 6am

### calendar-day-view-end
A string in the form of hh:mm to end the day view at, e.g. setting it to 22:00 will end the day view at 10pm

## Internationalization and localization

The calendar directive uses angulars date filter to produce all months and days of the week etc. Therefore to changes the language of the calendar you simply need to include the appropriate angular i18n file as described here:
https://docs.angularjs.org/guide/i18n

## Demo

http://mattlewis92.github.io/angular-bootstrap-calendar/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` while current directory is this repo

### Build
Run `gulp` to build the project files in the dist folder

### Development server
Run `gulp watch` to start a development server with livereload on port 8000. 

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
