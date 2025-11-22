'use client';

export default function WorkingTestPage() {
  // Test these exact paths
  const testImages = [
    {
      title: "Test 1: Free Mind #2",
      path: "/images/PORTAFOLIO/FREE MIND SERIES/Free Mind Series 2022 #2 Acrylic on Canvas.jpg"
    },
    {
      title: "Test 2: Free Mind #1", 
      path: "/images/PORTAFOLIO/FREE MIND SERIES/Free Mind series 2022 #1 Acrylic on canvas.jpg"
    },
    {
      title: "Test 3: Future Landscape #1",
      path: "/images/PORTAFOLIO/FUTURE LANDSCAPES/Future Landscape Serie 2025 #1 Acrylic on canvas.JPG"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Working Test</h1>
      
      {testImages.map((img, i) => (
        <div key={i} className="mb-12 p-6 bg-gray-900 rounded">
          <h2 className="text-xl mb-4">{img.title}</h2>
          <p className="text-sm text-gray-400 mb-4 break-all">Path: {img.path}</p>
          
          {/* Method 1: Direct path */}
          <div className="mb-6">
            <p className="text-xs text-blue-400 mb-2">Direct:</p>
            <img 
              src={img.path}
              alt={img.title}
              className="max-w-md border-4 border-blue-500"
              onLoad={() => console.log("✅ DIRECT LOADED:", img.path)}
              onError={() => console.error("❌ DIRECT FAILED:", img.path)}
            />
          </div>

          {/* Method 2: Encoded URI */}
          <div className="mb-6">
            <p className="text-xs text-purple-400 mb-2">encodeURI:</p>
            <img 
              src={encodeURI(img.path)}
              alt={img.title}
              className="max-w-md border-4 border-purple-500"
              onLoad={() => console.log("✅ ENCODEURI LOADED:", encodeURI(img.path))}
              onError={() => console.error("❌ ENCODEURI FAILED:", encodeURI(img.path))}
            />
          </div>

          {/* Method 3: encodeURIComponent for filename only */}
          <div>
            <p className="text-xs text-green-400 mb-2">Smart encode (path + encoded filename):</p>
            {(() => {
              const parts = img.path.split('/');
              const filename = parts.pop();
              const basePath = parts.join('/');
              const smartPath = `${basePath}/${encodeURIComponent(filename!)}`;
              return (
                <>
                  <p className="text-xs text-gray-500 mb-2 break-all">{smartPath}</p>
                  <img 
                    src={smartPath}
                    alt={img.title}
                    className="max-w-md border-4 border-green-500"
                    onLoad={() => console.log("✅ SMART LOADED:", smartPath)}
                    onError={() => console.error("❌ SMART FAILED:", smartPath)}
                  />
                </>
              );
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
