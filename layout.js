const mainContent=document.querySelector('#top');
const nineWheelExperience=document.querySelector('#reading');

if(mainContent&&nineWheelExperience){
  mainContent.prepend(nineWheelExperience);
}

function refineDisplayText(){
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
