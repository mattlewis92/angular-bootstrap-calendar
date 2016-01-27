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
