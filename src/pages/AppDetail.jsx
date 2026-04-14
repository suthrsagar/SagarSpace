import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Download, Info, Clock, HardDrive, Smartphone } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} stroke="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
  </svg>
);

export default function AppDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/apps/${id}`);
        setApp(response.data);
      } catch (error) {
        console.error('Error fetching app details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!app) return <div className="text-center text-gray-400">App not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header section */}
      {/* Header section */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-[#1A1F26]/50 p-8 rounded-[2.5rem] border border-gray-800">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-900 rounded-[2.5rem] overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-700 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
          {app.logoUrl ? (
            <img src={app.logoUrl} alt={`${app.name} logo`} className="w-full h-full object-cover" />
          ) : (
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-500">{app.name.charAt(0)}</span>
          )}
          <div className="absolute inset-0 border-[3px] border-white/5 rounded-[2.5rem] pointer-events-none"></div>
        </div>
        
        <div className="flex-grow space-y-5 text-center md:text-left flex flex-col justify-center h-full pt-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">{app.name}</h1>
            <p className="text-blue-400 font-semibold text-lg">{app.packageName}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-400">
            <div className="flex items-center space-x-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800"><Smartphone size={16}/><span>v{app.version}</span></div>
            <div className="flex items-center space-x-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800"><HardDrive size={16}/><span>{app.size}</span></div>
            <div className="flex items-center space-x-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800"><Download size={16} className="text-blue-500"/><span>{app.downloads} Downloads</span></div>
          </div>

          <div className="pt-2 flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <a 
              href={`http://localhost:5000/api/download/${app._id}`}
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-95 w-full md:w-auto"
            >
              <Download size={22} className="animate-bounce" />
              <span>DOWNLOAD APK</span>
            </a>
            
            {app.githubLink && (
              <a 
                href={app.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-[#0D1117] hover:bg-[#161B22] border border-gray-700 hover:border-gray-500 text-white font-bold text-lg py-4 px-8 rounded-full transition-all hover:scale-105 shadow-xl active:scale-95 w-full md:w-auto"
              >
                <GithubIcon size={22} className="text-gray-300" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-800">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-4 text-white">
              <Info size={20} className="text-blue-400" />
              <h2 className="text-xl font-bold">What's New</h2>
            </div>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
              {app.changelog || 'No changelog provided for this version.'}
            </p>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
            <h2 className="text-xl font-bold text-white mb-4">Information</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-200 font-medium">{app.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Version Code</span>
                <span className="text-gray-200 font-medium">{app.versionCode}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Updated</span>
                <span className="text-gray-200 font-medium">{new Date(app.createdAt).toLocaleDateString()}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
