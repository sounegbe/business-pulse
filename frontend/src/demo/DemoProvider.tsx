import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {DEMO_KEY,seed,validState,type DemoState} from './model';
function read(){try{const raw=localStorage.getItem(DEMO_KEY);if(!raw)return {state:seed(),error:''};const value:unknown=JSON.parse(raw);if(!validState(value))throw Error();return {state:value,error:''};}catch{return {state:seed(),error:'Saved demo data could not be read. Original storage is preserved until your next change.'};}}
interface Context {state:DemoState;update:(change:(draft:DemoState)=>void,message:string)=>void;notice:string;error:string}
const DemoContext=createContext<Context|null>(null);
export function DemoProvider({children}:{children:ReactNode}){const [initial]=useState(read);const [state,setState]=useState(initial.state);const [notice,setNotice]=useState('');const [error,setError]=useState(initial.error);
 const update=(change:(draft:DemoState)=>void,message:string)=>{const draft=structuredClone(state);change(draft);if(!validState(draft))throw Error('Invalid demo update.');draft.activity.unshift(message);draft.activity=draft.activity.slice(0,100);try{localStorage.setItem(DEMO_KEY,JSON.stringify(draft));setError('');setNotice(`${message} Saved in this browser.`);}catch{setError('Browser storage is unavailable. This change is temporary and will not survive a reload.');setNotice(message);}setState(draft);};
 useEffect(()=>{const sync=(event:StorageEvent)=>{if(event.key!==DEMO_KEY||!event.newValue)return;try{const next:unknown=JSON.parse(event.newValue);if(validState(next))setState(next);else setError('Another tab saved invalid demo data.');}catch{setError('Another tab saved unreadable demo data.');}};window.addEventListener('storage',sync);return()=>window.removeEventListener('storage',sync);},[]);
 return <DemoContext value={{state,update,notice,error}}>{children}</DemoContext>;
}
export function useDemo(){const value=useContext(DemoContext);if(!value)throw Error('DemoProvider is required.');return value;}
