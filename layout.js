const mainContent=document.querySelector('#top');
const nineWheelExperience=document.querySelector('#reading');

if(typeof copy!=='undefined'&&copy.zh){
  copy.zh.eyebrow='东方智慧 × 多文化';
  copy.zh.sys4='多文化模型';
  copy.en.eyebrow='Eastern wisdom × multicultural perspectives';
  copy.en.sys4='Multicultural models';
  copy.es.eyebrow='Sabiduría oriental × perspectivas multiculturales';
  copy.es.sys4='Modelos multiculturales';
}

if(mainContent&&nineWheelExperience){
  mainContent.prepend(nineWheelExperience);
}

function setText(selector,value){
  const element=document.querySelector(selector);
  if(element&&element.textContent!==value)element.textContent=value;
}

function refineDisplayText(){
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
  document.querySelectorAll('#original-lens-copy,#step-calc-copy').forEach(element=>{
    const refined=element.textContent.replace(/^[0-9+]+=\d+(?:→\d+)*\s*(?:·|→)\s*/,'');
    if(refined!==element.textContent)element.textContent=refined;
  });
  document.querySelectorAll('h1,h2').forEach(element=>{
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
