"use client";

import { useEffect, useState } from "react";
import { Avatar, Button, Input, Switch, Tab, Tabs } from "@heroui/react";
import { Panel, PanelHeader } from "@/components/ui/Panel";
import { Icon } from "@/components/Icon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePreferences } from "@/store/slices/uiSlice";
import type { Preferences } from "@/lib/types";

interface PrefRow {
  key: keyof Preferences;
  label: string;
  description: string;
  icon: string;
  iconBg: string;
}

const PREF_ROWS: PrefRow[] = [
  {
    key: "lowStockAlerts",
    label: "Low stock alerts",
    description: "Notify when items fall below the reorder point",
    icon: "TriangleAlert",
    iconBg: "bg-amber-100 text-amber-600",
  },
  {
    key: "orderNotifications",
    label: "Order notifications",
    description: "Get notified on order status changes",
    icon: "Bell",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    key: "autoReorder",
    label: "Auto reorder",
    description: "Automatically draft purchase orders for low stock",
    icon: "RefreshCw",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    key: "compactTables",
    label: "Compact tables",
    description: "Show denser table rows",
    icon: "Rows3",
    iconBg: "bg-cyan-100 text-cyan-600",
  },
  {
    key: "emailDigest",
    label: "Weekly email digest",
    description: "Receive a weekly summary by email",
    icon: "Mail",
    iconBg: "bg-green-100 text-green-600",
  },
];

const SYSTEM_INFO: { label: string; value: string; icon: string }[] = [
  { label: "App version", value: "1.0.0", icon: "Tag" },
  { label: "Environment", value: "Production", icon: "Server" },
  { label: "Storage", value: "Local (mock data)", icon: "Database" },
  { label: "Last backup", value: "Today, 09:24", icon: "HardDriveDownload" },
];

interface ProfileForm {
  fullName: string;
  email: string;
  role: string;
  warehouse: string;
}

const INITIAL_PROFILE: ProfileForm = {
  fullName: "Alex Morgan",
  email: "alex.morgan@wareflow.pro",
  role: "Warehouse Manager",
  warehouse: "North Distribution Center",
};

export default function SettingsPage() {
  const preferences = useAppSelector((s) => s.ui.preferences);
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState<ProfileForm>(INITIAL_PROFILE);
  const [saved, setSaved] = useState(false);

  const setField = (key: keyof ProfileForm, value: string) =>
    setProfile((p) => ({ ...p, [key]: value }));

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 2500);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const handleSave = () => setSaved(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-default-500">
          Manage notifications, your profile, and system information.
        </p>
      </div>

      <Tabs aria-label="Settings sections" variant="underlined" color="primary">
        <Tab
          key="notifications"
          title={
            <div className="flex items-center gap-2">
              <Icon name="BellRing" className="h-4 w-4" />
              <span>Notifications &amp; Automation</span>
            </div>
          }
        >
          <Panel>
            <PanelHeader title="Notifications & Automation" />
            <ul className="divide-y divide-default-200">
              {PREF_ROWS.map((row) => (
                <li key={row.key} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${row.iconBg}`}
                    >
                      <Icon name={row.icon} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{row.label}</p>
                      <p className="text-xs text-default-500">{row.description}</p>
                    </div>
                  </div>
                  <Switch
                    aria-label={row.label}
                    color="success"
                    isSelected={preferences[row.key]}
                    onValueChange={(v) =>
                      dispatch(updatePreferences({ [row.key]: v }))
                    }
                  />
                </li>
              ))}
            </ul>
          </Panel>
        </Tab>

        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2">
              <Icon name="User" className="h-4 w-4" />
              <span>Profile</span>
            </div>
          }
        >
          <Panel>
            <PanelHeader title="Profile" />
            <div className="space-y-6 p-5">
              <div className="flex items-center gap-4">
                <Avatar name="Alex Morgan" size="lg" className="shrink-0 bg-primary text-white" />
                <div className="min-w-0">
                  <p className="text-base font-semibold">{profile.fullName}</p>
                  <p className="text-sm text-default-500">{profile.role}</p>
                  <p className="text-xs text-default-400">{profile.warehouse}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  value={profile.fullName}
                  onValueChange={(v) => setField("fullName", v)}
                />
                <Input
                  type="email"
                  label="Email"
                  value={profile.email}
                  onValueChange={(v) => setField("email", v)}
                />
                <Input
                  label="Role"
                  value={profile.role}
                  onValueChange={(v) => setField("role", v)}
                />
                <Input
                  label="Warehouse"
                  value={profile.warehouse}
                  onValueChange={(v) => setField("warehouse", v)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  color="primary"
                  onPress={handleSave}
                  startContent={<Icon name="Save" className="h-4 w-4" />}
                >
                  Save changes
                </Button>
                {saved && (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                    <Icon name="CheckCircle2" className="h-4 w-4" />
                    Settings saved
                  </span>
                )}
              </div>
            </div>
          </Panel>
        </Tab>

        <Tab
          key="system"
          title={
            <div className="flex items-center gap-2">
              <Icon name="Settings" className="h-4 w-4" />
              <span>System</span>
            </div>
          }
        >
          <Panel>
            <PanelHeader title="System" />
            <ul className="divide-y divide-default-200">
              {SYSTEM_INFO.map((info) => (
                <li key={info.label} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-default-100 text-default-600">
                      <Icon name={info.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-default-500">{info.label}</span>
                  </div>
                  <span className="text-sm font-medium">{info.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </Tab>
      </Tabs>
    </div>
  );
}
