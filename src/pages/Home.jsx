import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Gamepad2, Smartphone, Terminal, Braces, Layout, UserCircle, Rocket, Sparkles, X, Download, Mail, FileText, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} stroke="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const helloWorldData = {
  "Game Dev": {
    lang: "C#",
    code: `using UnityEngine;\n\npublic class HelloWorld : MonoBehaviour {\n    void Start() {\n        Debug.Log("Hello, World!");\n    }\n}`
  },
  "React Native": {
    lang: "JavaScript",
    code: `import React from 'react';\nimport { Text } from 'react-native';\n\nexport default function App() {\n    return <Text>Hello, World!</Text>;\n}`
  },
  "C / C++": {
    lang: "C++",
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`
  },
  "Java": {
    lang: "Java",
    code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
  },
  "Python": {
    lang: "Python",
    code: `print("Hello, World!")`
  },
  "App Dev": {
    lang: "Kotlin",
    code: `fun main() {\n    println("Hello, App World!")\n}`
  },
  "DSA": {
    lang: "Pseudocode",
    code: `function binarySearch(arr, target):\n    low = 0\n    high = len(arr) - 1\n    while low <= high:\n        mid = (low + high) / 2\n        if arr[mid] == target: return mid\n        // ... \n    return "Hello, Algorithm!"`
  }
};

export default function Home() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  // Typing Effect State
  const roles = ["Software", "Mobile Apps", "Games", "Full Stack"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Selected Language State
  const [selectedLanguage, setSelectedLanguage] = useState("React Native");
  const [timeLeft, setTimeLeft] = useState(15);

  // Auto-close selected language IDE after 15 seconds with visual countdown
  useEffect(() => {
    if (!selectedLanguage) return;
    
    setTimeLeft(15); // Reset timer when language changes
    
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setSelectedLanguage(null); // Close the IDE
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/apps');
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();

    const intervalId = setInterval(() => {
      setRoleIndex((pv) => (pv + 1) % roles.length);
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);

  const filteredApps = apps.filter(app => filter === 'All' || app.category === filter);

  return (
    <div className="space-y-20 pb-16 relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-[20%] right-[-5%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>

      {/* Portfolio Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 pt-8 md:pt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/80 border border-gray-700 text-gray-300 font-medium text-sm backdrop-blur-md cursor-default origin-left"
          >
            <Sparkles size={16} className="text-yellow-400" />
            Welcome to SagarSpace
          </motion.div>
          
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight text-center md:text-left">
              Hi, I'm <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 hover:tracking-widest transition-all duration-500">
                Sagar
              </span>
            </h1>
            <div className="text-xl md:text-3xl text-gray-400 font-light flex items-center justify-center md:justify-start gap-2">
              Building 
              <span className="font-bold text-white relative w-48 overflow-hidden h-10 inline-block align-bottom">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl text-center md:text-left mx-auto md:mx-0">
            Currently pursuing <strong className="text-white">BCA from JNVU</strong>. 
            I transform ideas into interactive realities through code and design.
          </p>
          
          <div className="space-y-4 pt-4">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold">Tech Arsenal</h3>
            <motion.div 
              initial="hidden" 
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: <Gamepad2 size={16} />, text: "Game Dev" },
                { icon: <Smartphone size={16} />, text: "React Native" },
                { icon: <Terminal size={16} />, text: "C / C++" },
                { icon: <Code2 size={16} />, text: "Java" },
                { icon: <Braces size={16} />, text: "Python" },
                { icon: <Layout size={16} />, text: "App Dev" },
                { icon: <Code2 size={16} />, text: "DSA" }
              ].map((skill, i) => (
                <SkillBadge 
                  key={i} 
                  icon={skill.icon} 
                  text={skill.text} 
                  isActive={selectedLanguage === skill.text}
                  onClick={() => setSelectedLanguage(skill.text)} 
                />
              ))}
            </motion.div>

            {/* Inline IDE Showcase */}
            <AnimatePresence mode="wait">
              {selectedLanguage && helloWorldData[selectedLanguage] && (
                <motion.div 
                  key={selectedLanguage}
                  initial={{ opacity: 0, y: 10, scale: 0.98, height: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1, height: "auto" }}
                  exit={{ opacity: 0, y: -10, scale: 0.95, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="mt-6 border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl relative group bg-[#0d1117] max-w-xl origin-top"
                >
                  <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#161b22]">
                    <div className="flex space-x-1.5 relative">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_5px_#ff5f56A0]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_#ffbd2eA0]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_5px_#27c93fA0]"></div>
                    </div>
                    <div className="flex-1 text-center pl-8">
                      <span className="text-xs font-mono text-gray-400">
                        main.{helloWorldData[selectedLanguage].lang.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[10px] font-black uppercase text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md border border-gray-700">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      <span>Closing: {timeLeft}s</span>
                    </div>
                  </div>
                  <div className="p-5 overflow-x-auto min-h-[120px] flex items-center">
                    <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap drop-shadow-md">
                      <code>{helloWorldData[selectedLanguage].code}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0 mx-auto md:mx-0 mt-8 md:mt-0"
        >
          {/* Animated Glow Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-green-500/30"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-blue-500/20"
          ></motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="absolute inset-8 rounded-full bg-gray-900 border-4 border-gray-800 overflow-hidden shadow-2xl flex items-center justify-center group z-10 transition-transform duration-300"
          >
            <img 
              src="/images/profile.jpg" 
              alt="Sagar Profile" 
              className="w-full h-full object-cover z-10 hidden group-has-[img]:block"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center space-y-2 z-0 bg-gray-800/50">
              <UserCircle size={64} className="opacity-50 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">Put your photo as <code className="text-white bg-gray-900 px-1 rounded">profile.jpg</code> <br/> in public/images</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Connect & Socials Section */}
      <section id="connect" className="pt-24 relative z-10 px-4 md:px-0 pb-10">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, type: "spring" }}
           className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-[#161B22] to-[#0D1117] rounded-[3rem] p-8 md:p-16 border border-gray-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-green-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none"></div>
          
          <div className="flex-1 text-center md:text-left z-10 w-full">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Connect</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-lg mx-auto md:mx-0">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=sutharsagar710@gmail.com" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-white text-gray-900 px-5 md:px-6 py-3.5 md:py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm md:text-base">
                <Mail size={20} />
                sutharsagar710@gmail.com
              </a>
              <button className="flex items-center justify-center gap-3 bg-gray-800 text-white border border-gray-700 hover:border-gray-500 hover:bg-gray-700 px-5 md:px-6 py-3.5 md:py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg group text-sm md:text-base">
                <FileText size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                Resume
                <Download size={16} className="opacity-50" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-80 relative z-10 mt-8 md:mt-0">
            <a href="https://instagram.com/sagar_jangid710" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-2xl bg-[#0D1117] border border-gray-800 hover:border-pink-500/50 hover:bg-gray-900 transition-all shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] shadow-lg">
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <InstagramIcon size={22} className="text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-base group-hover:text-pink-400 transition-colors">Instagram</p>
                  <p className="text-gray-500 text-xs font-mono">@sagar_jangid710</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-600 group-hover:text-pink-400 transition-colors" />
            </a>

            <a href="https://github.com/suthrsagar" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-2xl bg-[#0D1117] border border-gray-800 hover:border-gray-500 hover:bg-gray-900 transition-all shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] bg-gray-800 border border-gray-700 flex items-center justify-center shadow-inner group-hover:bg-gray-700 transition-colors">
                  <GithubIcon size={20} className="text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-white font-bold text-sm md:text-base group-hover:text-gray-200 transition-colors">GitHub</p>
                  <p className="text-gray-500 text-[10px] md:text-xs font-mono">@suthrsagar</p>
                </div>
                <div className="text-left sm:hidden">
                  <p className="text-white font-bold text-sm group-hover:text-gray-200 transition-colors">@suthrsagar</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-colors" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-10 relative z-10 pb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="flex flex-col md:flex-row items-center md:items-end justify-between mb-14 gap-8"
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-sm mb-4">
              <Rocket size={14} />
              Featured Lab
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-2">
              Project <span className="text-green-400">Showcase</span>
            </h2>
            <p className="text-gray-400 text-lg">Explore my latest creations, games, and responsive applications.</p>
          </div>
          
        <div className="flex p-1 bg-gray-900/80 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-md overflow-x-auto max-w-full">
            {['All', 'App', 'Game'].map((tab) => {
              const count = tab === 'All' ? apps.length : apps.filter(a => a.category === tab).length;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    filter === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  {filter === tab && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl -z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {tab}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${filter === tab ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-6">
            <div className="relative w-20 h-20">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-r-2 border-green-500 shadow-[0_0_15px_#10B98150]"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-b-2 border-l-2 border-blue-500 shadow-[0_0_15px_#3B82F650]"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-6 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full opacity-50 blur-[4px]"
              />
            </div>
            <motion.p
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400 font-bold tracking-[0.3em] text-sm"
            >
              INITIALIZING...
            </motion.p>
          </div>
        ) : filteredApps.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 bg-gray-800/30 rounded-3xl border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-900 mb-6">
              <Terminal size={32} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Workspace Empty</h3>
            <p className="text-gray-400 text-lg">No projects uploaded yet. Boot up the admin panel to deploy!</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 max-w-6xl w-full mx-auto gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05, type: "spring" }}
                  key={app._id}
                >
                  <Link to={`/app/${app._id}`} className="group relative flex flex-col md:flex-row items-center bg-gradient-to-br from-[#1A1F26] to-[#12161b] rounded-[3rem] p-6 md:p-12 md:min-h-[380px] border border-gray-800 shadow-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] hover:border-blue-500/50 transition-all duration-500 gap-8 md:gap-16">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    />

                    {/* Premium App Logo */}
                    <div className="w-40 h-40 md:w-56 md:h-56 bg-[#0D1117] rounded-[2rem] md:rounded-[3rem] shadow-[inset_0_2px_15px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.5)] border border-gray-700/50 flex items-center justify-center overflow-hidden transform group-hover:scale-[1.03] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500 flex-shrink-0 relative z-10 p-2">
                      {app.logoUrl ? (
                        <img src={app.logoUrl} alt={`${app.name} logo`} className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 rounded-[1.5rem] md:rounded-[2.5rem]" />
                      ) : (
                        <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-500 drop-shadow-lg">
                          {app.name.charAt(0)}
                        </span>
                      )}
                      <div className="absolute inset-0 rounded-[3rem] border border-white/10 pointer-events-none"></div>
                    </div>
                    
                    {/* App Information UI */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10 w-full text-center md:text-left h-full py-4">
                      <div className="flex items-start md:items-center justify-between gap-4 mb-4">
                        <h3 className="font-black text-3xl md:text-5xl text-white line-clamp-2 md:line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-green-400 transition-all duration-300 w-full tracking-tight leading-tight">{app.name}</h3>
                        <span className="text-lg font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-10 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/25 border border-blue-400/20 active:scale-95 hidden md:block shrink-0">
                          GET APP
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-6">
                        <span className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-1.5 rounded-lg text-sm font-bold tracking-widest uppercase shadow-sm">
                          {app.category}
                        </span>
                        <span className="w-2 h-2 bg-gray-600 rounded-full"></span> 
                        <span className="text-blue-400 font-bold text-base tracking-wide">v{app.version}</span> 
                        <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                        <span className="text-gray-400 font-medium text-base">{app.size || 'Unknown Size'}</span>
                      </div>
                      
                      <p className="text-lg text-gray-400/90 leading-relaxed max-w-3xl mb-8 line-clamp-2 md:line-clamp-3">
                        {app.changelog || 'Discover this amazing application. Click to view more details, check out features, and download the latest version in high speed.'}
                      </p>
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start border-t border-gray-800/80 pt-6 mt-auto gap-3 md:gap-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-300 bg-gray-900/80 px-3 md:px-4 py-2 md:py-2.5 rounded-xl border border-gray-700/80 shadow-inner group-hover:border-gray-600 transition-colors flex-1 md:flex-none justify-center">
                          <Download size={16} className="text-blue-500 drop-shadow" />
                          <span><strong className="text-white text-sm md:text-base mr-1">{app.downloads || 0}</strong> Downloads</span>
                        </div>
                        {app.githubLink && (
                          <button 
                            onClick={(e) => { 
                              e.preventDefault(); 
                              e.stopPropagation(); 
                              window.open(app.githubLink, '_blank'); 
                            }} 
                            className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-gray-300 bg-[#0D1117] hover:bg-gray-800 hover:text-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl border border-gray-700/80 shadow-lg transition-colors cursor-pointer hover:border-gray-500 z-20 relative flex-1 md:flex-none"
                          >
                            <GithubIcon size={16} className="text-white" />
                            <span>Source Code</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Mobile Get Button */}
                    <span className="md:hidden text-center text-lg font-black text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 w-full py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 border border-blue-400/20 active:scale-95 relative z-10 mt-4">
                      GET APK
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>


    </div>
  );
}

function SkillBadge({ icon, text, isActive, onClick }) {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 border px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-sm ${
        isActive 
          ? 'bg-gray-800 border-green-500/60 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
          : 'bg-gray-900/80 border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:text-white'
      }`}
    >
      <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}
