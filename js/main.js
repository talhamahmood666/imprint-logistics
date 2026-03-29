/* ===== CUSTOM CURSOR ===== */
const dot=document.querySelector('.cursor-dot');
const ring=document.querySelector('.cursor-ring');
const glow=document.querySelector('.cursor-glow');
let mx=0,my=0,rx=0,ry=0,gx=0,gy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx-4+'px';dot.style.top=my-4+'px'});
function animateCursor(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx-20+'px';ring.style.top=ry-20+'px';gx+=(mx-gx)*.06;gy+=(my-gy)*.06;glow.style.left=gx-100+'px';glow.style.top=gy-100+'px';requestAnimationFrame(animateCursor)}
animateCursor();
document.querySelectorAll('a,button,.card,.team-member,.partner-card,.faq-q,.contact-info-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.classList.add('hover');dot.classList.add('hover')});
  el.addEventListener('mouseleave',()=>{ring.classList.remove('hover');dot.classList.remove('hover')});
});

/* ===== PARTICLES ===== */
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let W,H;
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset()}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.r=Math.random()*1.5+.5;this.o=Math.random()*.3+.05;this.color=Math.random()>.7?'247,147,26':'0,229,160'}
  update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.o})`;ctx.fill()}
}
const particles=Array.from({length:70},()=>new Particle());
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x;const dy=particles[i].y-particles[j].y;const d=Math.sqrt(dx*dx+dy*dy);if(d<150){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(247,147,26,${.06*(1-d/150)})`;ctx.lineWidth=.5;ctx.stroke()}}}
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== NAV SCROLL ===== */
window.addEventListener('scroll',()=>{document.querySelector('nav').classList.toggle('scrolled',window.scrollY>60)});

/* ===== SCROLL REVEAL ===== */
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');observer.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

/* ===== MOBILE MENU ===== */
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.querySelector('.mobile-menu');
const mobileClose=document.querySelector('.mobile-close');
if(hamburger){hamburger.addEventListener('click',()=>mobileMenu.classList.add('open'))}
if(mobileClose){mobileClose.addEventListener('click',()=>mobileMenu.classList.remove('open'))}
if(mobileMenu){mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')))}

/* ===== FAQ TOGGLE ===== */
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const item=q.parentElement;
    const ans=item.querySelector('.faq-a');
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-a').style.maxHeight='0'});
    if(!isOpen){item.classList.add('open');ans.style.maxHeight=ans.scrollHeight+'px'}
  });
});
