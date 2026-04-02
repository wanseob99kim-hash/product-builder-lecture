/* ===== Theme Toggle ===== */
(function(){
  const saved=localStorage.getItem('theme');
  if(saved) document.documentElement.setAttribute('data-theme',saved);
  else if(matchMedia('(prefers-color-scheme:dark)').matches) document.documentElement.setAttribute('data-theme','dark');
})();
function toggleTheme(){
  const html=document.documentElement;
  const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
  html.setAttribute('data-theme',next);
  localStorage.setItem('theme',next);
  const btn=document.querySelector('.theme-toggle');
  if(btn) btn.textContent=next==='dark'?'\u2600\ufe0f':'\ud83c\udf19';
}

/* ===== Mobile Nav ===== */
function toggleNav(){
  document.querySelector('.nav').classList.toggle('open');
}

/* ===== FAQ Accordion ===== */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      const item=this.parentElement;
      const wasOpen=item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open')});
      if(!wasOpen) item.classList.add('open');
    });
  });

  /* theme button icon */
  const btn=document.querySelector('.theme-toggle');
  if(btn){
    btn.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'\u2600\ufe0f':'\ud83c\udf19';
  }
});

/* ===== Powerball Generator ===== */
function generateSets(){
  var container=document.getElementById('number-sets');
  if(!container) return;
  container.innerHTML='';
  for(var s=1;s<=5;s++){
    var whites=[];
    while(whites.length<5){
      var n=Math.floor(Math.random()*69)+1;
      if(whites.indexOf(n)===-1) whites.push(n);
    }
    whites.sort(function(a,b){return a-b});
    var pb=Math.floor(Math.random()*26)+1;

    var row=document.createElement('div');
    row.className='number-set';
    row.innerHTML='<span class="set-label">Set '+s+'</span>';
    whites.forEach(function(w){
      var ball=document.createElement('span');
      ball.className='number-ball';
      ball.textContent=w;
      ball.style.animationDelay=(Math.random()*.3)+'s';
      row.appendChild(ball);
    });
    var pbBall=document.createElement('span');
    pbBall.className='number-ball powerball';
    pbBall.textContent=pb;
    row.appendChild(pbBall);
    container.appendChild(row);
  }
}

/* ===== Contact Form ===== */
function handleContact(e){
  e.preventDefault();
  var form=e.target;
  var msg=document.getElementById('form-msg');
  if(msg){
    msg.textContent='Thank you for your message! We will get back to you within 48 hours.';
    msg.style.color='var(--primary)';
  }
  form.reset();
  return false;
}
