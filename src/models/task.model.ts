// creacion de un modelo, importaremos con structuring.
import { Schema, model } from 'mongoose';

//Creation task
export interface ITaskUserModel {
    name: string;
    date: string;
    hour: string;
    description: string;
    

}

//Crear un usuario el cual impletementara adentro del schema el IUserModel
const taskSchema = new Schema<ITaskUserModel>({
    name: {
        type: String,
        required: true,
    },
    date:  {
        type: String,
        required: true,
    },
    hour:  {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },

    //setearemos el recovery
   
});

//exportamos el archivo 
export default model <ITaskUserModel>('task', taskSchema);
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.