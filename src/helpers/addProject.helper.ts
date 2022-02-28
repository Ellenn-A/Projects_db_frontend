import axios from "axios";
import { IProject } from "../types/types";

interface INewProject{
    project:IProject
}

//sends new object from UI and awaits respose 
export const addProject = async({project}:INewProject):Promise<IProject[]> =>{
    // console.log('hitting this')
    const result = await axios.post<IProject[]>('http://localhost:3001/addProject',{
        body:project
    })
    // console.log('returning result')
    // console.log(result);
    return result.data;

}

