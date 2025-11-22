export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Simple Image Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-4">Test 1: Simple file in public root</h2>
        <img src="/test-simple.jpg" alt="Test" className="max-w-md" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Test 2: No spaces in path</h2>
        <img src="/favicon.svg" alt="Favicon" className="max-w-md" />
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Test 3: Path with spaces (unencoded)</h2>
        <img 
          src="/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS (from 2005 to 2025)/FREE MIND SERIES 2022/25/Free Mind Series 2022 #2 Acrylic on Canvas.jpg" 
          alt="Test with spaces unencoded" 
          className="max-w-md"
          onError={(e) => {
            e.currentTarget.style.border = '3px solid red';
            console.error('❌ Failed to load unencoded');
          }}
          onLoad={() => console.log('✅ Loaded unencoded')}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Test 4: Path with spaces (encoded)</h2>
        <img 
          src={encodeURI("/images/PORTAFOLIO/CANVAS/ACRYLIC ON CANVAS (from 2005 to 2025)/FREE MIND SERIES 2022/25/Free Mind Series 2022 #2 Acrylic on Canvas.jpg")}
          alt="Test with spaces encoded" 
          className="max-w-md"
          onError={(e) => {
            e.currentTarget.style.border = '3px solid red';
            console.error('❌ Failed to load encoded');
          }}
          onLoad={() => console.log('✅ Loaded encoded')}
        />
      </div>
    </div>
  );
}
