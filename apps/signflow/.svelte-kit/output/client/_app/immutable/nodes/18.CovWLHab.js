import{p as oe,k as te,q as $,g as E,u as b,v as se,i as de,c as r,s,r as a,B as ee,t as D,L as ae,h as e,w as c,j as n,a as g,F as re,z as ne,b as le,m as F,f as S,A as Ee,e as X,O as be,P as Fe,D as Be,$ as je,Q as Ge,n as Qe,N as R}from"../chunks/-0HexQLS.js";var Ue=S('<div><div class="operator-header"><div class="operator-symbol"> </div> <div> </div></div> <div class="operator-name"> </div> <div class="operator-description"> </div> <div class="example-box"><div class="example-title"> </div> <div class="example-content"> </div> <div class="example-usage"> </div></div></div>'),Ye=S('<div class="connector-card"><div class="connector-symbol"> </div> <div class="connector-name"> </div> <div class="connector-usage"> </div></div>'),Ve=S(`<div class="logic-section"><h2 class="section-title"><i class="fas fa-brain"></i> </h2> <div class="section-description"><p> </p></div> <div class="operators-grid"></div> <h3 class="sub-section-title"><i class="fas fa-link"></i> </h3> <div class="connectors-grid"></div> <style>.logic-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--logic);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--logic);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(52, 152, 219, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--logic);
    }

    .sub-section-title {
      color: var(--logic);
      margin: 2rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .operators-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
      );
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .operator-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid var(--logic);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .operator-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px var(--shadow);
    }

    .operator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--logic);
      font-family: "Times New Roman", serif;
    }

    .operator-level-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .operator-level-badge.basic {
      background: rgba(243, 156, 18, 0.2);
      color: var(--warning);
    }

    .operator-level-badge.advanced {
      background: rgba(52, 73, 94, 0.2);
      color: var(--text-primary);
    }

    .operator-name {
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
    }

    .operator-description {
      color: var(--text-secondary);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .example-box {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .example-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--logic);
    }

    .example-content {
      font-family: "Courier New", monospace;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: var(--bg-secondary);
      border-radius: 5px;
    }

    .example-usage {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .connectors-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(150px, 1fr)
      );
      gap: 1rem;
    }

    .connector-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--logic);
      transition: all 0.3s ease;
    }

    .connector-card:hover {
      background: var(--logic);
      color: white;
      transform: scale(1.05);
    }

    .connector-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .connector-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .connector-usage {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .connectors-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }</style></div>`);function We(Y,C){oe(C,!1);const M=F(),_=F();let i=te(C,"language",8,"ar"),l=te(C,"searchTerm",8,"");const B=[{symbol:"∧",name:{ar:"و المنطقية (العطف)",en:"Logical AND (Conjunction)"},description:{ar:"تعطي النتيجة صحيحة فقط إذا كان كلا الطرفين صحيحين",en:"Returns true only if both operands are true"},example:"P ∧ Q",usage:{ar:'تُستخدم في الشروط المركبة مثل "إذا كان الطقس مشمساً والمدرسة مفتوحة"',en:'Used in compound conditions like "If sunny AND school is open"'},level:"basic"},{symbol:"∨",name:{ar:"أو المنطقية (الفصل)",en:"Logical OR (Disjunction)"},description:{ar:"تعطي النتيجة صحيحة إذا كان أحد الطرفين صحيحاً على الأقل",en:"Returns true if at least one operand is true"},example:"P ∨ Q",usage:{ar:'تُستخدم في الاختيارات مثل "يمكنك اختيار الشاي أو القهوة"',en:'Used in choices like "You can have tea OR coffee"'},level:"basic"},{symbol:"¬",name:{ar:"ليس المنطقية (النفي)",en:"Logical NOT (Negation)"},description:{ar:"تعكس قيمة الصواب، تجعل الصحيح خطأ والخطأ صحيحاً",en:"Inverts the truth value, true becomes false and false becomes true"},example:"¬P",usage:{ar:'تُستخدم لنفي العبارات مثل "ليس الجو ممطراً"',en:'Used to negate statements like "It is NOT raining"'},level:"basic"},{symbol:"⇒",name:{ar:"الاستلزام (إذا...فإن)",en:"Implication (If...Then)"},description:{ar:"إذا كانت الفرضية صحيحة فإن النتيجة صحيحة",en:"If the hypothesis is true, then the conclusion is true"},example:"P ⇒ Q",usage:{ar:'تُستخدم في الاستدلال المنطقي مثل "إذا كانت س=٢ فإن س²=٤"',en:'Used in logical reasoning like "If x=2 then x²=4"'},level:"advanced"},{symbol:"⇔",name:{ar:"التكافؤ (إذا وفقط إذا)",en:"Biconditional (If and Only If)"},description:{ar:"العبارتان متكافئتان، لهما نفس قيمة الصواب",en:"The statements are equivalent, they have the same truth value"},example:"P ⇔ Q",usage:{ar:'تُستخدم في التعريفات الرياضية مثل "المثلث متساوي الأضلاع إذا وفقط إذا كانت زواياه ٦٠°"',en:'Used in mathematical definitions like "Triangle is equilateral IFF all angles are 60°"'},level:"advanced"},{symbol:"∀",name:{ar:"المحدد الكلي (لكل)",en:"Universal Quantifier (For All)"},description:{ar:"تعبير ينطبق على جميع عناصر المجموعة",en:"Expression that applies to all elements of a set"},example:"∀x ∈ ℝ, x² ≥ 0",usage:{ar:'تُستخدم في البراهين الرياضية مثل "لكل عدد حقيقي س، مربعه غير سالب"',en:'Used in mathematical proofs like "For all real x, its square is non-negative"'},level:"advanced"}],V=[{symbol:"∵",name:{ar:"بسبب",en:"Because"},usage:"A ∵ B"},{symbol:"∴",name:{ar:"لذلك",en:"Therefore"},usage:"A ∴ B"},{symbol:"∝",name:{ar:"يتناسب مع",en:"Proportional to"},usage:"A ∝ B"},{symbol:"①",name:{ar:"أولاً",en:"First"},usage:"① ثم ②"},{symbol:"Ⓝ",name:{ar:"أخيراً",en:"Finally"},usage:"... Ⓝ"}];$(()=>b(l()),()=>{E(M,B.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),$(()=>b(l()),()=>{E(_,V.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),se(),de();var O=Ve(),q=r(O),G=s(r(q));a(q);var w=s(q,2),P=r(w),j=r(P,!0);a(P),a(w);var T=s(w,2);ee(T,5,()=>e(M),re,(d,t)=>{var v=Ue(),p=r(v),u=r(p),f=r(u,!0);a(u);var h=s(u,2),y=r(h,!0);a(h),a(p);var x=s(p,2),J=r(x,!0);a(x);var N=s(x,2),Q=r(N,!0);a(N);var I=s(N,2),k=r(I),U=r(k,!0);a(k);var L=s(k,2),Z=r(L,!0);a(L);var H=s(L,2),K=r(H,!0);a(H),a(I),a(v),D(()=>{ae(v,1,`operator-card ${e(t),c(()=>e(t).level)??""}`),n(f,(e(t),c(()=>e(t).symbol))),ae(h,1,`operator-level-badge ${e(t),c(()=>e(t).level)??""}`),n(y,(e(t),b(i()),c(()=>e(t).level==="basic"?i()==="ar"?"أساسي":"Basic":i()==="ar"?"متقدم":"Advanced"))),n(J,(e(t),b(i()),c(()=>e(t).name[i()]))),n(Q,(e(t),b(i()),c(()=>e(t).description[i()]))),n(U,i()==="ar"?"مثال:":"Example:"),n(Z,(e(t),c(()=>e(t).example))),n(K,(e(t),b(i()),c(()=>e(t).usage[i()])))}),g(d,v)}),a(T);var z=s(T,2),W=s(r(z));a(z);var A=s(z,2);ee(A,5,()=>e(_),re,(d,t)=>{var v=Ye(),p=r(v),u=r(p,!0);a(p);var f=s(p,2),h=r(f,!0);a(f);var y=s(f,2),x=r(y,!0);a(y),a(v),D(()=>{n(u,(e(t),c(()=>e(t).symbol))),n(h,(e(t),b(i()),c(()=>e(t).name[i()]))),n(x,(e(t),c(()=>e(t).usage)))}),g(d,v)}),a(A),ne(2),a(O),D(()=>{n(G,` ${i()==="ar"?"المؤثرات المنطقية":"Logic Operators"}`),n(j,i()==="ar"?"المؤثرات المنطقية هي رموز تستخدم لربط العبارات المنطقية وتكوين عبارات مركبة. وهي أساس البرهان والاستدلال في الرياضيات وعلوم الحاسب.":"Logical operators are symbols used to connect logical statements and form compound statements. They are fundamental to proof and reasoning in mathematics and computer science."),n(W,` ${i()==="ar"?"الوصلات المنطقية":"Logical Connectors"}`)}),g(Y,O),le()}var Je=S('<div><div class="operator-header"><div class="operator-symbol"> </div> <div> </div></div> <div class="operator-name"> </div> <div class="operator-description"> </div> <div class="example-box"><div class="example-title"> </div> <div class="example-content"> </div> <div class="example-usage"> </div></div></div>'),Ze=S('<div class="symbol-card"><div class="symbol-display"> </div> <div class="symbol-name"> </div> <div class="symbol-usage"> </div></div>'),Ke=S(`<div class="math-section"><h2 class="section-title"><i class="fas fa-calculator"></i> </h2> <div class="section-description"><p> </p></div> <div class="operators-grid"></div> <h3 class="sub-section-title"><i class="fas fa-star"></i> </h3> <div class="symbols-grid"></div> <style>.math-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--math);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--math);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(231, 76, 60, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--math);
    }

    .sub-section-title {
      color: var(--math);
      margin: 2rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .operators-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
      );
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .operator-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid var(--math);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .operator-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px var(--shadow);
    }

    .operator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--math);
      font-family: "Times New Roman", serif;
    }

    .operator-level-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .operator-level-badge.basic {
      background: rgba(243, 156, 18, 0.2);
      color: var(--warning);
    }

    .operator-level-badge.advanced {
      background: rgba(52, 73, 94, 0.2);
      color: var(--text-primary);
    }

    .operator-name {
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
    }

    .operator-description {
      color: var(--text-secondary);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .example-box {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .example-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--math);
    }

    .example-content {
      font-family: "Courier New", monospace;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: var(--bg-secondary);
      border-radius: 5px;
    }

    .example-usage {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .symbols-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .symbol-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--math);
      transition: all 0.3s ease;
    }

    .symbol-card:hover {
      background: var(--math);
      color: white;
      transform: scale(1.05);
    }

    .symbol-display {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .symbol-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .symbol-usage {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .symbols-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }</style></div>`);function Xe(Y,C){oe(C,!1);const M=F(),_=F();let i=te(C,"language",8,"ar"),l=te(C,"searchTerm",8,"");const B=[{symbol:"+",name:{ar:"الجمع",en:"Addition"},description:{ar:"عملية رياضية تجمع بين عددين أو أكثر لإنتاج مجموع",en:"Mathematical operation that combines two or more numbers to produce a sum"},example:"5 + 3 = 8",usage:{ar:"جمع الكميات",en:"Adding quantities"},level:"basic"},{symbol:"−",name:{ar:"الطرح",en:"Subtraction"},description:{ar:"عملية رياضية لإيجاد الفرق بين عددين",en:"Mathematical operation to find the difference between two numbers"},example:"10 − 4 = 6",usage:{ar:"إيجاد الفرق",en:"Finding difference"},level:"basic"},{symbol:"×",name:{ar:"الضرب",en:"Multiplication"},description:{ar:"عملية رياضية تجمع كميات متساوية مكررة",en:"Mathematical operation that combines equal repeated quantities"},example:"3 × 4 = 12",usage:{ar:"تكرار الجمع",en:"Repeated addition"},level:"basic"},{symbol:"÷",name:{ar:"القسمة",en:"Division"},description:{ar:"عملية رياضية لتقسيم عدد إلى أجزاء متساوية",en:"Mathematical operation to divide a number into equal parts"},example:"12 ÷ 4 = 3",usage:{ar:"التقسيم",en:"Division"},level:"basic"},{symbol:"√",name:{ar:"الجذر التربيعي",en:"Square Root"},description:{ar:"العدد الذي إذا ضرب في نفسه يعطي العدد الأصلي",en:"Number that when multiplied by itself gives the original number"},example:"√16 = 4",usage:{ar:"إيجاد طول الضلع",en:"Finding side length"},level:"basic"},{symbol:"∫",name:{ar:"التكامل",en:"Integral"},description:{ar:"عملية رياضية تجمع كميات متناهية الصغر للحصول على الكل",en:"Mathematical operation that sums infinitesimal quantities to find the whole"},example:"∫x² dx = x³/3 + C",usage:{ar:"حساب المساحة تحت المنحنى",en:"Calculating area under curve"},level:"advanced"},{symbol:"∂",name:{ar:"المشتقة الجزئية",en:"Partial Derivative"},description:{ar:"معدل التغير بالنسبة لمتغير مع ثبات باقي المتغيرات",en:"Rate of change with respect to one variable while others are constant"},example:"∂f/∂x",usage:{ar:"الدوال متعددة المتغيرات",en:"Multivariable functions"},level:"advanced"},{symbol:"∇",name:{ar:"النابلا (دل)",en:"Nabla (Del)"},description:{ar:"مؤثر تفاضلي شعاعي يستخدم في حساب التفاضل المتجهي",en:"Vector differential operator used in vector calculus"},example:"∇f = grad(f)",usage:{ar:"المتجهات والحقول",en:"Vectors and fields"},level:"advanced"},{symbol:"∑",name:{ar:"المجموع",en:"Summation"},description:{ar:"عملية جمع سلسلة من الأعداد وفق نمط معين",en:"Operation of adding a series of numbers according to a pattern"},example:"∑_{i=1}^{n} i = n(n+1)/2",usage:{ar:"جمع المتسلسلات",en:"Summing series"},level:"advanced"},{symbol:"∏",name:{ar:"الضرب المتسلسل",en:"Product"},description:{ar:"عملية ضرب سلسلة من الأعداد وفق نمط معين",en:"Operation of multiplying a series of numbers according to a pattern"},example:"∏_{i=1}^{n} i = n!",usage:{ar:"حساب المضروب",en:"Calculating factorial"},level:"advanced"}],V=[{symbol:"∞",name:{ar:"اللانهاية",en:"Infinity"},usage:"lim(x→∞) 1/x = 0"},{symbol:"π",name:{ar:"باي",en:"Pi"},usage:"C = 2πr"},{symbol:"≈",name:{ar:"تقريباً يساوي",en:"Approximately equal"},usage:"π ≈ 3.14"},{symbol:"≠",name:{ar:"لا يساوي",en:"Not equal"},usage:"2 ≠ 3"},{symbol:"≤",name:{ar:"أصغر أو يساوي",en:"Less than or equal"},usage:"x ≤ 5"},{symbol:"≥",name:{ar:"أكبر أو يساوي",en:"Greater than or equal"},usage:"y ≥ 0"}];$(()=>b(l()),()=>{E(M,B.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),$(()=>b(l()),()=>{E(_,V.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),se(),de();var O=Ke(),q=r(O),G=s(r(q));a(q);var w=s(q,2),P=r(w),j=r(P,!0);a(P),a(w);var T=s(w,2);ee(T,5,()=>e(M),re,(d,t)=>{var v=Je(),p=r(v),u=r(p),f=r(u,!0);a(u);var h=s(u,2),y=r(h,!0);a(h),a(p);var x=s(p,2),J=r(x,!0);a(x);var N=s(x,2),Q=r(N,!0);a(N);var I=s(N,2),k=r(I),U=r(k,!0);a(k);var L=s(k,2),Z=r(L,!0);a(L);var H=s(L,2),K=r(H,!0);a(H),a(I),a(v),D(()=>{ae(v,1,`operator-card ${e(t),c(()=>e(t).level)??""}`),n(f,(e(t),c(()=>e(t).symbol))),ae(h,1,`operator-level-badge ${e(t),c(()=>e(t).level)??""}`),n(y,(e(t),b(i()),c(()=>e(t).level==="basic"?i()==="ar"?"أساسي":"Basic":i()==="ar"?"متقدم":"Advanced"))),n(J,(e(t),b(i()),c(()=>e(t).name[i()]))),n(Q,(e(t),b(i()),c(()=>e(t).description[i()]))),n(U,i()==="ar"?"مثال:":"Example:"),n(Z,(e(t),c(()=>e(t).example))),n(K,(e(t),b(i()),c(()=>e(t).usage[i()])))}),g(d,v)}),a(T);var z=s(T,2),W=s(r(z));a(z);var A=s(z,2);ee(A,5,()=>e(_),re,(d,t)=>{var v=Ze(),p=r(v),u=r(p,!0);a(p);var f=s(p,2),h=r(f,!0);a(f);var y=s(f,2),x=r(y,!0);a(y),a(v),D(()=>{n(u,(e(t),c(()=>e(t).symbol))),n(h,(e(t),b(i()),c(()=>e(t).name[i()]))),n(x,(e(t),c(()=>e(t).usage)))}),g(d,v)}),a(A),ne(2),a(O),D(()=>{n(G,` ${i()==="ar"?"المؤثرات الرياضية":"Mathematical Operators"}`),n(j,i()==="ar"?"المؤثرات الرياضية هي رموز تستخدم لتمثيل العمليات الرياضية المختلفة، من العمليات الأساسية مثل الجمع والطرح إلى العمليات المتقدمة مثل التكامل والتفاضل.":"Mathematical operators are symbols used to represent various mathematical operations, from basic operations like addition and subtraction to advanced operations like integration and differentiation."),n(W,` ${i()==="ar"?"رموز رياضية خاصة":"Special Mathematical Symbols"}`)}),g(Y,O),le()}var $e=S('<div><div class="operator-header"><div class="operator-symbol"> </div> <div> </div></div> <div class="operator-name"> </div> <div class="operator-description"> </div> <div class="example-box"><div class="example-title"> </div> <div class="example-content"> </div> <div class="example-usage"> </div></div></div>'),ea=S('<div class="constant-card"><div class="constant-symbol"> </div> <div class="constant-name"> </div> <div class="constant-value"> </div></div>'),aa=S(`<div class="physics-section"><h2 class="section-title"><i class="fas fa-atom"></i> </h2> <div class="section-description"><p> </p></div> <div class="operators-grid"></div> <h3 class="sub-section-title"><i class="fas fa-balance-scale"></i> </h3> <div class="constants-grid"></div> <style>.physics-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--physics);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--physics);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(46, 204, 113, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--physics);
    }

    .sub-section-title {
      color: var(--physics);
      margin: 2rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .operators-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
      );
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .operator-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid var(--physics);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .operator-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px var(--shadow);
    }

    .operator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--physics);
      font-family: "Times New Roman", serif;
    }

    .operator-level-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .operator-level-badge.basic {
      background: rgba(243, 156, 18, 0.2);
      color: var(--warning);
    }

    .operator-level-badge.advanced {
      background: rgba(52, 73, 94, 0.2);
      color: var(--text-primary);
    }

    .operator-name {
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
    }

    .operator-description {
      color: var(--text-secondary);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .example-box {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .example-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--physics);
    }

    .example-content {
      font-family: "Courier New", monospace;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: var(--bg-secondary);
      border-radius: 5px;
    }

    .example-usage {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .constants-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .constant-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--physics);
      transition: all 0.3s ease;
    }

    .constant-card:hover {
      background: var(--physics);
      color: white;
      transform: scale(1.05);
    }

    .constant-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .constant-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .constant-value {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .constants-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }</style></div>`);function ra(Y,C){oe(C,!1);const M=F(),_=F();let i=te(C,"language",8,"ar"),l=te(C,"searchTerm",8,"");const B=[{symbol:"→",name:{ar:"المتجه",en:"Vector"},description:{ar:"كمية لها مقدار واتجاه، يمثل بسهم",en:"Quantity with magnitude and direction, represented by an arrow"},example:"v⃗ = 5 m/s east",usage:{ar:"السرعة، القوة، التسارع",en:"Velocity, force, acceleration"},level:"basic"},{symbol:"·",name:{ar:"الضرب النقطي",en:"Dot Product"},description:{ar:"عملية بين متجهين تعطي كمية قياسية",en:"Operation between two vectors that gives a scalar quantity"},example:"A·B = |A||B|cosθ",usage:{ar:"الشغل، التدفق",en:"Work, flux"},level:"basic"},{symbol:"×",name:{ar:"الضرب الاتجاهي",en:"Cross Product"},description:{ar:"عملية بين متجهين تعطي متجه عمودي عليهما",en:"Operation between two vectors that gives a vector perpendicular to both"},example:"τ = r × F",usage:{ar:"العزم، المجال المغناطيسي",en:"Torque, magnetic field"},level:"basic"},{symbol:"Δ",name:{ar:"دلتا (التغير)",en:"Delta (Change)"},description:{ar:"يمثل التغير أو الفرق في كمية ما",en:"Represents change or difference in a quantity"},example:"Δx = x₂ - x₁",usage:{ar:"الإزاحة، التغير في الطاقة",en:"Displacement, energy change"},level:"basic"},{symbol:"∇",name:{ar:"مؤثر النابلا",en:"Nabla Operator"},description:{ar:"مؤثر تفاضلي شعاعي يستخدم في الفيزياء الرياضية",en:"Vector differential operator used in mathematical physics"},example:"∇·E = ρ/ε₀",usage:{ar:"معادلات ماكسويل",en:"Maxwell's equations"},level:"advanced"},{symbol:"Ĥ",name:{ar:"مؤثر الهاملتون",en:"Hamiltonian Operator"},description:{ar:"مؤثر يمثل الطاقة الكلية للنظام في ميكانيكا الكم",en:"Operator representing total energy of system in quantum mechanics"},example:"ĤΨ = EΨ",usage:{ar:"معادلة شرودنجر",en:"Schrödinger's equation"},level:"advanced"},{symbol:"∂",name:{ar:"المشتق الجزئي",en:"Partial Derivative"},description:{ar:"معدل التغير بالنسبة لمتغير مع ثبات الباقي",en:"Rate of change with respect to one variable, others constant"},example:"∂T/∂t",usage:{ar:"معادلات الانتشار",en:"Diffusion equations"},level:"advanced"}],V=[{symbol:"c",name:{ar:"سرعة الضوء",en:"Speed of light"},value:"299,792,458 m/s"},{symbol:"G",name:{ar:"ثابت الجذب العام",en:"Gravitational constant"},value:"6.674×10⁻¹¹ N·m²/kg²"},{symbol:"h",name:{ar:"ثابت بلانك",en:"Planck's constant"},value:"6.626×10⁻³⁴ J·s"},{symbol:"k",name:{ar:"ثابت بولتزمان",en:"Boltzmann's constant"},value:"1.381×10⁻²³ J/K"},{symbol:"ε₀",name:{ar:"سماحية الفراغ",en:"Vacuum permittivity"},value:"8.854×10⁻¹² F/m"},{symbol:"μ₀",name:{ar:"نفاذية الفراغ",en:"Vacuum permeability"},value:"4π×10⁻⁷ H/m"}];$(()=>b(l()),()=>{E(M,B.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),$(()=>b(l()),()=>{E(_,V.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),se(),de();var O=aa(),q=r(O),G=s(r(q));a(q);var w=s(q,2),P=r(w),j=r(P,!0);a(P),a(w);var T=s(w,2);ee(T,5,()=>e(M),re,(d,t)=>{var v=$e(),p=r(v),u=r(p),f=r(u,!0);a(u);var h=s(u,2),y=r(h,!0);a(h),a(p);var x=s(p,2),J=r(x,!0);a(x);var N=s(x,2),Q=r(N,!0);a(N);var I=s(N,2),k=r(I),U=r(k,!0);a(k);var L=s(k,2),Z=r(L,!0);a(L);var H=s(L,2),K=r(H,!0);a(H),a(I),a(v),D(()=>{ae(v,1,`operator-card ${e(t),c(()=>e(t).level)??""}`),n(f,(e(t),c(()=>e(t).symbol))),ae(h,1,`operator-level-badge ${e(t),c(()=>e(t).level)??""}`),n(y,(e(t),b(i()),c(()=>e(t).level==="basic"?i()==="ar"?"أساسي":"Basic":i()==="ar"?"متقدم":"Advanced"))),n(J,(e(t),b(i()),c(()=>e(t).name[i()]))),n(Q,(e(t),b(i()),c(()=>e(t).description[i()]))),n(U,i()==="ar"?"مثال:":"Example:"),n(Z,(e(t),c(()=>e(t).example))),n(K,(e(t),b(i()),c(()=>e(t).usage[i()])))}),g(d,v)}),a(T);var z=s(T,2),W=s(r(z));a(z);var A=s(z,2);ee(A,5,()=>e(_),re,(d,t)=>{var v=ea(),p=r(v),u=r(p,!0);a(p);var f=s(p,2),h=r(f,!0);a(f);var y=s(f,2),x=r(y,!0);a(y),a(v),D(()=>{n(u,(e(t),c(()=>e(t).symbol))),n(h,(e(t),b(i()),c(()=>e(t).name[i()]))),n(x,(e(t),c(()=>e(t).value)))}),g(d,v)}),a(A),ne(2),a(O),D(()=>{n(G,` ${i()==="ar"?"المؤثرات الفيزيائية":"Physics Operators"}`),n(j,i()==="ar"?"المؤثرات الفيزيائية هي رموز تستخدم لتمثيل الكميات والعمليات في الفيزياء، من الميكانيكا الكلاسيكية إلى ميكانيكا الكم والنسبية.":"Physics operators are symbols used to represent quantities and operations in physics, from classical mechanics to quantum mechanics and relativity."),n(W,` ${i()==="ar"?"الثوابت الفيزيائية":"Physical Constants"}`)}),g(Y,O),le()}var ta=S('<div><div class="operator-header"><div class="operator-symbol"> </div> <div> </div></div> <div class="operator-name"> </div> <div class="operator-description"> </div> <div class="example-box"><div class="example-title"> </div> <div class="example-content"> </div> <div class="example-usage"> </div></div></div>'),ia=S('<div class="state-card"><div class="state-symbol"> </div> <div class="state-name"> </div> <div class="state-example"> </div></div>'),oa=S(`<div class="chemistry-section"><h2 class="section-title"><i class="fas fa-flask"></i> </h2> <div class="section-description"><p> </p></div> <div class="operators-grid"></div> <h3 class="sub-section-title"><i class="fas fa-vial"></i> </h3> <div class="states-grid"></div> <style>.chemistry-section {
      padding: 1rem;
    }

    .section-title {
      color: var(--chemistry);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--chemistry);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .section-description {
      background: rgba(155, 89, 182, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-right: 4px solid var(--chemistry);
    }

    .sub-section-title {
      color: var(--chemistry);
      margin: 2rem 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .operators-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(300px, 1fr)
      );
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .operator-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      border-left: 5px solid var(--chemistry);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .operator-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px var(--shadow);
    }

    .operator-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .operator-symbol {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--chemistry);
      font-family: "Times New Roman", serif;
    }

    .operator-level-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .operator-level-badge.basic {
      background: rgba(243, 156, 18, 0.2);
      color: var(--warning);
    }

    .operator-level-badge.advanced {
      background: rgba(52, 73, 94, 0.2);
      color: var(--text-primary);
    }

    .operator-name {
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: var(--text-primary);
    }

    .operator-description {
      color: var(--text-secondary);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .example-box {
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    .example-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--chemistry);
    }

    .example-content {
      font-family: "Courier New", monospace;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: var(--bg-secondary);
      border-radius: 5px;
    }

    .example-usage {
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-style: italic;
    }

    .states-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
      );
      gap: 1rem;
    }

    .state-card {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 10px;
      text-align: center;
      border: 2px solid var(--chemistry);
      transition: all 0.3s ease;
    }

    .state-card:hover {
      background: var(--chemistry);
      color: white;
      transform: scale(1.05);
    }

    .state-symbol {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-family: "Times New Roman", serif;
    }

    .state-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .state-example {
      font-family: "Courier New", monospace;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .operators-grid {
        grid-template-columns: 1fr;
      }

      .states-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }</style></div>`);function sa(Y,C){oe(C,!1);const M=F(),_=F();let i=te(C,"language",8,"ar"),l=te(C,"searchTerm",8,"");const B=[{symbol:"→",name:{ar:"سهم التفاعل",en:"Reaction Arrow"},description:{ar:"يشير إلى اتجاه التفاعل الكيميائي من المواد المتفاعلة إلى النواتج",en:"Indicates direction of chemical reaction from reactants to products"},example:"2H₂ + O₂ → 2H₂O",usage:{ar:"كتابة معادلات التفاعل",en:"Writing reaction equations"},level:"basic"},{symbol:"⇌",name:{ar:"سهم الاتزان",en:"Equilibrium Arrow"},description:{ar:"يشير إلى تفاعل عكسي عند حالة الاتزان",en:"Indicates reversible reaction at equilibrium state"},example:"N₂ + 3H₂ ⇌ 2NH₃",usage:{ar:"تفاعلات الاتزان",en:"Equilibrium reactions"},level:"basic"},{symbol:"Δ",name:{ar:"دلتا (التغير/الحرارة)",en:"Delta (Change/Heat)"},description:{ar:"يشير إلى التغير في كمية ما أو تطبيق الحرارة",en:"Indicates change in a quantity or application of heat"},example:"CaCO₃ → CaO + CO₂ (Δ)",usage:{ar:"التفاعلات الماصة أو الطاردة للحرارة",en:"Endothermic or exothermic reactions"},level:"basic"},{symbol:"↑",name:{ar:"تصاعد الغاز",en:"Gas Evolution"},description:{ar:"يشير إلى تصاعد غاز من التفاعل",en:"Indicates gas evolution from reaction"},example:"Zn + 2HCl → ZnCl₂ + H₂↑",usage:{ar:"تفاعلات تصاعد الغاز",en:"Gas evolution reactions"},level:"basic"},{symbol:"⦵",name:{ar:"الحالة القياسية",en:"Standard State"},description:{ar:"يشير إلى الكمية في الحالة القياسية (ضغط ١ بار، درجة حرارة محددة)",en:"Indicates quantity at standard state (1 bar pressure, specified temperature)"},example:"ΔG⦵",usage:{ar:"الديناميكا الحرارية",en:"Thermodynamics"},level:"advanced"},{symbol:"∇²",name:{ar:"مؤثر اللاپلاس",en:"Laplacian Operator"},description:{ar:"مؤثر تفاضلي يظهر في معادلات الانتشار ومعادلة شرودنجر",en:"Differential operator appearing in diffusion equations and Schrödinger equation"},example:"-ħ²/2m ∇²Ψ + VΨ = EΨ",usage:{ar:"الكيمياء الكمومية",en:"Quantum chemistry"},level:"advanced"},{symbol:"∂",name:{ar:"المشتق الجزئي",en:"Partial Derivative"},description:{ar:"معدل التغير بالنسبة لمتغير مع ثبات الباقي",en:"Rate of change with respect to one variable, others constant"},example:"(∂G/∂T)_p = -S",usage:{ar:"الديناميكا الحرارية الكيميائية",en:"Chemical thermodynamics"},level:"advanced"}],V=[{symbol:"(s)",name:{ar:"صلب",en:"Solid"},example:"NaCl(s)"},{symbol:"(l)",name:{ar:"سائل",en:"Liquid"},example:"H₂O(l)"},{symbol:"(g)",name:{ar:"غاز",en:"Gas"},example:"O₂(g)"},{symbol:"(aq)",name:{ar:"مذاب في الماء",en:"Aqueous"},example:"NaCl(aq)"},{symbol:"→[cat]",name:{ar:"مع عامل مساعد",en:"With catalyst"},example:"2H₂O₂ →[MnO₂] 2H₂O + O₂"},{symbol:"⇌",name:{ar:"اتزان",en:"Equilibrium"},example:"CH₃COOH ⇌ CH₃COO⁻ + H⁺"}];$(()=>b(l()),()=>{E(M,B.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),$(()=>b(l()),()=>{E(_,V.filter(d=>l()===""||d.symbol.includes(l())||d.name.ar.includes(l())||d.name.en.toLowerCase().includes(l().toLowerCase())))}),se(),de();var O=oa(),q=r(O),G=s(r(q));a(q);var w=s(q,2),P=r(w),j=r(P,!0);a(P),a(w);var T=s(w,2);ee(T,5,()=>e(M),re,(d,t)=>{var v=ta(),p=r(v),u=r(p),f=r(u,!0);a(u);var h=s(u,2),y=r(h,!0);a(h),a(p);var x=s(p,2),J=r(x,!0);a(x);var N=s(x,2),Q=r(N,!0);a(N);var I=s(N,2),k=r(I),U=r(k,!0);a(k);var L=s(k,2),Z=r(L,!0);a(L);var H=s(L,2),K=r(H,!0);a(H),a(I),a(v),D(()=>{ae(v,1,`operator-card ${e(t),c(()=>e(t).level)??""}`),n(f,(e(t),c(()=>e(t).symbol))),ae(h,1,`operator-level-badge ${e(t),c(()=>e(t).level)??""}`),n(y,(e(t),b(i()),c(()=>e(t).level==="basic"?i()==="ar"?"أساسي":"Basic":i()==="ar"?"متقدم":"Advanced"))),n(J,(e(t),b(i()),c(()=>e(t).name[i()]))),n(Q,(e(t),b(i()),c(()=>e(t).description[i()]))),n(U,i()==="ar"?"مثال:":"Example:"),n(Z,(e(t),c(()=>e(t).example))),n(K,(e(t),b(i()),c(()=>e(t).usage[i()])))}),g(d,v)}),a(T);var z=s(T,2),W=s(r(z));a(z);var A=s(z,2);ee(A,5,()=>e(_),re,(d,t)=>{var v=ia(),p=r(v),u=r(p,!0);a(p);var f=s(p,2),h=r(f,!0);a(f);var y=s(f,2),x=r(y,!0);a(y),a(v),D(()=>{n(u,(e(t),c(()=>e(t).symbol))),n(h,(e(t),b(i()),c(()=>e(t).name[i()]))),n(x,(e(t),c(()=>e(t).example)))}),g(d,v)}),a(A),ne(2),a(O),D(()=>{n(G,` ${i()==="ar"?"المؤثرات الكيميائية":"Chemistry Operators"}`),n(j,i()==="ar"?"المؤثرات الكيميائية هي رموز تستخدم لتمثيل التفاعلات والحالات والعمليات في الكيمياء، من التفاعلات الأساسية إلى الكيمياء الكمومية.":"Chemistry operators are symbols used to represent reactions, states, and processes in chemistry, from basic reactions to quantum chemistry."),n(W,` ${i()==="ar"?"حالات المادة والرموز":"States of Matter & Symbols"}`)}),g(Y,O),le()}var na=S(`<meta charset="UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/> <style>:root {
      --primary: #2c3e50;
      --secondary: #3498db;
      --accent: #e74c3c;
      --success: #27ae60;
      --warning: #f39c12;
      --logic: #3498db;
      --math: #e74c3c;
      --physics: #2ecc71;
      --chemistry: #9b59b6;
      --bg-primary: #ffffff;
      --bg-secondary: #f8f9fa;
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --border: #eaeaea;
      --shadow: rgba(0, 0, 0, 0.1);
    }

    .dark-mode {
      --bg-primary: #1a1a2e;
      --bg-secondary: #16213e;
      --text-primary: #e6e6e6;
      --text-secondary: #b3b3b3;
      --border: #2d3748;
      --shadow: rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family:
        "Segoe UI", "Tahoma", "Arial", sans-serif;
    }

    body {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
      line-height: 1.6;
      transition: all 0.3s ease;
      direction: rtl;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      margin-top: 6rem;
    }

    /* Header Styles */

    .header {
      background: linear-gradient(
        135deg,
        var(--logic),
        var(--math)
      );
      color: white;
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px var(--shadow);
      text-align: center;
      position: relative;
    }

    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
      max-width: 800px;
      margin: 0 auto;
    }

    .controls {
      position: absolute;
      left: 2rem;
      top: 2rem;
      display: flex;
      gap: 1rem;
    }

    .control-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .control-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    /* Search Bar */

    .search-container {
      background: var(--bg-primary);
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      box-shadow: 0 5px 15px var(--shadow);
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid var(--border);
      border-radius: 25px;
      font-size: 1rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--secondary);
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    }

    .search-icon {
      position: absolute;
      right: 2rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
    }

    /* Navigation Tabs */

    .nav-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
      background: var(--bg-primary);
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px var(--shadow);
    }

    .tab-btn {
      padding: 0.8rem 1.5rem;
      background: var(--bg-secondary);
      border: 2px solid;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .tab-btn.logic {
      border-color: var(--logic);
      color: var(--logic);
    }

    .tab-btn.math {
      border-color: var(--math);
      color: var(--math);
    }

    .tab-btn.physics {
      border-color: var(--physics);
      color: var(--physics);
    }

    .tab-btn.chemistry {
      border-color: var(--chemistry);
      color: var(--chemistry);
    }

    .tab-btn:hover {
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 5px 15px var(--shadow);
    }

    .tab-btn.logic:hover {
      background: var(--logic);
    }

    .tab-btn.math:hover {
      background: var(--math);
    }

    .tab-btn.physics:hover {
      background: var(--physics);
    }

    .tab-btn.chemistry:hover {
      background: var(--chemistry);
    }

    .tab-btn.active {
      color: white;
    }

    .tab-btn.logic.active {
      background: var(--logic);
    }

    .tab-btn.math.active {
      background: var(--math);
    }

    .tab-btn.physics.active {
      background: var(--physics);
    }

    .tab-btn.chemistry.active {
      background: var(--chemistry);
    }

    /* Content Area */

    .content-area {
      background: var(--bg-primary);
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px var(--shadow);
      min-height: 500px;
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Quick Facts */

    .quick-facts {
      background: linear-gradient(
        135deg,
        var(--bg-secondary),
        var(--bg-primary)
      );
      padding: 1.5rem;
      border-radius: 10px;
      margin-top: 2rem;
      border-right: 4px solid var(--secondary);
    }

    .quick-facts h3 {
      color: var(--secondary);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .fact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 5px;
    }

    /* Footer */

    .footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      margin-top: 2rem;
      font-size: 0.9rem;
    }

    /* Responsive Design */

    @media (max-width: 768px) {
      .header h1 {
        font-size: 1.8rem;
      }
      .controls {
        position: static;
        justify-content: center;
        margin-bottom: 1rem;
      }
      .tab-btn {
        padding: 0.6rem 1rem;
        font-size: 0.9rem;
      }
      .content-area {
        padding: 1rem;
      }
    }

    /* Print Styles */

    @media print {
      .controls,
      .search-container,
      .nav-tabs {
        display: none;
      }
      .header {
        background: white;
        color: black;
      }
    }</style>`,1),la=S('<i class="fas fa-sun"></i>'),da=S('<i class="fas fa-moon"></i>'),ca=S("<button><span> </span> <span> </span></button>"),ma=S('<div class="container"><header class="header"><div class="controls"><button class="control-btn" title="تبديل اللغة"><!></button> <button class="control-btn" title="الوضع الداكن"><!></button></div> <h1><!></h1> <p><!></p></header> <div class="search-container"><i class="fas fa-search search-icon"></i> <input type="text" class="search-input"/></div> <nav class="nav-tabs"></nav> <main class="content-area"><!></main> <div class="quick-facts"><h3><i class="fas fa-lightbulb"></i> </h3> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span><!></span></div> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span><!></span></div> <div class="fact-item"><i class="fas fa-check-circle" style="color: var(--success)"></i> <span><!></span></div></div> <footer class="footer"><p><!></p></footer></div>');function pa(Y,C){oe(C,!1);const M=F();let _=F("logic"),i=F("ar"),l=F(""),B=F(!1);const V=[{id:"logic",name:"المنطق",icon:"a"},{id:"math",name:"الرياضيات",icon:"∫"},{id:"physics",name:"الفيزياء",icon:"⚛"},{id:"chemistry",name:"الكيمياء",icon:"⚗"}];function O(){E(i,e(i)==="ar"?"en":"ar")}function q(){E(B,!e(B)),document.documentElement.classList.toggle("dark-mode",e(B))}$(()=>{},()=>{E(M,[])}),se();var G=ma();Ee("19i5eqo",o=>{var m=na();ne(6),Be(()=>{je.title="دليل شامل للمؤثرات في المنطق والعلوم"}),g(o,m)});var w=r(G),P=r(w),j=r(P),T=r(j);{var z=o=>{var m=R("ع");g(o,m)},W=o=>{var m=R("EN");g(o,m)};X(T,o=>{e(i)==="ar"?o(z):o(W,!1)})}a(j);var A=s(j,2),d=r(A);{var t=o=>{var m=la();g(o,m)},v=o=>{var m=da();g(o,m)};X(d,o=>{e(B)?o(t):o(v,!1)})}a(A),a(P);var p=s(P,2),u=r(p);{var f=o=>{var m=R("دليل شامل للمؤثرات في المنطق والعلوم");g(o,m)},h=o=>{var m=R(`Comprehensive Guide to Logic, Math, Physics &
        Chemistry Operators`);g(o,m)};X(u,o=>{e(i)==="ar"?o(f):o(h,!1)})}a(p);var y=s(p,2),x=r(y);{var J=o=>{var m=R(`مرجع تفاعلي شامل للمؤثرات والرموز المستخدمة في
        المنطق والرياضيات والفيزياء والكيمياء`);g(o,m)},N=o=>{var m=R(`Interactive reference guide for operators and
        symbols used in logic, mathematics, physics, and
        chemistry`);g(o,m)};X(x,o=>{e(i)==="ar"?o(J):o(N,!1)})}a(y),a(w);var Q=s(w,2),I=s(r(Q),2);Ge(I),a(Q);var k=s(Q,2);ee(k,5,()=>V,re,(o,m)=>{var ie=ca(),ge=r(ie),Me=r(ge,!0);a(ge);var we=s(ge,2),He=r(we,!0);a(we),a(ie),D(()=>{ae(ie,1,`tab-btn ${e(m),c(()=>e(m).id)??""} ${e(_),e(m),c(()=>e(_)===e(m).id?"active":"")??""}`),n(Me,(e(m),c(()=>e(m).icon))),n(He,(e(m),c(()=>e(m).name)))}),be("click",ie,()=>E(_,e(m).id)),g(o,ie)}),a(k);var U=s(k,2),L=r(U);{var Z=o=>{We(o,{get language(){return e(i)},get searchTerm(){return e(l)}})},H=o=>{Xe(o,{get language(){return e(i)},get searchTerm(){return e(l)}})},K=o=>{ra(o,{get language(){return e(i)},get searchTerm(){return e(l)}})},ke=o=>{sa(o,{get language(){return e(i)},get searchTerm(){return e(l)}})};X(L,o=>{e(_)==="logic"?o(Z):e(_)==="math"?o(H,1):e(_)==="physics"?o(K,2):e(_)==="chemistry"&&o(ke,3)})}a(U);var ce=s(U,2),me=r(ce),Ce=s(r(me));a(me);var ve=s(me,2),ue=s(r(ve),2),Oe=r(ue);{var qe=o=>{var m=R(`معظم الرموز الرياضية المعاصرة ظهرت في القرنين
          السادس عشر والسابع عشر`);g(o,m)},Te=o=>{var m=R(`Most modern mathematical symbols emerged in the
          16th-17th centuries`);g(o,m)};X(Oe,o=>{e(i)==="ar"?o(qe):o(Te,!1)})}a(ue),a(ve);var pe=s(ve,2),fe=s(r(pe),2),ze=r(fe);{var Ne=o=>{var m=R("رمز النهاية ∞ صممه جون واليس عام 1655");g(o,m)},Le=o=>{var m=R(`The infinity symbol ∞ was designed by John Wallis
          in 1655`);g(o,m)};X(ze,o=>{e(i)==="ar"?o(Ne):o(Le,!1)})}a(fe),a(pe);var he=s(pe,2),xe=s(r(he),2),Se=r(xe);{var Pe=o=>{var m=R(`رمز التكامل ∫ استوحاه لايبنتز من حرف S للكلمة
          اللاتينية "summa"`);g(o,m)},Ae=o=>{var m=R(`The integral symbol ∫ was inspired by Leibniz from
          the letter S for "summa"`);g(o,m)};X(Se,o=>{e(i)==="ar"?o(Pe):o(Ae,!1)})}a(xe),a(he),a(ce);var ye=s(ce,2),_e=r(ye),Ie=r(_e);{var Re=o=>{var m=R(`© 2024 دليل المؤثرات العلمية | تم التطوير لأغراض
        تعليمية`);g(o,m)},De=o=>{var m=R(`© 2024 Scientific Operators Guide | Developed for
        Educational Purposes`);g(o,m)};X(Ie,o=>{e(i)==="ar"?o(Re):o(De,!1)})}a(_e),a(ye),a(G),D(()=>{Qe(I,"placeholder",e(i)==="ar"?"ابحث عن مؤثر أو رمز...":"Search for an operator or symbol..."),n(Ce,` ${e(i)==="ar"?"حقائق سريعة":"Quick Facts"}`)}),be("click",j,O),be("click",A,q),Fe(I,()=>e(l),o=>E(l,o)),g(Y,G),le()}export{pa as component};
