import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { AddNewProject } from './components/addNewProject';
import { ProjectList } from './components/projectList';
import { IProject, IProjectList } from './types/types';

const queryClient = new QueryClient();

const App = () => {
  // const [projects, setProjects] = useState<IProject[]>([])//starting with an empty array for projects 
  const [projects, setProjects] = useState<IProject[]>([])
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Enter the projects</h1>
        <AddNewProject projectsArrayInterface={projects} setAllProjects={setProjects}/>
        <ProjectList projectsArrayInterface={projects} setAllProjects={setProjects} />
        
      </div>
    </QueryClientProvider>
  );
  
}
export default App;
