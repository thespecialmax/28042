window.analytics||(window.analytics=[]);window.analytics.methods=["identify","track","trackLink","trackForm","trackClick","trackSubmit","page","pageview","ab","alias","ready","group","on","once","off"];window.analytics.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);args.unshift(method);window.analytics.push(args);return window.analytics}};for(var i=0;i<window.analytics.methods.length;i++){var method=window.analytics.methods[i];window.analytics[method]=window.analytics.factory(method)}analytics.load=function(callback){if(document.getElementById("uala-analytics"))return;window.a=window.analytics;var script=document.createElement("script");script.async=true;script.id="uala-analytics";script.type="text/javascript";script.src=("https:"===document.location.protocol?"https://":"http://")+"s3-eu-west-1.amazonaws.com/production-hairdressr/analytics/uala-analytics.min.js";script.addEventListener("load",function(e){if(typeof callback==="function"){callback(e)}},false);var first=document.getElementsByTagName("script")[0];first.parentNode.insertBefore(script,first)};analytics.load(function(){var apiPrefix=document.head.querySelector("[name~=uala-analytics][content]").content;var hostParts=window.location.hostname.split(".");var apiHost=apiPrefix+"."+hostParts[hostParts.length-2]+"."+hostParts[hostParts.length-1]+"/v1";var options={apiKey:analyticsData.key,apiHost:apiHost,version:analyticsData.release};if(analyticsData.extendContext&&typeof ClientJS==="function"){var client=new ClientJS;options.context={device:{type:client.getDeviceType(),fingerprint:client.getFingerprint(),manufacturer:client.getDeviceVendor(),name:navigator.platform},location:{latitude:sessionStorage.hasOwnProperty("currentPosition")?JSON.parse(sessionStorage.getItem("currentPosition")).coords.latitude:undefined,longitude:sessionStorage.hasOwnProperty("currentPosition")?JSON.parse(sessionStorage.getItem("currentPosition")).coords.longitude:undefined},network:{type:navigator.connection.effectiveType,speed:navigator.connection.downlink},os:{name:client.getOS(),version:client.getOSVersion()},browser:{name:client.getBrowser(),majorVersion:client.getBrowserMajorVersion(),version:client.getBrowserVersion()},locale:Intl.DateTimeFormat().resolvedOptions().locale,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone}}analytics.initialize({"Segment.io":options});while(window.a.length>0){var item=window.a.shift();var method=item.shift();if(analytics[method])analytics[method].apply(analytics,item)}});