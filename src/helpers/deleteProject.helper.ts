import axios from "axios"
import { IProject } from "../types/types";


export const deleteProject = async(projectName:string):Promise<IProject[]>  => {
    const deletionResult = await axios.post('http://localhost:3001/deleteProject',{
        //id of project to tbe deleted 
        body:projectName
    })
    // console.log('Deletion result: ')
    // console.log(deletionResult.data);
    return deletionResult.data;
    
}