
document.addEventListener("DOMContentLoaded",function(){
  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector("#primary-nav");
  const closeMenu=()=>{
    document.body.classList.remove("menu-open");
    if(menu){menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Open navigation");}
  };
  if(menu && nav){
    menu.addEventListener("click",()=>{
      const isOpen=document.body.classList.toggle("menu-open");
      menu.setAttribute("aria-expanded",String(isOpen));
      menu.setAttribute("aria-label",isOpen?"Close navigation":"Open navigation");
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
    document.addEventListener("click",e=>{
      if(document.body.classList.contains("menu-open") && !e.target.closest(".site-header"))closeMenu();
    });
  }

  const languageMenu=document.querySelector(".lang-menu");
  if(languageMenu){
    document.addEventListener("click",e=>{
      if(!languageMenu.contains(e.target))languageMenu.removeAttribute("open");
    });
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape")languageMenu.removeAttribute("open");
    });
  }

  // All 144 article links remain in server HTML for SEO and JS-disabled readers.
  const field=document.getElementById("note-search");
  const list=document.getElementById("notes");
  if(field && list){
    const cards=Array.from(list.querySelectorAll(".blog-card"));
    const chips=Array.from(document.querySelectorAll(".filter-chip"));
    const more=document.getElementById("load-more");
    const showing=document.querySelector(".blog-showing");
    const empty=document.querySelector(".empty-result");
    const countText=document.querySelector(".blog-controls > span");
    const step=24;
    let limit=step,topic="all";
    const matches=card=>{
      const q=field.value.trim().toLocaleLowerCase();
      const phrase=(card.getAttribute("data-search")||"").toLocaleLowerCase();
      const topics=(card.getAttribute("data-topics")||"").split(/\s+/);
      return (!q||phrase.includes(q))&&(topic==="all"||topics.includes(topic));
    };
    const apply=()=>{
      let matched=0,visible=0;
      for(const card of cards){
        const found=matches(card);
        if(found)matched++;
        const show=found&&matched<=limit;
        card.hidden=!show;
        if(show)visible++;
      }
      if(empty)empty.hidden=matched>0;
      if(more)more.hidden=matched<=visible;
      if(showing)showing.textContent=matched>0?"Showing "+visible+" of "+matched+" matching notes":"No matching notes";
      if(countText)countText.textContent=matched+" MATCHING NOTES & GUIDES";
    };
    field.addEventListener("input",()=>{limit=step;apply();});
    field.addEventListener("search",()=>{limit=step;apply();});
    for(const chip of chips){
      chip.addEventListener("click",()=>{
        topic=chip.getAttribute("data-topic")||"all";
        limit=step;
        chips.forEach(x=>x.setAttribute("aria-pressed",String(x===chip)));
        apply();
      });
    }
    if(more)more.addEventListener("click",()=>{limit+=step;apply();});
    apply();
  }

  // Copies a blank RFQ template locally; no data is transmitted.
  const templates={
    auto:"AUTOMOTIVE PARTS RFQ\nOEM part number:\nVehicle model / chassis:\nQuantity:\nCondition / genuine OEM requirement:\nTarget buying price and currency:\nDestination country / port:\nDate needed:\nRequired documents:\nCompany and contact:",
    industrial:"INDUSTRIAL MPN RFQ\nManufacturer / full MPN:\nQuantity:\nCondition / warranty:\nEnd use / end user:\nTarget buying price and currency:\nDestination country:\nDate needed:\nCompany and contact:",
    vehicle:"VEHICLE BUYING BRIEF\nMake / model / grade:\nProduction year / RHD-LHD / specifications:\nQuantity and requested condition:\nTarget FOB Japan price / currency:\nDestination port and import licence status:\nRequired registration / export documents:\nRequested shipment timing:\nCompany and contact:"
  };
  for(const button of document.querySelectorAll(".copy-rfq")){
    button.addEventListener("click",async()=>{
      const source=button.getAttribute("data-template");
      const template=templates[source];
      if(!template)return;
      const message=button.closest(".brief-section,.section")?.querySelector(".copy-feedback")||document.querySelector(".copy-feedback");
      let copied=false;
      try{
        if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(template);copied=true;}
        else {
          const helper=document.createElement("textarea");
          helper.value=template;
          helper.setAttribute("readonly","");
          helper.style.position="fixed";helper.style.left="-10000px";
          document.body.appendChild(helper);helper.select();
          copied=document.execCommand("copy");
          helper.remove();
        }
      }catch(e){copied=false;}
      if(message){
        message.hidden=false;
        message.textContent=copied?"Buying brief copied. Add your exact details and send it using the official RFQ form or email.":"Clipboard access is unavailable. Select and copy this template:\n"+template;
      }
      if(copied){
        const previous=button.textContent;
        button.textContent="COPIED ✓";
        window.setTimeout(()=>{button.textContent=previous;},2200);
      }
    });
  }
});
