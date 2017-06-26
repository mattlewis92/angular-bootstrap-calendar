<a name="0.29.3"></a>
## [0.29.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.29.2...0.29.3) (2017-06-26)


### Bug Fixes

* **monthView:** dont fire on-date-range-sekect when dragging an event ([628321c](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/628321c)), closes [#614](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/614)
* **weekView:** display event actions ([d14d8f2](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/d14d8f2)), closes [#594](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/594)



<a name="0.29.2"></a>
## [0.29.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.29.1...0.29.2) (2017-06-12)


### Bug Fixes

* **weekView:** use correct event span when the week doesn't start on a sunday ([a70310b](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a70310b))



<a name="0.29.1"></a>
## [0.29.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.29.0...0.29.1) (2017-05-21)


### Bug Fixes

* **dragSelect:** ignore right-clicks for drag/drop ([#585](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/585)) ([e0a51b6](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e0a51b6))
* **monthView:** generate correct new start date when dropping an event ([e92d647](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e92d647)), closes [#588](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/588)
* **yearView:** generate correct new start date when dropping an event ([5da7d4b](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5da7d4b))



<a name="0.29.0"></a>
# [0.29.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.28.4...0.29.0) (2017-04-17)


### Bug Fixes

* **weekView:** account for scrollbars when doing the drag select on the week view with times ([0e56ac9](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/0e56ac9)), closes [#571](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/571)


### Features

* **draggableAutoScroll:** allow the auto scroll value thats passed to interact to be customised ([dec7f77](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/dec7f77)), closes [#578](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/578)



<a name="0.28.4"></a>
## [0.28.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.28.3...v0.28.4) (2017-04-10)


### Bug Fixes

* **draggable:** auto scroll the page when dragging events ([c8da9bb](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c8da9bb)), closes [#568](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/568)



<a name="0.28.3"></a>
## [0.28.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.28.2...v0.28.3) (2017-03-18)


### Bug Fixes

* **templates:** re-include html template files ([c8d4240](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c8d4240))



<a name="0.28.2"></a>
## [0.28.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.28.1...v0.28.2) (2017-03-18)


### Bug Fixes

* **calendarTitle:** use start of iso week instead of week for the week view title ([357cd28](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/357cd28)), closes [#557](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/557)



<a name="0.28.1"></a>
## [0.28.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.28.0...v0.28.1) (2017-03-04)


### Bug Fixes

* **dayView:** fix drag and select when using the week view with times ([a4b6213](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a4b6213)), closes [#536](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/536)
* **monthView:** hide badge cell total on days not in the current month ([ed34832](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ed34832)), closes [#545](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/545)



<a name="0.28.0"></a>
# [0.28.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.5...v0.28.0) (2017-02-05)


### Features

* **dayView:** add dayViewSidePosition option ([5940de5](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5940de5)), closes [#519](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/519)



<a name="0.27.5"></a>
## [0.27.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.4...v0.27.5) (2017-01-09)


### Bug Fixes

* onDateRangeSelect callback dates should be dates and not moment objects ([65710b4](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/65710b4)), closes [#518](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/518)



<a name="0.27.4"></a>
## [0.27.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.3...v0.27.4) (2016-12-19)


### Bug Fixes

* display events on the day view that dont have end dates ([e5c1660](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e5c1660))



<a name="0.27.3"></a>
## [0.27.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.2...v0.27.3) (2016-12-14)


### Bug Fixes

* ensure angular 1.6 compatibility ([76a7fab](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/76a7fab))
* **interact:** use new npm package ([f14d751](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/f14d751))



<a name="0.27.2"></a>
## [0.27.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.1...v0.27.2) (2016-12-13)


### Bug Fixes

* **dayView:** fix recurring events ([e5a18fc](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e5a18fc)), closes [#504](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/504)
* **monthView:** fix recurring events ([ccb97cd](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ccb97cd)), closes [#504](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/504)



<a name="0.27.1"></a>
## [0.27.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.27.0...v0.27.1) (2016-11-18)


### Bug Fixes

* **weekViewWithTimes:** fix on timespan click on last column ([f8f62e8](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/f8f62e8)), closes [#496](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/496)



<a name="0.27.0"></a>
# [0.27.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.26.1...v0.27.0) (2016-11-15)


### Features

* **dayView:** allow the event width to be customised ([c1d9cea](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c1d9cea)), closes [#494](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/494)



<a name="0.26.1"></a>
## [0.26.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.26.0...v0.26.1) (2016-11-13)


### Bug Fixes

* dont modify the events array ([8b39c31](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/8b39c31)), closes [#491](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/491)



<a name="0.26.0"></a>
# [0.26.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.25.2...v0.26.0) (2016-11-09)

* **styles:** scope all styles to the calendar component

### BREAKING CHANGES

All styles are now scoped to the `mwl-calendar` namespace. If using custom styles that ovveride the calendars defaults you will need to wrap them with the `mwl-calendar` selector so they will not be overridden.


<a name="0.25.2"></a>
## [0.25.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.25.1...v0.25.2) (2016-11-09)

* This reverts a fix from the previous release that was accidentlly a breaking change

<a name="0.25.1"></a>
## [0.25.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.25.0...v0.25.1) (2016-11-09)


### Bug Fixes

* **styles:** scope all styles to the calendar component ([d793053](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/d793053)), closes [#488](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/488)



<a name="0.25.0"></a>
# [0.25.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.24.0...v0.25.0) (2016-10-30)


### Bug Fixes

* **dayView:** various day view fixes ([99ab592](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/99ab592))


### Features

* **dayView:** add tooltip to day view events ([ba859e2](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ba859e2)), closes [#476](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/476)


### BREAKING CHANGES

* dayView: Tooltips are now added to all day view events by default. To disable them do:

```
calendarEventTitle.dayViewTooltip = angular.noop;
```



<a name="0.24.0"></a>
# [0.24.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.23.0...v0.24.0) (2016-10-10)


### Bug Fixes

* **dayView:** dont throw when dragging an event and the date range select is enabled ([1e3efdd](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/1e3efdd)), closes [#439](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/439)
* **weekView:** ensure events are always ordered by start date ([419626e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/419626e)), closes [#443](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/443)
* update event track by ids when the original calendar events are reset ([580a967](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/580a967)), closes [#457](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/457)
* **weekView:** fix event span for end of day events ([5e038c5](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5e038c5))
* **weekView:** use correct date for onTimespanClick callback ([e05882e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e05882e)), closes [#454](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/454)
* **weekViewWithTimes:** call the cell-modifier for each days hour segment ([29725a8](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/29725a8)), closes [#424](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/424)

### Features

* **cellAutoOpenDisabled:** allow disabling the auto opening and closing of the slidebox ([682b522](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/682b522)), closes [#426](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/426)
* **dayView:** allow all hour segment times to be shown ([06bc836](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/06bc836)), closes [#429](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/429)
* **monthView:** add cal-day-open class to the open day ([75d84c6](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/75d84c6)), closes [#463](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/463)


### BREAKING CHANGES

* weekView: if using a custom week view template, the getClickedDate function has been removed
* If using a custom template the event track by field has changed from `$id` to `calendarEventId`. It is also now enumerable.
* weekViewWithTimes: The `cell-modifier` will now be called for every days hour segment instead of just the first day in the week.

The cssClass added will now be added on the segments day column instead of on the entire row.

The structure of the week view with times template has also changed slightly if using a custom template
* cellAutoOpenDisabled: The `slide-box-disabled` option is deprecated and will be removed in the next release. Use the new `cell-auto-open-disabled` option instead.

Before:
```
slide-box-disabled="true"
```

After:
```
cell-auto-open-disabled="true"
```



<a name="0.23.0"></a>
# [0.23.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.22.0...v0.23.0) (2016-08-12)


### Bug Fixes

* **dayView:** hide all day events that dont occur on the given day ([28354e6](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/28354e6)), closes [#414](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/414)
* remove deprecated `event.type` ([c53d4c8](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c53d4c8))
* remove deprecated edit and delete actions ([fadbf75](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/fadbf75)), closes [#417](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/417)

### Features

* **customTemplates:** allow a parent scope to be accessed in custom templates ([c84e9ab](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c84e9ab)), closes [#415](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/415)
* **customTemplates:** show a warning when a template doesnt exist in the template cache ([a7eee2a](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a7eee2a)), closes [#422](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/422)
* **dayView:** call the cell modifier for day view hour segments ([835f17b](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/835f17b)), closes [#418](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/418)


### BREAKING CHANGES

* `on-edit-event-click`, `on-delete-event-click`, `edit-event-html`, `delete-event-html` options have been removed in favour of generic event actions.

See the 0.22.0 changelog for migration details

* The deprecated `event.type` property has been removed.

See 0.22.0 release notes for migration instructions

* dayView: the `cell-modifier` callback is now called for the day view.

To migrate add a guard on the callback to check what the current view is and act accordingly



<a name="0.22.0"></a>
# [0.22.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.5...v0.22.0) (2016-07-27)


### Bug Fixes

* **dayView:** fix event border colors ([93d1a35](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/93d1a35))
* **dayView:** have day view start and end respect minutes ([80bdc39](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/80bdc39)), closes [#344](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/344)
* **dayView:** make hour list take up full width of overflow content ([22737dd](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/22737dd)), closes [#389](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/389)
* **dayView:** use correct height when the end is part of the way through an hour ([beb2d31](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/beb2d31))
* **onDateRangeSelect:** fix behaviour after bug was introduced in previous commit ([e0c260c](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e0c260c))

### Features

* show deprecation warning when event type is set ([08bbf74](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/08bbf74))
* **eventActions:** allow custom event actions to be set ([5744685](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5744685)), closes [#386](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/386)
* **events:** allow the event colors to be customised ([f06eb1d](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/f06eb1d)), closes [#402](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/402)
* **i18n:** allow the i18nStrings.weekNumber option to be a function ([247f2c1](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/247f2c1)), closes [#393](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/393)
* **monthView:** support on-date-range-select callback on the month view ([fa3b02e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/fa3b02e)), closes [#391](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/391)


### BREAKING CHANGES

* eventActions: `on-edit-event-click`, `on-delete-event-click`, `edit-event-html`, `delete-event-html` are now deprecated and will be removed in a future release. Instead use the new event actions.

Before:
```
// in your template
events="events"
edit-event-html="'<i class=\'glyphicon glyphicon-pencil\'></i>'"
on-edit-event-click="vm.eventEdited(calendarEvent)"
```

After:
```
// in your controller
$scope.events = [{
  actions: [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
      vm.eventEdited(args.calendarEvent);
    }
  }]
}];
```
* events: The `type` field on event objects is now deprecated, you must now explicitly state
the events color on each event. The old functionality will continue to work but will be removed in a future release.

Before:
```
var events = [{
  title: 'foo',
  type: 'info',
  ... other properties
}];
```

After:
```
var events = [{
  title: 'foo',
  color: {
    primary: '#1e90ff',
    secondary: '#d1e8ff'
  },
  ... other properties
}];
```

To ease migration the old events colors are available on the calendarConfig.colorTypes object so you can also do:
```
var events = [{
  title: 'foo',
  color: calendarConfig.colorTypes.info,
  ... other properties
}];
```
* dayView: The `day-view-start` and `day-view-end` now respect the minutes values. This means the `day-view-start` value must now be the end of the hour instead of the beginning of the next hour

Before:
```
day-view-end="22:00"
```

After:
```
day-view-end="22:59"
```



<a name="0.21.5"></a>
## [0.21.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.4...v0.21.5) (2016-07-07)

* Fix the NPM package description


<a name="0.21.4"></a>
## [0.21.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.3...v0.21.4) (2016-07-04)


### Bug Fixes

* fix moment peer dependency warning on install if using latest moment ([30073d9](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/30073d9))



<a name="0.21.3"></a>
## [0.21.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.2...v0.21.3) (2016-06-29)


### Bug Fixes

* **weekViewWithTimes:** more robust fix for event offsets ([721b3fc](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/721b3fc))



<a name="0.21.2"></a>
## [0.21.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.1...v0.21.2) (2016-06-29)


### Bug Fixes

* **weekViewWithTimes:** put events in the correct columns ([06b0181](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/06b0181))



<a name="0.21.1"></a>
## [0.21.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.21.0...v0.21.1) (2016-06-29)


### Bug Fixes

* **monthView:** fix CSS classes not being added to month cells ([3757ecf](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/3757ecf))



<a name="0.21.0"></a>
# [0.21.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.20.2...v0.21.0) (2016-06-29)


### Bug Fixes

* **bower:** ignore non source files ([a78b3fd](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a78b3fd)), closes [#374](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/374)
* **dayView:** support updating the day view chunk and split options on the fly ([12d99a2](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/12d99a2)), closes [#358](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/358)
* **dependencies:** remove bootstrap as a peer dependency so other bootstrap CSS libs can be used ([7e74ddd](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/7e74ddd)), closes [#375](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/375)
* **monthView:** bind once to the ng-include template value so it doesn't change after render ([48f3869](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/48f3869)), closes [#346](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/346)
* **npm:** change browser to main for compatibility with more module bundlers ([88c1e9a](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/88c1e9a)), closes [#371](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/371)
* **npm:** only publish dist folder to npm ([3c4913d](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/3c4913d)), closes [#374](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/374)
* **warnings:** dont log a warning that the event ends at is missing if it is a falsey value ([da101ab](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/da101ab)), closes [#348](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/348)

### Features

* **calendarEventTitle:** abstract all event title logic into a service that can easily be overridde ([a8ad01a](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a8ad01a)), closes [#349](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/349) [#361](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/361)
* **calendarSlideBox:** expose the current month or year cell to the slide box controller for use in ([a6d2bdb](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a6d2bdb)), closes [#369](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/369)
* **custom-template-urls:** allow setting of custom template on a per calendar instance basis ([0ae7661](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/0ae7661)), closes [#355](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/355)
* **dayView:** add edit and delete actions to day view events ([08c4292](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/08c4292)), closes [#351](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/351)
* **onDateRangeSelect:** support dragd and selecting a range on the week view with times ([1efeee0](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/1efeee0)), closes [#366](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/366)
* **weekView:** bucket sort events into columns rather than having each event sit on its own lin ([fdaea2d](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/fdaea2d)), closes [#381](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/381)


### BREAKING CHANGES

* weekView: the UX of the week view has now changed. The template has also changed heavily if
you were using a custom template.
* calendarEventTitle: The `calendarConfig.displayEventTimes` option has been removed. Just override the
`calendarEventTitle.yearView` and `calendarEventTitle.monthView` functions instead



<a name="0.20.2"></a>
## [0.20.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.20.1...v0.20.2) (2016-06-01)


### Bug Fixes

* **monthView:** dont call on-timespan-click when clicking on an event on the month cell ([a194fb0](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a194fb0)), closes [#345](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/345)

The previous fix for the day view starting on minutes has also been reverted as it caused several bugs.


<a name="0.20.1"></a>
## [0.20.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.20.0...v0.20.1) (2016-05-30)


### Bug Fixes

* **dayView:** allow day view start and end to use minutes rather than just hours ([c98152c](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c98152c)), closes [#340](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/340)



<a name="0.20.0"></a>
# [0.20.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.6...v0.20.0) (2016-05-13)


### Bug Fixes

* **draggableEvents:** copy the year when dropping an event on a month or year cell ([8467347](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/8467347)), closes [#326](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/326)
* **warnings:** add example of how to fix date type warnings ([bf9d58f](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/bf9d58f))
* **weekView:** update event sizes when the window is resized ([75c7a76](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/75c7a76)), closes [#328](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/328)

### Features

* **allDayEvents:** allow events to be displayed as all day on the day view ([9be6426](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/9be6426)), closes [#312](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/312)
* **dayViewEventChunkSize:** add `day-view-event-chunk-size` option ([ef2f327](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ef2f327)), closes [#320](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/320)
* **onDateRangeSelect:** Add function for selecting range on day view. ([dd4a3d3](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/dd4a3d3))



<a name="0.19.6"></a>
## [0.19.6](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.5...v0.19.6) (2016-03-31)


### Bug Fixes

* **templates:** replace the default interpolation symbol with the user configured one ([73a052e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/73a052e)), closes [#309](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/309)



<a name="0.19.5"></a>
## [0.19.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.4...v0.19.5) (2016-03-26)


### Bug Fixes

* **weekTitle:** use the correct year when the week spans 2 years ([638c741](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/638c741))



<a name="0.19.4"></a>
## [0.19.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.3...v0.19.4) (2016-03-22)


### Bug Fixes

* **bower.json:** looser dependency versions of moment and bootstrap ([7ee084b](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/7ee084b))
* **draggable:** disable the cursor when dragging disabled events ([834e1ee](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/834e1ee)), closes [#307](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/307)
* **droppable:** allow the drop active class to be customised ([fc85410](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/fc85410))
* **resizeable:** disable the cursor when resizing disabled events ([ad9beb7](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ad9beb7)), closes [#307](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/307)



<a name="0.19.3"></a>
## [0.19.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.2...v0.19.3) (2016-03-11)


### Bug Fixes

* **dayView:** correctly display events that finish within 1 hour after the day view end ([3fc4104](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/3fc4104)), closes [#302](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/302)



<a name="0.19.2"></a>
## [0.19.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.1...v0.19.2) (2016-03-08)


### Bug Fixes

* **recursOn:** allow recursOn to be an empty string ([4bbde4e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/4bbde4e)), closes [#300](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/300)



<a name="0.19.1"></a>
## [0.19.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.19.0...v0.19.1) (2016-02-29)


### Bug Fixes

* **monthView:** get the correct week number on hover of the month view week ([dac97e7](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/dac97e7)), closes [#298](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/298)



<a name="0.19.0"></a>
# [0.19.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.9...v0.19.0) (2016-02-27)


### Bug Fixes

* **weekViewWithTimes:** ensure `on-timespan-click` is called with the correct date ([66277a1](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/66277a1)), closes [#291](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/291)

### Features

* **dayView:** remove the day view column header ([e624c68](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e624c68)), closes [#293](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/293)
* **slide-box-disabled:** add new option to disable the slidebox on the month and year views ([da92130](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/da92130)), closes [#292](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/292)


### BREAKING CHANGES

* dayView: the day view column header has been removed



<a name="0.18.9"></a>
## [0.18.9](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.8...v0.18.9) (2016-02-16)


### Bug Fixes

* **resizeable:** dont allow events to be resized to 0 height or width ([df410ae](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/df410ae)), closes [#287](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/287)



<a name="0.18.8"></a>
## [0.18.8](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.7...v0.18.8) (2016-02-13)


### Features

* **dayView:** allow external events to be dropped on the day view ([9b937b1](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/9b937b1)), closes [#284](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/284)
* **weekView:** allow external events to be dropped on week column headers ([1ea99a3](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/1ea99a3))



<a name="0.18.7"></a>
## [0.18.7](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.6...v0.18.7) (2016-02-10)


### Bug Fixes

* start watchers after templates have been loaded ([b5621df](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/b5621df))



<a name="0.18.6"></a>
## [0.18.6](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.5...v0.18.6) (2016-02-09)


### Bug Fixes

* **moment:** allow any version of moment for compatibility with angular-moment ([f9cd661](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/f9cd661))



<a name="0.18.5"></a>
## [0.18.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.4...v0.18.5) (2016-02-09)


### Bug Fixes

* **templates:** ensure all custom templates are loaded before rendering the calendar ([01009ce](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/01009ce)), closes [#279](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/279)



<a name="0.18.4"></a>
## [0.18.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.3...v0.18.4) (2016-01-27)


### Features

* **onTimespanClick:** expose the cell that was clicked for the month or year view ([7184960](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/7184960)), closes [#270](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/270)



<a name="0.18.3"></a>
## [0.18.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.2...v0.18.3) (2016-01-22)


### Bug Fixes

* **events:** use lower z-index to prevent conflict with mdDialog ([5ef9369](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5ef9369)), closes [#264](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/264)



<a name="0.18.2"></a>
## [0.18.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.1...v0.18.2) (2016-01-12)


### Bug Fixes

* mark all optional attributes as such for ng 1.3.x compatibility ([20ed32e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/20ed32e)), closes [#259](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/259)



<a name="0.18.1"></a>
## [0.18.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.18.0...v0.18.1) (2016-01-09)


### Bug Fixes

* **week-view:** show recurring events in the weekview. Closes #252 ([4615973](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/4615973)), closes [#252](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/252)
* **weekTitle:** Use isoWeek instead of week to fix tests. Closes #257 ([c594f39](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c594f39)), closes [#257](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/257)



<a name="0.18.0"></a>
# [0.18.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.6...v0.18.0) (2016-01-02)


### Features

* **calendarConfig:** change the calendarConfig provider to a plain object. Part of #236 ([0eb50e0](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/0eb50e0))
* **current-day:** rename current-day to view-date. Closes #244 ([c44a50e](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/c44a50e)), closes [#244](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/244)
* **directives:** all element directives are now E instead of EA. Closes #247 ([b0887a1](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/b0887a1)), closes [#247](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/247)
* **drag-and-drop:** expose the date the calendar event was dragged from on the month view ([5ca6920](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/5ca6920)), closes [#250](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/250)
* **on-drill-down-click:** rename to on-view-change-click. Closes #245 ([2514975](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/2514975)), closes [#245](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/245)
* **templates:** make all templates configurable from the calendarConfig ([8fc02fe](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/8fc02fe)), closes [#236](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/236)


### BREAKING CHANGES

* directives: The mwl-calendar directive is now element only instead of an attribute as well.

To migrate:
`<div mwl-calendar></div>` will no longer work. Instead you must use `<mwl-calendar></mwl-calendar>`

* templates: `month-cell-template-url` and `month-cell-events-template-url` options have been removed in favour of the calendarConfig.

To migrate:

```
angular.module('myModule')
  .config(function(calendarConfig) {
    calendarConfig.templates.calendarMonthCell = '/path/to/custom/template.html';
    calendarConfig.templates.calendarMonthCellEvents = '/path/to/custom/template.html';
  });
```
* calendarConfig: `calendarConfig` is now just a plain angular value. The helper methods were removed and now you directly set the properties on a plain object.

Before:
```
.config(function(calendarConfigProvider) {
  calendarConfigProvider.setDateFormatter('moment');
});
```

After:
```
.config(function(calendarConfig) {
  calendarConfig.dateFormatter = 'moment';
});
```

* current-day: the `current-day` attribute has been renamed to `view-date`

* on-drill-down-click: `on-drill-down-click` has been renamed to `on-view-change-click`



<a name="0.17.6"></a>
## [0.17.6](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.5...v0.17.6) (2015-12-02)


### Bug Fixes

* **MonthAndYearViews:** Check openRowIndex is explicitly null so that the condition evaluates proper ([67ae22a](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/67ae22a))



<a name="0.17.5"></a>
## [0.17.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.4...v0.17.5) (2015-12-01)


### Bug Fixes

* **WeekViewTimes:** Fix event widths and positioning to match the day columns ([3dfe882](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/3dfe882))



<a name="0.17.4"></a>
## [0.17.4](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.3...v0.17.4) (2015-11-30)


### Bug Fixes

* **WeekView:** Temporarily revert to the old behaviour as the new functionality has a load of b ([2d36a54](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/2d36a54))



<a name="0.17.3"></a>
## [0.17.3](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.2...v0.17.3) (2015-11-30)


### Bug Fixes

* **DayView:** Allow dragging day view events to the side for better UX ([e147f6b](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/e147f6b))



<a name="0.17.2"></a>
## [0.17.2](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.1...v0.17.2) (2015-11-30)


### Bug Fixes

* **draggable:** Remove the z-index from events once they aren't being dragged ([26087c4](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/26087c4))



<a name="0.17.1"></a>
## [0.17.1](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.17.0...v0.17.1) (2015-11-23)


### Bug Fixes

* **DragAndResize:** Prevent UI flicker when dragging and resizing events. Closes #209 ([38c2d29](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/38c2d29)), closes [#209](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/209)
* **SlideBox:** Fix the slide box sometimes opening the wrong cell. ([aa7bcba](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/aa7bcba))
* **WeekView:** Fix bug in eventsComparer function ([54dc317](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/54dc317))

### Features

* **WeekViewWithDays:** Add missing on-timespan-click callback. Closes #214 ([1c269e6](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/1c269e6)), closes [#214](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/214)



<a name="0.17.0"></a>
# [0.17.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.16.0...v0.17.0) (2015-11-14)


### Features

* **WeekViewWithTimes:** Combine WeekView and DayView ([cb62228](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/cb62228))



<a name="0.16.0"></a>
# [0.16.0](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.15.5...v0.16.0) (2015-11-07)


### Bug Fixes

* **monthView:** Allow the week number to be i18n'd ([ba19b86](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/ba19b86)), closes [#197](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/197)

### Features

* **cellIsOpen:** Add a 2 way bound attribute to control if the year and month view slide box is o ([a0a5117](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/a0a5117)), closes [#199](https://github.com/mattlewis92/angular-bootstrap-calendar/issues/199)
* **ui-bootstrap:** Upgraded ui-bootstrap to 0.14.3 ([07aedb6](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/07aedb6))


### BREAKING CHANGES

* ui-bootstrap: The minimum compatible version of ui-bootstrap is now 0.14.0
* cellIsOpen: auto-open has been renamed to cell-is-open. It is now 2 way bound if the slidebox is open or not so
you can programmatically control the visibility of the slidebox.



<a name="0.15.5"></a>
## [0.15.5](https://github.com/mattlewis92/angular-bootstrap-calendar/compare/0.15.4...v0.15.5) (2015-10-24)


### Bug Fixes

* **build:** Don't leak the module name characters into the global space ([1b18fae](https://github.com/mattlewis92/angular-bootstrap-calendar/commit/1b18fae))


## Previous releases for versions before 0.15.5

For all previous release notes with breaking changes, new features and bug fixes please see the github [release notes](https://github.com/mattlewis92/angular-bootstrap-calendar/releases).
