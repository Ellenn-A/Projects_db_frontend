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
        <div className="main-heading-div">
 
          <h1>All my projects ^_^</h1>
        </div>
        
        <div className="add-new-project-area">
          <div className="add-new-project-header">
            <h3>
              Add new Project:
            </h3>
          </div>
          <AddNewProject projectsArrayInterface={projects} setAllProjects={setProjects}/>
        </div>
        <div className="cards-area ">
          <ProjectList projectsArrayInterface={projects} setAllProjects={setProjects} />
        </div>
      </div>
    </QueryClientProvider>
  );
  
}
export default App;
