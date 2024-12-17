import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { URLTable } from './components/URLTable';
import { URLDialog } from './components/URLDialog';
import { useStore } from './store/useStore';
import { Plus } from 'lucide-react';
import { getProjects, getProjectUrls, createRandomUrl, deleteUrl } from './services/database';

function App() {
  const { currentProject, randomUrls, setProjects, setRandomUrls } = useStore();
  const [isURLDialogOpen, setIsURLDialogOpen] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, [setProjects]);

  useEffect(() => {
    const loadProjectUrls = async () => {
      if (currentProject) {
        try {
          const urls = await getProjectUrls(currentProject.id);
          setRandomUrls(urls);
        } catch (error) {
          console.error('Error loading URLs:', error);
        }
      }
    };

    loadProjectUrls();
  }, [currentProject, setRandomUrls]);

  const handleCreateUrl = async (path: string, targets: { url: string; percentage: number }[]) => {
    if (!currentProject) return;
    
    try {
      const newUrl = await createRandomUrl(currentProject.id, path, targets);
      setRandomUrls([...randomUrls, newUrl]);
    } catch (error) {
      console.error('Error creating URL:', error);
    }
  };

  const handleDeleteUrl = async (id: string) => {
    try {
      await deleteUrl(id);
      setRandomUrls(randomUrls.filter(url => url.id !== id));
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        {currentProject ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentProject.name}
              </h1>
              <button 
                className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-700"
                onClick={() => setIsURLDialogOpen(true)}
              >
                <Plus size={20} />
                <span>New URL</span>
              </button>
            </div>
            <URLTable urls={randomUrls} onDelete={handleDeleteUrl} />
            <URLDialog
              isOpen={isURLDialogOpen}
              onClose={() => setIsURLDialogOpen(false)}
              onSubmit={handleCreateUrl}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              Select a project to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;