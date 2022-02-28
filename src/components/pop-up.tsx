import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getOneProject } from "../helpers/getOneProject";
import { IProject } from "../types/types";

interface IProps{
    content:{},
    handleClose: () => void,
    projectName:string
}

// const emptyProject:IProject={
//     project_name:"some text",
//       screenshot_links:[],
//       tagline: "",
//       link_to_project: "",
//       github_link:"",
//       about:"",
//       languages:[],
//       challenges:[]
// }


export const Popup:React.FC<IProps> = ({content,handleClose,projectName}) =>{
    
    //GET ONE PROJECT FROM DB why does this break?? 
    const getOneProjectRequest = useMutation(getOneProject);
    const displayData = async (projectName:string) =>{
       return  getOneProjectRequest.mutate(projectName);
    }
        
    //need a funct to get info from db and use it as base state 
    const [input,setInput] = useState(getOneProjectRequest.data);
 
  
    useEffect(()=>{ //check if there's a response from deleteProjectRequest muation
        if(getOneProjectRequest.data){
            console.log(getOneProjectRequest.data)
            setInput(getOneProjectRequest.data) //set projects to the current data array 
        }
        },[getOneProjectRequest.data])

    useEffect(() => {
        // so does this keep repeating non-stop?
        displayData(projectName);
        console.log("running");
    }, [] );
 

     //two-way binding for input 
     const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
   

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>
                  x
                </span>
                {content}
                
        <div className="add-project-container">
            <div className="center-projects">
                <textarea name="project_name" value={input?.project_name} onChange={handleChange} placeholder="Project name" className="adding-project-input"/>
                <textarea name="screenshot_links" value={input?.screenshot_links}  onChange={handleChange} placeholder="Screenshot links" className="adding-project-input"/>
                <textarea name="tagline" value={input?.tagline} onChange={handleChange}placeholder="Tagline" className="adding-project-input"/>
                <textarea name="link_to_project" value={input?.link_to_project} onChange={handleChange} placeholder="Link to project" className="adding-project-input"/>
                <textarea name="github_link" value={input?.github_link}  onChange={handleChange}placeholder="Github link" className="adding-project-input"/>
                <textarea name="about" value={input?.about}  onChange={handleChange}placeholder="About" className="adding-project-input"/>
                <textarea name="languages" value={input?.languages} onChange={handleChange}placeholder="Languages" className="adding-project-input"/>
                <textarea name="challenges" value={input?.challenges} onChange={handleChange}placeholder="Challenges" className="adding-project-input"/>


                <button className="action-button" onClick={()=>displayData(projectName)}>Add Project</button>
            </div>
            
                

        </div>
            </div>
        </div>
    )
}
