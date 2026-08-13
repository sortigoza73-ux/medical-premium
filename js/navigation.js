
(()=>{
  const nav=document.querySelector("#mpNav");
  const menu=document.querySelector("#mpMenu");
  const links=[...document.querySelectorAll("#mpNav a")];
  const sections=[...document.querySelectorAll("main section[id]")];

  const closeMenu=()=>nav?.classList.remove("is-open");
  menu?.addEventListener("click",()=>{
    const open=nav?.classList.toggle("is-open");
    menu.setAttribute("aria-expanded",String(Boolean(open)));
  });
  links.forEach(a=>a.addEventListener("click",closeMenu));

  const update=()=>{
    let current="";
    sections.forEach(s=>{
      if(s.getBoundingClientRect().top<=innerHeight*.38) current=s.id;
    });
    links.forEach(a=>a.classList.toggle("is-active",a.hash==="#"+current));
  };
  update();
  addEventListener("scroll",update,{passive:true});
  addEventListener("resize",()=>{if(innerWidth>1150)closeMenu()},{passive:true});
})();


/* Development QA: detect horizontal overflow offenders. */
(()=>{
  const auditOverflow=()=>{
    if(innerWidth>760) return;
    const vw=document.documentElement.clientWidth;
    const offenders=[];
    document.querySelectorAll("body *").forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.width>vw+2 || r.right>vw+2 || r.left<-2){
        const cs=getComputedStyle(el);
        if(cs.position!=="fixed") offenders.push({
          tag:el.tagName,
          cls:el.className,
          left:Math.round(r.left),
          right:Math.round(r.right),
          width:Math.round(r.width)
        });
      }
    });
    if(offenders.length) console.warn("MEDICAL PREMIUM mobile overflow:",offenders.slice(0,30));
    else console.info("MEDICAL PREMIUM mobile overflow audit: PASS");
  };
  addEventListener("load",()=>setTimeout(auditOverflow,250));
  addEventListener("resize",()=>setTimeout(auditOverflow,150),{passive:true});
})();
