import { isAbsolute } from "path/posix";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { deleteProject } from "../helpers/deleteProject.helper";
import { getAllProjects } from "../helpers/getAllProjects.helper";
import { IProjectList, IProjectProp } from "../types/types";
import { Popup } from "./pop-up";


export const ProjectList:React.FC<IProjectProp> = ({projectsArrayInterface,setAllProjects}) => {

    //GET ALL PROJECTS FROM DB 
    const getAllProjectsRequest = useQuery('all-projects-query',getAllProjects);
    //set all projects to the current projects in db 
    useEffect(()=>{
       if(getAllProjectsRequest.data){
        // console.log(getAllProjectsRequest.data)
       setAllProjects(getAllProjectsRequest.data)
        }
     },[getAllProjectsRequest.data])

    //useMutataion - to delete a project 
    const deleteProjectRequest = useMutation(deleteProject);

    //send back the name of a record and delete by id 
    const handleClick = async (projectName:string) =>{
        deleteProjectRequest.mutate(projectName) //sending in the project name and deleting from db 
        // console.log('trying to delete: '+projectName)
    }
    //popup stuff
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const togglePopup = ():void =>{
        setIsOpen(!isOpen)
    }

    useEffect(()=>{ //check if there's a response from deleteProjectRequest muation
        if(deleteProjectRequest.data){
            setAllProjects(deleteProjectRequest.data) //set projects to the current data array 
        }
     },[deleteProjectRequest.data])


    

    //return the project cards  
    const renderList = ():JSX.Element[]=>{
        return projectsArrayInterface.map(thing =>{
                return (

                    <div className="card-container">
                        <div className="card-header">
                            <div className="image-container">
                                <img src={(thing.screenshot_links).toString()} className="card-image" alt={thing.project_name} />
                                
                            </div>
                                <h2 className="project-title">
                                   {thing.project_name}
                                </h2>
                        </div>
                       

                        <div className="card-body">
                            <div className="card-subcontainer">
                                <div className="card-subheading">
                                    <h3>About</h3>
                                </div>
                                <div className="sub-text">
                                    <p>
                                        {thing.about}
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="card-subcontainer">
                                <div className="card-subheading">
                                    <h3>Languages Used</h3>
                                </div>
                                <div className="sub-text">
                                    <p>
                                        {thing.languages}   
                                    </p>
                                </div>
                            </div>
                            <hr />
                            <div className="card-subcontainer">
                                <div className="card-subheading">
                                    <h3>Biggest challenges</h3>
                                </div>
                                <div className="sub-text">
                                    {/* display each entry in the array on a new line */}
                                        {(((thing.challenges).toString().split(',')).map(item =>{ return (<p>{item}</p>)}))}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="actions-button-container">
                            <button className="delete-project-button action-button" onClick={() =>handleClick(thing.project_name)}>
                                Delete this record
                            </button>
                            <br />
                            <button className="alter-project-button action-button" onClick={togglePopup} >
                           
                                Update this record
                            </button> 
                            
                        </div>
                        {isOpen && <Popup
                                content={<>
                                    <b>Update your record</b>
                                </>}
                                handleClose={togglePopup} projectName={thing.project_name}
                                />}
                    </div>

               
                )
            })
    }

    return (
        <div>
            <div className="all-projects">
                {renderList()}
            </div> 
        </div>
    )
}