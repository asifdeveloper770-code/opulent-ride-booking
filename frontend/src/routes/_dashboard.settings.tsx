import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  Bell,
  Lock,
  Moon,
  Save,
  Shield,
  UserCog,
} from "lucide-react";

// import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [settings, setSettings] = useState({
    full_name: "",
    password: "",
    notifications: true,
    dark_mode: false,
    two_factor_auth: false,
  });

  // SAVE SETTINGS
  const saveSettings = useMutation({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not found");
      }

      // Update user metadata
      const { error } = await   supabase.auth.updateUser({
        password: settings.password || undefined,

        data: {
          full_name: settings.full_name,
          notifications: settings.notifications,
          dark_mode: settings.dark_mode,
          two_factor_auth:
            settings.two_factor_auth,
        },
      });

      if (error) {
        throw error;
      }
    },

    onSuccess: () => {
      alert("Settings updated successfully");
    },

    onError: (error) => {
      console.error(error);
      alert("Failed to update settings");
    },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage account settings and preferences.
        </p>
      </div>

      {/* Account Settings */}
      <div className="rounded-xl border border-border bg-card/50 p-6">

        <div className="mb-6 flex items-center gap-3">
          <UserCog className="size-5 text-gold" />

          <h2 className="text-xl font-semibold">
            Account Settings
          </h2>
        </div>

        <div className="grid gap-5">

          {/* Full Name */}
          <div className="grid gap-2">
            <Label>
              Full Name
            </Label>

            <Input
              placeholder="Enter full name"
              value={settings.full_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  full_name: e.target.value,
                })
              }
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label>
              New Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 size-4 text-muted-foreground" />

              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={settings.password}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>

        </div>
      </div>

      {/* Preferences */}
      <div className="rounded-xl border border-border bg-card/50 p-6">

        <div className="mb-6 flex items-center gap-3">
          <Bell className="size-5 text-gold" />

          <h2 className="text-xl font-semibold">
            Preferences
          </h2>
        </div>

        <div className="space-y-5">

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Email Notifications
              </p>

              <p className="text-sm text-muted-foreground">
                Receive booking updates by email.
              </p>
            </div>

            <Switch
              checked={settings.notifications}
              onCheckedChange={(value) =>
                setSettings({
                  ...settings,
                  notifications: value,
                })
              }
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Dark Mode
              </p>

              <p className="text-sm text-muted-foreground">
                Enable dark interface theme.
              </p>
            </div>

            <Switch
              checked={settings.dark_mode}
              onCheckedChange={(value) =>
                setSettings({
                  ...settings,
                  dark_mode: value,
                })
              }
            />
          </div>

          {/* Two Factor */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                Two Factor Authentication
              </p>

              <p className="text-sm text-muted-foreground">
                Add extra security to your account.
              </p>
            </div>

            <Switch
              checked={settings.two_factor_auth}
              onCheckedChange={(value) =>
                setSettings({
                  ...settings,
                  two_factor_auth: value,
                })
              }
            />
          </div>

        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border bg-card/50 p-6">

        <div className="mb-6 flex items-center gap-3">
          <Shield className="size-5 text-gold" />

          <h2 className="text-xl font-semibold">
            Security
          </h2>
        </div>

        <div className="flex items-center justify-between">

          <div>
            <p className="font-medium">
              Login Sessions
            </p>

            <p className="text-sm text-muted-foreground">
              Manage active sessions and security.
            </p>
          </div>

          <Button variant="outline">
            View Sessions
          </Button>

        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">

        <Button
          className="bg-gold text-primary-foreground"
          onClick={() =>
            saveSettings.mutate()
          }
          disabled={saveSettings.isPending}
        >
          <Save className="mr-2 size-4" />

          {saveSettings.isPending
            ? "Saving..."
            : "Save Settings"}
        </Button>

      </div>

    </div>
  );
}