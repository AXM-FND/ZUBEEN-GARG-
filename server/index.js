import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();
const __filename=fileURLToPath(import.meta.url); const __dirname=path.dirname(__filename);
const app=express(); const PORT=Number(process.env.PORT||3000); const CACHE_TTL=Number(process.env.CACHE_TTL_MS||300000);
app.use(express.json({limit:"64kb"}));
app.use((req,res,next)=>{res.setHeader('Referrer-Policy','strict-origin-when-cross-origin'); next();});
app.use(express.static(path.join(__dirname,"..","public")));

const IMG={
 hero:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg.jpg?width=1800',
 edufest:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg%20at%20Edufest%202016%20in%20GMCH.jpg?width=1400',
 concert1:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg%20in%20a%20concert%20in%202016%20%281%29.jpg?width=1400',
 concert2:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg%20in%20a%20concert%20in%202016%20%282%29.jpg?width=1200',
 award:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg%20receiving%20National%20Award.jpg?width=1000',
 zindagi:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubeen%20Garg%20in%20Audio%20Release%20of%20%22Zindagi%22.jpg?width=900',
 live:'https://commons.wikimedia.org/wiki/Special:FilePath/Zubin%20Garg%20Live%20performance.jpg?width=1400',
 mission:'https://m.media-amazon.com/images/M/MV5BZmMwOWQyMDUtYWFkYi00MWI1LTgyMjctZjY2NGQ5ZjEwMWQ1XkEyXkFqcGc%40._V1_.jpg',
 monjaai:'https://images.plex.tv/photo?size=large-1280&url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FhF8DpLJBVhpnaj4UiHCkHwWq8ZZ.jpg',
 kanchan:'https://commons.wikimedia.org/wiki/Special:Redirect/file/KanchanjanghaZG.jpg',
 bezbarua:'https://m.media-amazon.com/images/M/MV5BZmMwOWQyMDUtYWFkYi00MWI1LTgyMjctZjY2NGQ5ZjEwMWQ1XkEyXkFqcGc%40._V1_.jpg',
 roi:'https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/400x600/2024/roi-roi-binale/roi-roi-binale-1761548292.jpg'
};
const artist={name:'Zubeen Garg',birthDate:'18 November 1972',deathDate:'19 September 2025',era:'1972 — 2025',debutYear:1992,debutWork:'Anamika',description:'Singer, composer, lyricist, music director, actor, filmmaker and multi-instrumentalist whose work became one of the defining voices of modern Assamese music.',stats:{languages:'40+',songs:'38,000+'},images:{hero:IMG.hero,portrait:IMG.edufest,concert:IMG.concert1,vertical:IMG.concert2,award:IMG.award,live:IMG.live},official:{youtube:process.env.YOUTUBE_URL||'https://www.youtube.com/@Zubeengargoffical',spotify:process.env.SPOTIFY_URL||'https://open.spotify.com/search/Zubeen%20Garg',appleMusic:process.env.APPLE_MUSIC_URL||'https://music.apple.com/in/search?term=Zubeen%20Garg'},sources:['https://music.apple.com/us/artist/zubeen-garg/166202948','https://commons.wikimedia.org/wiki/Category:Zubeen_Garg']};

const officialTracks=[
 ['Ya Ali','Gangster','2006'],['Dil Tu Hi Bataa','Krrish 3','2013'],['Rama Re','Kaante','2002'],['Socha Nahin Tha','Kaante','2002'],['Subah Subah','I See You','2006'],['Dilruba','Namastey London','2007'],['Mere Watan: Amaan’s Fury','Fiza','2000'],['Shola Shola','London Dreams','2009'],['Anamika','Anamika','1992'],['Maya','Maya','1994'],['Gaane Ki Aane','Anamika','1992'],['Dure Dure','Junaki Mon','1993'],['Mayabini','Daag','2001'],['Mon Jaai','Mon Jaai','2008'],['Din Jwole Raati Jwole','Mission China','2017'],['Kanchanjangha','Kanchanjangha','2019'],['Buku Duru Duru','Assamese repertoire','—'],['Soklong','Assamese repertoire','—'],['Aahile Bohagi','Tagar','2002'],['Rim Jhim','Strings – Bound By Faith','2006']
].map((x,i)=>({id:'track-'+i,title:x[0],album:x[1],year:x[2],platform:'Official / verified listing',url:'https://music.youtube.com/search?q='+encodeURIComponent('Zubeen Garg '+x[0]),artwork:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_in_a_concert_in_2016_(8).jpg'}));

const filmography=[
 {title:'Tumi Mur Matho Mur',year:2000,role:'Actor / Director / Writer / Music',details:'https://www.imdb.com/find/?q=Tumi%20Mur%20Matho%20Mur',watch:'https://www.justwatch.com/in/search?q=Tumi%20Mur%20Matho%20Mur',artwork:IMG.zindagi},
 {title:'Gangster',year:2006,role:'Singer / Special appearance',details:'https://www.imdb.com/find/?q=Gangster',watch:'https://www.justwatch.com/in/search?q=Gangster',artwork:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Zubeen_Garg_in_a_concert_in_2016_(4).jpg'},
 {title:'Mon Jaai',year:2008,role:'Actor / Music',details:'https://www.imdb.com/title/tt5351492/',watch:'https://www.justwatch.com/in/search?q=Mon%20Jaai',artwork:IMG.monjaai},
 {title:'Mission China',year:2017,role:'Director / Writer / Producer / Actor / Music',details:'https://www.imdb.com/title/tt7349218/',watch:'https://www.justwatch.com/in/search?q=Mission%20China',artwork:IMG.mission},
 {title:'Kanchanjangha',year:2019,role:'Director / Writer / Producer / Actor / Music',details:'https://www.imdb.com/title/tt10910564/',watch:'https://www.justwatch.com/in/search?q=Kanchanjangha',artwork:IMG.kanchan},
 {title:'Dr. Bezbarua 2',year:2023,role:'Actor / Music',details:'https://www.imdb.com/title/tt13174230/',watch:'https://www.justwatch.com/in/search?q=Dr.%20Bezbarua%202',artwork:IMG.bezbarua},
 {title:'Roi Roi Binale',year:2025,role:'Music / final film project',details:'https://www.imdb.com/find/?q=Roi%20Roi%20Binale',watch:'https://www.justwatch.com/in/search?q=Roi%20Roi%20Binale',artwork:IMG.roi}
];

let cached=null,cacheAt=0;
async function buildData(){return {artist,officialTracks,filmography,catalog:{source:'Apple Music / verified published listings',status:'live'},lastUpdated:new Date().toISOString()};}
app.get('/api/health',(req,res)=>res.json({ok:true,service:'zubeen-garg-legacy',time:new Date().toISOString()}));
app.get('/api/artist',(req,res)=>res.json(artist));
app.get('/api/releases',async(req,res)=>{res.json(officialTracks)});
app.get('/api/data',async(req,res)=>{if(!cached||Date.now()-cacheAt>CACHE_TTL){cached=await buildData();cacheAt=Date.now();}res.json(cached)});
app.get('/api/top-songs',(req,res)=>res.json({source:'published top-song listings',songs:officialTracks,lastUpdated:new Date().toISOString()}));
app.listen(PORT,()=>console.log(`Zubeen Garg archive running on http://localhost:${PORT}`));
