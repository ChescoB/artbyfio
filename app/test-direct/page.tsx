export default function TestDirectPage() {
  const testPaths = [
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS (from 2005 to 2025)/FREE MIND SERIES 2022/25/Free Mind series 2022 #1 Acrylic on canvas.jpg',
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS (from 2005 to 2025)/FREE MIND SERIES 2022/25/Free Mind Series 2022 #2 Acrylic on Canvas.jpg',
    '/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS (from 2005 to 2025)/FUTURE LANDSCAPE SERIES 2022/25/Future Landscape Serie 2025 #1 Acrylic on canvas.JPG',
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Direct Image Test</h1>
      
      {testPaths.map((path, i) => (
        <div key={i} className="mb-12 border border-gray-700 p-4 rounded">
          <h2 className="text-xl mb-2">Test {i + 1}</h2>
          <p className="text-sm text-gray-400 mb-4 break-all">Path: {path}</p>
          <p className="text-sm text-green-400 mb-4 break-all">Encoded: {encodeURI(path)}</p>
          
          {/* Raw img tag with unencoded path */}
          <div className="mb-4">
            <p className="text-xs mb-2">Unencoded:</p>
            <img 
              src={path} 
              alt={`Test ${i}`}
              className="max-w-md h-auto"
              onLoad={() => console.log('✅ Loaded unencoded:', path)}
              onError={(e) => {
                console.error('❌ Failed unencoded:', path);
                e.currentTarget.src = '';
                e.currentTarget.alt = '❌ FAILED TO LOAD';
              }}
            />
          </div>

          {/* Raw img tag with encoded path */}
          <div>
            <p className="text-xs mb-2">Encoded:</p>
            <img 
              src={encodeURI(path)} 
              alt={`Test ${i} encoded`}
              className="max-w-md h-auto"
              onLoad={() => console.log('✅ Loaded encoded:', encodeURI(path))}
              onError={(e) => {
                console.error('❌ Failed encoded:', encodeURI(path));
                e.currentTarget.src = '';
                e.currentTarget.alt = '❌ FAILED TO LOAD';
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
