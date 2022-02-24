import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { addProject } from "../helpers/addProject.helper";
import { IProject, IProjectList, IProjectProp } from "../types/types";


const emptyProject:IProject={
      project_name:"",
        screenshot_links:[],
        tagline: "",
        link_to_project: "",
        github_link:"",
        about:"",
        languages:[],
        challenges:[]
}



export const AddNewProject:React.FC<IProjectProp> =({projectsArrayInterface, setAllProjects}) =>{

    const [input,setInput] = useState(emptyProject);

    //useMutation 
    const createProjectRequest = useMutation(addProject);

    //two-way binding for input 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const handleClick = async () => {
        //return early if missing input 
        if (!input.project_name ||
            !input.screenshot_links ||
            !input.tagline ||
            !input.about ||
            !input.languages ||
            !input.challenges)
            return

        //save inputted project that I can then send to backend 
        const newProject = {
            ...input,
            screenshot_links:(`${input.screenshot_links}`).split(','), //saving as array
            languages:(`${input.languages}`).split(','),
            challenges:(`${input.challenges}`).split(','),
        }
        console.log('here')

        //means run the function I provided earlier wt this input 
        createProjectRequest.mutate({project:newProject});
     

        setAllProjects([
            ...projectsArrayInterface,
            newProject
        ]);
        setInput(emptyProject);

    }

    //useEffect - 1st param is a function 
    useEffect(()=>{
        //check if data is defined
        if (createProjectRequest.data){ //check if state different from base state
            
            console.log(createProjectRequest.data); //do whatever wt data, probs change state
            setAllProjects(createProjectRequest.data); //set array of all tprojects from the db as the base array
            createProjectRequest.reset(); //set it back to the base state (all undefined) 
        }
    },[createProjectRequest.isSuccess]) //in [] i define what it is checking for - what has changed

    return (

        <div className="add-project-container">
            <div className="center-projects">
                <input type="text" name="project_name" value={input.project_name} onChange={handleChange} placeholder="Project name" className="adding-project-input"/>
                <textarea name="screenshot_links" value={input.screenshot_links}  onChange={handleChange} placeholder="Screenshot links" className="adding-project-input"/>
                <textarea name="tagline" value={input.tagline} onChange={handleChange}placeholder="Tagline" className="adding-project-input"/>
                <textarea name="link_to_project" value={input.link_to_project} onChange={handleChange} placeholder="Link to project" className="adding-project-input"/>
                <textarea name="github_link" value={input.github_link}  onChange={handleChange}placeholder="Github link" className="adding-project-input"/>
                <textarea name="about" value={input.about}  onChange={handleChange}placeholder="About" className="adding-project-input"/>
                <textarea name="languages" value={input.languages} onChange={handleChange}placeholder="Languages" className="adding-project-input"/>
                <textarea name="challenges" value={input.challenges} onChange={handleChange}placeholder="Challenges" className="adding-project-input"/>


                <button className="add-project-button" disabled={createProjectRequest.isLoading} onClick={handleClick}>Add Project</button>
            </div>
            
                

        </div>
    )
}