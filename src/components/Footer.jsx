import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus('sending');
    try {
      await axios.post('http://localhost:5000/api/feedback', { name, message });
      setStatus('sent');
      setTimeout(() => {
        setIsOpen(false);
        setName('');
        setMessage('');
        setStatus('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-900 py-6 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SagarSpace. All rights reserved.
        </p>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white bg-gray-800 px-4 py-2 rounded-xl transition-all border border-gray-700 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <MessageSquare size={16} className="text-blue-400" />
          Leave a Comment
        </button>
      </div>

      {/* Global Comment Box Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:right-8 z-50 w-[90%] md:w-80 bg-[#1A1F26] border border-gray-700 rounded-2xl shadow-2xl p-5 animate-fade-in origin-bottom-right">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-400" />
              Site Feedback
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white bg-gray-800 p-1 rounded-full">
              <X size={16} />
            </button>
          </div>
          
          {status === 'sent' ? (
            <div className="text-green-400 text-center py-6 font-bold flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                <Send size={24} className="text-green-400" />
              </div>
              Sent to Admin!
            </div>
          ) : (
            <form onSubmit={submitFeedback} className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                required 
              />
              <textarea 
                placeholder="Write your comment or suggestions..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                required 
              />
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold flex flex-row items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : (
                  <>
                    <Send size={16} /> Send to Admin
                  </>
                )}
              </button>
              {status === 'error' && <p className="text-red-400 text-xs text-center">Error sending message. Try again later.</p>}
            </form>
          )}
        </div>
      )}
    </footer>
  );
}
