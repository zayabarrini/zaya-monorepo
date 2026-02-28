import{p as ce,k as re,i as ue,B as z,t as w,a as u,b as me,s as a,c as t,f as m,r as e,z as Y,F as B,j as i,L as ve,h as s,w as v,e as pe,x as we,u as oe,M as xe,A as _e,D as Se,I as Te,$ as Ae}from"../chunks/-0HexQLS.js";var Ne=m('<div class="legend-item svelte-oapwal"><span> </span> <span class="legend-name svelte-oapwal"> </span> <span class="legend-translit svelte-oapwal"> </span></div>'),ze=m('<th class="svelte-oapwal"><div class="column-header svelte-oapwal"><span> </span> <span class="header-name svelte-oapwal"> </span></div></th>'),Be=m('<span class="empty-cell svelte-oapwal">—</span>'),Le=m('<div class="conjugation-content svelte-oapwal"><span class="arabic-form svelte-oapwal"> </span> <span class="transliteration svelte-oapwal"> </span></div>'),Ie=m('<td class="conjugation-cell svelte-oapwal"><!></td>'),Fe=m('<tr class="svelte-oapwal"><td class="sticky-col consonant-cell svelte-oapwal"><span class="consonant-symbol svelte-oapwal"> </span> <span class="consonant-name svelte-oapwal"> </span></td><!></tr>'),Me=m(`<div class="arabic-conjugation-table svelte-oapwal"><header class="table-header svelte-oapwal"><h1 class="svelte-oapwal"> </h1> <p class="subtitle svelte-oapwal">Complete conjugation of Arabic consonants with all
      diacritics</p></header> <section class="legend-section svelte-oapwal"><h2 class="svelte-oapwal">🔤 Diacritic Key</h2> <div class="legend-grid svelte-oapwal"></div></section> <div class="table-container svelte-oapwal"><table class="svelte-oapwal"><thead><tr class="svelte-oapwal"><th class="sticky-col svelte-oapwal">Consonant</th><!></tr></thead><tbody class="svelte-oapwal"></tbody></table></div> <footer class="table-footer svelte-oapwal"><div class="notes-grid svelte-oapwal"><div class="note-card svelte-oapwal"><h3 class="svelte-oapwal">📝 How to Read</h3> <p class="svelte-oapwal">Each cell shows the consonant with its diacritic,
          followed by the transliteration in parentheses.</p></div> <div class="note-card svelte-oapwal"><h3 class="svelte-oapwal">🎯 Special Cases</h3> <p class="svelte-oapwal"><strong>ء (Hamza)</strong> combines with alif for long
          vowels: آ (ʾā)</p> <p class="svelte-oapwal"><strong>و (Wāw)</strong> and <strong>ي (Yāʾ)</strong> have limited tanwin forms</p></div> <div class="note-card svelte-oapwal"><h3 class="svelte-oapwal">✨ Diacritic Classes</h3> <p class="svelte-oapwal"><span class="vowel-symbol svelte-oapwal">ُ</span> uses the <code class="svelte-oapwal">.vowel-symbol</code> class for proper rendering</p></div></div></footer></div>`);function We(Z,F){ce(F,!1);let q=re(F,"title",8,"الأبجدية - Arabic Alphabet Conjugation");const U=[{letter:"ب",name:"Bāʾ (B)"},{letter:"ت",name:"Tāʾ (T)"},{letter:"ث",name:"Thāʾ (Th)"},{letter:"ج",name:"Jīm (J)"},{letter:"ح",name:"Ḥāʾ (Ḥ)"},{letter:"خ",name:"Khāʾ (Kh)"},{letter:"د",name:"Dāl (D)"},{letter:"ذ",name:"Dhāl (Dh)"},{letter:"ر",name:"Rāʾ (R)"},{letter:"ز",name:"Zāy (Z)"},{letter:"س",name:"Sīn (S)"},{letter:"ش",name:"Shīn (Sh)"},{letter:"ص",name:"Ṣād (Ṣ)"},{letter:"ض",name:"Ḍād (Ḍ)"},{letter:"ط",name:"Ṭāʾ (Ṭ)"},{letter:"ظ",name:"Ẓāʾ (Ẓ)"},{letter:"ع",name:"ʿAyn (ʿ)"},{letter:"غ",name:"Ghayn (Gh)"},{letter:"ف",name:"Fāʾ (F)"},{letter:"ق",name:"Qāf (Q)"},{letter:"ك",name:"Kāf (K)"},{letter:"ل",name:"Lām (L)"},{letter:"م",name:"Mīm (M)"},{letter:"ن",name:"Nūn (N)"},{letter:"ه",name:"Hāʾ (H)"},{letter:"و",name:"Wāw (W)"},{letter:"ي",name:"Yāʾ (Y)"},{letter:"ء",name:"Hamza (ʾ)"}],E=[{symbol:"َ",name:"Fatḥa",translit:"a",class:"fatha"},{symbol:"ُ",name:"Ḍamma",translit:"u",class:"vowel-symbol"},{symbol:"ِ",name:"Kasra",translit:"i",class:"kasra"},{symbol:"ً",name:"Tanwin Fatḥ",translit:"an",class:"tanwin"},{symbol:"ٌ",name:"Tanwin Ḍamm",translit:"un",class:"tanwin"},{symbol:"ٍ",name:"Tanwin Kasr",translit:"in",class:"tanwin"},{symbol:"َا",name:"Ā long",translit:"ā",class:"long-vowel"},{symbol:"ُو",name:"Ū long",translit:"ū",class:"long-vowel"},{symbol:"ِي",name:"Ī long",translit:"ī",class:"long-vowel"},{symbol:"ْ",name:"Sukūn",translit:"",class:"sukun"},{symbol:"ّ",name:"Shadda",translit:"double",class:"shadda"}];function J(M,n){const c=M.letter,h=E[n];if(c==="ء"&&n>=3&&n<=5||c==="و"&&n===8||c==="ي"&&n===7)return"-";if(c==="و"&&n===2)return"وِ (Wi)";if(c==="ي"&&n===1)return"يُ (Yu)";if(c==="ء"){if(n===0)return"أَ (ʾa) / ءَ";if(n===1)return"أُ (ʾu) / ءُ";if(n===2)return"إِ (ʾi) / ءِ";if(n===6)return"آ (ʾā)";if(n===9)return"ءْ (ʾ)";if(n===10)return"ءّ (ʾʾ)"}const x=c+h.symbol;let _="";const A={ب:"B",ت:"T",ث:"Th",ج:"J",ح:"Ḥ",خ:"Kh",د:"D",ذ:"Dh",ر:"R",ز:"Z",س:"S",ش:"Sh",ص:"Ṣ",ض:"Ḍ",ط:"Ṭ",ظ:"Ẓ",ع:"ʿ",غ:"Gh",ف:"F",ق:"Q",ك:"K",ل:"L",م:"M",ن:"N",ه:"H",و:"W",ي:"Y",ء:"ʾ"}[c]||c;if(n===10)_=`${A}${A}`;else if(n===9)_=A;else if(n>=6&&n<=8){const g=h.translit;_=`${A}${g}`}else{const g=h.translit;_=`${A}${g}`}return`${x} (${_})`}ue();var C=Me(),$=t(C),P=t($),Q=t(P,!0);e(P),Y(2),e($);var j=a($,2),ee=a(t(j),2);z(ee,5,()=>E,B,(M,n)=>{var c=Ne(),h=t(c),x=t(h,!0);e(h);var _=a(h,2),I=t(_,!0);e(_);var A=a(_,2),g=t(A,!0);e(A),e(c),w(()=>{ve(h,1,`legend-symbol ${s(n),v(()=>s(n).class)??""}`,"svelte-oapwal"),i(x,(s(n),v(()=>s(n).symbol))),i(I,(s(n),v(()=>s(n).name))),i(g,(s(n),v(()=>s(n).translit)))}),u(M,c)}),e(ee),e(j);var D=a(j,2),H=t(D),K=t(H),V=t(K),te=a(t(V));z(te,1,()=>E,B,(M,n)=>{var c=ze(),h=t(c),x=t(h),_=t(x,!0);e(x);var I=a(x,2),A=t(I,!0);e(I),e(h),e(c),w(()=>{ve(x,1,`header-symbol ${s(n),v(()=>s(n).class)??""}`,"svelte-oapwal"),i(_,(s(n),v(()=>s(n).symbol))),i(A,(s(n),v(()=>s(n).name)))}),u(M,c)}),e(V),e(K);var G=a(K);z(G,5,()=>U,B,(M,n)=>{var c=Fe(),h=t(c),x=t(h),_=t(x,!0);e(x);var I=a(x,2),A=t(I,!0);e(I),e(h);var g=a(h);z(g,1,()=>E,B,(r,p,b)=>{const y=we(()=>(s(n),v(()=>J(s(n),b))));var k=Ie(),N=t(k);{var L=S=>{var d=Be();u(S,d)},W=S=>{var d=Le(),l=t(d),o=t(l,!0);e(l);var f=a(l,2),T=t(f,!0);e(f),e(d),w((O,R)=>{i(o,O),i(T,R)},[()=>(oe(s(y)),v(()=>s(y).split(" ")[0])),()=>(oe(s(y)),v(()=>s(y).split(" ")[1]))]),u(S,d)};pe(N,S=>{s(y)==="-"?S(L):S(W,!1)})}e(k),u(r,k)}),e(c),w(()=>{i(_,(s(n),v(()=>s(n).letter))),i(A,(s(n),v(()=>s(n).name)))}),u(M,c)}),e(G),e(H),e(D),Y(2),e(C),w(()=>i(Q,q())),u(Z,C),me()}var Ee=m('<div class="symbol-card svelte-b85ynd"><div class="symbol-display svelte-b85ynd"><span> </span></div> <div class="symbol-name svelte-b85ynd"> </div></div>'),De=m('<div class="hamza-item svelte-b85ynd"><span class="hamza-symbol svelte-b85ynd"> </span> <span class="hamza-description svelte-b85ynd"> </span></div>'),He=m('<div class="table-row svelte-b85ynd"><span class="letter-cell large svelte-b85ynd"> </span> <span class="name-cell svelte-b85ynd"> </span> <span class="form-cell svelte-b85ynd"> </span> <span class="form-cell svelte-b85ynd"> </span> <span class="example-cell svelte-b85ynd"> </span></div>'),Ke=m('<div class="example-card svelte-b85ynd"><div class="example-word svelte-b85ynd"> </div> <div class="example-details svelte-b85ynd"><span class="translit svelte-b85ynd"> </span> <span class="meaning svelte-b85ynd"> </span> <span class="note svelte-b85ynd"> </span></div></div>'),Re=m('<tr class="svelte-b85ynd"><td class="letter-name svelte-b85ynd"> </td><td class="arabic-form svelte-b85ynd"> </td><td class="arabic-form svelte-b85ynd"> </td><td class="arabic-form svelte-b85ynd"> </td><td class="arabic-form svelte-b85ynd"> </td></tr>'),Ce=m(`<div class="arabic-guide svelte-b85ynd"><header class="guide-header svelte-b85ynd"><h1 class="svelte-b85ynd"> </h1> <p class="subtitle svelte-b85ynd">A comprehensive guide to Arabic script, diacritics,
      and letter forms</p></header> <section class="symbols-section"><h2 class="svelte-b85ynd">✨ Arabic Diacritics & Symbols</h2> <p class="section-intro svelte-b85ynd">Using the <code class="inline-code svelte-b85ynd">.vowel-symbol</code> class for proper rendering</p> <div class="symbols-grid svelte-b85ynd"></div> <div class="example-box svelte-b85ynd"><p class="example-title">Example rendering:</p> <p class="arabic-example svelte-b85ynd">ب<span class="vowel-symbol svelte-b85ynd">َ</span>ي<span class="vowel-symbol svelte-b85ynd">ْ</span>ت <span class="example-translit svelte-b85ynd">(bayt)</span> ← Notice the <span class="vowel-symbol svelte-b85ynd">ُ</span> (ḍamma)
        and other marks</p></div></section> <section class="hamza-section"><h2 class="svelte-b85ynd">📍 Hamza Placement Types</h2> <div class="hamza-container svelte-b85ynd"><div class="hamza-list svelte-b85ynd"></div></div></section> <section class="non-connectors"><h2 class="svelte-b85ynd">🔹 Non-Connecting Letters (الحروف المتكبرة)</h2> <p class="section-note svelte-b85ynd">These letters connect to the previous letter but NEVER
      to the following letter</p> <div class="non-connector-table svelte-b85ynd"><div class="table-header svelte-b85ynd"><span>Letter</span> <span>Name</span> <span>Isolated</span> <span>Final</span> <span>Example</span></div> <!></div> <div class="mnemonic-box svelte-b85ynd"><p><strong>Mnemonic:</strong> <span class="arabic-text svelte-b85ynd">ا د ذ ر ز و</span> — Letters
        that "fall below the line"</p></div></section> <section class="examples-section"><h2 class="svelte-b85ynd">🔍 Visualizing the "Break"</h2> <div class="examples-grid svelte-b85ynd"></div></section> <section class="connecting-letters"><h2 class="svelte-b85ynd">📊 Letters That Change Shape</h2> <p class="section-note svelte-b85ynd">Arabic letters have up to four forms: isolated,
      initial, medial, and final</p> <div class="table-container svelte-b85ynd"><table class="svelte-b85ynd"><thead><tr class="svelte-b85ynd"><th class="svelte-b85ynd">Letter Name</th><th class="svelte-b85ynd">Isolated</th><th class="svelte-b85ynd">Initial</th><th class="svelte-b85ynd">Medial</th><th class="svelte-b85ynd">Final</th></tr></thead><tbody></tbody></table></div></section> <footer class="guide-footer svelte-b85ynd"><p>✨ In Arabic calligraphy, non-connecting letters are
      "proud" because they stand tall and don't join hands
      with the next letter!</p> <p class="small svelte-b85ynd">The <span class="vowel-symbol svelte-b85ynd">ُ</span> (ḍamma) and other
      diacritics are rendered with the vowel-symbol class</p></footer></div>`);function $e(Z,F){let q=re(F,"title",8,"Arabic Script Guide");const U=[{letter:"ا",name:"Alif",isolated:"ا",final:"ـا",example:"بَاب (bāb - door)"},{letter:"د",name:"Dāl",isolated:"د",final:"ـد",example:"مَدْرَسَة (madrasa - school)"},{letter:"ذ",name:"Dhāl",isolated:"ذ",final:"ـذ",example:"بِذَكَاء (bidhakāʾ - with intelligence)"},{letter:"ر",name:"Rāʾ",isolated:"ر",final:"ـر",example:"شُرْطَة (shurṭa - police)"},{letter:"ز",name:"Zayn",isolated:"ز",final:"ـز",example:"مِزْيَة (mizya - advantage)"},{letter:"و",name:"Wāw",isolated:"و",final:"ـو",example:"مَوْعِد (mawʿid - appointment)"}],E=[{name:"Bāʾ",isolated:"ب",initial:"بـ",medial:"ـبـ",final:"ـب"},{name:"Tāʾ",isolated:"ت",initial:"تـ",medial:"ـتـ",final:"ـت"},{name:"Thāʾ",isolated:"ث",initial:"ثـ",medial:"ـثـ",final:"ـث"},{name:"Jīm",isolated:"ج",initial:"جـ",medial:"ـجـ",final:"ـج"},{name:"Ḥāʾ",isolated:"ح",initial:"حـ",medial:"ـحـ",final:"ـح"},{name:"Khāʾ",isolated:"خ",initial:"خـ",medial:"ـخـ",final:"ـخ"},{name:"Sīn",isolated:"س",initial:"سـ",medial:"ـسـ",final:"ـس"},{name:"Shīn",isolated:"ش",initial:"شـ",medial:"ـشـ",final:"ـش"},{name:"Ṣād",isolated:"ص",initial:"صـ",medial:"ـصـ",final:"ـص"},{name:"Ḍād",isolated:"ض",initial:"ضـ",medial:"ـضـ",final:"ـض"},{name:"Ṭāʾ",isolated:"ط",initial:"طـ",medial:"ـطـ",final:"ـط"},{name:"Ẓāʾ",isolated:"ظ",initial:"ظـ",medial:"ـظـ",final:"ـظ"},{name:"ʿAyn",isolated:"ع",initial:"عـ",medial:"ـعـ",final:"ـع"},{name:"Ghayn",isolated:"غ",initial:"غـ",medial:"ـغـ",final:"ـغ"},{name:"Fāʾ",isolated:"ف",initial:"فـ",medial:"ـفـ",final:"ـف"},{name:"Qāf",isolated:"ق",initial:"قـ",medial:"ـقـ",final:"ـق"},{name:"Kāf",isolated:"ك",initial:"كـ",medial:"ـكـ",final:"ـك"},{name:"Lām",isolated:"ل",initial:"لـ",medial:"ـلـ",final:"ـل"},{name:"Mīm",isolated:"م",initial:"مـ",medial:"ـمـ",final:"ـم"},{name:"Nūn",isolated:"ن",initial:"نـ",medial:"ـنـ",final:"ـن"},{name:"Hāʾ",isolated:"ه",initial:"هـ",medial:"ـهـ",final:"ـه"},{name:"Yāʾ",isolated:"ي",initial:"يـ",medial:"ـيـ",final:"ـي"}],J=[{symbol:"ء",name:"Hamza on the line (stand-alone)"},{symbol:"أ",name:"Hamza on alif with fatha (ʾa)"},{symbol:"إ",name:"Hamza on alif with kasra (ʾi)"},{symbol:"ؤ",name:"Hamza on waw (ʾu)"},{symbol:"ئ",name:"Hamza on ya’ (ʾi in middle or end)"},{symbol:"ئـ",name:"Initial or medial hamza on ya’ without dots"},{symbol:"ء",name:"Hamza on the line at word end (e.g., شيء)"},{symbol:"ٱ",name:"Alif wasla (non-pronounced alif in context)"},{symbol:"ٱ",name:"Connective hamza (همزة وصل)"},{symbol:"ء",name:"Glottal stop (همزة القطع), always pronounced"}],C=[{symbol:"َ",name:"Fatḥa (a)",class:"fatha"},{symbol:"ِ",name:"Kasra (i)",class:"kasra"},{symbol:"ُ",name:"Ḍamma (u)",class:"vowel-symbol"},{symbol:"ْ",name:"Sukūn (no vowel)",class:"sukun"},{symbol:"ّ",name:"Shadda (consonant doubling)",class:"shadda"},{symbol:"ً",name:"Tanwīn fatḥa (an)",class:"tanwin"},{symbol:"ٍ",name:"Tanwīn kasra (in)",class:"tanwin"},{symbol:"ٌ",name:"Tanwīn ḍamma (un)",class:"tanwin"},{symbol:"ٰ",name:"Alif khanjariyya (dagger alif)",class:"dagger-alif"},{symbol:"ــ",name:"Tatweel (kashida, elongation)",class:"tatweel"}],$=[{word:"بَيْت",transliteration:"bayt",meaning:"house",note:"ي connects ب to ت"},{word:"بَاب",transliteration:"bāb",meaning:"door",note:"ا breaks connection"},{word:"دَاوُد",transliteration:"Dāwūd",meaning:"David",note:"All non-connectors!"},{word:"مَوْز",transliteration:"mawz",meaning:"banana",note:"و connects to م only"}];var P=Ce(),Q=t(P),j=t(Q),ee=t(j,!0);e(j),Y(2),e(Q);var D=a(Q,2),H=a(t(D),4);z(H,5,()=>C,B,(g,r)=>{var p=Ee(),b=t(p),y=t(b),k=t(y,!0);e(y),e(b);var N=a(b,2),L=t(N,!0);e(N),e(p),w(()=>{ve(y,1,xe((s(r),v(()=>s(r).class))),"svelte-b85ynd"),i(k,(s(r),v(()=>s(r).symbol))),i(L,(s(r),v(()=>s(r).name)))}),u(g,p)}),e(H),Y(2),e(D);var K=a(D,2),V=a(t(K),2),te=t(V);z(te,5,()=>J,B,(g,r)=>{var p=De(),b=t(p),y=t(b,!0);e(b);var k=a(b,2),N=t(k,!0);e(k),e(p),w(()=>{i(y,(s(r),v(()=>s(r).symbol))),i(N,(s(r),v(()=>s(r).name)))}),u(g,p)}),e(te),e(V),e(K);var G=a(K,2),M=a(t(G),4),n=a(t(M),2);z(n,1,()=>U,B,(g,r)=>{var p=He(),b=t(p),y=t(b,!0);e(b);var k=a(b,2),N=t(k,!0);e(k);var L=a(k,2),W=t(L,!0);e(L);var S=a(L,2),d=t(S,!0);e(S);var l=a(S,2),o=t(l,!0);e(l),e(p),w(()=>{i(y,(s(r),v(()=>s(r).letter))),i(N,(s(r),v(()=>s(r).name))),i(W,(s(r),v(()=>s(r).isolated))),i(d,(s(r),v(()=>s(r).final))),i(o,(s(r),v(()=>s(r).example)))}),u(g,p)}),e(M),Y(2),e(G);var c=a(G,2),h=a(t(c),2);z(h,5,()=>$,B,(g,r)=>{var p=Ke(),b=t(p),y=t(b,!0);e(b);var k=a(b,2),N=t(k),L=t(N,!0);e(N);var W=a(N,2),S=t(W,!0);e(W);var d=a(W,2),l=t(d,!0);e(d),e(k),e(p),w(()=>{i(y,(s(r),v(()=>s(r).word))),i(L,(s(r),v(()=>s(r).transliteration))),i(S,(s(r),v(()=>s(r).meaning))),i(l,(s(r),v(()=>s(r).note)))}),u(g,p)}),e(h),e(c);var x=a(c,2),_=a(t(x),4),I=t(_),A=a(t(I));z(A,5,()=>E,B,(g,r)=>{var p=Re(),b=t(p),y=t(b,!0);e(b);var k=a(b),N=t(k,!0);e(k);var L=a(k),W=t(L,!0);e(L);var S=a(L),d=t(S,!0);e(S);var l=a(S),o=t(l,!0);e(l),e(p),w(()=>{i(y,(s(r),v(()=>s(r).name))),i(N,(s(r),v(()=>s(r).isolated))),i(W,(s(r),v(()=>s(r).initial))),i(d,(s(r),v(()=>s(r).medial))),i(o,(s(r),v(()=>s(r).final)))}),u(g,p)}),e(A),e(I),e(_),e(x),Y(2),e(P),w(()=>i(ee,q())),u(Z,P)}var Pe=m('<th class="svelte-1n98trm"><div class="ten-header svelte-1n98trm"><span class="arabic-number svelte-1n98trm"> </span> <span class="translit svelte-1n98trm"> </span> <span class="small-text"> </span></div></th>'),je=m('<span class="empty-cell svelte-1n98trm">—</span>'),Ve=m('<span class="arabic-text svelte-1n98trm"> </span>'),Ge=m('<td class="number-cell svelte-1n98trm"><!></td>'),Oe=m('<tr class="svelte-1n98trm"><td class="sticky-col unit-cell svelte-1n98trm"><span class="arabic-number svelte-1n98trm"> </span> <span class="unit-name svelte-1n98trm"> </span> <span class="translit small svelte-1n98trm"> </span></td><!></tr>'),Ye=m('<div class="ordinal-card svelte-1n98trm"><span class="ordinal-arabic svelte-1n98trm"> </span> <span class="ordinal-translit svelte-1n98trm"> </span> <span class="ordinal-english svelte-1n98trm"> </span></div>'),qe=m('<span class="number-item svelte-1n98trm"> </span>'),Ue=m('<span class="number-item svelte-1n98trm"> </span>'),Je=m('<span class="number-item svelte-1n98trm"> </span>'),Qe=m('<span class="number-item year-item svelte-1n98trm"> </span>'),Ze=m('<div class="arabic-numbers-container svelte-1n98trm" dir="rtl"><header class="table-header svelte-1n98trm"><h1 class="svelte-1n98trm"> </h1> <p class="subtitle svelte-1n98trm"> </p> <div class="header-decoration svelte-1n98trm"><span class="decoration-symbol svelte-1n98trm">🔢</span> <span class="decoration-text svelte-1n98trm">الأرقام العربية</span> <span class="decoration-symbol svelte-1n98trm">١٢٣</span></div></header> <section class="table-section"><h2 class="svelte-1n98trm">📊 جدول الأرقام (Numbers Table)</h2> <div class="table-container svelte-1n98trm"><table class="svelte-1n98trm"><thead><tr><th class="sticky-col svelte-1n98trm">الآحاد<br/><span class="subhead svelte-1n98trm">(Units)</span></th><!></tr></thead><tbody class="svelte-1n98trm"></tbody></table></div></section> <section class="info-cards svelte-1n98trm"><div class="info-card svelte-1n98trm"><h3 class="svelte-1n98trm">مليون (Million)</h3> <div class="large-number svelte-1n98trm"><span class="arabic-digit svelte-1n98trm">١٬٠٠٠٬٠٠٠</span> <span class="translit svelte-1n98trm">million</span></div></div> <div class="info-card svelte-1n98trm"><h3 class="svelte-1n98trm">مليار (Billion)</h3> <div class="large-number svelte-1n98trm"><span class="arabic-digit svelte-1n98trm">١٬٠٠٠٬٠٠٠٬٠٠٠</span> <span class="translit svelte-1n98trm">billion</span></div></div> <div class="info-card svelte-1n98trm"><h3 class="svelte-1n98trm">سنتيم (Centimeter)</h3> <div class="large-number svelte-1n98trm"><span class="arabic-digit svelte-1n98trm">سم</span> <span class="translit svelte-1n98trm">santīm</span></div></div></section> <section class="ordinal-section svelte-1n98trm"><h2 class="svelte-1n98trm">🔢 الأعداد الترتيبية (Ordinal Numbers)</h2> <div class="ordinal-grid svelte-1n98trm"></div></section> <section class="sequence-section svelte-1n98trm"><h2 class="svelte-1n98trm">١-١٠٠ (Numbers 1 to 100)</h2> <div class="number-grid svelte-1n98trm"></div></section> <section class="sequence-section svelte-1n98trm"><h2 class="svelte-1n98trm">١٠١-١٢٠ (Numbers 101 to 120)</h2> <div class="number-grid svelte-1n98trm"></div></section> <section class="sequence-section svelte-1n98trm"><h2 class="svelte-1n98trm">المئات (Hundreds)</h2> <div class="number-grid svelte-1n98trm"></div></section> <section class="sequence-section svelte-1n98trm"><h2 class="svelte-1n98trm">السنوات (Years 1990-2035)</h2> <div class="number-grid years-grid svelte-1n98trm"></div></section> <section class="date-example svelte-1n98trm"><h2 class="svelte-1n98trm">📅 مثال التاريخ (Date Example)</h2> <div class="date-card svelte-1n98trm"><span class="date-arabic svelte-1n98trm">١٦/٠٥/٢٠٢٤</span> <span class="date-explanation svelte-1n98trm">16 مايو 2024</span></div></section> <footer class="table-footer svelte-1n98trm"><p>الأعداد العربية - نظام العد والترقيم</p> <p class="small svelte-1n98trm">Arabic numerals - Counting and numbering system</p></footer></div>');function Xe(Z,F){ce(F,!1);let q=re(F,"title",8,"العد - Arabic Numbers Table"),U=re(F,"subtitle",8,"جدول الأرقام العربية (Arabic Numerals Conjugation)");const E=[{arabic:"٠",name:"صفر",translit:"sifr",value:0},{arabic:"١٠",name:"عشرة",translit:"ʿashara",value:10},{arabic:"٢٠",name:"عشرون",translit:"ʿishrūn",value:20},{arabic:"٣٠",name:"ثلاثون",translit:"thalāthūn",value:30},{arabic:"٤٠",name:"أربعون",translit:"arbaʿūn",value:40},{arabic:"٥٠",name:"خمسون",translit:"khamsūn",value:50},{arabic:"٦٠",name:"ستون",translit:"sittūn",value:60},{arabic:"٧٠",name:"سبعون",translit:"sabʿūn",value:70},{arabic:"٨٠",name:"ثمانون",translit:"thamānūn",value:80},{arabic:"٩٠",name:"تسعون",translit:"tisʿūn",value:90},{arabic:"١٠٠",name:"مائة",translit:"miʾa",value:100}],J=[{arabic:"٠",name:"صفر",translit:"sifr",value:0},{arabic:"١",name:"واحد",translit:"wāḥid",value:1},{arabic:"٢",name:"اثنان",translit:"ithnān",value:2},{arabic:"٣",name:"ثلاثة",translit:"thalātha",value:3},{arabic:"٤",name:"أربعة",translit:"arbaʿa",value:4},{arabic:"٥",name:"خمسة",translit:"khamsa",value:5},{arabic:"٦",name:"ستة",translit:"sitta",value:6},{arabic:"٧",name:"سبعة",translit:"sabʿa",value:7},{arabic:"٨",name:"ثمانية",translit:"thamāniya",value:8},{arabic:"٩",name:"تسعة",translit:"tisʿa",value:9}],C=[{arabic:"الأول",translit:"al-awwal",english:"first"},{arabic:"الثاني",translit:"ath-thānī",english:"second"},{arabic:"الثالث",translit:"ath-thālith",english:"third"},{arabic:"الرابع",translit:"ar-rābiʿ",english:"fourth"},{arabic:"الخامس",translit:"al-khāmis",english:"fifth"},{arabic:"السادس",translit:"as-sādis",english:"sixth"},{arabic:"السابع",translit:"as-sābiʿ",english:"seventh"},{arabic:"الثامن",translit:"ath-thāmin",english:"eighth"},{arabic:"التاسع",translit:"at-tāsiʿ",english:"ninth"},{arabic:"العاشر",translit:"al-ʿāshir",english:"tenth"},{arabic:"الحادي عشر",translit:"al-ḥādī ʿashar",english:"eleventh"}],$=[{unit:0,name:"صفر",values:["صفر","عشرة","عشرون","ثلاثون","أربعون","خمسون","ستون","سبعون","ثمانون","تسعون","مائة"]},{unit:1,name:"واحد",values:["واحد","أحد عشر","واحد وعشرون","واحد وثلاثون","واحد وأربعون","واحد وخمسون","واحد وستون","واحد وسبعون","واحد وثمانون","واحد وتسعون","—"]},{unit:2,name:"اثنان",values:["اثنان","اثنا عشر","اثنان وعشرون","اثنان وثلاثون","اثنان وأربعون","اثنان وخمسون","اثنان وستون","اثنان وسبعون","اثنان وثمانون","اثنان وتسعون","—"]},{unit:3,name:"ثلاثة",values:["ثلاثة","ثلاثة عشر","ثلاثة وعشرون","ثلاثة وثلاثون","ثلاثة وأربعون","ثلاثة وخمسون","ثلاثة وستون","ثلاثة وسبعون","ثلاثة وثمانون","ثلاثة وتسعون","—"]},{unit:4,name:"أربعة",values:["أربعة","أربعة عشر","أربعة وعشرون","أربعة وثلاثون","أربعة وأربعون","أربعة وخمسون","أربعة وستون","أربعة وسبعون","أربعة وثمانون","أربعة وتسعون","—"]},{unit:5,name:"خمسة",values:["خمسة","خمسة عشر","خمسة وعشرون","خمسة وثلاثون","خمسة وأربعون","خمسة وخمسون","خمسة وستون","خمسة وسبعون","خمسة وثمانون","خمسة وتسعون","—"]},{unit:6,name:"ستة",values:["ستة","ستة عشر","ستة وعشرون","ستة وثلاثون","ستة وأربعون","ستة وخمسون","ستة وستون","ستة وسبعون","ستة وثمانون","ستة وتسعون","—"]},{unit:7,name:"سبعة",values:["سبعة","سبعة عشر","سبعة وعشرون","سبعة وثلاثون","سبعة وأربعون","سبعة وخمسون","سبعة وستون","سبعة وسبعون","سبعة وثمانون","سبعة وتسعون","—"]},{unit:8,name:"ثمانية",values:["ثمانية","ثمانية عشر","ثمانية وعشرون","ثمانية وثلاثون","ثمانية وأربعون","ثمانية وخمسون","ثمانية وستون","ثمانية وسبعون","ثمانية وثمانون","ثمانية وتسعون","—"]},{unit:9,name:"تسعة",values:["تسعة","تسعة عشر","تسعة وعشرون","تسعة وثلاثون","تسعة وأربعون","تسعة وخمسون","تسعة وستون","تسعة وسبعون","تسعة وثمانون","تسعة وتسعون","—"]}],P=[];for(let d=1;d<=100;d++)P.push(d.toString());const Q=[];for(let d=101;d<=120;d++)Q.push(d.toString());const j=[];for(let d=1990;d<=2035;d++)j.push(d.toString());const ee=[200,300,400,500,600,700,800,900,1e3];function D(d){const l=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];return d.toString().replace(/\d/g,o=>l[parseInt(o)])}ue();var H=Ze(),K=t(H),V=t(K),te=t(V,!0);e(V);var G=a(V,2),M=t(G,!0);e(G),Y(2),e(K);var n=a(K,2),c=a(t(n),2),h=t(c),x=t(h),_=t(x),I=a(t(_));z(I,1,()=>E,B,(d,l)=>{var o=Pe(),f=t(o),T=t(f),O=t(T,!0);e(T);var R=a(T,2),se=t(R,!0);e(R);var X=a(R,2),ne=t(X,!0);e(X),e(f),e(o),w(()=>{i(O,(s(l),v(()=>s(l).arabic))),i(se,(s(l),v(()=>s(l).name))),i(ne,(s(l),v(()=>s(l).translit)))}),u(d,o)}),e(_),e(x);var A=a(x);z(A,5,()=>$,B,(d,l)=>{var o=Oe(),f=t(o),T=t(f),O=t(T,!0);e(T);var R=a(T,2),se=t(R,!0);e(R);var X=a(R,2),ne=t(X,!0);e(X),e(f);var be=a(f);z(be,1,()=>(s(l),v(()=>s(l).values)),B,(ke,de)=>{var ie=Ge(),he=t(ie);{var ge=ae=>{var le=je();u(ae,le)},ye=ae=>{var le=Ve(),fe=t(le,!0);e(le),w(()=>i(fe,s(de))),u(ae,le)};pe(he,ae=>{s(de)==="—"?ae(ge):ae(ye,!1)})}e(ie),u(ke,ie)}),e(o),w(()=>{i(O,(s(l),v(()=>J[s(l).unit].arabic))),i(se,(s(l),v(()=>s(l).name))),i(ne,(s(l),v(()=>J[s(l).unit].translit)))}),u(d,o)}),e(A),e(h),e(c),e(n);var g=a(n,4),r=a(t(g),2);z(r,5,()=>C,B,(d,l)=>{var o=Ye(),f=t(o),T=t(f,!0);e(f);var O=a(f,2),R=t(O,!0);e(O);var se=a(O,2),X=t(se,!0);e(se),e(o),w(()=>{i(T,(s(l),v(()=>s(l).arabic))),i(R,(s(l),v(()=>s(l).translit))),i(X,(s(l),v(()=>s(l).english)))}),u(d,o)}),e(r),e(g);var p=a(g,2),b=a(t(p),2);z(b,5,()=>P,B,(d,l)=>{var o=qe(),f=t(o,!0);e(o),w(T=>i(f,T),[()=>(s(l),v(()=>D(s(l))))]),u(d,o)}),e(b),e(p);var y=a(p,2),k=a(t(y),2);z(k,5,()=>Q,B,(d,l)=>{var o=Ue(),f=t(o,!0);e(o),w(T=>i(f,T),[()=>(s(l),v(()=>D(s(l))))]),u(d,o)}),e(k),e(y);var N=a(y,2),L=a(t(N),2);z(L,5,()=>ee,B,(d,l)=>{var o=Je(),f=t(o,!0);e(o),w(T=>i(f,T),[()=>(s(l),v(()=>D(s(l))))]),u(d,o)}),e(L),e(N);var W=a(N,2),S=a(t(W),2);z(S,5,()=>j,B,(d,l)=>{var o=Qe(),f=t(o,!0);e(o),w(T=>i(f,T),[()=>(s(l),v(()=>D(s(l))))]),u(d,o)}),e(S),e(W),Y(4),e(H),w(()=>{i(te,q()),i(M,U()),H.dir=H.dir}),u(Z,H),me()}var et=Te(m(`<meta charset="UTF-8" class="svelte-2ertku"/> <meta name="viewport" content="width=device-width, initial-scale=1.0" class="svelte-2ertku"/> <script class="svelte-2ertku">
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        const arabicInput =
          document.getElementById("arabicInput");
        const analyzeBtn =
          document.getElementById("analyzeBtn");
        const exampleBtn =
          document.getElementById("exampleBtn");
        const resultArea =
          document.getElementById("resultArea");
        const resultWord =
          document.getElementById("resultWord");
        const letterBreakdown = document.getElementById(
          "letterBreakdown"
        );
        const pronunciation =
          document.getElementById("pronunciation");
        const patternInfo =
          document.getElementById("patternInfo");

        // Example words database
        const examples = {
          كتاب: {
            letters: [
              { char: "ك", name: "Kāf", sound: "/k/" },
              { char: "ت", name: "Tāʾ", sound: "/t/" },
              {
                char: "ا",
                name: "Alif",
                sound: "/ā/ (long vowel)"
              },
              { char: "ب", name: "Bāʾ", sound: "/b/" }
            ],
            pronunciation: "/kitāb/",
            pattern: "Noun pattern فِعَال",
            meaning: "Book"
          },
          مدرسة: {
            letters: [
              { char: "م", name: "Mīm", sound: "/m/" },
              { char: "د", name: "Dāl", sound: "/d/" },
              { char: "ر", name: "Rāʾ", sound: "/r/" },
              { char: "س", name: "Sīn", sound: "/s/" },
              {
                char: "ة",
                name: "Tāʾ marbūṭa",
                sound: "/a/ (feminine ending)"
              }
            ],
            pronunciation: "/madrasa/",
            pattern: "Noun pattern مَفْعَلَة",
            meaning: "School"
          },
          انحرافي: {
            letters: [
              {
                char: "ا",
                name: "Hamza + Alif",
                sound: "/i/ (form VII prefix)"
              },
              { char: "ن", name: "Nūn", sound: "/n/" },
              { char: "ح", name: "Ḥāʾ", sound: "/ḥ/" },
              { char: "ر", name: "Rāʾ", sound: "/r/" },
              {
                char: "ا",
                name: "Alif",
                sound: "/ā/ (long vowel)"
              },
              { char: "ف", name: "Fāʾ", sound: "/f/" },
              {
                char: "ي",
                name: "Yāʾ",
                sound: "/iyy/ (nisba ending)"
              }
            ],
            pronunciation: "/inḥirāfiyy/",
            pattern: "Form VII + Nisba (اِنْفِعَالِيّ)",
            meaning: "Deviant (adjective)"
          },
          يكتب: {
            letters: [
              {
                char: "ي",
                name: "Yāʾ",
                sound: "/ya/ (prefix)"
              },
              { char: "ك", name: "Kāf", sound: "/k/" },
              { char: "ت", name: "Tāʾ", sound: "/t/" },
              { char: "ب", name: "Bāʾ", sound: "/bu/" }
            ],
            pronunciation: "/yaktubu/",
            pattern: "Present tense verb (يَفْعُلُ)",
            meaning: "He writes"
          }
        };

        function analyzeWord(word) {
          if (!word.trim()) return;

          // Check if it's in our examples
          if (examples[word]) {
            const example = examples[word];
            displayResult(word, example);
            return;
          }

          // Generic analysis for unknown words
          const letters = [];
          for (let char of word) {
            let letterInfo = {
              char: char,
              name: getLetterName(char),
              sound: getLetterSound(char)
            };
            letters.push(letterInfo);
          }

          const genericResult = {
            letters: letters,
            pronunciation: guessPronunciation(word),
            pattern: guessPattern(word),
            meaning: "Unknown - needs context"
          };

          displayResult(word, genericResult);
        }

        function getLetterName(char) {
          const letterNames = {
            ا: "Alif",
            ب: "Bāʾ",
            ت: "Tāʾ",
            ث: "Thāʾ",
            ج: "Jīm",
            ح: "Ḥāʾ",
            خ: "Khāʾ",
            د: "Dāl",
            ذ: "Dhāl",
            ر: "Rāʾ",
            ز: "Zāy",
            س: "Sīn",
            ش: "Shīn",
            ص: "Ṣād",
            ض: "Ḍād",
            ط: "Ṭāʾ",
            ظ: "Ẓāʾ",
            ع: "ʿAyn",
            غ: "Ghayn",
            ف: "Fāʾ",
            ق: "Qāf",
            ك: "Kāf",
            ل: "Lām",
            م: "Mīm",
            ن: "Nūn",
            ه: "Hāʾ",
            و: "Wāw",
            ي: "Yāʾ",
            ء: "Hamza",
            ة: "Tāʾ marbūṭa",
            ى: "Alif maqṣūra"
          };
          return letterNames[char] || "Unknown letter";
        }

        function getLetterSound(char) {
          const sounds = {
            ا: "/ā/ or glottal stop",
            ب: "/b/",
            ت: "/t/",
            ث: "/θ/",
            ج: "/dʒ/",
            ح: "/ħ/",
            خ: "/x/",
            د: "/d/",
            ذ: "/ð/",
            ر: "/r/",
            ز: "/z/",
            س: "/s/",
            ش: "/ʃ/",
            ص: "/sˤ/",
            ض: "/dˤ/",
            ط: "/tˤ/",
            ظ: "/ðˤ/",
            ع: "/ʕ/",
            غ: "/ɣ/",
            ف: "/f/",
            ق: "/q/",
            ك: "/k/",
            ل: "/l/",
            م: "/m/",
            ن: "/n/",
            ه: "/h/",
            و: "/w/ or /ū/",
            ي: "/j/ or /ī/",
            ة: "Feminine ending"
          };
          return sounds[char] || "Varies by context";
        }

        function guessPronunciation(word) {
          // Very basic pronunciation guess
          if (word.startsWith("ا") && word.length > 3) {
            return (
              "/in" +
              word.substring(1, 3) +
              "ā" +
              word.substring(4) +
              "/ (Form VII guess)"
            );
          }
          if (word.endsWith("ي")) {
            return "/...iyy/ (可能 nisba adjective)";
          }
          return "/.../ (Unknown - needs vowel marks)";
        }

        function guessPattern(word) {
          if (word.endsWith("ي") && word.length > 3) {
            return "Possibly nisba adjective (ـِيّ) or possessive (ـِي)";
          }
          if (word.startsWith("ي") && word.length === 4) {
            return "Possibly present tense verb (يَفْعُلُ)";
          }
          if (
            word.startsWith("ا") &&
            word[1] === "ن" &&
            word.length > 4
          ) {
            return "Possibly Form VII (اِنْفِعَال)";
          }
          return "Unknown pattern - needs context";
        }

        function displayResult(word, data) {
          resultWord.textContent = word;

          // Build letter breakdown
          let breakdownHTML =
            '<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">';
          data.letters.forEach((letter) => {
            breakdownHTML += \`
                        <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; min-width: 80px;">
                            <div style="font-size: 2em; text-align: center;">\${letter.char}</div>
                            <div style="font-size: 0.9em; text-align: center;">
                                <strong>\${letter.name}</strong><br>
                                \${letter.sound}
                            </div>
                        </div>
                    \`;
          });
          breakdownHTML += "</div>";
          letterBreakdown.innerHTML = breakdownHTML;

          pronunciation.innerHTML = \`<strong>\${data.pronunciation}</strong>\`;
          patternInfo.innerHTML = \`<strong>\${data.pattern}</strong><br>Meaning: \${data.meaning}\`;

          resultArea.style.display = "block";
        }

        analyzeBtn.addEventListener("click", () => {
          analyzeWord(arabicInput.value);
        });

        exampleBtn.addEventListener("click", () => {
          const words = Object.keys(examples);
          const randomWord =
            words[Math.floor(Math.random() * words.length)];
          arabicInput.value = randomWord;
          analyzeWord(randomWord);
        });

        arabicInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            analyzeWord(arabicInput.value);
          }
        });

        // Show initial example
        arabicInput.value = "انحرافي";
        setTimeout(() => analyzeWord("انحرافي"), 500);
      }
    );
  <\/script>`,1)),tt=m(`<div class="container mainpage svelte-2ertku"><div class="container svelte-2ertku"><header class="svelte-2ertku"><h1 class="svelte-2ertku">Arabic Spelling Mastery</h1> <p class="subtitle svelte-2ertku">Complete Guide to Letters, Vowels, and Word
        Structure</p> <div class="tip svelte-2ertku"><strong class="svelte-2ertku">Key Insight:</strong> Arabic spelling combines
        constant letters with variable vowels. Learn the system,
        not just memorization!</div></header> <div class="section svelte-2ertku"><h2 class="section-title svelte-2ertku">The Arabic Alphabet (28 Letters)</h2> <p style="text-align: center; margin-bottom: 25px; color: #666;" class="svelte-2ertku">Each letter has 4 forms: Isolated, Initial, Medial,
        Final. Names are based on the isolated form.</p> <div class="grid svelte-2ertku"><div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ا</div> <div class="letter-name svelte-2ertku">Alif</div> <div class="letter-info svelte-2ertku">Long vowel /ā/<br class="svelte-2ertku"/>No dots</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ب</div> <div class="letter-name svelte-2ertku">Bāʾ</div> <div class="letter-info svelte-2ertku">One dot below<br class="svelte-2ertku"/>/b/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ت</div> <div class="letter-name svelte-2ertku">Tāʾ</div> <div class="letter-info svelte-2ertku">Two dots above<br class="svelte-2ertku"/>/t/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ث</div> <div class="letter-name svelte-2ertku">Thāʾ</div> <div class="letter-info svelte-2ertku">Three dots above<br class="svelte-2ertku"/>/θ/ (th in "think")</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ج</div> <div class="letter-name svelte-2ertku">Jīm</div> <div class="letter-info svelte-2ertku">One dot below<br class="svelte-2ertku"/>/dʒ/ (j in "jam")</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ح</div> <div class="letter-name svelte-2ertku">Ḥāʾ</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/ħ/ (emphatic h)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">خ</div> <div class="letter-name svelte-2ertku">Khāʾ</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/x/ (ch in "Bach")</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">د</div> <div class="letter-name svelte-2ertku">Dāl</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/d/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ذ</div> <div class="letter-name svelte-2ertku">Dhāl</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/ð/ (th in "this")</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ر</div> <div class="letter-name svelte-2ertku">Rāʾ</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/r/ sound (trilled)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ز</div> <div class="letter-name svelte-2ertku">Zāy</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/z/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">س</div> <div class="letter-name svelte-2ertku">Sīn</div> <div class="letter-info svelte-2ertku">Three dots (eventually)<br class="svelte-2ertku"/>/s/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ش</div> <div class="letter-name svelte-2ertku">Shīn</div> <div class="letter-info svelte-2ertku">Three dots above<br class="svelte-2ertku"/>/ʃ/ (sh in "ship")</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ص</div> <div class="letter-name svelte-2ertku">Ṣād</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/sˤ/ (emphatic s)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ض</div> <div class="letter-name svelte-2ertku">Ḍād</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/dˤ/ (emphatic d)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ط</div> <div class="letter-name svelte-2ertku">Ṭāʾ</div> <div class="letter-info svelte-2ertku">Two dots above? No, none!<br class="svelte-2ertku"/>/tˤ/ (emphatic t)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ظ</div> <div class="letter-name svelte-2ertku">Ẓāʾ</div> <div class="letter-info svelte-2ertku">One dot above? Actually, check!<br class="svelte-2ertku"/>/ðˤ/
            (emphatic dh)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ع</div> <div class="letter-name svelte-2ertku">ʿAyn</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/ʕ/ (pharyngeal voiced)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">غ</div> <div class="letter-name svelte-2ertku">Ghayn</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/ɣ/ (French r)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ف</div> <div class="letter-name svelte-2ertku">Fāʾ</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/f/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ق</div> <div class="letter-name svelte-2ertku">Qāf</div> <div class="letter-info svelte-2ertku">Two dots above<br class="svelte-2ertku"/>/q/ (uvular k)</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ك</div> <div class="letter-name svelte-2ertku">Kāf</div> <div class="letter-info svelte-2ertku">Special form<br class="svelte-2ertku"/>/k/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ل</div> <div class="letter-name svelte-2ertku">Lām</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/l/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">م</div> <div class="letter-name svelte-2ertku">Mīm</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/m/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ن</div> <div class="letter-name svelte-2ertku">Nūn</div> <div class="letter-info svelte-2ertku">One dot above<br class="svelte-2ertku"/>/n/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ه</div> <div class="letter-name svelte-2ertku">Hāʾ</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/h/ sound</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">و</div> <div class="letter-name svelte-2ertku">Wāw</div> <div class="letter-info svelte-2ertku">No dots<br class="svelte-2ertku"/>/w/ or /ū/</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ي</div> <div class="letter-name svelte-2ertku">Yāʾ</div> <div class="letter-info svelte-2ertku">Two dots below<br class="svelte-2ertku"/>/j/ or /ī/</div></div> <div class="card letter-card svelte-2ertku"><div class="letter-display svelte-2ertku">ء</div> <div class="letter-name svelte-2ertku">Hamza</div> <div class="letter-info svelte-2ertku">Glottal stop<br class="svelte-2ertku"/>/ʔ/</div></div></div> <div class="tip svelte-2ertku"><strong class="svelte-2ertku">Pattern Recognition:</strong> Dots distinguish
        similar shapes! ب ت ث all have same base shape, different
        dots.</div></div> <div class="section svelte-2ertku"><h2 class="section-title svelte-2ertku">Vowels & Diacritics (تَشْكِيل)</h2> <p style="text-align: center; margin-bottom: 25px; color: #666;" class="svelte-2ertku">Short vowels are written as marks above/below
        letters. Usually omitted in everyday writing.</p> <div class="vowel-system svelte-2ertku"><div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ـَ</div> <div class="letter-name svelte-2ertku">Fatḥa</div> <div class="letter-info svelte-2ertku">Short /a/<br class="svelte-2ertku"/>Above the letter</div></div> <div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ـِ</div> <div class="letter-name svelte-2ertku">Kasra</div> <div class="letter-info svelte-2ertku">Short /i/<br class="svelte-2ertku"/>Below the letter</div></div> <div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ـُ</div> <div class="letter-name svelte-2ertku">Ḍamma</div> <div class="letter-info svelte-2ertku">Short /u/<br class="svelte-2ertku"/>Above the letter</div></div> <div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ـْ</div> <div class="letter-name svelte-2ertku">Sukūn</div> <div class="letter-info svelte-2ertku">No vowel<br class="svelte-2ertku"/>Circle above letter</div></div> <div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ّ</div> <div class="letter-name svelte-2ertku">Shadda</div> <div class="letter-info svelte-2ertku">Doubled letter<br class="svelte-2ertku"/>Like writing letter twice</div></div> <div class="vowel-item svelte-2ertku"><div class="vowel-symbol svelte-2ertku">ٓ</div> <div class="letter-name svelte-2ertku">Madda</div> <div class="letter-info svelte-2ertku">Alif elongation<br class="svelte-2ertku"/>آ = /ʔā/</div></div></div> <div class="breakdown-demo svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 20px;" class="svelte-2ertku">Example: كَتَبَ (He wrote)</h3> <div class="breakdown-grid svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ك</div> <div class="breakdown-info svelte-2ertku"><span class="info-label svelte-2ertku">Kāf</span> Base letter /k/<br class="svelte-2ertku"/> <span class="highlight svelte-2ertku">Fatḥa above → /ka/</span></div> <div class="breakdown-letter svelte-2ertku">ت</div> <div class="breakdown-info svelte-2ertku"><span class="info-label svelte-2ertku">Tāʾ</span> Base letter /t/<br class="svelte-2ertku"/> <span class="highlight svelte-2ertku">Fatḥa above → /ta/</span></div> <div class="breakdown-letter svelte-2ertku">ب</div> <div class="breakdown-info svelte-2ertku"><span class="info-label svelte-2ertku">Bāʾ</span> Base letter /b/<br class="svelte-2ertku"/> <span class="highlight svelte-2ertku">Fatḥa above → /ba/</span></div></div> <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;" class="svelte-2ertku"><strong class="svelte-2ertku">Pronunciation:</strong> /ka-ta-ba/<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Written without vowels:</strong> كتب<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Written with vowels:</strong> كَتَبَ</div></div></div> <div class="section svelte-2ertku"><h2 class="section-title svelte-2ertku">Word Spelling Breakdown</h2> <div class="pattern-example svelte-2ertku"><div class="pattern-card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Example 1: مُدَرِّس (Teacher)</h3> <div class="arabic svelte-2ertku" style="font-size: 2.5em; margin-bottom: 15px;">مُدَرِّس</div> <div class="breakdown-demo svelte-2ertku"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">م</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Mīm:</strong> Ḍamma <span class="vowel-symbol svelte-2ertku">(ـُ)</span> → /mu/</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">د</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Dāl:</strong> Fatḥa <span class="vowel-symbol svelte-2ertku">(ـَ)</span> → /da/</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ر</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Rāʾ:</strong> Shadda <span class="vowel-symbol svelte-2ertku">(ّ)</span> + Kasra <span class="vowel-symbol svelte-2ertku">(ـِ)</span> → /rri/ (doubled)</span></div> <div style="display: flex; align-items: center; gap: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">س</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Sīn:</strong> Sukūn <span class="vowel-symbol svelte-2ertku">(ـْ)</span> → /s/ (no
                vowel)</span></div></div> <div style="margin-top: 15px; padding: 10px; background: var(--light); border-radius: 5px;" class="svelte-2ertku"><strong class="svelte-2ertku">Pattern:</strong> Form II active
            participle (مُفَعِّل)<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Root:</strong> د ر س (to study)<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Full:</strong> /mu-dar-ris/</div></div> <div class="pattern-card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Example 2: اِنْحِرَافِيّ (Deviant)</h3> <div class="arabic svelte-2ertku" style="font-size: 2.5em; margin-bottom: 15px;">اِنْحِرَافِيّ</div> <div class="breakdown-demo svelte-2ertku"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ا</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Alif/Hamza:</strong> Kasra below (إِ)
                → /i/</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ن</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Nūn:</strong> Sukūn <span class="vowel-symbol svelte-2ertku">(ـْ)</span> → /n/ (no
                vowel)</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ح</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Ḥāʾ:</strong> Kasra <span class="vowel-symbol svelte-2ertku">(ـِ)</span> → /ḥi/</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ر</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Rāʾ:</strong> Long vowel ا after it →
                /rā/</span></div> <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ف</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Fāʾ:</strong> Kasra <span class="vowel-symbol svelte-2ertku">(ـِ)</span> → /fi/</span></div> <div style="display: flex; align-items: center; gap: 10px;" class="svelte-2ertku"><div class="breakdown-letter svelte-2ertku">ي</div> <span class="svelte-2ertku"><strong class="svelte-2ertku">Yāʾ:</strong> Shadda <span class="vowel-symbol svelte-2ertku">(ّ)</span> + Kasra <span class="vowel-symbol svelte-2ertku">(ـِ)</span> → /yiyy/ (nisba)</span></div></div> <div style="margin-top: 15px; padding: 10px; background: var(--light); border-radius: 5px;" class="svelte-2ertku"><strong class="svelte-2ertku">Pattern:</strong> Form VII + Nisba
            (اِنْفِعَالِيّ)<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Root:</strong> ح ر ف (to deviate)<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Full:</strong> /in-ḥi-rā-fiyy/<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Without vowels:</strong> انحرافي</div></div></div> <div class="tip svelte-2ertku"><strong class="svelte-2ertku">Critical Insight:</strong> In everyday writing,
        only letters and long vowels appear. Short vowels must
        be inferred from context and word patterns!</div></div> <div class="interactive-area svelte-2ertku"><h2 style="color: white; margin-bottom: 25px; text-align: center;" class="svelte-2ertku">Interactive Spelling Practice</h2> <div class="input-group svelte-2ertku"><input type="text" id="arabicInput" placeholder="اكتب كلمة عربية (Write an Arabic word)" dir="rtl" class="svelte-2ertku"/> <button id="analyzeBtn" class="svelte-2ertku">Analyze Word</button> <button id="exampleBtn" class="svelte-2ertku">Show Example</button></div> <div class="result-area svelte-2ertku" id="resultArea" style="display: none;"><div class="result-item svelte-2ertku"><div class="result-label svelte-2ertku">Word:</div> <div class="result-value svelte-2ertku" id="resultWord"></div></div> <div class="result-item svelte-2ertku"><div class="result-label svelte-2ertku">Letter-by-Letter:</div> <div id="letterBreakdown" class="svelte-2ertku"></div></div> <div class="result-item svelte-2ertku"><div class="result-label svelte-2ertku">Pronunciation:</div> <div id="pronunciation" class="svelte-2ertku"></div></div> <div class="result-item svelte-2ertku"><div class="result-label svelte-2ertku">Pattern:</div> <div id="patternInfo" class="svelte-2ertku"></div></div></div></div> <div class="section svelte-2ertku"><h2 class="section-title svelte-2ertku">Common Spelling Patterns</h2> <div class="grid svelte-2ertku"><div class="card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Nisba Pattern (ـِيّ)</h3> <div class="arabic svelte-2ertku">مِصْرِيّ، عَرَبِيّ، أُمَرِيكِيّ</div> <p style="margin-top: 10px; color: #666;" class="svelte-2ertku"><strong class="svelte-2ertku">Rule:</strong> Always kasra before ياء<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Meaning:</strong> "Related to"<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Example:</strong> مِصْر (Egypt) → مِصْرِيّ
            (Egyptian)</p></div> <div class="card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Form I Verb (فَعَلَ)</h3> <div class="arabic svelte-2ertku">كَتَبَ، فَتَحَ، ضَرَبَ</div> <p style="margin-top: 10px; color: #666;" class="svelte-2ertku"><strong class="svelte-2ertku">Pattern:</strong> فـَ عـَ لـَ<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Default vowels:</strong> Fatḥa on each
            root letter<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Meaning:</strong> Basic action</p></div> <div class="card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Form II (فَعَّلَ)</h3> <div class="arabic svelte-2ertku">دَرَّسَ، كَسَّرَ، حَوَّلَ</div> <p style="margin-top: 10px; color: #666;" class="svelte-2ertku"><strong class="svelte-2ertku">Pattern:</strong> Second root letter
            doubled<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Mark:</strong> Shadda on second root<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Meaning:</strong> Intensive/causative</p></div> <div class="card svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Form VII (اِنْفَعَلَ)</h3> <div class="arabic svelte-2ertku">اِنْكَسَرَ، اِنْطَلَقَ، اِنْحَرَفَ</div> <p style="margin-top: 10px; color: #666;" class="svelte-2ertku"><strong class="svelte-2ertku">Pattern:</strong> اِنْ + first root with
            kasra<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Meaning:</strong> Reflexive/passive<br class="svelte-2ertku"/> <strong class="svelte-2ertku">Example:</strong> اِنْحَرَفَ (to deviate)</p></div></div></div> <div class="section svelte-2ertku"><h2 class="section-title svelte-2ertku">Key Takeaways</h2> <div style="background: #e8f4fc; padding: 25px; border-radius: 10px;" class="svelte-2ertku"><h3 style="color: var(--primary); margin-bottom: 15px;" class="svelte-2ertku">Essential Spelling Rules:</h3> <ul style="list-style: none; padding-left: 20px;" class="svelte-2ertku"><li style="margin-bottom: 10px; padding-left: 25px; position: relative;" class="svelte-2ertku"><span style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;" class="svelte-2ertku">1</span> <strong class="svelte-2ertku">Consonants are always written</strong> – vowels
            are often omitted</li> <li style="margin-bottom: 10px; padding-left: 25px; position: relative;" class="svelte-2ertku"><span style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;" class="svelte-2ertku">2</span> <strong class="svelte-2ertku">Long vowels (ا و ي)</strong> appear as
            letters; short vowels <span class="vowel-symbol svelte-2ertku">(ـَ ـِ ـُ)</span> as marks</li> <li style="margin-bottom: 10px; padding-left: 25px; position: relative;" class="svelte-2ertku"><span style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;" class="svelte-2ertku">3</span> <strong class="svelte-2ertku">Word patterns determine vowels</strong> –
            learn patterns, not each word</li> <li style="margin-bottom: 10px; padding-left: 25px; position: relative;" class="svelte-2ertku"><span style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;" class="svelte-2ertku">4</span> <strong class="svelte-2ertku">Context reveals missing vowels</strong> –
            same spelling can have multiple readings</li> <li style="margin-bottom: 10px; padding-left: 25px; position: relative;" class="svelte-2ertku"><span style="position: absolute; left: 0; color: var(--secondary); font-weight: bold;" class="svelte-2ertku">5</span> <strong class="svelte-2ertku">Dots distinguish letters</strong> – ب ت ث
            have same shape, different dots</li></ul> <div class="tip svelte-2ertku" style="margin-top: 20px;"><strong class="svelte-2ertku">For انحرافي specifically:</strong> It follows
          the اِنْفِعَالِيّ pattern. The kasra on ف isn't optional
          – it's required by the nisba (ـِيّ) formation. Without
          it, you'd have انحراف + ي (my deviation) vs. انحرافي
          (deviant).</div></div></div> <footer class="svelte-2ertku"><p class="svelte-2ertku">Arabic Spelling Mastery Guide • Learn the system,
        not just memorization</p> <p class="svelte-2ertku">Tip: Practice reading fully voweled texts first,
        then gradually move to unvoweled texts</p></footer> <!> <!> <!></div></div>`);function at(Z){var F=tt();_e("2ertku",C=>{var $=et();Y(4),Se(()=>{Ae.title="Arabic Spelling Mastery - Complete Guide"}),u(C,$)});var q=t(F),U=a(t(q),16);We(U,{});var E=a(U,2);$e(E,{});var J=a(E,2);Xe(J,{}),e(q),e(F),u(Z,F)}export{at as component};
