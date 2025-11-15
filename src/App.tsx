import { CollaborativeWorkspace } from "@/components/CollaborativeWorkspace";

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Real-Time Collaboration
          </h1>
          <p className="text-lg text-gray-600">
            Experience live cursors, presence indicators, and instant sync
          </p>
        </div>
        <div className="h-[calc(100vh-200px)] min-h-[600px]">
          <CollaborativeWorkspace />
        </div>
      </div>
    </main>
  );
}

export default App;
