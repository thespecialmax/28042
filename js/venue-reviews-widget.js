"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var VenueReviewsWrapper=function(_BaseComponent){_inherits(VenueReviewsWrapper,_BaseComponent);function VenueReviewsWrapper(props){_classCallCheck(this,VenueReviewsWrapper);var _this=_possibleConstructorReturn(this,(VenueReviewsWrapper.__proto__||Object.getPrototypeOf(VenueReviewsWrapper)).call(this,props));_this.state={activeBar:null};_this._bind("handleOnClickRatingBar");return _this}_createClass(VenueReviewsWrapper,[{key:"handleOnClickRatingBar",value:function handleOnClickRatingBar(rating){this.setState({activeBar:this.state.activeBar===rating?null:rating})}},{key:"render",value:function render(){return React.createElement("div",{id:"venue-reviews",className:"venue-section"},React.createElement("div",{className:"venue-section-header"},React.createElement("h2",{className:"main-section",title:this.props.translation.recensioniOpinioni+" "+this.props.venueName},this.props.translation.recensioni.capitalize()),React.createElement("div",{className:"subtitle"},"(",this.props.translation.lasciateDaiClientiSoloDopoLaLoroVisitaAlSalone,")")),React.createElement("div",{id:"venue-review-summary",className:"clearfix"},React.createElement("div",{className:"venue-rating"},React.createElement("div",{className:"rating-header"},this.props.translation.voto,React.createElement(RatingStars,{rating:this.props.averageRating})),React.createElement("div",{className:"rating-value"},this.props.averageRating.numberFormat(1,genericData.getCurrentLanguage==="en"?".":","),React.createElement("sup",null,"/5")),React.createElement("div",{className:"rating-count"},React.createElement("span",null,this.props.reviewsCount),React.createElement("span",null," ",this.props.translation.recensioni))),React.createElement(VenueRatingBars,{reviewRatingCounts:this.props.reviewRatingCounts,reviewsCount:this.props.reviewsCount,onClick:this.handleOnClickRatingBar,activeBar:this.state.activeBar})),React.createElement("div",{className:"venue-reviews"},React.createElement(VenueReviews,{venueId:this.props.venueId,venueUrl:this.props.venueUrl,translation:this.props.translation,byRating:this.state.activeBar})))}}]);return VenueReviewsWrapper}(BaseComponent);VenueReviewsWrapper.propTypes={venueId:React.PropTypes.number.isRequired,venueName:React.PropTypes.string.isRequired,averageRating:React.PropTypes.number.isRequired,reviewsCount:React.PropTypes.number.isRequired,reviewRatingCounts:React.PropTypes.object.isRequired,venueUrl:React.PropTypes.string.isRequired,translation:React.PropTypes.object.isRequired};var VenueReviews=function(_BaseComponent2){_inherits(VenueReviews,_BaseComponent2);function VenueReviews(props){_classCallCheck(this,VenueReviews);var _this2=_possibleConstructorReturn(this,(VenueReviews.__proto__||Object.getPrototypeOf(VenueReviews)).call(this,props));_this2.state={loading:true,hideButtonLoadMore:false,buttonLoadMoreLoading:true,reviews:[],totalReviews:0,page:1};_this2._bind("retriveReviews","formatTreatments","loadMoreReviews");return _this2}_createClass(VenueReviews,[{key:"componentDidMount",value:function componentDidMount(){if(this.state.reviews.length===0){this.retriveReviews()}}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){if(this.props.byRating!==prevProps.byRating){this.retriveReviews();this.setState({reviews:[],loading:true})}}},{key:"retriveReviews",value:function retriveReviews(){var self=this;$.ajax({url:"/xhr/reviews",method:"POST",data:{page:this.state.page,venueId:this.props.venueId,byRating:this.props.byRating},success:function success(result){if(!result.success){return false}self.setState({totalReviews:result.totalReviews});result.reviews.forEach(function(review){self.setState(function(prevState){return{reviews:self.getArrayByUniqueId([].concat(_toConsumableArray(prevState.reviews),[review]))}})});if(result.reviews.length===0){self.setState({hideButtonLoadMore:true})}},complete:function(){this.setState({loading:false,buttonLoadMoreLoading:false});this.setState({hideButtonLoadMore:this.state.reviews.length===this.state.totalReviews})}.bind(this)})}},{key:"getArrayByUniqueId",value:function getArrayByUniqueId(array){return array.reduce(function(acc,current){var x=[].concat(acc).find(function(item){return item.id===current.id});return!x?acc.concat([current]):acc},[])}},{key:"formatTreatments",value:function formatTreatments(treatments){if(Array.isArray(treatments)){return treatments.join(", ")}return treatments}},{key:"loadMoreReviews",value:function loadMoreReviews(e){e.preventDefault();this.setState({page:++this.state.page,buttonLoadMoreLoading:true});this.retriveReviews()}},{key:"render",value:function render(){var _this3=this;var loadMoreButtonClasses=classNames({hide:this.state.hideButtonLoadMore,"text-center":true});var loadMoreHref=this.props.venueUrl+"/reviews/page"+(this.state.page+1);var reviewsList=this.state.loading?React.createElement(LoaderComponent,null):React.createElement("div",{id:"venue-reviews-list"},this.state.reviews.map(function(review,index){return React.createElement("div",{key:index,className:"venue-review"},React.createElement("div",{className:"review-image"},React.createElement("img",{src:review.userProfilePictureUrl,alt:review.userTruncatedName,width:"50",height:"50",onError:function onError(event){return event.target.setAttribute("src","/images/user/avatar.jpg")}})),React.createElement("div",{className:"review-info"},React.createElement("div",{className:"review-author"},review.userTruncatedName),React.createElement("div",{className:"review-date"},review.createdAtShort),React.createElement("div",{className:"review-rating"},React.createElement(RatingStars,{rating:review.rating}),React.createElement("div",{className:"review-treatments"},React.createElement("spa",null,_this3.formatTreatments(review.treatments))),React.createElement("div",{className:"review-verified"},_this3.props.translation.recensioneVerificata)),React.createElement("div",{className:"review-text read-expand"},review.body)))}),this.state.buttonLoadMoreLoading?React.createElement(LoaderComponent,null):React.createElement("div",{className:loadMoreButtonClasses},React.createElement("a",{href:loadMoreHref,className:"show-more show-more-reviews reversed",onClick:this.loadMoreReviews},this.props.translation.vediAltreRecensioni)));return React.createElement("div",{className:"venue-reviews"},reviewsList)}}]);return VenueReviews}(BaseComponent);VenueReviews.propTypes={venueId:React.PropTypes.number.isRequired,venueUrl:React.PropTypes.string.isRequired,translation:React.PropTypes.object.isRequired};VenueReviews.defaultTypes={byRating:null};var RatingStars=function(_BaseComponent3){_inherits(RatingStars,_BaseComponent3);function RatingStars(){_classCallCheck(this,RatingStars);return _possibleConstructorReturn(this,(RatingStars.__proto__||Object.getPrototypeOf(RatingStars)).apply(this,arguments))}_createClass(RatingStars,[{key:"_ratingStarClass",value:function _ratingStarClass(value){var fullStar=new Array(Math.floor(value+1)).join('<div class="icon icon-star-full active"></div>');var halfStar=value%1!==0?'<div class="icon-extended icon-half-star-icon active"></div>':"";var noStar=new Array(Math.floor(5+1-value)).join('<div class="icon icon-star-empty active"></div>');return fullStar+halfStar+noStar}},{key:"render",value:function render(){return React.createElement("div",{className:"stars",dangerouslySetInnerHTML:{__html:this._ratingStarClass(this.props.rating)}})}}]);return RatingStars}(BaseComponent);RatingStars.propTypes={rating:React.PropTypes.number.isRequired};RatingStars.defaultProps={rating:0};var VenueRatingBars=function(_BaseComponent4){_inherits(VenueRatingBars,_BaseComponent4);function VenueRatingBars(){_classCallCheck(this,VenueRatingBars);return _possibleConstructorReturn(this,(VenueRatingBars.__proto__||Object.getPrototypeOf(VenueRatingBars)).apply(this,arguments))}_createClass(VenueRatingBars,[{key:"ratingCountFor",value:function ratingCountFor(count){var _this6=this;var total=0;Object.keys(this.props.reviewRatingCounts).forEach(function(rating){if(!!rating){if(count===parseInt(rating))total+=_this6.props.reviewRatingCounts[rating]}});return total}},{key:"ratingPercFor",value:function ratingPercFor(value){var rating=this.ratingCountFor(value);if(rating>0){return 100*rating/this.props.reviewsCount}return 0}},{key:"render",value:function render(){var _this7=this;var barClass=this.props.activeBar===null?"normal":"deactivated";return React.createElement("div",{className:"venue-rating-details filtrable"},[5,4,3,2,1].map(function(i){return React.createElement("div",{key:i,onClick:function onClick(){return _this7.props.onClick(i)},className:_this7.props.activeBar===i?"selected":barClass},React.createElement("div",{className:"rating-detail-parameter"},React.createElement("span",null,i),"/5"),React.createElement("div",{className:"rating-detail-bar"},React.createElement("div",null,React.createElement("span",{style:{width:_this7.ratingPercFor(i)+"%"}}))),React.createElement("div",{className:"rating-detail-counter"},_this7.ratingCountFor(i)))}))}}]);return VenueRatingBars}(BaseComponent);VenueRatingBars.propTypes={reviewRatingCounts:React.PropTypes.object.isRequired,reviewsCount:React.PropTypes.number.isRequired,onClick:React.PropTypes.func.isRequired};VenueRatingBars.defaultTypes={activeBar:null};