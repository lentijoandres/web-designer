import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Header from './components/Header';
import ModulesView from './components/ModulesView';
import ProjectsView from './components/ProjectsView';
import ProjectDetailView from './components/ProjectDetailView';
import DataManagerView from './components/DataManagerView';
import TaskManagerView from './components/TaskManagerView';
import LoginView from './components/LoginView';
import StandardsManagerView from './components/StandardsManagerView';

function WebDesignerShell() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<ModulesView />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/projects/:projectId" element={<ProjectDetailView />} />
        <Route path="/data-manager" element={<DataManagerView />} />
        <Route path="/task-manager" element={<TaskManagerView />} />
        <Route path="/standards-manager" element={<StandardsManagerView />} />
      </Routes>
      <footer className="mt-8 pb-4 text-center text-xs text-subtle">
        Powered by Mantiz
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/web-designer/*" element={<WebDesignerShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
