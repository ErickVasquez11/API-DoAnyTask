// creacion de un modelo, importaremos con structuring.
import { Schema, model } from 'mongoose';

//Creation task
export interface ITaskModel {
    name: string;
    date: string;
    hour: string;
    description: string;
    

}

type NewType = ITaskModel;

//Crear un usuario el cual impletementara adentro del schema el IUserModel
const taskSchema = new Schema<NewType>({
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
export default model <ITaskModel>('task', taskSchema);
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.