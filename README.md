## About

This plugin is an AngularJS port of the original jQuery bootstrap calendar that can be found here:
http://bootstrap-calendar.azurewebsites.net/

The layout and functionality is intended to be exactly the same, but without the overhead of including jQuery just for a calendar. 

All credits for the UI/UX of the calendar go to the original author.

Pull requests are welcome.

## Demo + documentation

http://mattlewis92.github.io/angular-bootstrap-calendar/

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
<script src="bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.min.js">
```

And finally add the module dependency in your AngularJS app:

```javascript
angular.module('myModule', ['mwl.calendar']);
```

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install global dev dependencies: `npm install -g gulp`
* Install local dev dependencies: `npm install` while current directory is this repo

### Build
Run `gulp` to build the project files in the dist folder

### Development server
Run `gulp watch` to start a development server with livereload on port 8000. 
