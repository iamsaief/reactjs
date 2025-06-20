import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { DashboardWidget } from "../components/DashboardWidget";
import { User, Bell, Shield, Palette, Globe, Camera, Save, AlertTriangle } from "lucide-react";

export const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    company: "Universal Dashboard Inc.",
    timezone: "UTC-5",
    language: "English",
    avatar: "",
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type, value) => {
    setNotifications((prev) => ({ ...prev, [type]: value }));
  };

  const handleSecurityChange = (field, value) => {
    setSecurity((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account settings and preferences.</p>
          </div>
          <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Profile Settings - Takes 2 columns on xl screens */}
          <div className="xl:col-span-2 space-y-6">
            <DashboardWidget title="Profile Information" icon={<User className="w-5 h-5" />}>
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Picture</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Update your avatar to personalize your account
                    </p>
                    <button className="text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate("name", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => handleProfileUpdate("company", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Language
                    </label>
                    <select
                      value={profile.language}
                      onChange={(e) => handleProfileUpdate("language", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Timezone
                    </label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => handleProfileUpdate("timezone", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                    </select>
                  </div>
                </div>
              </div>
            </DashboardWidget>

            {/* Security Settings */}
            <DashboardWidget title="Security Settings" icon={<Shield className="w-5 h-5" />}>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) => handleSecurityChange("twoFactor", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Login Alerts</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Get notified of new login attempts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.loginAlerts}
                      onChange={(e) => handleSecurityChange("loginAlerts", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Session Timeout (minutes)
                  </label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange("sessionTimeout", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div className="pt-4 space-y-2">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Change Password
                  </button>
                  <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg transition-colors">
                    View Active Sessions
                  </button>
                </div>
              </div>
            </DashboardWidget>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Theme Settings */}
            <DashboardWidget title="Appearance" icon={<Palette className="w-5 h-5" />}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Theme Preference
                  </label>
                  <div className="space-y-2">
                    {["light", "dark", "system"].map((themeOption) => (
                      <label
                        key={themeOption}
                        className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="theme"
                          value={themeOption}
                          checked={theme === themeOption}
                          onChange={(e) => setTheme(e.target.value)}
                          className="text-blue-500 focus:ring-blue-500"
                        />
                        <span className="text-slate-700 dark:text-slate-300 capitalize">{themeOption} Theme</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Color Palette Preview</h4>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-sm"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-lg shadow-sm"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-lg shadow-sm"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded-lg shadow-sm"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-lg shadow-sm"></div>
                  </div>
                </div>
              </div>
            </DashboardWidget>

            {/* Notification Settings */}
            <DashboardWidget title="Notifications" icon={<Bell className="w-5 h-5" />}>
              <div className="space-y-4">
                {Object.entries(notifications).map(([type, enabled]) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                        {type === "sms" ? "SMS" : type} Notifications
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {type === "marketing" ? "Product updates and offers" : `Receive notifications via ${type}`}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => handleNotificationChange(type, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </DashboardWidget>

            {/* Danger Zone */}
            <DashboardWidget title="Danger Zone" icon={<AlertTriangle className="w-5 h-5 text-red-500" />}>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2">Delete Account</h4>
                  <p className="text-xs text-red-600 dark:text-red-300 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            </DashboardWidget>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
