import React, { useState } from 'react';
import {
  DatabaseIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  RefreshCwIcon,
  DownloadIcon,
  UploadIcon,
  RotateCcwIcon,
  CloudIcon,
  ExternalLinkIcon,
} from 'lucide-react';
import { useAdminStore } from '../contexts/AdminStoreContext';

export function AdminSettings() {
  const {
    cloudStatus,
    configureSupabase,
    disconnectSupabase,
    syncAllToCloud,
    syncAllFromCloud,
    resetToDefaults,
    exportBackupJson,
    importBackupJson,
  } = useAdminStore();

  const [url, setUrl] = useState(cloudStatus.url);
  const [anonKey, setAnonKey] = useState(cloudStatus.anonKey);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setAlert(null);

    const res = await configureSupabase(url, anonKey);
    setConnecting(false);

    if (res.success) {
      setAlert({ type: 'success', message: res.message });
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  const handleDisconnect = () => {
    disconnectSupabase();
    setUrl('');
    setAnonKey('');
    setAlert({ type: 'success', message: 'Disconnected from cloud database. The app is now in local persistence mode.' });
  };

  const handleSyncToCloud = async () => {
    setSyncing(true);
    setAlert(null);
    const res = await syncAllToCloud();
    setSyncing(false);
    if (res.success) {
      setAlert({ type: 'success', message: res.message });
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  const handleSyncFromCloud = async () => {
    setSyncing(true);
    setAlert(null);
    const res = await syncAllFromCloud();
    setSyncing(false);
    if (res.success) {
      setAlert({ type: 'success', message: res.message });
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  const handleExportJson = () => {
    const dataStr = exportBackupJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `habaya-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleImportJson = () => {
    if (!importText.trim()) return;
    const res = importBackupJson(importText);
    if (res.success) {
      setAlert({ type: 'success', message: res.message });
      setImportText('');
      setShowImportBox(false);
    } else {
      setAlert({ type: 'error', message: res.message });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore the default initial catalog? Any local edits will be reset.')) {
      resetToDefaults();
      setAlert({ type: 'success', message: 'Store reset to initial catalogue seeds.' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">Cloud Database & Settings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Connect your live Supabase cloud database, sync records, or export data backups.
        </p>
      </div>

      {alert && (
        <div
          className={`flex items-start gap-2.5 rounded p-4 text-xs border ${
            alert.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {alert.type === 'success' ? (
            <CheckCircle2Icon className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircleIcon className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* Supabase Connection Card */}
      <div className="rounded border border-rule bg-warm p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-rule pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-2.5 text-emerald-800">
              <CloudIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink">Supabase Cloud Database</h2>
              <p className="text-xs text-ink-soft">
                Connect your Supabase project for live cloud updates across Vercel and all devices.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                cloudStatus.isConnected
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  cloudStatus.isConnected ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'
                }`}
              />
              {cloudStatus.isConnected ? 'Connected & Live' : 'Local Storage Mode'}
            </span>
          </div>
        </div>

        <form onSubmit={handleConnect} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label text-xs">Supabase Project URL</label>
              <input
                type="url"
                required
                placeholder="https://xyzprojectid.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="field-input h-10 text-xs font-mono"
              />
              <span className="text-[10px] text-taupe mt-1 block">
                Supabase Dashboard &gt; Project Settings &gt; API
              </span>
            </div>

            <div>
              <label className="field-label text-xs">Supabase Anon Public API Key</label>
              <input
                type="password"
                required
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="field-input h-10 text-xs font-mono"
              />
              <span className="text-[10px] text-taupe mt-1 block">
                Found in API Settings (anon public key)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={connecting}
                className="btn-primary h-10 px-5 text-xs flex items-center gap-2"
              >
                {connecting ? <RefreshCwIcon className="h-4 w-4 animate-spin" /> : <DatabaseIcon className="h-4 w-4" />}
                {connecting ? 'Validating...' : 'Save & Connect Cloud'}
              </button>

              {cloudStatus.isConnected && (
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="btn-outline h-10 px-4 text-xs text-danger hover:bg-rose-50"
                >
                  Disconnect
                </button>
              )}
            </div>

            {cloudStatus.isConnected && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={syncing}
                  onClick={handleSyncToCloud}
                  className="btn-outline h-10 px-4 text-xs flex items-center gap-1.5"
                >
                  <UploadIcon className="h-3.5 w-3.5" />
                  Push Local Data to Cloud
                </button>
                <button
                  type="button"
                  disabled={syncing}
                  onClick={handleSyncFromCloud}
                  className="btn-outline h-10 px-4 text-xs flex items-center gap-1.5"
                >
                  <RefreshCwIcon className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
                  Pull Cloud Records
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* SQL Setup Information */}
      <div className="rounded border border-rule bg-warm p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-rule pb-4">
          <div>
            <h2 className="text-base font-bold text-ink">Database Setup Scripts</h2>
            <p className="text-xs text-ink-soft">
              Find <code className="font-mono bg-ivory px-1.5 py-0.5 rounded">supabase/schema.sql</code> and <code className="font-mono bg-ivory px-1.5 py-0.5 rounded">supabase/seed.sql</code> in the repository root.
            </p>
          </div>
          <a
            href="https://supabase.com/dashboard/project/_/sql"
            target="_blank"
            rel="noreferrer"
            className="btn-outline h-8 px-3 text-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            Open Supabase SQL Editor
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="mt-3 text-xs text-ink-soft leading-relaxed">
          To set up your Supabase database from scratch, run <span className="font-semibold text-ink">schema.sql</span> in your Supabase SQL editor to create the tables, followed by <span className="font-semibold text-ink">seed.sql</span> to populate initial products.
        </p>
      </div>

      {/* Backup & Factory Reset */}
      <div className="rounded border border-rule bg-warm p-6 shadow-sm">
        <h2 className="text-base font-bold text-ink border-b border-rule pb-3">Data Backup & Maintenance</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded border border-rule bg-ivory/50 p-4">
            <h3 className="font-bold text-xs uppercase text-ink">Export Store Backup</h3>
            <p className="mt-1 text-xs text-ink-soft leading-relaxed">
              Download your complete catalogue, orders, and inquiries as a portable JSON file.
            </p>
            <button
              type="button"
              onClick={handleExportJson}
              className="btn-outline mt-3 h-8 px-3 text-xs flex items-center gap-1.5 w-full justify-center"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Export JSON
            </button>
          </div>

          <div className="rounded border border-rule bg-ivory/50 p-4">
            <h3 className="font-bold text-xs uppercase text-ink">Restore from JSON</h3>
            <p className="mt-1 text-xs text-ink-soft leading-relaxed">
              Import a previously exported backup file to restore products and orders.
            </p>
            <button
              type="button"
              onClick={() => setShowImportBox(!showImportBox)}
              className="btn-outline mt-3 h-8 px-3 text-xs flex items-center gap-1.5 w-full justify-center"
            >
              <UploadIcon className="h-3.5 w-3.5" />
              {showImportBox ? 'Close Import Box' : 'Import JSON'}
            </button>
          </div>

          <div className="rounded border border-rule bg-ivory/50 p-4">
            <h3 className="font-bold text-xs uppercase text-danger">Reset to Defaults</h3>
            <p className="mt-1 text-xs text-ink-soft leading-relaxed">
              Restore the original luxury demo products catalogue and wipe test orders.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-outline mt-3 h-8 px-3 text-xs text-danger hover:bg-rose-50 flex items-center gap-1.5 w-full justify-center"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              Factory Reset
            </button>
          </div>
        </div>

        {showImportBox && (
          <div className="mt-4 rounded border border-rule bg-ivory p-4">
            <label className="field-label text-xs">Paste Backup JSON Content</label>
            <textarea
              rows={4}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste raw JSON here..."
              className="field-input h-auto text-xs font-mono"
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportBox(false)}
                className="btn-outline h-8 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportJson}
                className="btn-primary h-8 px-4 text-xs"
              >
                Apply Backup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
