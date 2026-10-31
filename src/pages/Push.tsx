import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Monitor, ShieldCheck, Info, Send } from "lucide-react";
import { api, apiError } from "../api/client";
import { subscribeToPush } from "../lib/push";
import { Button, Card, Pill } from "../components/UI";
export default function Push() {
  const qc = useQueryClient();
  const { data: subscriptions = [] } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: api.subscriptions,
  });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  async function subscribe() {
    setBusy(true);
    try {
      const sub = await subscribeToPush();
      toast.success(`Browser subscription saved (#${sub.id})`);
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
    } catch (e) {
      toast.error(apiError(e));
    } finally {
      setBusy(false);
    }
  }
  async function test(id: number) {
    setBusy(true);
    try {
      const r = await api.testPush(id);
      setResult(r);
      toast.success("Push request submitted");
    } catch (e) {
      setResult({ error: apiError(e) });
      toast.error(apiError(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">BROWSER NOTIFICATIONS</div>
          <h1>Web Push</h1>
          <p>
            Register this browser and send real notifications through Django.
          </p>
        </div>
      </div>
      <div className="two-cols">
        <Card>
          <div className="push-hero">
            <div className="push-hero-icon">
              <Monitor size={29} />
            </div>
            <h2>Enable browser notifications</h2>
            <p>
              Allow notifications to receive real-time messages even when the
              dashboard isn't focused.
            </p>
            <Button disabled={busy} onClick={subscribe}>
              <ShieldCheck size={17} />
              {busy ? "Working..." : "Subscribe this browser"}
            </Button>
          </div>
        </Card>
        <Card>
          <div className="section-head">
            <div>
              <h2>How it works</h2>
              <p>Browser push delivery flow</p>
            </div>
          </div>
          <div className="steps">
            <div>
              <b>01</b>
              <span>Grant browser notification permission</span>
            </div>
            <div>
              <b>02</b>
              <span>Register the service worker and subscribe</span>
            </div>
            <div>
              <b>03</b>
              <span>Store endpoint and encryption keys in Django</span>
            </div>
            <div>
              <b>04</b>
              <span>Send a test to your browser subscription</span>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <div className="section-head">
          <div>
            <h2>Saved subscriptions</h2>
            <p>Records currently returned by your Django backend</p>
          </div>
          <Pill>{subscriptions.length} total</Pill>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ENDPOINT</th>
                <th>STATUS</th>
                <th>TEST</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td className="endpoint">{s.endpoint}</td>
                  <td>
                    <Pill tone={s.is_active ? "green" : "amber"}>
                      {s.is_active ? "Active" : "Inactive"}
                    </Pill>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      disabled={busy}
                      onClick={() => test(s.id)}
                    >
                      <Send size={15} /> Send push
                    </Button>
                  </td>
                </tr>
              ))}
              {!subscriptions.length && (
                <tr>
                  <td colSpan={4} className="empty">
                    No subscriptions registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {result && (
        <Card>
          <h2>Last push result</h2>
          <pre className="response-box">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      )}
      <div className="notice">
        <Info size={18} /> Browser push requires localhost or HTTPS. If you see
        a duplicate-endpoint error, your backend should upsert subscriptions by
        endpoint rather than always creating new records.
      </div>
    </>
  );
}
