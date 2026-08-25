let tracks=[],visibleSongs=0,movies=[];
const $=id=>document.getElementById(id);
const PLAYLIST_ID='PL3cTse0YhM79CcS9HP_BpzPkuJe94EYV7';

async function loadData(){
  try{
    const r=await fetch('/api/data'); const data=await r.json();
    tracks=data.officialTracks||[]; movies=data.filmography||[];
    renderArtist(data.artist); renderSongs(); renderMovies();
    $('catalogStatus').textContent=`LIVE CATALOG · ${data.catalog?.source||'VERIFIED SOURCES'}`;
    $('catalogUpdated').textContent=new Date(data.lastUpdated).toLocaleString();
    $('filmCount').textContent=String(movies.length);
  }catch(e){
    $('catalogStatus').textContent='CATALOG · OFFLINE'; renderSongs(); renderMovies();
  }
}
function renderArtist(a){
  if(!a)return;
  $('aboutLive').textContent=a.description;
  $('songCount').textContent=a.stats?.songs||'38,000+';
  $('languageCount').textContent=a.stats?.languages||'40+';
  const facts=$('aboutFacts'); if(facts){facts.innerHTML=[['BORN','18 November 1972'],['LEGACY','1972 — 2025'],['LANGUAGES','40+'],['RECORDED WORK','38,000+']].map(x=>`<div class="about-fact"><small>${escapeHtml(x[0])}</small><strong>${escapeHtml(x[1])}</strong><p>Documented in public biographical and music sources.</p></div>`).join('');}
}
function renderSongs(){
  const grid=$('songGrid'); if(!grid)return;
  if(!tracks.length){grid.innerHTML='<div class="empty">No verified track metadata is available from the connected catalog. Use the official music catalog.</div>';return;}
  const photoPool=[
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_in_a_concert_in_2016_(4).jpg',
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_in_a_concert_in_2016_(8).jpg',
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_in_a_concert_in_2016_(2).jpg',
    'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_at_Edufest_2016_in_GMCH.jpg'
  ];
  const preview=tracks.slice(0,4);
  grid.innerHTML=preview.map((t,i)=>{
    const photo=photoPool[i%photoPool.length];
    return `<a class="song-card" href="/music.html">
      <div class="song-art"><img src="${escapeAttr(photo)}" alt="Zubeen Garg — ${escapeAttr(t.title)}" loading="lazy"><span class="song-play">↗</span></div>
      <div class="song-title">${escapeHtml(t.title)}</div>
      <div class="song-sub">${escapeHtml(t.album||'Zubeen Garg')}</div>
    </a>`;
  }).join('');
}
function renderMovies(){
  const grid=$('movieGrid'); if(!grid)return;
  if(!movies.length){grid.innerHTML='<div class="empty">Verified filmography temporarily unavailable.</div>';return;}
  const preview=movies.slice(0,3);
  grid.innerHTML=preview.map(m=>`<a class="movie-card" href="/movies.html"><img src="${escapeAttr(m.artwork||'/assets/about.jpg')}" alt="${escapeAttr(m.title)}" loading="lazy"><div><strong>${escapeHtml(m.title)}</strong><small>${escapeHtml(String(m.year||''))} · ${escapeHtml(m.role||'Credit')}</small><span class="watch-line">VIEW FILM ↗</span></div></a>`).join('');
}
function playlistSrc(withSound=false){
  return `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&autoplay=${withSound?'1':'0'}&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
}
let ytPlayer=null, ytReady=false;
function setRadioPlaying(playing){
  const radio=document.querySelector('.radio-machine');
  if(!radio)return;
  radio.classList.toggle('is-playing',!!playing);
  const state=$('videoState');
  if(state)state.textContent=playing?'PLAYING':'READY';
  const button=$('videoSound');
  if(button)button.textContent=playing?'PLAYING':'PLAY WITH SOUND';
}
function playTrackOnPage(withSound=false){ playDefaultVideo(withSound); }
function playDefaultVideo(withSound=false){
  const frame=$('ambientVideo'); if(!frame)return;
  if(ytPlayer && ytReady){
    if(withSound){
      try{ytPlayer.unMute();}catch(e){}
      try{ytPlayer.playVideo();}catch(e){}
    }else{
      try{ytPlayer.pauseVideo();}catch(e){}
    }
    return;
  }
  const src=playlistSrc(withSound);
  if(frame.src!==src)frame.src=src;
}
function initYouTubePlayer(){
  const frame=$('ambientVideo');
  if(!frame || !window.YT || !YT.Player)return;
  ytPlayer=new YT.Player(frame,{
    events:{
      onReady:()=>{ytReady=true;setRadioPlaying(false);},
      onStateChange:(event)=>{
        const playing=event.data===YT.PlayerState.PLAYING;
        setRadioPlaying(playing);
      }
    }
  });
}
function loadYouTubeAPI(){
  if(window.YT && YT.Player){initYouTubePlayer();return;}
  window.onYouTubeIframeAPIReady=initYouTubePlayer;
  const s=document.createElement('script');
  s.src='https://www.youtube.com/iframe_api';
  s.async=true;
  document.head.appendChild(s);
}
function escapeHtml(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function escapeAttr(v=''){return escapeHtml(v).replace(/`/g,'&#096;')}
$('openMenu').addEventListener('click',()=>{ if(document.body.classList.contains('menu-open')) closeMenu(); else openMenu(); });
function openMenu(){$('drawer').classList.add('open');$('drawer').setAttribute('aria-hidden','false');$('openMenu').setAttribute('aria-expanded','true');$('openMenu').setAttribute('aria-label','Close menu');document.body.classList.add('menu-open')}
function closeMenu(){$('drawer').classList.remove('open');$('drawer').setAttribute('aria-hidden','true');$('openMenu').setAttribute('aria-expanded','false');$('openMenu').setAttribute('aria-label','Open menu');document.body.classList.remove('menu-open')}
document.querySelectorAll('.drawer a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu()}});
if($('videoSound'))$('videoSound').addEventListener('click',()=>{
  if(ytPlayer && ytReady){
    try{ytPlayer.unMute();ytPlayer.playVideo();}catch(e){}
  }else{
    playDefaultVideo(true);
  }
});
if($('watchBtn'))$('watchBtn').addEventListener('click',()=>{
  playDefaultVideo(true);
  document.querySelector('.video-strip').scrollIntoView({behavior:'smooth',block:'center'});
});
if($('year'))$('year').textContent=new Date().getFullYear();
if($('drawerYear'))$('drawerYear').textContent=new Date().getFullYear();
setRadioPlaying(false);
loadYouTubeAPI();
loadData();
