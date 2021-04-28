"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var HoursStatistics=function(_BaseComponent){_inherits(HoursStatistics,_BaseComponent);function HoursStatistics(props){_classCallCheck(this,HoursStatistics);var _this=_possibleConstructorReturn(this,(HoursStatistics.__proto__||Object.getPrototypeOf(HoursStatistics)).call(this,props));var dow=moment().day();_this.state={currentStatistics:[{key:null,values:[]}],days:[],selectedOption:{value:dow,label:moment().locale(_this.props.locale).day(dow).format("dddd").capitalize()}};_this._bind("handleChange");return _this}_createClass(HoursStatistics,[{key:"componentDidMount",value:function componentDidMount(){this.filterStatistics()}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){if(this.state.selectedOption.value!==prevState.selectedOption.value){this.filterStatistics()}}},{key:"filterStatistics",value:function filterStatistics(){var _this2=this;var data=[];var days=[];var dow=this.state.selectedOption.value;this.props.statistics[dow].map(function(stat){data.push({label:stat.hour,value:stat.data})});this.props.statistics.map(function(stat,index){if(stat.length>0){days.push({value:index,label:moment().locale(_this2.props.locale).day(index).format("dddd").capitalize()})}});this.setState({currentStatistics:[{key:moment().locale(this.props.locale).day(dow).format("dddd").capitalize(),values:data}],days:days})}},{key:"handleChange",value:function handleChange(selectedOption){this.setState({selectedOption:selectedOption});this.filterStatistics()}},{key:"iconPlaceholder",value:function iconPlaceholder(){return React.createElement("span",{className:"icon icon-chevron-down"})}},{key:"queueType",value:function queueType(){if(!this.props.venueOpened){return this.props.translation.chiuso}if(this.state.currentStatistics[0].key===null){return""}var weekStatistics=[];for(var i=0;i<this.props.statistics.length;i++){for(var x=0;x<this.props.statistics[i].length;x++){weekStatistics.push(this.props.statistics[i][x].data)}}var todayStatistics=this.state.currentStatistics[0].values.map(function(item){return item.value});var nowStatistic=0;for(var y=0;y<this.state.currentStatistics[0].values.length;y++){if(this.state.currentStatistics[0].values[y].label===moment().hour()){nowStatistic=this.state.currentStatistics[0].values[y].value}}if(nowStatistic.addPercentage(25)>todayStatistics.median()){return this.props.translation.solitamenteMoltoAffollato}if(nowStatistic.subtractPercentage(25)<todayStatistics.median()){return this.props.translation.solitamenteNonMoltoAffollato}return this.props.translation.solitamenteNellaNorma}},{key:"render",value:function render(){var selectedOption=this.state.selectedOption;var value=selectedOption&&selectedOption.value;var queueInfo=this.props.translation.inQuestoMomento+"&nbsp;<span>"+this.queueType()+"</span>";return React.createElement("div",{className:"HoursStatistics"},React.createElement("div",{className:"title"},this.props.translation.orariConMaggiorAffluenza),React.createElement(Select,{name:"days-dropdown",value:value,onChange:this.handleChange,options:this.state.days,searchable:false,clearable:false,arrowRenderer:this.iconPlaceholder,style:{boxShadow:"none"}}),React.createElement("div",{className:"Graph-Wrapper"},this.state.currentStatistics.map(function(current_day,k){var current_hour=moment().hour();var max_value=Math.max.apply(Math,_toConsumableArray(current_day.values.map(function(o){return o.value})).concat([0]));return React.createElement("div",{key:k,className:"Graph"},React.createElement("div",{className:"Graph--bars"},current_day.values.map(function(bar,i){return React.createElement("div",{key:i,className:classNames({"Graph--bars-bar":true,active:bar.label===current_hour}),style:{height:bar.value*100/max_value+"%"}})})),React.createElement("div",{className:"Graph--legends"},current_day.values.map(function(bar,i){return React.createElement("div",{key:i,className:"Graph--legends-legend"},bar.label)})))})),React.createElement("div",{className:"queue-info"},React.createElement("div",{dangerouslySetInnerHTML:{__html:queueInfo}})))}}]);return HoursStatistics}(BaseComponent);HoursStatistics.propTypes={locale:React.PropTypes.string.isRequired,translation:React.PropTypes.object.isRequired,statistics:React.PropTypes.array.isRequired,venueOpened:React.PropTypes.bool.isRequired};