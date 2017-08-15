webpackJsonp([2],{1283:function(e,t,n){try{(function(){"use strict";function e(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deleteDailyLog=t.updateDailyLog=t.getDailyLogDates=t.getLogsForSelectedMonth=t.createLog=void 0;var r=n(113),u=o(r),a=n(1295),l=(o(a),n(551)),i=e(l),c=n(251),f=e(c),d=function(e){return function(t){return u.default.post("/api/dailylogs",e,{withCredentials:!0}).then(function(e){return t({type:i.WRITE_DAILY_LOG,payload:e.data}),u.default.get("/api/latestmeasurements",{withCredentials:!0})}).then(function(e){var n=e.data;t({type:f.WRITE_LATEST,payload:n})}).catch(function(e){return console.log(e)})}},s=function(e){return function(t){return u.default.get("/api/dailylogs",{params:{month:e},withCredentials:!0}).then(function(e){t({type:i.WRITE_DAILY_LOGS,payload:e.data})}).catch(function(e){})}},p=function(){return function(e){return u.default.get("/api/dailylogs/dates",{withCredentials:!0}).then(function(t){e({type:i.WRITE_DAILY_LOG_DATES,payload:t.data})}).catch(function(e){return console.log(e)})}},m=function(e){return function(t){return u.default.put("/api/dailylogs/",e,{withCredentials:!0}).then(function(e){var n=e.data;return t({type:i.WRITE_DAILY_LOG,payload:n}),u.default.get("/api/latestmeasurements",{withCredentials:!0})}).then(function(e){var n=e.data;t({type:f.WRITE_LATEST,payload:n})}).catch(function(e){return console.log(e)})}},g=function(e){return function(t){return u.default.delete("/api/dailylogs/"+e,{withCredentials:!0}).then(function(n){var o=n.data;return t({type:i.DELETE_DAILY_LOG_DATE,payload:o.date}),t({type:i.DELETE_DAILY_LOG,payload:e},{withCredentials:!0}),u.default.get("/api/latestmeasurements",{withCredentials:!0})}).then(function(e){var n=e.data;t({type:f.WRITE_LATEST,payload:n})}).catch(function(e){return console.log(e)})}};t.createLog=d,t.getLogsForSelectedMonth=s,t.getDailyLogDates=p,t.updateDailyLog=m,t.deleteDailyLog=g}).call(this)}finally{}},1284:function(e,t,n){try{(function(){"use strict";function e(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.getWorkoutLogDates=t.deleteWorkoutLog=t.updateWorkoutLog=t.createWorkoutLog=t.getWorkoutLogsForMonth=void 0;var o=n(113),r=function(e){return e&&e.__esModule?e:{default:e}}(o),u=n(552),a=e(u),l=n(250),i=e(l),c=function(e){return function(t){return r.default.get("/api/workoutlogs",{params:{month:e},withCredentials:!0}).then(function(e){var n=e.data;t({type:a.WRITE_WORKOUT_LOGS,payload:n})}).catch(function(e){return console.log(e)})}},f=function(){return function(e){return r.default.get("/api/workoutlogs/dates",{withCredentials:!0}).then(function(t){var n=t.data;return e({type:a.WRITE_WORKOUT_LOG_DATES,payload:n})}).catch(function(e){return console.log(e)})}},d=function(e){return function(t){return r.default.post("/api/workoutlogs",e,{withCredentials:!0}).then(function(e){var n=e.data;t({type:a.WRITE_WORKOUT_LOG,payload:n}),t({type:a.WRITE_WORKOUT_LOG_DATE,payload:n.createdAt})}).catch(function(e){return console.log(e)})}},s=function(e){return function(t){return r.default.put("/api/workoutlogs",e,{withCredentials:!0}).then(function(e){var n=e.data;return t({type:a.WRITE_WORKOUT_LOG,payload:n})}).catch(function(e){return console.log(e)})}},p=function(e){return function(t){return r.default.delete("/api/workoutlogs/"+e,{withCredentials:!0}).then(function(n){var o=n.data;t({type:a.DELETE_WORKOUT_LOG_DATE,payload:o.createdAt}),t({type:a.DELETE_WORKOUT_LOG,payload:e}),t({type:i.OPEN_MESSAGE_BAR}),t({type:i.SET_MESSAGE,payload:"Log with id "+e+" was deleted!"})}).catch(function(e){return console.log(e)})}};t.getWorkoutLogsForMonth=c,t.createWorkoutLog=d,t.updateWorkoutLog=s,t.deleteWorkoutLog=p,t.getWorkoutLogDates=f}).call(this)}finally{}},1290:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n    position: fixed;\n    bottom: 50;\n    right: 100;\n"],["\n    position: fixed;\n    bottom: 50;\n    right: 100;\n"]),r=n(0),u=e(r),a=n(150),l=e(a),i=n(1285),c=e(i),f=n(55),d=n(37),s=(0,l.default)(f.FloatingActionButton)(o),p=function(e){var t=e.link;return u.default.createElement(d.Link,{to:t},u.default.createElement(s,{mini:!0},u.default.createElement(c.default,null)))};t.default=p}).call(this)}finally{}},1291:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(e),r=n(112),u=n(55),a=function(e){return o.default.createElement("div",null,o.default.createElement(r.Slider,e),o.default.createElement("div",{style:{textAlign:"center"}},o.default.createElement(u.FlatButton,{disabled:!0,label:e.input.name+"  "+e.input.value})))};t.default=a}).call(this)}finally{}},1292:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(e),r=n(55),u=n(91),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(u),l=function(e){return a.map(e,function(e){return o.default.createElement(r.MenuItem,{key:e,value:e,primaryText:e})})},i=function(e){var t=e.selectedMonth,n=e.fetchDataForSelectedMonth,u=e.setSelectedMonth,a=e.months;return o.default.createElement(r.DropDownMenu,{value:t,onChange:function(e,t,o){n(o),u(o)}},l(a))};t.default=i}).call(this)}finally{}},1293:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(21),a=n(1281),l=e(a),i=n(1280),c=n(1283),f=n(548),d=n(1284),s=function(e,t,n){var o=function(e){switch(e){case"workoutTarget":return{selectedItem:"selectedWorkoutTarget",deleteItem:f.deleteWorkoutTarget};case"workoutLog":return{selectedItem:"selectedWorkoutLog",deleteItem:d.deleteWorkoutLog};case"dailyLog":return{selectedItem:"selectedDailyLog",deleteItem:c.deleteDailyLog}}},a=function(n){var o=n.isModalOpen,u=n.closeModal,a=n.deleteItem,i=n.selectedItem;return console.log(i),r.default.createElement("div",null,r.default.createElement(l.default,{title:t,isOpen:o,close:u,deleteActions:[function(){return a(i)}]}),r.default.createElement(e,null))},s=function(e){return{isModalOpen:e.getIn(["app","isConfirmDeleteModalOpen"]),selectedItem:e.getIn(["app",o(n).selectedItem])}},p=function(e){return{deleteItem:function(t){return e(o(n).deleteItem(t))},closeModal:function(){return e((0,i.closeWorkoutModal)())}}};return(0,u.connect)(s,p)(a)};t.default=s}).call(this)}finally{}},1294:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(e){return localStorage.setItem("token",e)},n=function(){return localStorage.getItem("token")},o=function(){return localStorage.removeItem("token")};t.saveToken=e,t.getToken=n,t.removeToken=o}).call(this)}finally{}},1295:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(113),o=function(e){return e&&e.__esModule?e:{default:e}}(e),r=n(1294);t.default=function(e){return function(){return null!==e()?o.default.create({headers:{"x-auth":e()}}):null}}(r.getToken)}).call(this)}finally{}},1296:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(249),o=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){return function(t){return t.getIn([e,"data"])}},a=function(e){return function(t){return t.getIn(["app","workoutLogs"===e?"selectedMonthForWorkoutLogs":"selectedMonthForDailyLogs"])}},l=function(e,t){return e.filter(function(e){return(0,r.default)(e.get("date")).isSame((0,r.default)(t,"MM-YYYY"),"month")})},i=function(e){return"workoutLogs"===e||"dailyLogs"===e},c=function(t){return i(t)?(0,e.createSelector)(u(t),a(t),l):new Error("Type not supported!")};t.default=c}).call(this)}finally{}},1297:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(249),o=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){return function(t){return t.getIn([e,"dates"])}},a=function(e){return e.map(function(e){return(0,r.default)(e).format("MM-YYYY")}).toSet()},l=function(e){return"workoutLogs"===e||"dailyLogs"===e},i=function(t){return l(t)?(0,e.createSelector)(u(t),a):new Error("Type not supported!")};t.default=i}).call(this)}finally{}},1298:function(e,t,n){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n(249),o=n(2),r=function(e){return e&&e.__esModule?e:{default:e}}(o),u=function(e){return function(t){return t.getIn([e,"dates"])}},a=function(e){return!!e.find(function(e){return(0,r.default)(e).isSame((0,r.default)(),"day")})},l=function(e){return"workoutLogs"===e||"dailyLogs"===e},i=function(t){return l(t)?(0,e.createSelector)(u(t),a):new Error("Type not supported!")};t.default=i}).call(this)}finally{}},1336:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(55),i=n(91),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(i),f=n(2),d=e(f),s=n(1303),p=e(s),m=n(1304),g=e(m),y=n(1345),h=e(y),_=function(e){var t=e.workoutLogs,n=e.editLink,o=e.onModalStateChange,u=e.setSelectedItem;return r.default.createElement(l.List,null,c.map(t,function(e){return r.default.createElement(l.ListItem,{key:e._id,disabled:!0},r.default.createElement(l.Card,null,r.default.createElement(l.CardHeader,{title:(0,d.default)(e.createdAt).format("DD-MM-YYYY"),actAsExpander:!0,showExpandableButton:!0}),r.default.createElement(l.CardText,{expandable:!0},r.default.createElement(h.default,{log:e})),r.default.createElement(g.default,{link:""+n+e._id}),r.default.createElement(p.default,{setSelectedItem:function(){return u(e._id)},onModalStateChange:o})))}))};_.propTypes={workoutLogs:a.default.objectOf(a.default.object),editLink:a.default.string.isRequired,onModalStateChange:a.default.func.isRequired,setSelectedItem:a.default.func.isRequired},t.default=_}).call(this)}finally{}},1337:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(111),i=n(1343),c=e(i),f=function(e){var t=e.passedMarker,n=e.item;return t?null:r.default.createElement(l.FieldArray,{name:n+".sets",component:c.default})};f.propTypes={passedMarker:a.default.bool.isRequired,item:a.default.string.isRequired},t.default=f}).call(this)}finally{}},1338:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(0),u=e(r),a=n(1),l=(e(a),n(55)),i=n(22),c=n(1339),f=e(c),d=function(e){return u.default.createElement(l.List,null,u.default.createElement(l.ListItem,{disabled:!0},u.default.createElement(l.FlatButton,{onTouchTap:function(){e.fields.insert(e.fields.length,(0,i.fromJS)({marker:!1}))},label:"Add exercise"})),e.fields.map(function(t,n){return u.default.createElement(f.default,o({},e,{key:n,index:n,item:t,passedMarker:e.passedMarkerList.get(n)}))}))};t.default=d}).call(this)}finally{}},1339:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(111),a=n(55),l=n(112),i=n(1341),c=e(i),f=n(1340),d=e(f),s=n(1337),p=e(s),m=function(e){var t=e.fields.remove,n=e.item,o=e.index,i=e.passedMarker,f=e.normalizeMarker;return r.default.createElement(a.ListItem,{key:o,disabled:!0},r.default.createElement(d.default,{item:n}),r.default.createElement(c.default,{item:n}),r.default.createElement(u.Field,{name:n+".marker",component:l.Checkbox,label:"Mark as completed without setting any sets",normalize:f}),r.default.createElement(a.FlatButton,{onTouchTap:function(){return t(o)},label:"Remove exercise"}),r.default.createElement(p.default,{passedMarker:i,item:n}))};t.default=m}).call(this)}finally{}},1340:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(111),i=n(112),c=function(e){var t=e.item;return r.default.createElement(l.Field,{name:t+".name",type:"text",placeholder:"name",component:i.TextField})};c.propTypes={item:a.default.string.isRequired},t.default=c}).call(this)}finally{}},1341:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(111),i=n(112),c=function(e){var t=e.item;return r.default.createElement(l.Field,{name:t+".note",type:"text",placeholder:"note",component:i.TextField})};c.propTypes={item:a.default.string.isRequired},t.default=c}).call(this)}finally{}},1342:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(111),i=n(112),c=function(e){var t=e.item;return r.default.createElement(l.Field,{name:t+".reps",type:"number",placeholder:"reps",component:i.TextField})};c.propTypes={item:a.default.string.isRequired},t.default=c}).call(this)}finally{}},1343:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(55),a=n(22),l=n(1344),i=e(l),c=n(1342),f=e(c),d=function(e){var t=e.fields,n=t.map,o=t.remove,l=t.length,c=t.insert;return r.default.createElement(u.List,null,r.default.createElement(u.ListItem,{disabled:!0},r.default.createElement(u.FlatButton,{onTouchTap:function(){c(l,(0,a.fromJS)({}))},label:"Add set"})),n(function(e,t){return r.default.createElement(u.ListItem,{key:t,disabled:!0},r.default.createElement(i.default,{item:e}),r.default.createElement(f.default,{item:e}),r.default.createElement(u.FlatButton,{onTouchTap:function(){return o(t)},label:"Remove set"}))}))};t.default=d}).call(this)}finally{}},1344:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(111),i=n(1291),c=e(i),f=function(e){var t=e.item;return r.default.createElement(l.Field,{name:t+".weight",type:"number",placeholder:"weight",component:c.default,defaultValue:1,format:function(e,t){return""===e?0:Number.parseFloat(e)},min:0,step:.5,max:300})};f.propTypes={item:a.default.string.isRequired},t.default=f}).call(this)}finally{}},1345:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=e(o),u=n(1),a=e(u),l=n(91),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(l),c=function(e,t){return e._id+"."+e.exercises.indexOf(t)},f=function(e){return function(t,n){return""+c+n.sets.indexOf(e)}},d=function(e){var t=e.log;return r.default.createElement("div",null,i.map(t.exercises,function(e){return r.default.createElement("div",{key:c(t,e)},"Exercise: ",e.name,r.default.createElement("br",null),"Sets:",i.map(e.sets,function(n){return r.default.createElement("div",{key:f(n)(t,e)},"Repetitions: ",n.reps," Weight: ",n.weight)}))}))};d.PropTypes={log:a.default.objectOf(a.default.object)},t.default=d}).call(this)}finally{}},1364:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},l=n(0),i=e(l),c=n(21),f=n(55),d=n(112),s=n(111),p=n(2),m=e(p),g=n(22),y=n(1284),h=n(1338),k=e(h),L=function(e){return!!_.isBoolean(e)&&e},M=function(e){function t(){var e,n,u,l;o(this,t);for(var c=arguments.length,p=Array(c),y=0;y<c;y++)p[y]=arguments[y];return n=u=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(p))),u.componentDidMount=function(){return u.props.dispatch((0,s.initialize)("workoutLog",(0,g.Map)().withMutations(function(e){return e.set("createdAt",(0,m.default)().toDate()).set("exercises",u.props.defaultValue)})))},u._disableThese=function(e){return function(t){return!!e.find(function(e){return(0,m.default)(e).isSame(t,"day")})}},u.render=function(){var e=u.props,t=e.createWorkoutLog,n=e.handleSubmit,o=e.updateWorkoutLog;return i.default.createElement("div",null,i.default.createElement("form",{onSubmit:n(function(e){var n=e.toJS();n.createdAt=(0,m.default)(n.createdAt).valueOf(),u.props.match.params.id?o(a({},n,{_id:u.props.match.params.id})):t(n),console.log(e.toJS())})},i.default.createElement("div",null,"createBefore"===u.props.type?i.default.createElement("div",null,i.default.createElement(s.Field,{name:"createdAt",component:function(e){return i.default.createElement(d.DatePicker,a({},e,{maxDate:(0,m.default)().toDate(),minDate:(0,m.default)().subtract(110,"years").toDate(),formatDate:function(e){return(0,m.default)(e).format("DD-MM-YYYY")},shouldDisableDate:u._disableThese(u.props.datesWithWorkoutLogs)}))}})," "):null,i.default.createElement(s.FieldArray,{name:"exercises",component:k.default,passedMarkerList:u.props.markerList,normalizeMarker:L}),i.default.createElement(f.FlatButton,{type:"submit",disabled:!(!u.props.datesWithWorkoutLogs.find(function(e){return(0,m.default)(e).isSame(u.props.selectedDate,"day")})||u.props.match.params.id),label:u.props.match.params.id?"modify":"create"}))))},l=n,r(u,l)}return u(t,e),t}(l.PureComponent);t.default=(0,c.connect)(function(e){return{datesWithWorkoutLogs:e.getIn(["workoutLogs","dates"]),selectedDate:(0,s.getFormValues)("workoutLog")(e)?(0,s.getFormValues)("workoutLog")(e).get("createdAt"):(0,m.default)(),markerList:(0,s.getFormValues)("workoutLog")(e)&&(0,s.getFormValues)("workoutLog")(e).get("exercises")?(0,s.getFormValues)("workoutLog")(e).get("exercises").map(function(e){return e.get("marker")}):(0,g.Map)()}},function(e){return{createWorkoutLog:function(t){return e((0,y.createWorkoutLog)(t))},updateWorkoutLog:function(t){return e((0,y.updateWorkoutLog)(t))}}})((0,s.reduxForm)({form:"workoutLog"})(M))}).call(this)}finally{}},1365:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),l=e(a),i=n(21),c=n(2),f=e(c),d=n(1280),s=n(1284),p=n(1297),m=e(p),g=n(1296),y=e(g),h=n(1298),_=e(h),k=n(1289),L=e(k),M=n(1290),v=e(M),E=n(1281),O=(e(E),n(1336)),b=e(O),W=n(1292),w=e(W),T=n(1286),S=(e(T),(0,_.default)("workoutLogs")),I=(0,y.default)("workoutLogs"),D=(0,m.default)("workoutLogs"),j=function(e){var t=e.monthsWithWorkoutLogs,n=e.selectedMonth,o=e.getWorkoutLogsForMonth,r=e.setSelectedMonthForWorkoutLogs,u=(e.isModalOpen,e.closeWorkoutModal,e.deleteWorkoutLog,e.workoutLogsForMonth),a=e.setSelectedWorkoutLog,i=e.openWorkoutModal,c=e.isTodaysWorkoutLogExists;e.selectedWorkoutLog;return l.default.createElement("div",null,l.default.createElement(w.default,{months:t.toJS(),selectedMonth:n,fetchDataForSelectedMonth:o,setSelectedMonth:r}),l.default.createElement(b.default,{workoutLogs:u.toJS(),editLink:"/app/workoutlogs/edit/",setSelectedItem:a,onModalStateChange:i}),l.default.createElement(v.default,{link:"/app/workoutlogs/create/before"}),l.default.createElement(L.default,{link:"/app/workoutlogs/create",disabled:c}))},F=function(e){function t(){var e,n,u,a;o(this,t);for(var l=arguments.length,i=Array(l),c=0;c<l;c++)i[c]=arguments[c];return n=u=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),u.componentDidMount=function(){u.props.datesWithWorkoutLogs.isEmpty()&&u.props.getWorkoutLogDates(),u.props.workoutLogsForMonth.isEmpty()&&(u.props.getWorkoutLogsForMonth((0,f.default)().format("MM-YYYY")),u.props.setSelectedMonthForWorkoutLogs(u.props.monthsWithWorkoutLogs.last()))},u.componentWillReceiveProps=function(e,t){return u.props.monthsWithWorkoutLogs.isEmpty()&&!e.monthsWithWorkoutLogs.isEmpty()||void 0===e.monthsWithWorkoutLogs.find(function(e){return e===u.props.selectedMonth})?u.props.setSelectedMonthForWorkoutLogs(e.monthsWithWorkoutLogs.last()):null},u.render=function(){return j(u.props)},a=n,r(u,a)}return u(t,e),t}(a.PureComponent),P=function(e){return{monthsWithWorkoutLogs:D(e),isTodaysWorkoutLogExists:S(e),workoutLogsForMonth:I(e),datesWithWorkoutLogs:e.getIn(["workoutLogs","dates"]),selectedMonth:e.getIn(["app","selectedMonthForWorkoutLogs"]),isModalOpen:e.getIn(["app","isConfirmDeleteModalOpen"]),selectedWorkoutLog:e.getIn(["app","selectedWorkoutLog"])}},x=function(e){return{getWorkoutLogsForMonth:function(t){return e((0,s.getWorkoutLogsForMonth)(t))},getWorkoutLogDates:function(){return e((0,s.getWorkoutLogDates)())},setSelectedMonthForWorkoutLogs:function(t){return e((0,d.setSelectedMonthForWorkoutLogs)(t))},deleteWorkoutLog:function(t){return e((0,s.deleteWorkoutLog)(t))},openWorkoutModal:function(){return e((0,d.openWorkoutModal)())},closeWorkoutModal:function(){return e((0,d.closeWorkoutModal)())},setSelectedWorkoutLog:function(t){return e((0,d.setSelectedWorkoutLog)(t))}}};t.default=(0,i.connect)(P,x)(F)}).call(this)}finally{}},1366:function(e,t,n){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(0),u=e(r),a=n(21),l=n(37),i=n(22),c=n(2),f=(e(c),n(1365)),d=e(f),s=n(1364),p=e(s),m=n(1287),g=e(m),y=n(1293),h=e(y),_=function(e){var t=e.exercises,n=e.workoutLogs;e.dispatch;return u.default.createElement("div",null,u.default.createElement(l.Route,{exact:!0,path:"/app/workoutlogs",component:(0,h.default)(d.default,"Are you sure you want to delete this workout log?","workoutLog")}),u.default.createElement(l.Route,{exact:!0,path:"/app/workoutlogs/create/before",render:function(e){return u.default.createElement(p.default,o({},e,{type:"createBefore"}))}}),u.default.createElement(l.Route,{exact:!0,path:"/app/workoutlogs/edit/:id",render:function(e){var t=n.find(function(t,n){return e.match.params.id===n}).get("exercises");return u.default.createElement(p.default,o({},e,{defaultValue:t,type:"edit"}))}}),u.default.createElement(l.Route,{exact:!0,path:"/app/workoutlogs/create",render:function(e){var n=t.map(function(e){return(0,i.Map)().withMutations(function(t){return t.set("name",e).set("note","").set("marker",!1).set("sets",(0,i.Map)())})});return u.default.createElement(p.default,o({},e,{type:"create",defaultValue:n}))}}))};t.default=(0,a.connect)(function(e){return{workoutLogs:e.getIn(["workoutLogs","data"]),exercises:(0,g.default)("main")(e)}})(_)}).call(this)}finally{}}});