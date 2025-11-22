'use client';

export default function DiagnosticPage() {
  const testUrls = [
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS/FREE MIND SERIES 2022/25/Free Mind Series 2022 #2 Acrylic on Canvas.jpg',
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS/FREE MIND SERIES 2022/25/Free Mind series 2022 #1 Acrylic on canvas.jpg',
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS/FUTURE LANDSCAPE SERIES/25/Future Landscape Serie 2025 #1 Acrylic on canvas.JPG',
    '/test-simple.jpg',
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Image Diagnostic</h1>
      
      {testUrls.map((url, i) => (
        <div key={i} className="mb-12 p-6 border border-gray-700 rounded-lg bg-gray-800">
          <h2 className="text-xl mb-4 text-green-400">Test {i + 1}</h2>
          <p className="text-sm text-gray-400 mb-4 break-all font-mono">
            Path: {url}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Without encoding */}
            <div>
              <p className="text-xs mb-2 text-blue-400">Raw (no encoding):</p>
              <div className="bg-black p-4 rounded">
                <img 
                  src={url}
                  alt={`Test ${i}`}
                  className="max-w-full h-auto max-h-64 object-contain mx-auto"
                  onLoad={(e) => {
                    console.log(`✅ RAW LOADED ${i}:`, url);
                    e.currentTarget.parentElement!.classList.add('border-4', 'border-green-500');
                  }}
                  onError={(e) => {
                    console.error(`❌ RAW FAILED ${i}:`, url);
                    e.currentTarget.parentElement!.classList.add('border-4', 'border-red-500');
                    e.currentTarget.alt = '❌ FAILED';
                  }}
                />
              </div>
            </div>

            {/* With encoding */}
            <div>
              <p className="text-xs mb-2 text-purple-400">Encoded:</p>
              <div className="bg-black p-4 rounded">
                <img 
                  src={encodeURI(url)}
                  alt={`Test ${i} encoded`}
                  className="max-w-full h-auto max-h-64 object-contain mx-auto"
                  onLoad={(e) => {
                    console.log(`✅ ENCODED LOADED ${i}:`, encodeURI(url));
                    e.currentTarget.parentElement!.classList.add('border-4', 'border-green-500');
                  }}
                  onError={(e) => {
                    console.error(`❌ ENCODED FAILED ${i}:`, encodeURI(url));
                    e.currentTarget.parentElement!.classList.add('border-4', 'border-red-500');
                    e.currentTarget.alt = '❌ FAILED';
                  }}
                />
              </div>
              <p className="text-xs mt-2 text-gray-500 break-all font-mono">
                {encodeURI(url)}
              </p>
            </div>
          </div>

          {/* Direct link test */}
          <div className="mt-4">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline text-sm"
            >
              Open in new tab (raw)
            </a>
            <span className="mx-3 text-gray-600">|</span>
            <a 
              href={encodeURI(url)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline text-sm"
            >
              Open in new tab (encoded)
            </a>
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Instructions:</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
          <li>Green border = Image loaded successfully</li>
          <li>Red border = Image failed to load</li>
          <li>Check browser console for detailed logs</li>
          <li>Try clicking the "Open in new tab" links to see if images load directly</li>
        </ul>
      </div>
    </div>
  );
}
