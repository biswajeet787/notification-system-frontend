
import { api } from '../api/client';

function toUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));

  const result = new Uint8Array(raw.length);

  for (let i = 0; i < raw.length; i++) {
    result[i] = raw.charCodeAt(i);
  }

  return result;
}

export async function subscribeToPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Browser push is not supported here');
  }

  if (!window.isSecureContext) {
    throw new Error('Web Push requires HTTPS or localhost');
  }

  const permission = await Notification.requestPermission();

  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted');
  }

  const registration = await navigator.serviceWorker.register('/sw.js');

  await navigator.serviceWorker.ready;

  const key = await api.publicKey();

  if (!key) {
    throw new Error('Missing VAPID public key');
  }

  let sub = await registration.pushManager.getSubscription();

  if (!sub) {
    sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: toUint8Array(key),
    });
  }

  const json = sub.toJSON();

  if (!json.endpoint || !json.keys?.p256dh || !json.keys?.auth) {
    throw new Error('Incomplete push subscription');
  }

  return api.subscribe({
    endpoint: json.endpoint,
    p256dh: json.keys.p256dh,
    auth: json.keys.auth,
    is_active: true,
  });
}
