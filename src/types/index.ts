export type Channel='whatsapp'|'email'|'web_push';
export interface Template {id:number;trigger:number;channel:Channel;channel_display?:string;name:string;subject:string;body:string;is_enabled:boolean;variable_mapping:Record<string,string>;created_at?:string;updated_at?:string}
export interface Trigger {id:number;name:string;event_type:string;description:string;is_active:boolean;templates:Template[];created_at?:string;updated_at?:string}
export interface Subscription {id:number;user_id?:string|null;endpoint:string;p256dh:string;auth:string;is_active:boolean;created_at?:string}
export interface Page<T> {count:number;next:string|null;previous:string|null;results:T[]}
export const CHANNELS:Channel[]=['whatsapp','email','web_push'];
export const CHANNEL_LABELS:Record<Channel,string>={whatsapp:'WhatsApp',email:'Email',web_push:'Web Push'};