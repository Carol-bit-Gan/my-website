const mainContent=document.querySelector('#top');
const nineWheelExperience=document.querySelector('#reading');

if(typeof copy!=='undefined'&&copy.zh){
  copy.zh.brand='天赋图鉴 跨文化天赋与东方战略';
  copy.zh.heroTitle='发现优势，并持续放大';
  copy.en.brand='Talent Atlas · Cross-Cultural Talent & Eastern Strategy';
  copy.es.brand='Atlas del Talento · Talento Intercultural y Estrategia Oriental';
  copy.zh.eyebrow='东方智慧 × 多文化';
  copy.zh.sys4='多文化模型';
  copy.en.eyebrow='Eastern wisdom × multicultural perspectives';
  copy.en.sys4='Multicultural models';
  copy.en.heroTitle='Discover Your Strengths.<br>Build on Them.';
  copy.en.heroLead='Explore identity, talent and strategy through the I Ching, Wu Xing, The Art of War, Maya traditions and other cultural perspectives.';
  copy.es.eyebrow='Sabiduría oriental × perspectivas multiculturales';
  copy.es.sys4='Modelos multiculturales';
  copy.es.heroTitle='Descubre tus fortalezas.<br>Poténcialas.';
  copy.es.heroLead='Explora la identidad, el talento y la estrategia a través del I Ching, Wu Xing, El arte de la guerra, las tradiciones mayas y otras perspectivas culturales.';
}

if(mainContent&&nineWheelExperience){
  mainContent.prepend(nineWheelExperience);
}

function setText(selector,value){
  const element=document.querySelector(selector);
  if(element&&element.textContent!==value)element.textContent=value;
}

function refineDisplayText(){
  document.title={zh:'天赋图鉴 跨文化天赋与东方战略',en:'Talent Atlas · Cross-Cultural Talent & Eastern Strategy',es:'Atlas del Talento · Talento Intercultural y Estrategia Oriental'}[lang];
  const fiveElements={
    zh:{wood:'木',fire:'火',earth:'土',gold:'金',water:'水'},
    en:{wood:'Wood',fire:'Fire',earth:'Earth',gold:'Gold',water:'Water'},
    es:{wood:'Madera',fire:'Fuego',earth:'Tierra',gold:'Oro',water:'Agua'}
  }[lang];
  setText('#wuxing-subtitle',{zh:'五行',en:'Wu Xing',es:'Wu Xing'}[lang]);
  document.querySelectorAll('.orbit [data-element]').forEach(element=>{
    const translated=fiveElements[element.dataset.element];
    if(element.textContent!==translated)element.textContent=translated;
  });
  const terminology={
    zh:{wheel:'九数玄轮',generate:'启动九数轮 →'},
    en:{wheel:'Jiushu Mystic Wheel',generate:'Jiushu →'},
    es:{wheel:'Rueda mística Jiushu',generate:'Jiushu →'}
  }[lang];
  setText('#wheel-system-label',terminology.wheel);
  setText('[data-i18n="generate"]',terminology.generate);
  if(lang==='zh'){
    setText('[data-i18n="eyebrow"]','东方智慧 × 多文化');
    setText('[data-i18n="sys4"]','多文化模型');
  }
  document.querySelectorAll('#reading *').forEach(element=>{
    if(element.children.length)return;
    let refined=element.textContent;
    if(lang==='en'){
      refined=refined.replace(/nine-number/gi,'Jiushu').replace('The wheel is turning…','The Jiushu mystic wheel is turning…');
    }else if(lang==='es'){
      refined=refined.replace(/nueve números/gi,'Jiushu').replace('La rueda está girando…','La rueda mística Jiushu está girando…');
    }
    if(refined!==element.textContent)element.textContent=refined;
  });
  document.querySelectorAll('#top *').forEach(element=>{
    if(element.children.length)return;
    const refined=lang==='en'?element.textContent.replace(/\bMetal\b/g,'Gold'):lang==='es'?element.textContent.replace(/\bMetal\b/g,'Oro'):element.textContent;
    if(refined!==element.textContent)element.textContent=refined;
  });
  document.querySelectorAll('#original-lens-copy,#step-calc-copy').forEach(element=>{
    const refined=element.textContent.replace(/^[0-9+]+=\d+(?:→\d+)*\s*(?:·|→)\s*/,'');
    if(refined!==element.textContent)element.textContent=refined;
  });
  document.querySelectorAll('.section h2,.reading h2').forEach(element=>{
    const refined=element.innerHTML.replace(/[，。,.]/g,'');
    if(refined!==element.innerHTML)element.innerHTML=refined;
  });
  document.querySelectorAll('p').forEach(element=>{
    if(!element.children.length){
      const refined=element.textContent.replace(/[。.!！?？]+\s*$/,'');
      if(refined!==element.textContent)element.textContent=refined;
    }
  });
}

document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',refineDisplayText));
document.querySelector('#birth-form')?.addEventListener('submit',refineDisplayText);
document.querySelector('#naming-form')?.addEventListener('submit',refineDisplayText);
if('MutationObserver' in window&&mainContent){
  new MutationObserver(refineDisplayText).observe(mainContent,{subtree:true,childList:true,characterData:true});
}
refineDisplayText();
