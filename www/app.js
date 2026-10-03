const input=document.getElementById('input');
const messages=document.getElementById('messages');
let balance=10000;
let wealth=10000;
let listening=false;

function add(text,who='jarvis'){
 const d=document.createElement('div');
 d.className='msg '+who;
 d.textContent=text;
 messages.appendChild(d);
 messages.scrollTop=messages.scrollHeight;
}

function speak(text){
 if(!('speechSynthesis' in window)) return;
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text);
 u.lang='de-DE';
 u.rate=.95;
 u.pitch=1;
 speechSynthesis.speak(u);
}

function money(n){
 return n.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
}

function update(){
 document.getElementById('balance').textContent=money(balance);
 document.getElementById('wealth').textContent=money(wealth);
}

function reply(q){
 const original=q.trim();
 q=original.toLowerCase();
 let r='';

 if(q.includes('uhr'))
   r='Es ist '+new Date().toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr.';

 else if(q.includes('datum'))
   r='Heute ist '+new Date().toLocaleDateString('de-DE')+'.';

 else if(q.includes('hallo')||q.includes('hi')||q.includes('hey'))
   r='Hallo. JARVIS ist online und bereit.';

 else if(q.includes('wer bist'))
   r='Ich bin JARVIS, deine digitale Assistenz.';

 else if(q.includes('vermögen')||q.includes('geld')||q.includes('konto'))
   r='Dein aktuelles Demo-Vermögen beträgt '+money(wealth)+'.';

 else if(q.includes('trading')||q.includes('trade')||q.includes('aktie'))
   r='Demo-Trading aktiviert. Dein virtuelles Startkapital beträgt '+money(balance)+'. Noch wird kein echtes Geld verwendet.';

 else if(q.includes('kaufen'))
 {
   balance-=100;
   wealth+=100;
   update();
   r='Demo-Kauf ausgeführt. 100 Euro wurden virtuell investiert. Kontostand: '+money(balance)+'.';
 }

 else if(q.includes('verkaufen'))
 {
   balance+=100;
   wealth-=100;
   update();
   r='Demo-Verkauf ausgeführt. 100 Euro wurden virtuell verkauft. Kontostand: '+money(balance)+'.';
 }

 else if(q.includes('business')||q.includes('unternehmen'))
   r='Business-Modus gestartet. Ich kann dir beim Geschäftsmodell, Namen, Angebot, Planung, Marketing und nächsten Schritten helfen.';

 else if(q.includes('telefon')||q.includes('anrufen'))
   r='Telefon-Modus ist vorbereitet. Für einen echten Anruf benötigt JARVIS später eine Telefonie-Schnittstelle und deine ausdrückliche Freigabe.';

 else if(q.includes('hilfe'))
   r='Du kannst mich per Text oder Stimme bedienen. Zum Beispiel: Vermögen, Trading, Business, Uhrzeit, Datum oder Telefon.';

 else
   r='Verstanden. Du hast gesagt: '+original+'. JARVIS hat den Befehl empfangen.';

 add(r);
 speak(r);
}

function send(){
 const q=input.value.trim();
 if(!q)return;
 add(q,'user');
 input.value='';
 reply(q);
}

function ask(q){
 input.value=q;
 send();
}

function voice(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;

 if(!R){
   const t='Die Spracherkennung wird auf diesem Gerät nicht unterstützt.';
   add(t);
   speak(t);
   return;
 }

 if(listening)return;

 const r=new R();
 r.lang='de-DE';
 r.continuous=false;
 r.interimResults=false;
 listening=true;

 const mic=document.getElementById('mic');
 mic.textContent='🔴';

 r.onresult=e=>{
   const text=e.results[0][0].transcript;
   input.value=text;
   send();
 };

 r.onerror=()=>{
   const t='Ich konnte dich nicht verstehen. Bitte versuche es erneut.';
   add(t);
   speak(t);
 };

 r.onend=()=>{
   listening=false;
   mic.textContent='🎙';
 };

 r.start();
}

function callJarvis(){
 const t='Telefon-Modus ist bereit. Ein echter Telefonanruf wird erst nach Einrichtung einer Telefonie-API möglich.';
 add(t);
 speak(t);
}

input.addEventListener('keydown',e=>{
 if(e.key==='Enter')send();
});

window.send=send;
window.ask=ask;
window.voice=voice;
window.callJarvis=callJarvis;

update();
