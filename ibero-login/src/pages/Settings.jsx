import { Settings as SettingsIcon, Bell, Shield, Palette } from 'lucide-react'

const Settings = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-gray-400" size={20} />
            <h2 className="font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-600">Email notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-600">Profile update reminders</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-red-600 rounded" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-gray-400" size={20} />
            <h2 className="font-semibold text-gray-900">Security</h2>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
            Change Password
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="text-gray-400" size={20} />
            <h2 className="font-semibold text-gray-900">Appearance</h2>
          </div>
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Settings
