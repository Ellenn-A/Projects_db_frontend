import { isAbsolute } from "path/posix";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllProjects } from "../helpers/getAllProjects.helper";
import { IProjectList, IProjectProp } from "../types/types";


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
    // console.log(projectsArrayInterface);

    //testing
    // projectsArrayInterface.map(thing =>{
    //     const languagesArr = (thing.languages).toString().split(',');
    //     console.log(languagesArr)
    //     for (let data in languagesArr){
    //         console.log(languagesArr[data])
    //     }
    // })

    //dislay info from array 
    const languagesArr = (arrayAsString:string[]) => {
        const actualArray = (arrayAsString).toString().split(',');
        console.log(actualArray);
        console.log(actualArray.length);
        for (let i = 0; i< actualArray.length;i++){
            console.log(i)
            console.log(actualArray[i])
            return actualArray[i]
        }
    }

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
                                   
                                        {/* {languagesArr(thing.challenges)} */}
                                        {(((thing.challenges).toString().split(',')).map(item =>{ return (<p>{item}</p>)}))}
                                    
                                </div>
                            </div>
                        </div>
                        
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