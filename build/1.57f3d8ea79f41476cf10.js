webpackJsonp([1],{1305:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1359),u=e(r),i=a(1360),o=e(i),c=a(254),f=(e(c),function(){return l.default.createElement("div",null,l.default.createElement(u.default,null),l.default.createElement(o.default,null))});t.default=f}).call(this)}finally{}},1310:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(25),o=function(e){var t=e.label;return l.default.createElement(i.FlatButton,{type:"submit",label:t})};o.propTypes={label:u.default.string.isRequired},t.default=o}).call(this)}finally{}},1313:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["text-align: center;"],["text-align: center;"]),l=a(0),r=e(l),u=a(50),i=e(u),o=(a(25),a(1310)),c=e(o),f=i.default.div(n),d=function(e){return r.default.createElement(f,null,r.default.createElement(c.default,e))};t.default=d}).call(this)}finally{}},1315:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(96),r=a(25),u=function(e){return n.default.createElement("div",null,n.default.createElement(l.Slider,e),n.default.createElement("div",{style:{textAlign:"center"}},n.default.createElement(r.FlatButton,{disabled:!0,label:e.input.name+"  "+e.input.value})))};t.default=u}).call(this)}finally{}},1324:function(e,t,a){try{(function(){"use strict";function e(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0});var n=a(73),l=a(18),r=a(72),u=a(49),i=(e(u),a(1369)),o=e(i),c=a(1367),f=function(e){return e&&e.__esModule?e:{default:e}}(c),d=(0,r.formValueSelector)("calorie-target"),s=function(e){return(0,f.default)(e)},m=function(e){return e.getIn(["userDetails","sex"])},y=function(e){return e.getIn(["userDetails","latestMeasurements"])},p=function(e){return d(e,"activity","calorieSplit","protein","bmrCalculationMethod","trainingDay","trainingFatGrams","restFatGrams","trainingFatPercentage","restFatPercentage","restDay","bodyFat","fatMethod")},g=function(e,t,a,n){var r=n.bodyFat,u=n.bmrCalculationMethod,i=n.protein,c=n.activity,f=n.restDay,d=n.trainingDay,s=n.fatMethod,m=n.trainingFatPercentage,y=n.trainingFatGrams,p=n.restFatPercentage,g=n.restFatGrams,b=o.calculateProteinTarget(r,u,i,a.get("weight")),h=o.tdeeCalculator(u,a.get("weight"),a.get("height"),e,t,c,r),v=o.calculateFinalProtein(b),F=o.calculateFinalFat(s,h,f,p,g),M=o.calculateFinalFat(s,h,d,m,y),_=o.calculateFinalCarbohydrate(h,f,b,s,p,g),E=o.calculateFinalCarbohydrate(h,d,b,s,m,y),T=o.calculateFinalCalorie(h,f),x=o.calculateFinalCalorie(h,d),P=o.calculateMax(h,f,b,"gram"),C=o.calculateMax(h,f,b,"percentage"),O=o.calculateMax(h,d,b,"gram"),S=o.calculateMax(h,d,b,"percentage");console.log(a.get("height"),a.get("weight"),t,a.get("neck"),a.get("belly"),a.get("waist"),a.get("hip"));var j={bodyFat:o.calculateBodyFat(a.get("height"),a.get("weight"),t,a.get("neck"),a.get("belly"),a.get("waist"),a.get("hip")),minCalorie:o.minCalorie(h,b),max:{restGram:o.unlessItsAbovezero(P),restPercentage:o.unlessItsAbovezero(C),trainingGram:o.unlessItsAbovezero(O),trainingPercentage:o.unlessItsAbovezero(S)},finalValues:{rest:{calorie:T,carbohydrate:_,fat:F,protein:v},training:{calorie:x,carbohydrate:E,fat:M,protein:v}}};return console.log(j),(0,l.fromJS)(j)};t.default=(0,n.createSelector)(s,m,y,p,g)}).call(this)}finally{}},1326:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(25),o=function(e){var t=e.value;return l.default.createElement(i.FlatButton,{disabled:!0,label:t||0})};o.propTypes={value:u.default.number},t.default=o}).call(this)}finally{}},1327:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(1329),o=e(i),c=a(1328),f=e(c),d=function(e){var t=e.label,a=e.calorieTarget;return a?l.default.createElement("div",null,l.default.createElement(f.default,{label:t,calorieTarget:a}),l.default.createElement(o.default,{label:t,calorieTarget:a})):null};d.propTypes={calorieTarget:u.default.oneOfType([u.default.shape({rest:u.default.shape({calorie:u.default.number,protein:u.default.number,carbohydrate:u.default.number,fat:u.default.number})}),u.default.shape({training:u.default.shape({calorie:u.default.number,protein:u.default.number,carbohydrate:u.default.number,fat:u.default.number})})]),label:u.default.string},t.default=d}).call(this)}finally{}},1328:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(25),o=function(e){var t=e.calorieTarget,a=e.label;return l.default.createElement("div",{style:{textAlign:"center"}},l.default.createElement(i.FlatButton,{disabled:!0,label:"Calculated calories for "+a+" day: "+t[a].calorie}))};o.propTypes={calorieTarget:u.default.oneOfType([u.default.shape({rest:u.default.shape({calorie:u.default.number})}),u.default.shape({training:u.default.shape({calorie:u.default.number})})]),label:u.default.string},t.default=o}).call(this)}finally{}},1329:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(25),o=a(1326),c=e(o),f=function(e){var t=e.calorieTarget,a=e.label;return l.default.createElement(i.Table,null,l.default.createElement(i.TableHeader,{displaySelectAll:!1},l.default.createElement(i.TableRow,{selectable:!1},l.default.createElement(i.TableHeaderColumn,null),l.default.createElement(i.TableHeaderColumn,null,"Protein"),l.default.createElement(i.TableHeaderColumn,null,"Carbohydrate"),l.default.createElement(i.TableHeaderColumn,null,"Fat"))),l.default.createElement(i.TableBody,{displayRowCheckbox:!1},l.default.createElement(i.TableRow,{selectable:!1},l.default.createElement(i.TableRowColumn,null," Calories"),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:4*t[a].protein})),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:4*t[a].carbohydrate})),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:9*t[a].fat}))),l.default.createElement(i.TableRow,{selectable:!1},l.default.createElement(i.TableRowColumn,null," Grams"),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:t[a].protein})),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:t[a].carbohydrate})),l.default.createElement(i.TableRowColumn,null,l.default.createElement(c.default,{value:t[a].fat})))))};f.propTypes={calorieTarget:u.default.oneOfType([u.default.shape({rest:u.default.shape({calorie:u.default.number,protein:u.default.number,carbohydrate:u.default.number,fat:u.default.number})}),u.default.shape({training:u.default.shape({calorie:u.default.number,protein:u.default.number,carbohydrate:u.default.number,fat:u.default.number})})]),label:u.default.string},t.default=f}).call(this)}finally{}},1330:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(72),r=a(96),u=a(25),i=function(){return n.default.createElement(l.Field,{name:"activity",component:r.SelectField,fullWidth:!0,floatingLabelText:"Select you activity level"},n.default.createElement(u.MenuItem,{value:1.2,primaryText:"Sedentary"}),n.default.createElement(u.MenuItem,{value:1.375,primaryText:"Lightly active"}),n.default.createElement(u.MenuItem,{value:1.55,primaryText:"Moderately active"}),n.default.createElement(u.MenuItem,{value:1.725,primaryText:"Very active"}),n.default.createElement(u.MenuItem,{value:1.9,primaryText:"Extremely active"}))};t.default=i}).call(this)}finally{}},1331:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(72),r=a(96),u=a(25),i=function(){return n.default.createElement(l.Field,{name:"bmrCalculationMethod",component:r.SelectField,fullWidth:!0,floatingLabelText:"Select your bmr calculation method"},n.default.createElement(u.MenuItem,{value:"harris-benedict",primaryText:"Based on weight (Harris-Benedict)"}),n.default.createElement(u.MenuItem,{value:"katch-mcardle",primaryText:"Based on lean body mass (Katch-Mcardle)"}))};t.default=i}).call(this)}finally{}},1332:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(72),o=a(96),c=function(e){return"katch-mcardle"===e.bmrCalculationMethod?l.default.createElement(i.Field,{name:"bodyFat",floatingLabelText:"You can manually enter your bodyfat %",component:o.TextField,type:"number",min:0,fullWidth:!0,max:50,step:.1}):null};c.propTypes={bmrCalculationMethod:u.default.string},t.default=c}).call(this)}finally{}},1333:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(72),r=a(96),u=a(25),i=function(){return n.default.createElement(l.Field,{name:"calorieSplit",component:r.SelectField,fullWidth:!0,floatingLabelText:"Select your macro target"},n.default.createElement(u.MenuItem,{value:"recomp",primaryText:"Recomposition (-20%/+20%)"}),n.default.createElement(u.MenuItem,{value:"cut",primaryText:"Cut (-30%/10%)"}),n.default.createElement(u.MenuItem,{value:"slowbulk",primaryText:"Slow bulk (-10%/+30%)"}),n.default.createElement(u.MenuItem,{value:"custom",primaryText:"Custom values"}))};t.default=i}).call(this)}finally{}},1334:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(72),o=a(96),c=function(e){var t=e.calorieSplit,a=e.minRest,n=e.minTraining,r=e.normalize;return"custom"===t?l.default.createElement("div",null,l.default.createElement(i.Field,{fullWidth:!0,name:"restDay",floatingLabelText:"Rest day %",type:"number",min:a,max:200,normalize:r,step:.5,component:o.TextField}),l.default.createElement(i.Field,{fullWidth:!0,name:"trainingDay",floatingLabelText:"Trainging day %",component:o.TextField,type:"number",step:.5,normalize:r,min:n,max:200})):null};c.propTypes={calorieSplit:u.default.string,normalize:u.default.func.isRequired},t.default=c}).call(this)}finally{}},1335:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(72),r=a(96),u=a(25),i=function(){return n.default.createElement(l.Field,{name:"fatMethod",component:r.SelectField,fullWidth:!0,floatingLabelText:"Select how would you like to give your fat target"},n.default.createElement(u.MenuItem,{value:"grams",primaryText:"In grams"}),n.default.createElement(u.MenuItem,{value:"percentage",primaryText:"In % of kcals"}))};t.default=i}).call(this)}finally{}},1336:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(1),u=e(r),i=a(72),o=(a(96),a(25),a(1315)),c=e(o),f=function(e){var t=e.fatMethod,a=e.maxRestFatGrams,n=e.maxRestFatPercentage,r=e.maxTrainingFatGrams,u=e.maxTrainingFatPercentage;return"grams"===t?l.default.createElement("div",null,l.default.createElement(i.Field,{name:"restFatGrams",component:c.default,type:"number",format:function(e,t){return""===e?0:e},min:0,max:a,step:1}),l.default.createElement(i.Field,{format:function(e,t){return""===e?0:e},name:"trainingFatGrams",component:c.default,type:"number",min:0,max:r,step:1})):l.default.createElement("div",null,l.default.createElement(i.Field,{name:"restFatPercentage",format:function(e,t){return""===e?0:e},component:c.default,type:"number",min:0,max:n,step:.1}),l.default.createElement(i.Field,{format:function(e,t){return""===e?0:e},name:"trainingFatPercentage",component:c.default,type:"number",min:0,max:u,step:.1}))};f.propTypes={fatMethod:u.default.string,maxRestFatGrams:u.default.number,maxRestFatPercentage:u.default.number,maxTrainingFatGrams:u.default.number,maxTrainingFatPercentage:u.default.number},t.default=f}).call(this)}finally{}},1337:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(0),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(72),r=a(96),u=function(){return n.default.createElement(l.Field,{name:"protein",fullWidth:!0,floatingLabelText:"Enter your protein intake g/lbm (kg)",component:r.TextField,type:"number",min:0,max:5,step:.1})};t.default=u}).call(this)}finally{}},1359:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(0),c=e(o),f=a(72),d=a(16),s=a(49),m=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(s),y=a(18),p=a(117),g=a(1324),b=e(g),h=a(1331),v=e(h),F=a(1332),M=e(F),_=a(1330),E=e(_),T=a(1333),x=e(T),P=a(1334),C=e(P),O=a(1337),S=e(O),j=a(1335),w=e(j),G=a(1336),I=e(G),R=a(1313),D=e(R),k=function(e){function t(){return n(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),i(t,[{key:"_adjustCaloriePercentage",value:function(e,t){var a=t.calorieSplit,n=e.change;"slowbulk"===a&&(n("restDay",-10),n("trainingDay",30)),"cut"===a&&(n("restDay",-30),n("trainingDay",10)),"recomp"===a&&(n("restDay",-20),n("trainingDay",20))}},{key:"_adjustFatRatio",value:function(e,t){var a=e.change,n=e.restFatGrams,l=e.restFatPercentage,r=e.trainingFatGrams,u=e.trainingFatPercentage,i=t.calorieTarget,o=i.getIn(["max","restGram"]),c=i.getIn(["max","trainingGram"]),f=i.getIn(["max","restPercentage"]),d=i.getIn(["max","trainingPercentage"]);n>o&&a("restFatGrams",m.floor(o)),r>c&&a("trainingFatGrams",m.floor(c)),l>f&&a("restFatPercentage",m.floor(f)),u>d&&a("trainingFatPercentage",m.floor(d))}},{key:"shouldComponentUpdate",value:function(e,t){var a=e.calorieTarget,n=e.calorieSplit,l=e.restDay,r=e.trainingDay,u=e.activity,i=e.fatMethod,o=e.bmrCalculationMethod,c=this.props,f=(c.change,c.restFatGrams),d=c.restFatPercentage,s=c.trainingFatGrams,m=c.trainingFatPercentage,y=a.getIn(["max","restGram"]),p=a.getIn(["max","trainingGram"]),g=a.getIn(["max","restPercentage"]),b=a.getIn(["max","trainingPercentage"]);return o!==this.props.bmrCalculationMethod||i!==this.props.fatMethod||u!==this.props.activity||n!==this.props.calorieSplit||l!==this.props.restDay||r!==this.props.trainingDay||void 0===f||void 0===this.props.restDay||f>y||s>p||d>g||m>b}},{key:"componentDidMount",value:function(){this.props.initializeForm(this.props)}},{key:"componentWillReceiveProps",value:function(e,t){this._adjustCaloriePercentage(this.props,e),this._adjustFatRatio(this.props,e)}},{key:"render",value:function(){var e=this.props,t=e.fatMethod,a=e.calorieSplit,n=e.handleSubmit,l=e.bmrCalculationMethod,r=e.createCalorieTarget,i=e.calorieTarget;e.restFatGrams,e.restFatPercentage,e.trainingFatGrams,e.trainingFatPercentage;return c.default.createElement("div",null,c.default.createElement("form",{onSubmit:n(function(e){r(i.get("finalValues").toJS())})},c.default.createElement(v.default,null),c.default.createElement(M.default,{bmrCalculationMethod:l}),c.default.createElement(E.default,{normalize:function(e){return(void 0===e?"undefined":u(e))!==Number?Number.parseFloat(e):e}}),c.default.createElement(x.default,null),c.default.createElement(C.default,{calorieSplit:a,minRest:i.toJS().minCalorie,minTraining:i.toJS().minCalorie,normalize:function(e){return(void 0===e?"undefined":u(e))!==Number?Number.parseFloat(e):e}}),c.default.createElement(S.default,null),c.default.createElement(w.default,null),c.default.createElement(I.default,{fatMethod:t,maxRestFatGrams:i.getIn(["max","restGram"]),maxRestFatPercentage:i.getIn(["max","restPercentage"]),maxTrainingFatGrams:i.getIn(["max","trainingGram"]),maxTrainingFatPercentage:i.getIn(["max","trainingPercentage"])}),c.default.createElement(D.default,{label:"Create calorie target"})))}}]),t}(o.Component),B=(0,f.formValueSelector)("calorie-target");k=(0,d.connect)(function(e){return{activity:B(e,"activity"),fatMethod:B(e,"fatMethod"),calorieSplit:B(e,"calorieSplit"),bmrCalculationMethod:B(e,"bmrCalculationMethod"),trainingFatGrams:B(e,"trainingFatGrams"),restFatGrams:B(e,"restFatGrams"),trainingFatPercentage:B(e,"trainingFatPercentage"),restFatPercentage:B(e,"restFatPercentage"),restDay:B(e,"restDay"),trainingDay:B(e,"trainingDay")}})(k);var z=function(e){return{calorieTarget:(0,b.default)(e)}},A=function(e){return{initializeForm:function(t){var a=t.calorieTarget;return e((0,f.initialize)("calorie-target",(0,y.Map)().withMutations(function(e){return e.set("bodyFat",a.get("bodyFat")).set("restDay",-20).set("trainingDay",20).set("restFatGrams",0).set("trainingFatGrams",0).set("restFatPercentage",0).set("trainingFatPercentage",0).set("fatMethod","grams").set("activity",1.2).set("protein",2).set("calorieSplit","recomp").set("bmrCalculationMethod","harris-benedict")})))},createCalorieTarget:function(t){return e((0,p.createKcalTarget)(t))}}};t.default=(0,d.connect)(z,A)((0,f.reduxForm)({form:"calorie-target"})(k))}).call(this)}finally{}},1360:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),l=e(n),r=a(16),u=a(1327),i=e(u),o=a(1324),c=e(o),f=function(e){var t=e.values;return l.default.createElement("div",null,l.default.createElement(i.default,{calorieTarget:t?t.toJS():{},label:"rest"}),l.default.createElement(i.default,{calorieTarget:t?t.toJS():{},label:"training"}))},d=function(e){return{values:(0,c.default)(e).get("finalValues")}};t.default=(0,r.connect)(d)(f)}).call(this)}finally{}},1367:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=a(2),n=function(e){return e&&e.__esModule?e:{default:e}}(e),l=a(73),r=function(e){return e.getIn(["userDetails","dob"])},u=function(e){return e?(0,n.default)().diff((0,n.default)(e),"years"):void 0};t.default=(0,l.createSelector)(r,u)}).call(this)}finally{}},1368:function(e,t,a){try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.harrisBenedict=t.katchMcardle=t.leanMass=t.maxFatPercentage=t.maxFatGram=t.dayCalorie=t.maleBodyFat=t.femaleBodyFat=void 0;var e=a(49),n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}(e),l=function(e,t,a,n){return"male"===n?88+13.4*e+4.8*t-5.7*a:447+9.27*e+3.1*t-4.3*a},r=function(e){return 370+21.6*e},u=function(e,t){return e*((100-Number.parseFloat(t))/100)},i=function(e,t){return(e-t)/e*100},o=function(e,t){return(e-t)/9},c=function(e,t){return e*((100+t)/100)},f=function(e,t,a){return n.round(86.01*Math.log10(.39*a-.39*t)-70.041*Math.log10(.39*e)+36.76,1)},d=function(e,t,a,l){return n.round(163.205*Math.log10(.39*a+.39*l-.39*t)-97.684*Math.log10(.39*e)-78.387,1)};t.femaleBodyFat=d,t.maleBodyFat=f,t.dayCalorie=c,t.maxFatGram=o,t.maxFatPercentage=i,t.leanMass=u,t.katchMcardle=r,t.harrisBenedict=l}).call(this)}finally{}},1369:function(e,t,a){try{(function(){"use strict";function e(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0}),t.tdeeCalculator=t.calculateProteinTarget=t.calculateFinalFat=t.calculateFinalCalorie=t.calculateFinalProtein=t.calculateFinalCarbohydrate=t.unlessItsAbovezero=t.minCalorie=t.calculateBodyFat=t.calculateMax=void 0;var n=a(49),l=e(n),r=a(1368),u=e(r),i=function(e){return e>0?e:.1},o=function(e,t,a,n,l,r,i){return"male"===a?u.maleBodyFat(e,n,l):u.femaleBodyFat(e,n,r,i)},c=function(e,t,a,n,l,r,i){return"harris-benedict"===e?u.harrisBenedict(t,a,n,l)*r:u.katchMcardle(u.leanMass(t,i))*r},f=function(e,t,a,n){return"katch-mcardle"===t?u.leanMass(n,e)*a*4:n*a*4},d=function(e,t,a,n,r){return"percentage"===e?l.ceil(u.dayCalorie(t,a)*(n/100)/9):l.ceil(9*r)/9},s=function(e,t){return l.ceil(u.dayCalorie(e,t))},m=function(e){return l.ceil(e/4)},y=function(e,t){return-1*l.floor((e-t)/e*100)},p=function(e,t,a,n,r,i){return l.ceil((u.dayCalorie(e,t)-9*d(n,e,t,r,i)-a)/4)},g=function(e,t,a,n){return l.floor(i("percentage"===n?u.maxFatPercentage(u.dayCalorie(e,t),a):u.maxFatGram(u.dayCalorie(e,t),a)),1)};t.calculateMax=g,t.calculateBodyFat=o,t.minCalorie=y,t.unlessItsAbovezero=i,t.calculateFinalCarbohydrate=p,t.calculateFinalProtein=m,t.calculateFinalCalorie=s,t.calculateFinalFat=d,t.calculateProteinTarget=f,t.tdeeCalculator=c}).call(this)}finally{}}});