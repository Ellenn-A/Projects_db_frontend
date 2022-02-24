import React, { useState } from "react";
import { useQuery } from "react-query";
import { getOneProject } from "../helpers/getOneProject";
import { IProject } from "../types/types";

interface IProps{
    content:{},
    handleClose: () => void
    projectName:string
}

const emptyProject:IProject={
    project_name:"some text",
      screenshot_links:[],
      tagline: "",
      link_to_project: "",
      github_link:"",
      about:"",
      languages:[],
      challenges:[]
}



export const Popup:React.FC<IProps> = ({content,handleClose,projectName}) =>{

    //GET ONE PROJECT FROM DB why does this break?? 
    // const getOneProjectRequest = useQuery('get-one-project-query', getOneProject);

        //need a funct to get info from db and use it as base state 
    const [input,setInput] = useState(emptyProject);

     //two-way binding for input 
     const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    return(
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>
                  x
                </span>
                {content}
                
        <div className="add-project-container">
            <div className="center-projects">
                <textarea name="project_name" value={input.project_name} onChange={handleChange} placeholder="Project name" className="adding-project-input"/>
                <textarea name="screenshot_links" value={input.screenshot_links}  onChange={handleChange} placeholder="Screenshot links" className="adding-project-input"/>
                <textarea name="tagline" value={input.tagline} onChange={handleChange}placeholder="Tagline" className="adding-project-input"/>
                <textarea name="link_to_project" value={input.link_to_project} onChange={handleChange} placeholder="Link to project" className="adding-project-input"/>
                <textarea name="github_link" value={input.github_link}  onChange={handleChange}placeholder="Github link" className="adding-project-input"/>
                <textarea name="about" value={input.about}  onChange={handleChange}placeholder="About" className="adding-project-input"/>
                <textarea name="languages" value={input.languages} onChange={handleChange}placeholder="Languages" className="adding-project-input"/>
                <textarea name="challenges" value={input.challenges} onChange={handleChange}placeholder="Challenges" className="adding-project-input"/>


                {/* <button className="add-project-button" disabled={createProjectRequest.isLoading} onClick={handleClick}>Add Project</button> */}
            </div>
            
                

        </div>
            </div>
        </div>
    )
}