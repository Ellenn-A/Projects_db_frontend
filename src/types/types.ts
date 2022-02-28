export interface IProject{ //single project 
    id?:number,
    project_name:string,
    screenshot_links:string[],
    tagline: string,
    link_to_project?: string,
    github_link?:string,
    about:string,
    languages:string[],
    challenges:string[]
}
export interface IProjectFromBackend{ //project from bacend 
    project_name?:string,
    screenshot_links?:string[],
    tagline?: string,
    link_to_project?: string,
    github_link?:string,
    about?:string,
    languages?:string[] ,
    challenges?:string[]
}

export interface IProjectList{
    projectsArrayInterface:IProject[];
}

export interface IProjectProp{
    projectsArrayInterface:IProject[];
    setAllProjects:React.Dispatch<React.SetStateAction<IProject[]>>
}