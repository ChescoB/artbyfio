'use client';

import { useEffect, useState } from 'react';

export default function TroubleshootPage() {
  const [apiData, setApiData] = useState<any>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/test-freemind')
      .then(r => r.json())
      .then(data => {
        setApiData(data);
        console.log('API Response:', data);
      });
  }, []);

  const testImage = (url: string, method: string) => {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        resolve({ url, method, success: false, error: 'Timeout' });
      }, 5000);
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve({ url, method, success: true });
      };
      
      img.onerror = (e) => {
        clearTimeout(timeout);
        resolve({ url, method, success: false, error: 'Load failed' });
      };
      
      img.src = url;
    });
  };

  const runTests = async () => {
    if (!apiData?.files) return;
    
    const results = [];
    for (const file of apiData.files.slice(0, 3)) { // Test first 3
      console.log('Testing:', file.name);
      
      const rawTest = await testImage(file.webPath, 'Raw path');
      results.push(rawTest);
      
      const encodedTest = await testImage(file.encodedPath, 'Encoded path');
      results.push(encodedTest);
    }
    
    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Thorough Troubleshooting</h1>

      {/* API Data */}
      <div className="mb-8 p-6 bg-gray-900 rounded">
        <h2 className="text-2xl mb-4">Step 1: File System Check</h2>
        {apiData ? (
          <div>
            <p className="text-green-400 mb-2">✅ API Response Received</p>
            <p className="text-sm">Directory: <code className="bg-black px-2 py-1">{apiData.directory}</code></p>
            <p className="text-sm">File Count: {apiData.count}</p>
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-400">View All Files</summary>
              <pre className="text-xs mt-2 bg-black p-4 overflow-auto max-h-96">
                {JSON.stringify(apiData.files, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <p className="text-yellow-400">Loading...</p>
        )}
      </div>

      {/* Test Button */}
      <div className="mb-8">
        <button
          onClick={runTests}
          disabled={!apiData}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-white font-semibold"
        >
          Run Image Load Tests
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="mb-8 p-6 bg-gray-900 rounded">
          <h2 className="text-2xl mb-4">Step 2: Image Load Test Results</h2>
          {testResults.map((result: any, i) => (
            <div key={i} className={`mb-4 p-4 rounded ${result.success ? 'bg-green-900' : 'bg-red-900'}`}>
              <p className="font-semibold">{result.success ? '✅ SUCCESS' : '❌ FAILED'}: {result.method}</p>
              <p className="text-xs break-all mt-2">{result.url}</p>
              {result.error && <p className="text-xs text-red-300 mt-1">Error: {result.error}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Visual Test */}
      <div className="mb-8 p-6 bg-gray-900 rounded">
        <h2 className="text-2xl mb-4">Step 3: Visual Test</h2>
        {apiData?.files?.slice(0, 3).map((file: any, i: number) => (
          <div key={i} className="mb-8 p-4 bg-gray-800 rounded">
            <h3 className="text-lg mb-4">{file.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Raw path */}
              <div>
                <p className="text-xs text-blue-400 mb-2">Raw path:</p>
                <p className="text-xs bg-black p-2 mb-2 break-all">{file.webPath}</p>
                <div className="bg-black p-4 min-h-[200px] flex items-center justify-center">
                  <img 
                    src={file.webPath}
                    alt={file.name}
                    className="max-w-full max-h-48 object-contain"
                    onLoad={(e) => {
                      console.log('✅ RAW LOADED:', file.webPath);
                      e.currentTarget.parentElement!.classList.add('border-4', 'border-green-500');
                    }}
                    onError={(e) => {
                      console.error('❌ RAW FAILED:', file.webPath);
                      e.currentTarget.parentElement!.classList.add('border-4', 'border-red-500');
                      e.currentTarget.alt = '❌ FAILED TO LOAD';
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Encoded path */}
              <div>
                <p className="text-xs text-purple-400 mb-2">Encoded path:</p>
                <p className="text-xs bg-black p-2 mb-2 break-all">{file.encodedPath}</p>
                <div className="bg-black p-4 min-h-[200px] flex items-center justify-center">
                  <img 
                    src={file.encodedPath}
                    alt={file.name}
                    className="max-w-full max-h-48 object-contain"
                    onLoad={(e) => {
                      console.log('✅ ENCODED LOADED:', file.encodedPath);
                      e.currentTarget.parentElement!.classList.add('border-4', 'border-green-500');
                    }}
                    onError={(e) => {
                      console.error('❌ ENCODED FAILED:', file.encodedPath);
                      e.currentTarget.parentElement!.classList.add('border-4', 'border-red-500');
                      e.currentTarget.alt = '❌ FAILED TO LOAD';
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Direct link test */}
            <div className="mt-4 flex gap-4">
              <a 
                href={file.webPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                Open raw in new tab
              </a>
              <a 
                href={file.encodedPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline text-sm"
              >
                Open encoded in new tab
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Browser Info */}
      <div className="p-6 bg-gray-900 rounded">
        <h2 className="text-2xl mb-4">Browser Info</h2>
        <p className="text-sm">User Agent: {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
        <p className="text-sm mt-2">Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
      </div>
    </div>
  );
}
