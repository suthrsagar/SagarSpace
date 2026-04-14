import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-800 bg-gray-900 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SagarSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
