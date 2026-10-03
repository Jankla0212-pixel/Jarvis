const input=document.getElementById('input'),messages=document.getElementById('messages');
function add(text,who='jarvis'){const d=document.createElement('div');d.className='msg '+who;d.textContent=text;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
function speak(t){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}
function reply(q){q=q.toLowerCase();let r;if(q.includes('uhr'))r='Es ist '+new Date().toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})+' Uhr.';else if(q.includes('datum'))r='Heute ist '+new Date().toLocaleDateString('de-DE')+'.';else r='Befehl empfangen. JARVIS V1 ist bereit.';add(r);speak(r)}
function send(){const q=input.value.trim();if(!q)return;add(q,'user');input.value='';reply(q)}
function ask(q){input.value=q;send()}
function voice(){if(!('webkitSpeechRecognition'in window||'SpeechRecognition'in window)){speak('Spracherkennung wird auf diesem Gerät nicht unterstützt.');return}const R=window.SpeechRecognition||window.webkitSpeechRecognition,r=new R();r.lang='de-DE';r.onresult=e=>{input.value=e.results[0][0].transcript;send()};r.start()}
