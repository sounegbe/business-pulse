import {Component,useEffect,useState,type ReactNode} from 'react';
import {AppShell,routeFromHash,type Route} from './components/AppShell';
import {Modal} from './components/UI';
import {DemoProvider,useDemo} from './demo/DemoProvider';
import {DashboardPage} from './features/DashboardPage';
import {ReportPage} from './features/ReportPage';
import {TicketsPage} from './features/TicketsPage';
class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div role="alert" className="card error">The demo could not render. Reload to retry; browser demo records are retained.</div>:this.props.children}}
function Content(){const {state,notice,error}=useDemo();const [route,setRoute]=useState<Route>(routeFromHash);const [notifications,setNotifications]=useState(false);useEffect(()=>{const change=()=>{setRoute(routeFromHash());setNotifications(false);};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change);},[]);useEffect(()=>{document.title=`BusinessPulse · ${route==='dashboard'?'Owner Dashboard':route==='tickets'?'Maintenance Desk':route==='hotel'?'Hotel Operations':'Rental Operations'}`;document.getElementById('content')?.focus();window.scrollTo?.(0,0);},[route]);
 return <AppShell route={route} notify={()=>setNotifications(true)}>{error?<p role="alert" className="error card">{error}</p>:null}<div role="status" aria-live="polite" className={notice?'notice':'sr-only'}>{notice}</div>{route==='dashboard'?<DashboardPage/>:route==='tickets'?<TicketsPage/>:<ReportPage key={route} location={route}/>} {notifications?<Modal title="Operations notifications" onClose={()=>setNotifications(false)}><p>{state.tickets.filter(t=>t.status!=='resolved').length} active maintenance tickets.</p><p>{Object.values(state.reports).filter(r=>r.status==='submitted').length} reports await demo approval.</p></Modal>:null}</AppShell>;
}
export function App(){return <ErrorBoundary><DemoProvider><Content/></DemoProvider></ErrorBoundary>}
