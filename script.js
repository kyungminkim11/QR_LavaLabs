const CONTACT={name:'김경민',title:'Brand Partner',company:'LAVA LABS',phoneDisplay:'010-9057-3970',phone:'+821090573970',email:'info@lavalabs.co.kr',website:'https://lavalabs.co.kr',cardUrl:'https://qr.lavalabs.co.kr/',address:'경기도 고양시 일산서구 일현로 47, 2층 Lava Labs'};
const SERVICE_LABELS={all:'전체',build:'제작·상담',tools:'운영 서비스',brands:'자체 브랜드',planned:'출시 준비'};
const CARD_VIEWS=new Set(['physical','digital']);
const CARD_VIEW_STORAGE_KEY='lava-labs-card-view';
const qrTargets=new Set();
let toastTimer=null;

function showToast(message){const toast=document.getElementById('toast');if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('is-visible');toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2200)}

async function copyText(text){try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text)}else{const area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()}showToast('복사했습니다.')}catch(error){console.error(error);showToast('복사하지 못했습니다.')}}

function downloadVCard(){const vcard=['BEGIN:VCARD','VERSION:3.0',`FN:${CONTACT.name}`,`N:${CONTACT.name};;;;`,`TITLE:${CONTACT.title}`,`ORG:${CONTACT.company}`,`TEL;TYPE=CELL:${CONTACT.phone}`,`EMAIL;TYPE=WORK:${CONTACT.email}`,`URL:${CONTACT.website}`,`ADR;TYPE=WORK:;;${CONTACT.address};;;;`,'END:VCARD'].join('\r\n');const blob=new Blob(['\ufeff',vcard],{type:'text/vcard;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`${CONTACT.company}_${CONTACT.name}.vcf`;document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);showToast('연락처 파일을 저장했습니다.')}

async function shareCard(){const data={title:`${CONTACT.name} | ${CONTACT.company}`,text:`${CONTACT.name} · ${CONTACT.title}\n${CONTACT.phoneDisplay}\n${CONTACT.email}`,url:CONTACT.cardUrl};if(navigator.share){try{await navigator.share(data);return}catch(error){if(error.name==='AbortError')return}}await copyText(data.url)}

function createQr(targetId,size){if(qrTargets.has(targetId))return;const target=document.getElementById(targetId);if(!target)return;if(!window.QRCode){target.textContent='QR 준비 중';return}target.textContent='';new window.QRCode(target,{text:CONTACT.cardUrl,width:size,height:size,correctLevel:window.QRCode.CorrectLevel.M});qrTargets.add(targetId)}

function openQr(){createQr('qrcode',150);const panel=document.getElementById('qrPanel');panel?.classList.add('is-open');panel?.setAttribute('aria-hidden','false')}
function closeQr(){const panel=document.getElementById('qrPanel');panel?.classList.remove('is-open');panel?.setAttribute('aria-hidden','true')}

function filterServices(filter){const cards=[...document.querySelectorAll('[data-service-card]')];let visibleCount=0;cards.forEach(card=>{const visible=filter==='all'||card.dataset.serviceCategory===filter;card.hidden=!visible;if(visible)visibleCount+=1});const count=document.getElementById('serviceCount');if(count){const label=SERVICE_LABELS[filter]||'서비스';count.textContent=`${label} ${visibleCount}개`}}

function initServiceFilters(){const buttons=[...document.querySelectorAll('[data-service-filter]')];if(!buttons.length)return;buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));filterServices(button.dataset.serviceFilter)}));filterServices('all')}

function getStoredCardView(){try{const saved=localStorage.getItem(CARD_VIEW_STORAGE_KEY);return CARD_VIEWS.has(saved)?saved:null}catch(error){return null}}

function setCardView(view,{persist=true}={}){const nextView=CARD_VIEWS.has(view)?view:'digital';document.querySelectorAll('[data-card-view-panel]').forEach(panel=>{panel.hidden=panel.dataset.cardViewPanel!==nextView});document.querySelectorAll('[data-card-view-button]').forEach(button=>{const selected=button.dataset.cardViewButton===nextView;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1});document.documentElement.dataset.cardView=nextView;if(nextView==='physical')createQr('physicalQrcode',112);if(persist){try{localStorage.setItem(CARD_VIEW_STORAGE_KEY,nextView)}catch(error){console.warn('보기 설정을 저장하지 못했습니다.',error)}}}

function initCardViewSwitcher(){const buttons=[...document.querySelectorAll('[data-card-view-button]')];if(!buttons.length)return;buttons.forEach((button,index)=>{button.addEventListener('click',()=>setCardView(button.dataset.cardViewButton));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let nextIndex=index;if(event.key==='ArrowLeft')nextIndex=(index-1+buttons.length)%buttons.length;if(event.key==='ArrowRight')nextIndex=(index+1)%buttons.length;if(event.key==='Home')nextIndex=0;if(event.key==='End')nextIndex=buttons.length-1;buttons[nextIndex].focus();setCardView(buttons[nextIndex].dataset.cardViewButton)})});const requested=new URLSearchParams(window.location.search).get('view');setCardView(CARD_VIEWS.has(requested)?requested:(getStoredCardView()||'digital'),{persist:false})}

function setPhysicalCardFlipped(flipped){const card=document.querySelector('.business-card');if(!card)return;card.classList.toggle('is-flipped',flipped);document.querySelectorAll('[data-flip-card]').forEach(button=>button.setAttribute('aria-pressed',String(flipped)))}

function initPhysicalCard(){document.querySelectorAll('[data-flip-card]').forEach(button=>button.addEventListener('click',()=>{const card=document.querySelector('.business-card');setPhysicalCardFlipped(!card?.classList.contains('is-flipped'))}))}

function init(){document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',()=>copyText(button.dataset.copy)));document.querySelectorAll('[data-download-vcard]').forEach(button=>button.addEventListener('click',downloadVCard));document.querySelectorAll('[data-share]').forEach(button=>button.addEventListener('click',shareCard));document.querySelectorAll('[data-open-qr]').forEach(button=>button.addEventListener('click',openQr));document.querySelectorAll('[data-close-qr]').forEach(button=>button.addEventListener('click',closeQr));initCardViewSwitcher();initPhysicalCard();initServiceFilters();document.addEventListener('keydown',event=>{if(event.key==='Escape')closeQr()});document.addEventListener('click',event=>{const panel=document.getElementById('qrPanel');if(panel?.classList.contains('is-open')&&!panel.contains(event.target)&&!event.target.closest('[data-open-qr]'))closeQr()})}

document.addEventListener('DOMContentLoaded',init);
