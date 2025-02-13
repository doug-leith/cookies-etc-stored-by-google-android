(function(_ds){var window=this;var oEa=function(a){a.eventHandler.listen(a,"DropdownItemClicked",b=>{nEa(a,b)})},nEa=async function(a,b){const c=b.getBrowserEvent().detail.id;b=a.querySelector(".devsite-dialog-contents");const d=a.querySelector(`#date-section-${c}`);let e,f,g,h;const k=((g=d==null?void 0:(e=d.getBoundingClientRect())==null?void 0:e.top)!=null?g:0)-((h=b==null?void 0:(f=b.getBoundingClientRect())==null?void 0:f.top)!=null?h:0);d&&b&&b.scrollBy({top:k,behavior:"smooth"});let l,m;a.Nn=(m=(l=a.np.find(n=>n.id===c))==
null?void 0:l.title)!=null?m:"";a.g.hb(a.Nn)},qEa=function(a){const b=new IntersectionObserver(c=>{c.forEach(d=>{pEa(a,d.isIntersecting,d)})},{root:a.querySelector(".devsite-dialog-contents")});a.querySelectorAll(".release-note-date-section .release-note").forEach(c=>{b.observe(c)})},pEa=function(a,b,c){let d;const e={id:(d=c.target.getAttribute("id"))!=null?d:"",type:Number(c.target.getAttribute("type"))};if(b){let f;a.Vk=[...((f=a.Vk)!=null?f:[]),e]}else a.Vk=[...a.Vk.filter(f=>f.id!==e.id)]},rEa=
function(a){switch(a){case 4:return{title:"Feature",color:"green"};case 8:return{title:"Announcement",color:"yellow"};case 2:return{title:"Change",color:"yellow"};case 9:return{title:"Libraries",color:"blue"};case 3:return{title:"Fixed",color:"blue"};case 1:return{title:"Breaking",color:"red"};case 5:return{title:"Deprecated",color:"red"};case 6:return{title:"Issue",color:"red"};case 7:return{title:"Security",color:"orange"};default:return{title:"Unspecified",color:"grey"}}},JX=function(a,b){b=rEa(b);
return(0,_ds.R)` <span
      class="release-note-type-chip
          ${a} ${b.color}">
      ${b.title}
    </span>`},sEa=function(a,b){const c=b.replace(/,?\s/g,"").toLowerCase();let d;return(0,_ds.R)`
      <div class="release-note-date-section" id="date-section-${c}">
        <h3 class="release-note-date-header">${b}</h3>
        ${[...((d=a.releaseNotes.get(b))!=null?d:[])].map((e,f)=>{f=`${c}-${f}`;var g;(g=_ds.vi(e,_ds.Sea,4))?(g=_ds.Ci(g,2),g=g===null||g===void 0?null:_ds.nf(g)):g=null;return(0,_ds.R)` <div
        class="release-note"
        id="${f}"
        type="${_ds.Ki(e,2)}">
        ${JX("large",_ds.Ki(e,2))}
        <div class="release-note-content">
          ${g?(0,_ds.R)`${(0,_ds.TC)(g)}`:(0,_ds.R)`<p>${_ds.z(e,1)}</p>`}
        </div>
      </div>`})}
      </div>
    `},KX=class extends _ds.zv{constructor(){super(["devsite-dialog","devsite-dropdown-list"]);this.eventHandler=new _ds.E;this.releaseNotes=new Map;this.hideFooter=!1;this.Nn="";this.np=[];this.Vk=[];this.g=new _ds.Mn(async a=>{this.Ha({category:"Site-Wide Custom Events",action:"release notes: view old note",label:`${await _ds.gs(_ds.C().href)} : ${a}`})},100)}ib(){return this}async connectedCallback(){super.connectedCallback();this.Nn=[...this.releaseNotes.keys()][0];this.np=[...this.releaseNotes.keys()].map(a=>
({id:a.replace(/,?\s/g,"").toLowerCase(),title:a}));oEa(this)}disconnectedCallback(){super.disconnectedCallback()}h(a){super.h(a);qEa(this)}render(){return(0,_ds.R)`
      <div class="devsite-dialog-header">
        <div>
          <h3 class="no-link title">
            ${"Release Notes"}
          </h3>
          <div class="chip-wrapper">
            ${[...(new Set(this.Vk.map(a=>a.type)))].map(a=>JX("small",a))}
          </div>
        </div>
        <devsite-dropdown-list
            .listItems=${this.np}>
          <p slot="toggle" class="selected-date-toggle">${this.Nn}</p>
        </devsite-dropdown-list>
      </div>
      <div class="devsite-dialog-contents">
        ${[...this.releaseNotes.keys()].map(a=>sEa(this,a))}
      </div>
      ${_ds.I(this.hideFooter,()=>"",()=>(0,_ds.R)`
              <div class="devsite-dialog-footer devsite-dialog-buttons">
                <button class="button devsite-dialog-close">
                  Close
                </button>
              </div>
            `)}
      `}};_ds.w([_ds.G({type:Map}),_ds.x("design:type",Object)],KX.prototype,"releaseNotes",void 0);_ds.w([_ds.G({type:Boolean}),_ds.x("design:type",Object)],KX.prototype,"hideFooter",void 0);_ds.w([_ds.H(),_ds.x("design:type",Object)],KX.prototype,"Nn",void 0);_ds.w([_ds.H(),_ds.x("design:type",Array)],KX.prototype,"np",void 0);_ds.w([_ds.H(),_ds.x("design:type",Array)],KX.prototype,"Vk",void 0);try{customElements.define("devsite-view-release-notes-dialog",KX)}catch(a){console.warn("devsite.app.customElement.DevsiteViewReleaseNotesDialog",a)};})(_ds_www);
