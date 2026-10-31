import type {ReactNode} from 'react';
import {X} from 'lucide-react';
export function Button({children,variant='primary',...props}:{children:ReactNode;variant?:'primary'|'secondary'|'danger'|'ghost'}&React.ButtonHTMLAttributes<HTMLButtonElement>){return <button {...props} className={`btn btn-${variant} ${props.className||''}`}>{children}</button>}
export function Card({children,className=''}:{children:ReactNode;className?:string}){return <div className={`card ${className}`}>{children}</div>}
export function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}){return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal"><div className="modal-head"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={20}/></button></div><div className="modal-body">{children}</div></div></div>}
export function Empty({text}:{text:string}){return <div className="empty">{text}</div>}
export function Toggle({checked,onChange,disabled=false}:{checked:boolean;onChange:(value:boolean)=>void;disabled?:boolean}){return <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={()=>onChange(!checked)} className={`toggle ${checked?'on':''}`}><span/></button>}
export function Pill({children,tone='neutral'}:{children:ReactNode;tone?:'neutral'|'green'|'amber'|'red'}){return <span className={`pill pill-${tone}`}>{children}</span>}
