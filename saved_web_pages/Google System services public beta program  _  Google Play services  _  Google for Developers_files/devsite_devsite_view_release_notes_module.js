(function(_ds){var window=this;var LX=class extends _ds.zv{constructor(){super(["devsite-dialog","devsite-dropdown-list","devsite-view-release-notes-dialog"]);this.vw=!1;this.releaseNotes=new Map;this.g=null;this.path="";this.label="Release Notes";this.disableAutoOpen=!1}ib(){return this}async connectedCallback(){super.connectedCallback();try{this.path||(this.path=await _ds.gs(_ds.C().href)),this.releaseNotes=await _ds.du(this.path)}catch(a){}this.releaseNotes.size===0?this.remove():(this.vw=!0,this.disableAutoOpen||location.hash!==
"#release__notes"||this.ea())}disconnectedCallback(){super.disconnectedCallback();let a;(a=this.g)==null||a.remove();this.g=null}ea(a){a&&(a.preventDefault(),a.stopPropagation());let b;(b=this.g)==null||b.remove();this.g=document.createElement("devsite-dialog");this.g.classList.add("devsite-view-release-notes-dialog-container");_ds.$u((0,_ds.R)`
      <devsite-view-release-notes-dialog
        .releaseNotes=${this.releaseNotes}>
      </devsite-view-release-notes-dialog>
    `,this.g);document.body.appendChild(this.g);this.g.open=!0;this.Ha({category:"Site-Wide Custom Events",action:"release notes: view note",label:`${this.path}`})}render(){if(!this.vw)return delete this.dataset.shown,(0,_ds.R)``;this.dataset.shown="";return(0,_ds.R)`
      <button class="view-notes-button" @click="${this.ea}">
        ${this.label}
      </button>
    `}};_ds.w([_ds.H(),_ds.x("design:type",Object)],LX.prototype,"vw",void 0);_ds.w([_ds.G({type:String}),_ds.x("design:type",Object)],LX.prototype,"path",void 0);_ds.w([_ds.G({type:String}),_ds.x("design:type",Object)],LX.prototype,"label",void 0);_ds.w([_ds.G({type:Boolean,Ia:"disable-auto-open"}),_ds.x("design:type",Object)],LX.prototype,"disableAutoOpen",void 0);try{customElements.define("devsite-view-release-notes",LX)}catch(a){console.warn("devsite.app.customElement.DevsiteViewReleaseNotes",a)};})(_ds_www);
