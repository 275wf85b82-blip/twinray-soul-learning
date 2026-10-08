import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getFirestore, collection, onSnapshot, query, where } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { firebaseConfig, isConfigured } from './firebase-config.js';
if (isConfigured) {
 try {
  const db=getFirestore(initializeApp(firebaseConfig));
  onSnapshot(query(collection(db,'experiences'), where('published','==',true)), snapshot => {
   const items=snapshot.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.published===true);
   items.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
   window.setTwinRayPosts?.(items.map(x=>({title:x.title||'',message:x.message||'',category:x.category||'出会い',date:x.date||''})));
  }, err=>{console.error(err);});
 } catch(e){console.error(e);}
}
