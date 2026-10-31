import axios from 'axios';
import type {Page,Template,Trigger,Subscription} from '../types';
export const API_BASE = (
  import.meta.env.VITE_API_BASE_URL ||
  'http://127.0.0.1:8000/api'
).replace(/\/$/, '');

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
});

// Automatically attach authentication token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});
// Session cookies only if backend is configured for session auth + CSRF; this frontend does not bypass Django CSRF.
export function rows<T>(data:T[]|Page<T>):T[]{return Array.isArray(data)?data:data.results||[]}
export const api={
 triggers:async()=>rows((await http.get<Trigger[]|Page<Trigger>>('/triggers/')).data),
 templates:async()=>rows((await http.get<Template[]|Page<Template>>('/templates/')).data),
 createTrigger:async(data:Partial<Trigger>)=>(await http.post<Trigger>('/triggers/',data)).data,
 updateTrigger:async(id:number,data:Partial<Trigger>)=>(await http.patch<Trigger>(`/triggers/${id}/`,data)).data,
 deleteTrigger:async(id:number)=>http.delete(`/triggers/${id}/`),
 createTemplate:async(data:Partial<Template>)=>(await http.post<Template>('/templates/',data)).data,
 updateTemplate:async(id:number,data:Partial<Template>)=>(await http.patch<Template>(`/templates/${id}/`,data)).data,
 deleteTemplate:async(id:number)=>http.delete(`/templates/${id}/`),
 testTemplate:async(id:number,data:Record<string,unknown>)=>(await http.post(`/templates/${id}/test/`,data)).data,
 fireTrigger:async(id:number,data:Record<string,unknown>)=>(await http.post(`/triggers/${id}/fire/`,data)).data,
 publicKey:async()=>(await http.get<{publicKey:string}>('/web-push/public-key/')).data.publicKey,
 subscribe:async(data:Omit<Subscription,'id'|'created_at'>)=>(await http.post<Subscription>('/push-subscriptions/',data)).data,
 subscriptions:async()=>rows((await http.get<Subscription[]|Page<Subscription>>('/push-subscriptions/')).data),
 testPush:async(id:number)=>(await http.post(`/push-subscriptions/${id}/test/`)).data,
 health:async()=>(await http.get('/health/')).data,
};
export function apiError(error:unknown):string{if(axios.isAxiosError(error)){const d=error.response?.data;return typeof d?.error==='string'?d.error:typeof d?.detail==='string'?d.detail:typeof d?.message==='string'?d.message:JSON.stringify(d||error.message)}return error instanceof Error?error.message:'Unknown error'}