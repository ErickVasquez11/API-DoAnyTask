// creacion de un modelo, importaremos con structuring.
import { Schema, model, ObjectId , Document} from 'mongoose';

//Creation task
export interface ITaskModel  {
    name: string;
    date: string;
    hour: string;
    description: string;
    user_id: ObjectId;
}

var objectId: ObjectId;
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
    user_id:  {
        type: Schema.Types.ObjectId, ref: "User",
        required: true,
    }
   
});

//exportamos el archivo 
export default model <ITaskModel>('task', taskSchema);
exports.taskSchema = taskSchema;
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.