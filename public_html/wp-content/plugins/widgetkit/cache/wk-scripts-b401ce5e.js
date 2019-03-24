!function(e){function t(e,t){var i=jQuery.Deferred(),n=document.createElement("script");return n.async=!0,n.onload=function(){i.resolve(),t&&t(n)},n.onerror=function(){i.reject(e)},n.src=e,document.getElementsByTagName("head")[0].appendChild(n),i.promise()}angular.module("Fields",[]).directive("fieldMedia",["mediaPicker","mediaInfo",function(e,t){function i(i){var a=this;a.selectMedia=function(){e.select().then(function(e){i.media=e.url,i.height=e.height,i.width=e.width,i.title||(i.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}))})},a.selectPoster=function(){e.select().then(function(e){i.options||(i.options={}),i.options.poster=e.url})},a.isVideo=function(e){return!(!e||!(e.match(/\.(mp4|ogv|webm)$/)||e.match(/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i)||e.match(/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i)||e.match(/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i)))},i.$watch("media",function(){return i.options&&!angular.isArray(i.options)||(i.options={}),n[i.media]?(i.options.width=n[i.media].width,void(i.options.height=n[i.media].height)):void t(i.media,!0).then(function(e){i.height="",i.width="",Object.keys(n).length>0&&i.options.iframe&&!n[i.media]&&(i.options.iframe.width="",i.options.iframe.height=""),e.type&&(i.options.width=e.width,i.options.height=e.height,i.options.type=e.type,n[i.media]=e)})},!0),i.$watch("options.iframe",function(){i.options.iframe&&(i.options.width=i.options.iframe.width,i.options.height=i.options.iframe.height)},!0)}var n={};return{scope:{media:"=",options:"=?",title:"=?"},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                                  <div class="uk-flex">                                      <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                          <i class="uk-icon-photo"></i><input class="uk-width-1-1" ng-model="media">                                      </div>                                      <button class="uk-button" ng-click="vm.selectMedia()">Select</button>                                  </div>                                  <div class="uk-grid uk-margin-top">                                      <div class="uk-width-small-1-2">                                          <div class="uk-overlay">                                              <media-preview src="{{ media }}"></media-preview>                                              <div class="uk-overlay-panel uk-overlay-bottom uk-panel uk-panel-box" ng-show="options.type === \'iframe\'">                                                  <div class="uk-grid uk-grid-small uk-grid-width-1-3 uk-margin-small-top">                                                      <div class="uk-form-icon"><i class="uk-icon-arrows-h"></i><input class="uk-width-1-1" type="text" title="Width" ng-model="options.iframe.width" placeholder="width"></div>                                                      <div class="uk-form-icon"><i class="uk-icon-arrows-v"></i><input class="uk-width-1-1" type="text" title="Height" ng-model="options.iframe.height" placeholder="height"></div>                                                  </div>                                              </div>                                          </div>                                      </div>                                      <div class="uk-width-small-1-2" ng-show="vm.isVideo(media)">                                          <div class="uk-margin-small-bottom" ng-show="options.poster"><media-preview src="{{ options.poster }}"></media-preview></div>                                          <a ng-click="vm.selectPoster()">Select Poster</button>                                          <a class="uk-margin-small-left" ng-show="options.poster" ng-click="(options.poster = \'\')">Reset</a>                                      </div>                                  </div>                               </div>'}}]).directive("fieldWysiwygeditor",["$timeout","mediaPicker","mediaInfo",function(e,t,i){return{restrict:"EA",require:"?ngModel",template:'<div><textarea name="wk_{{id}}" id="wk_{{id}}"></textarea></div>',link:function(i,n,a,o){if(window.tinyMCE){i.id=String(Math.ceil(1e3*Math.random()));var r=jQuery,l="wk_"+i.id,s=function(){var e,n,a=window.tinyMCE||window.WFEditor;window.WFEditor&&r("#"+l).after('<input type="hidden" id="wf_'+i.id+'_token" value="'+Math.random()+'">'),"object"==typeof Joomla&&(n=Joomla.getOptions&&Joomla.getOptions("plg_editor_tinymce",{}));var s=n&&n.tinyMCE&&n.tinyMCE["default"].toolbar1||a.settings&&a.settings.toolbar1||"",d=n&&n.tinyMCE&&n.tinyMCE["default"].toolbar2||a.settings&&a.settings.toolbar2||"",c=n&&n.tinyMCE&&n.tinyMCE["default"].plugins||a.settings&&a.settings.plugins||"";!window.wp||s&&d&&c||(c||(c="charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview"),s||(s="bold,italic,strikethrough,bullist,numlist,blockquote,hr,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,dfw,wp_adv"),d||(d="formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help")),s.indexOf("wk_media")==-1&&(s+=" wk_media"),window.wp||window.WFEditor||s.indexOf("button-2Article")!=-1||(s+=" button-2Article"),window.wp||window.WFEditor||c.indexOf("jArticleButton")!=-1||(c+=" jArticleButton"),e=r.extend({},n&&n.tinyMCE&&n.tinyMCE["default"]||a.settings,{menubar:!1,plugins:c,toolbar1:s,toolbar2:d,width:"100%",height:500,relative_urls:n&&n.tinyMCE&&n.tinyMCE["default"].relative_urls||a.settings&&a.settings.relative_urls||!1,setup:function(e){e.addButton("wk_media",{text:"",icon:"image",onclick:function(){window.wp?t.select({editor:l}):t.select().then(function(t){var i=t.href,n=t.title,a=t.width,o=t.height;e.insertContent('<img src="'+i+'" alt="'+n+'" data-mce-src="'+i+'" width="'+a+'" height="'+o+'"></img>')})}}),4==tinyMCE.majorVersion?(e.on("change",function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.on("input",function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.on("init",function(){e.setContent(o.$viewValue||"")})):(e.onChange.add(function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.onKeyUp.add(function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.onInit.add(function(){e.setContent(o.$viewValue||"")}))}});var u=new tinyMCE.Editor(l,e,tinyMCE.EditorManager);u.render(),o.$render=function(){try{u.setContent(o.$viewValue||""),r("#"+l).val(o.$viewValue||"")}catch(e){}},o.$render()};e(s)}}}}]).directive("fieldHtmleditor",["$timeout","$q",function(i,n){function a(){return o||(o=jQuery.Deferred(),t(widgetkit.config.adminBase+"/assets/lib/codemirror/codemirror.js").then(function(){t(widgetkit.config.adminBase+"/vendor/assets/uikit/js/components/htmleditor.min.js").then(function(){o.resolve()})})),o.promise()}var o;return{restrict:"EA",require:"?ngModel",link:function(t,n,o,r){a().then(function(){var a,l=jQuery("<textarea></textarea>"),s={mdparser:function(){}};s=jQuery.extend(!0,{},s,t.$eval(o.options)),n.after(l).hide();var d=function(){r.$render=function(){l.data("htmleditor")&&l.data("htmleditor").editor.setValue(r.$viewValue||"")},setTimeout(function(){a=e.htmleditor(l,s),a.editor.on("change",e.Utils.debounce(function(){r.$setViewValue(a.editor.getValue()),t.$root.$$phase||t.$apply()},50)),a.fit(),r.$render()})};i(d)})}}}]).directive("fieldLocation",["$timeout","$q",function(i,n){function a(){return o||(o=jQuery.Deferred(),t(widgetkit.config.adminBase+"/plugins/widgets/map/assets/marker-helper.js").then(function(){o.resolve()})),o.promise()}var o,r=0,l=function(){var e,t=function(){if(!e){e=n.defer();var t=document.createElement("script");t.async=!0,t.onload=function(){google.load("maps","3",{other_params:"libraries=places&key="+(window.GOOGLE_MAPS_API_KEY||""),callback:function(){google&&google.maps.places&&e.resolve()}})},t.onerror=function(){alert("Failed loading google maps api.")},t.src="https://www.google.com/jsapi",document.getElementsByTagName("head")[0].appendChild(t)}return e.promise};return t}();return{restrict:"EA",require:"?ngModel",scope:{latlng:"@"},replace:!0,template:'<div>                                    <div class="uk-alert uk-margin-small-bottom" ng-if="!APIKEY">Please add your custom Google Maps API Key in the <a href="'+widgetkit.config.settingsPage+'">Widgetkit settings</a>!</div>                                    <div class="uk-grid uk-grid-small">                                         <div class="uk-form uk-form-icon uk-margin-small-bottom uk-width-3-5">                                            <i class="uk-icon-search"></i><input class="uk-width-1-1">                                        </div>                                        <div class="uk-form uk-form-horizontal uk-margin-small-bottom uk-width-2-5">                                            <input class="uk-width-1-1" type="text" placeholder="Custom marker: URL or #000" ng-model="latlng.marker">                                        </div>                                    </div>                                    <div class="js-map" style="min-height:300px;">                                     Loading map...                                     </div>                                     <div class="uk-text-small uk-margin-small-top">LAT: <span class="uk-text-muted">{{ latlng.lat }}</span> LNG: <span class="uk-text-muted">{{ latlng.lng }}</span> <span ng-if="latlng.place">PLACE: <span class="uk-text-muted">{{ latlng.place.name }}</span></span></div>                                </div>',link:function(t,n,o,s){function d(e){var n=jQuery.extend({lat:c.getPosition().lat(),lng:c.getPosition().lng(),marker:"",place:!1},s.$viewValue,e);s.$setViewValue(n),t.latlng=n,i(function(){t.$apply()})}var c;a().then(function(){l().then(function(){i(function(){var i,a,o,l="wk-location-"+ ++r,u=new google.maps.LatLng(53.55909862554551,9.998652343749995);t.latlng=s.$viewValue||{lat:u.lat(),lng:u.lng(),marker:"",place:!1},void 0===t.latlng.marker&&(t.latlng.marker=""),n.find(".js-map").attr("id",l),i=new google.maps.Map(document.getElementById(l),{zoom:6,center:u}),c=new google.maps.Marker({position:u,map:i,draggable:!0}),MapsMarkerHelper.setIcon(c,t.latlng.marker),google.maps.event.addListener(c,"dragend",function(){var e=c.getPosition();d({lat:e.lat(),lng:e.lng(),place:!1}),a.value=""}),e.$win.on("resize",function(){google.maps.event.trigger(i,"resize"),i.setCenter(c.getPosition())}),a=n.find("input")[0],o=new google.maps.places.Autocomplete(a),o.bindTo("bounds",i),google.maps.event.addListener(o,"place_changed",function(){var e=o.getPlace();if(e.geometry){e.geometry.viewport?i.fitBounds(e.geometry.viewport):i.setCenter(e.geometry.location),c.setPosition(e.geometry.location),a.value="";var t=c.getPosition();d({lat:t.lat(),lng:t.lng(),place:e})}}),google.maps.event.addDomListener(a,"keydown",function(e){13==e.keyCode&&e.preventDefault()}),t.$watch("latlng.marker",function(e){e&&d({marker:e}),MapsMarkerHelper.setIcon(c,e)}),s.$render=function(){try{if(s.$viewValue&&s.$viewValue.lat&&s.$viewValue.lng){var e=new google.maps.LatLng(s.$viewValue.lat,s.$viewValue.lng);c.setPosition(e),i.setCenter(e),s.$viewValue.marker!==t.latlng.marker&&d({marker:s.$viewValue.marker}),MapsMarkerHelper.setIcon(c,latlng.marker)}else d({lat:c.getPosition().lat(),lng:c.getPosition().lng(),marker:"",place:!1})}catch(n){}},s.$render()})})}),t.APIKEY=window.GOOGLE_MAPS_API_KEY||""}}}]).directive("fieldPathpicker",["mediaPicker","mediaInfo",function(e,t){function i(t){var i=this;i.selectPath=function(){filetypes=/\.*$/i,e.select({allowedFiletypes:filetypes}).then(function(e){t.path=e.url})},t.$watch("path",function(e){t.path=e},!0)}return{scope:{path:"="},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                                  <div class="uk-flex">                                      <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                        <i class="uk-icon-paperclip"></i><input class="uk-width-1-1" ng-model="path">                                      </div>                                      <button class="uk-button" ng-click="vm.selectPath()">Select</button>                                  </div>                               </div>'}}]).directive("fieldDate",["$timeout","$q",function(e,i){function n(){return a||(a=jQuery.Deferred(),t(widgetkit.config.adminBase+"/vendor/assets/uikit/js/components/datepicker.min.js").then(function(){a.resolve()})),a.promise()}var a;return{restrict:"E",require:"?ngModel",scope:{date:"@"},template:'<div class="uk-form-icon">                                  <i class="uk-icon-calendar"></i>                                  <input type="text" ng-model="date" data-uk-datepicker="{container: \'.wk-noconflict\'}">                               </div>',link:function(t,i,a,o){n().then(function(){function i(i){o.$setViewValue(i),t.date=i,e(function(){t.$apply()})}t.date=o.$viewValue||"",t.$watch("date",function(e){i(e)}),o.$render=function(){try{i(o.$viewValue)}catch(e){}},o.$render()}),window.MooTools&&(i.find("input")[0].hide=function(){return!1})}}}]).factory("Fields",function(){var e={text:{label:"Text",template:function(e,t){var i=angular.element('<input class="uk-width-1-1" type="text"  ng-model="'+e+'">').attr(t.attributes||{});return t&&t.icon&&(i=i.wrap('<div class="uk-form-icon uk-width-1-1"></div>').before('<i class="uk-icon-'+t.icon+'"></i>').parent()),i}},textarea:{label:"Textarea",template:function(e,t){return angular.element('<textarea id="wk-content" class="uk-width-1-1" ng-model="'+e+'" rows="10"></textarea>').attr(t.attributes||{})}},editor:{label:"Editor",template:function(e,t){var i=window.tinyMCE&&window.WK_SYSTEM_EDITOR?"wysiwygeditor":"htmleditor";return angular.element("<field-"+i+' class="uk-width-1-1" ng-model="'+e+'" rows="10"></field-'+i+">")}},htmleditor:{label:"HTML Editor",template:function(e,t){var i="htmleditor";return angular.element("<field-"+i+' class="uk-width-1-1" ng-model="'+e+'" rows="10"></field-'+i+">")}},tags:{label:"Tags",template:function(e,t){return angular.element('<div class="uk-form-icon uk-width-1-1"><i class="uk-icon-tags"></i><input class="uk-width-1-1" type="text" ng-list ng-model="'+e+'" placeholder="tag, tag, ..."></div><div>').find("input").attr(t.attributes||{}).parent()}},"boolean":{label:"Boolean",template:function(e,t){return angular.element('<input type="checkbox" ng-model="'+e+'">').attr(t.attributes||{})}},media:{label:"Media",template:function(e,t){return'<field-media media="'+e+'"></field-media>'}},pathpicker:{label:"Pathpicker",template:function(e,t){return'<field-pathpicker path="'+e+'"></field-pathpicker>'}},location:{label:"Location",template:function(e,t){return'<field-location  ng-model="'+e+'"></field-location>'}},date:{label:"Date",template:function(e,t){return'<field-date ng-model="'+e+'"></field-date>'}}};return{register:function(t,i){e[t]=angular.extend({label:t,assets:[],template:function(){}},i)},exists:function(t){return!!e[t]},get:function(t){return e[t]},fields:function(){var t=[];return Object.keys(e).forEach(function(i){t.push({name:i,label:e[i].label})}),t}}}).directive("field",["$timeout","$compile","Fields",function(e,t,i){return{require:"?ngModel",restrict:"E",link:function(n,a,o,r){var l=function(){var e=angular.extend({},JSON.parse(o.options||"{}")),r=o.type||"text";if(i.exists(r)){var l,s=i.get(r);l=s.template(o.ngModel,e),l.then?l.then(function(e){t(a.html(e).contents())(n)}):t(a.html(l).contents())(n)}else t(a.html(i.get("text").template(o.ngModel)).contents())(n)};e(l)}}}])}(window.UIkit2||window.UIkit2wk);

angular.module("widgetkit",["Application","ngResource","ngTouch","Fields"]).value("name","widgetkit").value("UIkit",window.UIkit2||window.UIkit2wk).factory("Content",["$resource","Application",function(e,t){return e(t.url("/content/:id"),{},{query:{method:"GET",responseType:"json"},save:{method:"POST",responseType:"json"}})}]).filter("supported",["Application",function(e){return function(t,i){return i?t.filter(function(t){var o=e.config.types[t.type],r=i.item.filter(function(e){if(o.item.indexOf(e)!==-1)return!0}).length;return r==i.item.length}):t}}]).filter("ucwords",["Application",function(e){return function(e){return e.replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()})}}]).service("mediaInfo",["Application","$q",function(e,t){return function(i,o){i=i||"";var r,n,a={url:i,type:"",src:i&&!i.match(/^(https?:)?\//)?e.baseUrl()+"/"+i:i,provider:null,image:e.config.images.placeholder,width:null,height:null};if(i.match(/\.(jpe?g|png|gif|svg)$/i)?(a.type="image",a.image=a.src):i.match(/\.(mp3|ogg|wav)$/)?(a.type="audio",a.image=e.config.images.audio):i.match(/\.(mp4|ogv|webm)$/)?(a.type="video",a.image=e.config.images.video):(r=/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i.exec(i))?(a.provider="vimeo",a.type="iframe",a.src="//player.vimeo.com/video/"+r[2],a.image=e.config.images.iframe):((r=/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i.exec(i))||(r=/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i.exec(i)))&&(a.provider="youtube",a.type="iframe",a.src="//www.youtube.com/embed/"+r[2]+r[3].replace(/^&/,"?"),a.image="//img.youtube.com/vi/"+r[2]+"/hqdefault.jpg"),o)switch(n=t.defer(),a.type){case"image":var u=new Image;u.onerror=function(){n.resolve(a)},u.onload=function(){a.width=u.width,a.height=u.height,n.resolve(a)},u.src=a.src;break;case"video":var c=angular.element('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src",a.src).appendTo("body"),s=setInterval(function(){c[0].videoWidth&&(clearInterval(s),a.width=c[0].videoWidth,a.height=c[0].videoHeight,c.remove(),n.resolve(a))},20);break;case"iframe":"vimeo"==a.provider&&jQuery.ajax({type:"GET",url:"//vimeo.com/api/oembed.json?url="+encodeURI(a.url),jsonp:"callback",dataType:"jsonp",success:function(e){a.width=e.width,a.height=e.height,n.resolve(a)}}).fail(function(){n.resolve(a)}),"youtube"==a.provider&&jQuery.ajax({type:"GET",url:"//query.yahooapis.com/v1/public/yql",data:{q:"select * from json where url ='http://www.youtube.com/oembed?url="+encodeURI(a.url)+"'",format:"json"},dataType:"jsonp",success:function(e){if(e&&e.query&&e.query.results&&e.query.results.json){var t=jQuery(e.query.results.json.html);a.width=t.attr("width"),a.height=t.attr("height")}n.resolve(a)}}).fail(function(){n.resolve(a)});break;default:n.resolve(a)}return o?n.promise:a}}]).factory("httpInterceptor",["$q","UIkit",function(e,t){return{responseError:function(i){var o;return o=i.data&&i.data.message?i.data.message:i.statusText,t.notify(o,"danger"),e.reject(i)}}}]).config(["$httpProvider","$sceProvider",function(e,t){e.interceptors.push("httpInterceptor"),t.enabled(!1)}]),document.addEventListener("DOMContentLoaded",function(){jQuery("body").on("show.uk.modal",function(e){var t=jQuery(e.target);t.hasClass("uk-modal")&&t.data("modal")&&t.addClass("wk-noconflict")})});

!function(t,e){angular.module("widgetkit").service("mediaPicker",["$location","$q","Application",function(t,e,i){function a(t){var e=document.createElement("a");return e.href=t,e}var n=new RegExp("^"+i.baseUrl());return{select:function(i){i=angular.extend({title:"Pick media",multiple:!1,button:{text:"Select"}},i);var r=e.defer();return i.editor?(i=angular.extend({frame:"post"},i),wp.media.editor.open(i.editor,i)):frame=wp.media(i).on("select",function(){var e=frame.state().get("selection").map(function(e){var i=e.toJSON(),r=a(i.url);return r.host==t.host()&&(i.url=r.pathname.replace(n,"").replace(/^\//,"")),i});r.resolve(i.multiple?e:e[0])}).open(),r.promise}}}]),t(function(){t("body").on("click",".widgetkit-editor",function(i){i.preventDefault();var a,n=t(this);a=t(n.data("source")?"#"+n.data("source"):"textarea#content"),e.widgetkit.env.editor(a)}).on("click",".widgetkit-widget button",function(i){i.preventDefault();var a=t(this).nextAll("input"),n=t(this).closest("form").find(".widget-control-save");e.widgetkit.env.init("widget",JSON.parse(a.val()),function(t){a.val(JSON.stringify(t)),n.trigger("click")})}).find("[data-app]").addClass("wrap"),t(".widgetkit-editor[data-source]").each(function(){var e=t(this);t("#"+e.data("source")).addClass("uk-margin-small-top").before(e)}),t(document).on("widget-updated",function(t,e){if(e.is('[id*="_text-"]')){var i=e.find("textarea");i.before('<a href="#" class="button add_media widgetkit-editor" title="Add Widget" data-source="'+i.attr("id")+'"><span></span> Widgetkit</a>').addClass("uk-margin-small-top")}})})}(jQuery,window);

!function(){var t=function(t,e){e=e||t,e.widgets=[],t.data&&t.data.widgets&&(t.search=sessionStorage["widgetkit.widgets.filter"]?JSON.parse(sessionStorage["widgetkit.widgets.filter"]):{name:"",data:{_widget:{name:""}}},t.$watch("search",function(){sessionStorage["widgetkit.widgets.filter"]=JSON.stringify(angular.copy(t.search))}),e.widgets.push({name:"",label:Translator?Translator.trans("All"):"All"}),Object.keys(t.data.widgets).forEach(function(n){e.widgets.push(t.data.widgets[n])}))},e=function(e,n,a,i){var d=this,o=window.localStorage||{};d.viewmode=o["wk.content.viewmode"]||"list",d.include="",t(e,d),d.previewContent=function(t){return e.$emit("wk.preview.content",t).preview||e.data.types[t.type].icon},d.createContent=function(t){e.content=t||{name:"",type:"",data:{_widget:{}}},e.widget=null,d.setView("contentConfig")},d.editContent=function(t,n){var a,i=null,o=e.data.widgets;return t=angular.copy(t),a=t.data._widget,t.id||(angular.extend(t.data,e.data.types[t.type].data),t.id="new"),o[a.name]?(i=angular.copy(o[a.name]),i.data=a.data=angular.extend({},i.settings,a.data),e.content=t,e.widget=i,void d.setView("contentEdit",n)):void d.createContent(t)},d.saveContent=function(){return"new"==e.content.id&&delete e.content.id,i.save({id:e.content.id},{content:e.content},function(t){d.editContent(e.data.content[t.id]=t),a.notify(t.name+" saved.","success")})},d.copyContent=function(t){return t=angular.copy(t),t.id="",t.name+=" (copy)",i.save({id:t.id},{content:t},function(t){e.data.content[t.id]=t,t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget,a.notify(t.name+" copied.","success")})},d.deleteContent=function(t){confirm("Are you sure?")&&i["delete"]({id:t.id},function(){delete e.data.content[t.id]})},d.getWidget=function(t){return e.data.widgets[t.data._widget.name]},d.selectWidget=function(t){var n=e.content.data;n._widget.name!=t.name&&(n._widget.name=t.name,n._widget.data={})},d.setView=function(t,n){d.view=t,n&&(d.include=n),e.$emit("wk.change.view",t),a.init('[data-app="widgetkit"]')},d.setViewMode=function(t){d.viewmode=o["wk.content.viewmode"]=t},d.setView("content")};angular.module("widgetkit").controller("contentCtrl",["$scope","Application","UIkit","Content",function(t,n,a,i){var d=this;t.data=angular.extend({content:i.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)})})},n.config),d.name="contentCtrl",e.call(this,t,n,a,i)}]).controller("pickerCtrl",["$scope","Application","Content","UIkit",function(n,a,i,d){var o=this;n.data=angular.extend({},a.config),n.data.content=i.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)});var e=n.data.content[a.env.attrs.id];e&&"editor"==o.mode&&(o.editContent(e,"content"),o.mode="edit"),a.env.modal.show()}),o.name="pickerCtrl",o.mode=a.env.mode,t(n,o),o.active=function(t){return t.id==a.env.attrs.id},o.update=function(t){a.env.update({id:t.id,name:t.name})},o.cancel=function(){a.env.cancel()},e.call(this,n,a,d,i)}])}();

angular.module("widgetkit").directive("mediaPreview",["mediaInfo",function(e){function i(i){var r=this;r.type=function(){return i.media=e(i.src),i.media.type},r.cleanUrl=function(e){return"string"==typeof e&&(e=e.replace("autoplay=1","autoplay=0")),e}}return{restrict:"E",scope:{src:"@"},controller:["$scope",i],controllerAs:"vm",template:'<div ng-switch="vm.type()">                           <audio ng-switch-when="audio" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></audio>                           <video ng-switch-when="video" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></video>                           <iframe ng-switch-when="iframe" ng-src="{{ vm.cleanUrl(media.src) }}" frameborder="0" allowfullscreen="true" class="uk-responsive-width" width="800" height="600"></iframe>                           <img ng-switch-default ng-src="{{ media.src }}">                       </div>'}}]).directive("autofocus",["$timeout",function(e){var i=[];return{restrict:"A",link:function(r,t){i.push(t),e(function(){i[0][0].focus()})}}}]);

!function(t,e,n){function o(t){var n=e.tinymce.editors[t.attr("id")];return{getContent:function(){return n.getContent()},insertContent:function(t){n.execCommand("mceInsertContent",!1,t)},updateContent:function(t,e,o){var i=this.getContent();i=i.substring(0,e)+t+'<span id="tmp-wkid"></span>'+i.substring(o),n.setContent(i),n.selection.select(n.dom.select("#tmp-wkid")[0],!0),n.selection.collapse(!1),n.dom.remove("tmp-wkid",!1),n.focus()},getCursorPosition:function(){var t=n.selection.getBookmark(0),e="[data-mce-type=bookmark]",o=n.dom.select(e);n.selection.select(o[0]),n.selection.collapse();var i="######cursor######",r='<span id="'+i+'"></span>';n.selection.setContent(r);var s=n.getContent({format:"html"}),a=s.indexOf(r);return n.dom.remove(i,!1),n.selection.moveToBookmark(t),a}}}function i(t){return{getContent:function(){return t.val()},insertContent:function(e){this.updateContent(e,t.prop("selectionStart"),t.prop("selectionEnd"))},updateContent:function(e,n,o){var i=t.val(),r=n+e.length;i=i.substring(0,n)+e+i.substring(o),t.val(i),t[0].setSelectionRange(r,r),t.focus().trigger("change")},getCursorPosition:function(){return t.prop("selectionStart")}}}function r(t){var e=t.next()[0].CodeMirror;return{getContent:function(){return e.getValue()},insertContent:function(t){e.replaceRange(t,e.getCursor()),e.focus()},updateContent:function(t,n,o){e.replaceRange(t,this.translateOffset(n),this.translateOffset(o)),e.focus()},getCursorPosition:function(){return this.translatePosition(e.getCursor())},translatePosition:function(t){return e.getValue().split("\n",t.line).join("").length+t.line+t.ch},translateOffset:function(t){var n=e.getValue().substring(0,t).split("\n");return{line:n.length-1,ch:n[n.length-1].length}}}}function s(t){var n=e.ace.edit(t.parent().attr("id"));return{getContent:function(){return n.getValue()},insertContent:function(t){n.insert(t),n.focus()},updateContent:function(t,e,o){e=this.translateOffset(e),o=this.translateOffset(o);var i=n.getSelectionRange();i.setStart(e.row,e.column),i.setEnd(o.row,o.column),n.getSession().getDocument().replace(i,t),n.focus()},getCursorPosition:function(){return this.translatePosition(n.getSelection().getCursor())},translatePosition:function(t){return this.getContent().split("\n",t.row).join("").length+t.row+t.column},translateOffset:function(t){var e=this.getContent().substring(0,t).split("\n");return{row:e.length-1,column:e[e.length-1].length}}}}function a(e){var n=CKEDITOR.instances[e.attr("id")];return{getContent:function(){return n.getData()},insertContent:function(t){this.updateContent(t,this.getCursorPosition(),this.getCursorPosition())},updateContent:function(t,e,o){var i=n.getData();i=i.substring(0,e)+t+i.substring(o),n.setData(i)},getCursorPosition:function(){return"source"==n.mode?t(n.textarea.$).prop("selectionStart"):this.getCursorPositionInWYSIWYG()},getCursorPositionInWYSIWYG:function(){var t=n.getSelection().createBookmarks(),e="######cursor######",o='<span id="'+e+'">&nbsp;</span>',i=CKEDITOR.dom.element.createFromHtml(o);i.insertBefore(t[0].startNode);var r=this.getContent(),s=r.indexOf(o);return i.remove(),n.getSelection().selectBookmarks(t),s}}}var u={init:function(e,o,i){var r=t(this.tmpl).appendTo("body");this.mode=e,this.attrs=o,this.cb=i,this.modal=n.modal(r),this.modal.on("hide.uk.modal",function(){r.remove()}),n.domObserve(r,function(){var t=this;n.domObservers.forEach(function(e){e(t)})}),angular.bootstrap(r,["widgetkit"])},editor:function(t){var n;n=(e.WFEditor||e.JContentEditor||e.tinyMCE)&&!t.is(":visible")?new o(t):e.CodeMirror&&t.next()[0]&&t.next()[0].CodeMirror?new r(t):e.ace?new s(t):e.CKEDITOR?new a(t):new i(t);for(var u,l,g=n.getContent(),d=n.getCursorPosition(),f=/\[widgetkit([^\]]*)\]/gi;l=f.exec(g);)if(l.index<=d&&f.lastIndex>d){u=l[0];break}this.init("editor",c.parse("widgetkit",u).attrs,function(t){var e=new c({tag:"widgetkit",attrs:t}).string();u?n.updateContent(e,l.index,f.lastIndex):n.insertContent(e)})},update:function(t){this.cb(t),this.modal.hide()},cancel:function(){this.modal.hide()},tmpl:'<div class="uk-modal"><div style="width: 1000px;" class="uk-modal-dialog" ng-include="\'picker\'"></div></div>'},c=function(e){t.extend(this,{tag:"",attrs:{},type:"single",content:""},e)};t.extend(c,{parse:function(t,e){var n,o=this.regexp(t).exec(e),i={tag:t};return o&&(n=o[4]?"self-closing":o[6]?"closed":"single",i={tag:o[2],attrs:this.attrs(o[3]),type:n,content:o[5]}),new c(i)},attrs:function(t){var e,n=/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/g,o={};for(t=t.replace(/[\u00a0\u200b]/g," ");e=n.exec(t);)e[1]?o[e[1].toLowerCase()]=e[2]:e[3]?o[e[3].toLowerCase()]=e[4]:!e[5]||"true"!==e[6]&&"1"!==e[6]?!e[5]||"false"!==e[6]&&"0"!==e[6]?e[5]?o[e[5].toLowerCase()]=e[6]:e[7]?o[e[7]]=!0:e[8]&&(o[e[8]]=!0):o[e[5].toLowerCase()]=!1:o[e[5].toLowerCase()]=!0;return o},regexp:function(t){return new RegExp("\\[(\\[?)("+t+")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)","g")}}),t.extend(c.prototype,{string:function(){var e="["+this.tag;return t.each(this.attrs,function(t,n){"boolean"==typeof n?e+=" "+t+"="+(n?1:0):""!==n&&(e+=" "+t+'="'+n+'"')}),"single"===this.type?e+"]":"self-closing"===this.type?e+" /]":(e+="]",this.content&&(e+=this.content),e+"[/"+this.tag+"]")}}),t(function(){t.extend(e.widgetkit,{env:u,shortcode:c})})}(jQuery,window,window.UIkit2||window.UIkit2wk);

angular.module("widgetkit").controller("customCtrl",["$scope","$timeout","UIkit","mediaInfo","mediaPicker","Fields","Application","Translator",function(e,t,i,n,a,o,d,l){e.content.data._fields||(e.content.data._fields=[]);var s,r=this,c=e.content.data._fields;e.content.data.items&&e.content.data.items.length||(e.content.data.items=[{media:""}]),e.content.data.hasOwnProperty("parse_shortcodes")||(e.content.data.parse_shortcodes=1),s=e.content.data.items,e.item=s[0],e.extrafields=c,r.corefields=d.config.types.custom.fields,r.fields=o.fields(),e.tinyMCE=window.tinyMCE||!1,r.previewItem=function(e){var t=e.options&&e.options.media&&e.options.media.poster;return n(t||e.media).image},r.addItem=function(t){e.item=t||{media:""},s.push(e.item)},r.importItems=function(){a.select({multiple:!0}).then(function(t){!t.length||1!=s.length||e.item.title&&e.item.media&&e.item.content||(s.length=0),angular.forEach(t,function(e){e.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}),r.addItem({title:e.title,media:e.url,width:e.width,height:e.height})})})},r.editItem=function(t){e.item=t},r.deleteItem=function(t){s.splice(s.indexOf(t),1),e.item=s[0]},r.addField=function(e){return e=e||{type:"text",name:"field-x",label:"Field X"},r.corefields[e.name]&&(e.type=r.corefields[e.name].type,e.label=r.corefields[e.name].label),r.hasField(e.name)?void alert('Field name "'+e.name+'" is already in use.'):(s.forEach(function(t){t[e.name]||(t[e.name]="")}),void c.push(angular.copy(e)))},r.deleteField=function(e){confirm(l.trans("Are you sure you want to delete this field?"))&&(s.forEach(function(t){t[e.name]&&delete t[e.name]}),c.splice(c.indexOf(e),1))},r.hasField=function(e){if(["title","media","link"].indexOf(e)>-1)return!0;for(var t=0;t<c.length;t++)if(c[t].name==e)return!0;return!1},r.toggleEditFields=function(){r.editfields=!r.editfields,r.editfields||setTimeout(function(){window.dispatchEvent(new Event("resize"))},150),r.custom={field:{}},r.addCustomField=!1},r.getFieldOptions=function(e,t){var i={},n=r.corefields[e.name];return n&&n.options&&(i=angular.extend(i,n.options)),JSON.stringify(i)},e.$watch("content",function(t){var i=s.indexOf(e.item);s=t.data.items,e.item=s[i]}),i.$doc.trigger("ready.uk.dom"),i.$doc.on("change.uk.sortable",function(e,i,n){n&&void 0!==n&&(n=angular.element(n),t(function(){"js-content-items"==i.element[0].id&&s.splice(n.index(),0,s.splice(s.indexOf(n.scope().item),1)[0]),"js-fields-items"==i.element[0].id&&c.splice(n.index(),0,c.splice(c.indexOf(n.scope().field),1)[0])}))}),angular.isArray(e.widget.fields)&&e.widget.fields.forEach(function(e){e&&e.name&&!r.hasField(e.name)&&r.addField(e)}),i.init()}]).run(["$rootScope","mediaInfo",function(e,t){e.$on("wk.preview.content",function(e,i){if("custom"==i.type&&i.data.items.length){var n=i.data.items[0],a=n.options&&n.options.media&&n.options.media.poster;e.preview=t(a||n.media).image.replace(/preview(-.+\.svg)$/g,"content$1")}})}]);

angular.module("widgetkit").controller("folderCtrl",["$scope",function(e){}]).run(["$rootScope","mediaInfo",function(e,r){e.$on("wk.preview.content",function(e,o){if("folder"==o.type&&o.data.prepared){var n,t=JSON.parse(o.data.prepared);t.length>0&&(n=t[0].media,e.preview=r(n).image)}})}]);

angular.module("widgetkit").controller("twitterCtrl",["$scope","$element","Application","$http",function(t,n,i,e){var o,c=this;c.connected=n[0].getAttribute("data-status"),c.loading=!1,c.openPopup=function(t){o=window.open(t,"","width=800,height=500")},t.$watch("twitter.pin",function(t){if(t&&!(t.length<7)){c.loading=!0;var n=e.post(i.url("twitter_auth"),{pin:t});n.success(function(){c.connected=!0,c.loading=!1,c.pin="",o&&o.close()}),n.error(function(){c.loading=!1})}}),c.disconnect=function(){c.loading=!0;var t=e["delete"](i.url("twitter_auth"));t.success(function(){c.connected=!1,c.loading=!1}),t.error(function(){c.loading=!1})}}]);

angular.module("widgetkit").controller("woocommerceCtrl",["$scope","Application",function(n,a){n.content.data.mapping||(n.content.data.mapping=[]);var t=this,i=n.content.data.mapping;t.mapping=i,angular.forEach(i,function(n,a){angular.isArray(n)&&(i[a]={})}),t.addMap=function(){i.push({})},t.deleteMap=function(n){i.splice(i.indexOf(n),1)}}]);

angular.module("widgetkit").controller("wordpressCtrl",["$scope",function(n){n.content.data.mapping||(n.content.data.mapping=[]);var a=this,t=n.content.data.mapping;a.mapping=t,angular.forEach(t,function(n,a){angular.isArray(n)&&(t[a]={})}),a.addMap=function(){t.push({})},a.deleteMap=function(n){t.splice(t.indexOf(n),1)}}]);

