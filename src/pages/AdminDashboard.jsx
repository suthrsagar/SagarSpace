import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusCircle, Upload, Save, X, FileBadge } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', packageName: '', version: '', versionCode: '',
    category: 'App', size: '', changelog: '', githubLink: ''
  });
  const [apkFile, setApkFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchApps();
  }, [navigate, token]);

  const fetchApps = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/apps');
      setApps(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.name === 'apkFile') setApkFile(e.target.files[0]);
      if (e.target.name === 'logoFile') setLogoFile(e.target.files[0]);
    }
  };

  const openForm = (app = null) => {
    if (app) {
      setEditingId(app._id);
      setFormData({
        name: app.name, packageName: app.packageName, version: app.version,
        versionCode: app.versionCode, category: app.category,
        size: app.size, changelog: app.changelog, githubLink: app.githubLink || ''
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', packageName: '', version: '', versionCode: '', category: 'App', size: '', changelog: '', githubLink: '' });
    }
    setApkFile(null);
    setLogoFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      if (apkFile) {
        submitData.append('apkFile', apkFile);
      }
      if (logoFile) {
        submitData.append('logoFile', logoFile);
      }

      const url = editingId 
        ? `http://localhost:5000/api/admin/update-app/${editingId}`
        : 'http://localhost:5000/api/admin/add-app';
        
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Error saving app');
      }

      setShowModal(false);
      fetchApps();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div></div>;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-[#1A1F26] p-8 rounded-[2rem] border border-gray-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-40 h-40 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 z-10">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Admin Dashboard</h1>
            <p className="text-blue-400 font-medium text-sm mt-1">Manage your applications, track downloads, and deploy updates instantly.</p>
          </div>
          <button
            onClick={() => openForm()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black py-3 px-6 rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
          >
            <PlusCircle size={20} />
            <span>Upload New App</span>
          </button>
        </div>
      </div>

      <div className="bg-[#1A1F26]/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-900/80 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-800">
                <th className="p-6">App Name</th>
                <th className="p-6">Package</th>
                <th className="p-6">Version</th>
                <th className="p-6">Downloads</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {apps.map(app => (
                <tr key={app._id} className="hover:bg-blue-900/10 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[14px] bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-inner">
                        {app.logoUrl ? <img src={app.logoUrl} className="w-full h-full object-cover" /> : <span className="font-bold text-gray-500">{app.name.charAt(0)}</span>}
                      </div>
                      <div>
                        <div className="font-black text-white text-lg group-hover:text-blue-400 transition-colors">{app.name}</div>
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-gray-400 border border-gray-700">{app.category}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-medium text-gray-400">{app.packageName}</td>
                  <td className="p-6">
                    <div className="text-sm font-bold text-white bg-gray-800 inline-block px-2 py-1 rounded-md border border-gray-700">v{app.version}</div>
                    <div className="text-[11px] text-blue-500 font-bold uppercase tracking-wide mt-1.5">CODE: {app.versionCode}</div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-black bg-green-500/10 text-green-400 border border-green-500/20">
                      {app.downloads} <span className="text-xs text-green-500/60 ml-0.5 uppercase tracking-wide">Total</span>
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button onClick={() => openForm(app)} className="bg-gray-800 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 border border-gray-700 hover:border-blue-500">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {apps.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                        <Upload size={24} className="text-gray-500" />
                      </div>
                      <p className="text-gray-400 font-medium">No apps uploaded yet. Click <span className="text-blue-400">Upload New App</span> to get started.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1A1F26] w-full max-w-2xl rounded-[2rem] border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[90vh] overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
            <div className="flex justify-between items-center p-6 border-b border-gray-800/80 bg-gray-900/50">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <Upload size={22} className="text-blue-400" />
                </div>
                {editingId ? 'Update Existing App' : 'Publish New App'}
              </h2>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">App Name</label>
                  <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div className="col-span-2 md:col-span-1 space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Package Name</label>
                  <input required name="packageName" value={formData.packageName} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" disabled={!!editingId} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Version String</label>
                  <input required name="version" value={formData.version} onChange={handleInputChange} placeholder="e.g. 1.0.0" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Version Code</label>
                  <input required type="number" name="versionCode" value={formData.versionCode} onChange={handleInputChange} placeholder="e.g. 1" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
                
                <div className="col-span-2 md:col-span-1 space-y-1 p-4 bg-gray-900/50 border border-gray-700 border-dashed rounded-xl">
                  <label className="flex flex-col items-center justify-center cursor-pointer space-y-2">
                    <FileBadge size={32} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-300 text-center">
                      {apkFile ? apkFile.name : (editingId ? "Update APK" : "Upload APK File")}
                    </span>
                    <input type="file" name="apkFile" accept=".apk" onChange={handleFileChange} className="hidden" required={!editingId && !apkFile} />
                  </label>
                </div>

                <div className="col-span-2 md:col-span-1 space-y-1 p-4 bg-gray-900/50 border border-gray-700 border-dashed rounded-xl">
                  <label className="flex flex-col items-center justify-center cursor-pointer space-y-2">
                    <Upload size={32} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-300 text-center">
                      {logoFile ? logoFile.name : (editingId ? "Update Logo" : "Upload App Logo")}
                    </span>
                    <input type="file" name="logoFile" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500">
                    <option value="App">App</option>
                    <option value="Game">Game</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Size</label>
                  <input required name="size" value={formData.size} onChange={handleInputChange} placeholder="e.g. 45 MB" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500" />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">Changelog</label>
                  <textarea name="changelog" value={formData.changelog} onChange={handleInputChange} rows="3" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 resize-none"></textarea>
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-medium text-gray-400 uppercase">GitHub Repository Link (Optional)</label>
                  <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} placeholder="https://github.com/..." className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 rounded-lg font-medium text-gray-400 hover:bg-gray-700 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition-colors">
                  <Save size={18} />
                  {editingId ? 'Save Changes' : 'Upload App'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
