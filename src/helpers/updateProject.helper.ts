import axios from "axios";
import { IProject, IProjectFromBackend } from "../types/types";

interface INewProject{
    project:IProjectFromBackend
}

//sends new object from UI and awaits respose 
export const updateProject = async({project}:INewProject):Promise<IProject[]> =>{
    // console.log('hitting this')
    const result = await axios.post<IProject[]>('http://localhost:3001/updateProject',{
        body:project
    })
    console.log('returning result')
    console.log(result.data);
    return result.data;

}