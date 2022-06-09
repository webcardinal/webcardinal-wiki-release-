import{r as t,c as e,h as s}from"./p-bb51835b.js";import{H as i}from"./p-5e0464e4.js";const o=class{constructor(s){t(this,s),this.windowAction=e(this,"windowAction",7),this.seed=void 0,this.landingPath="/",this.componentInitialized=!1}connectedCallback(){navigator.serviceWorker&&navigator.serviceWorker.addEventListener("message",this.getSWOnMessageHandler())}disconnectedCallback(){navigator.serviceWorker&&navigator.serviceWorker.removeEventListener("message",this.getSWOnMessageHandler())}componentShouldUpdate(t,e,s){return t!==e&&("digestKeySsiHex"===s||"parsedParams"===s)&&(window.document.removeEventListener(e,this.eventHandler),window.document.addEventListener(t,this.eventHandler),!0)}componentWillLoad(){if(this.element.isConnected)return new Promise((t=>{this.componentInitialized=!0,this.loadApp(t)}))}componentDidLoad(){console.log("#### Trying to register ssapp reference"),this.eventHandler=this.ssappEventHandler.bind(this),window.document.addEventListener(this.digestKeySsiHex,this.eventHandler),window.document.addEventListener(this.parsedParams,this.eventHandler),console.log("### Trying to add listener to iframe document");const t=this;this.iFrame.addEventListener("load",(()=>{t.iFrame.contentWindow.addEventListener("ssapp-action",t.handleActionFromWindow.bind(t))}))}handleActionFromWindow(t){t.preventDefault(),t.stopImmediatePropagation();const{detail:e}=t;this.windowAction.emit(e)}loadApp(t){if(this.seed&&this.componentInitialized&&(this.digestKeySsiHex=this.digestMessage(this.seed),"function"==typeof t&&t(),this.params))try{this.parsedParams=Object.assign({},this.params)}catch(t){console.log("Attribute called 'params' could not be parsed.")}}getWindows(){let t=window,e=t.parent;for(;t!==e;){t=e;try{t.parent.document&&(e=t.parent)}catch(t){}}return{currentWindow:t,parentWindow:e}}sendLoadingProgress(t,e){const{parentWindow:s}=this.getWindows();s.document.dispatchEvent(new CustomEvent("ssapp:loading:progress",{detail:{progress:t,status:e}}))}ssappEventHandler(t){const e=t.detail||{};if("seed"!==e.query){if("completed"===e.status){const t=()=>{this.sendLoadingProgress(100),this.iFrame.removeEventListener("load",t)};this.iFrame.addEventListener("load",t),this.iFrame.contentWindow.location.reload()}}else this.iFrame.contentWindow.document.dispatchEvent(new CustomEvent(this.digestKeySsiHex,{detail:{seed:this.seed}}))}getSWOnMessageHandler(){return this.onServiceWorkerMessageHandler||(this.onServiceWorkerMessageHandler=t=>{t.data&&"seed"===t.data.query&&t.data.identity===this.digestKeySsiHex&&t.source.postMessage({seed:this.seed})}),this.onServiceWorkerMessageHandler}digestMessage(t){return require("opendsu").loadApi("crypto").sha256(t)}getQueryParams(){let t="";return this.parsedParams&&(t+=Object.keys(this.parsedParams).map((t=>t+"="+this.parsedParams[t])).join("&")),t?"?"+encodeURI(t):""}getIFrameSrc(){let t;const{currentWindow:e}=this.getWindows();t=e.location.origin+e.location.pathname,t=t.replace("index.html",""),"/"!==t[t.length-1]&&(t+="/");const s=window.$$;return t+"iframe/"+(s.SSAPP_CONTEXT&&s.SSAPP_CONTEXT.BASE_URL&&s.SSAPP_CONTEXT.SEED?this.seed:this.digestKeySsiHex)+this.getQueryParams()}render(){if(!this.seed)return;const t=this.getIFrameSrc();return console.log("Loading sssap in: "+t),s("iframe",{"landing-page":this.landingPath,frameborder:"0",style:{overflow:"hidden",height:"100%",width:"100%"},src:t,ref:t=>this.iFrame=t})}static get watchers(){return{seed:["loadApp"],params:["loadApp"],landingPath:["loadApp"]}}};(function(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);n>3&&r&&Object.defineProperty(e,s,r)})([i()],o.prototype,"element",void 0),o.style={default:":host{display:block}"};export{o as webc_ssapp}