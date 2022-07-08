// creacion de un modelo, importaremos con structuring.
import { Schema, model, ObjectId } from 'mongoose';

//Creation task
export interface IActivityModel {
    name: string;
    ubication: string;
    description: string;
    hour: string;
    date: string;
    colaboration: string;
    event: string;
    user_id: ObjectId;
    event_id: ObjectId;
}

//Crear un usuario el cual impletementara adentro del schema el IUserModel
const activitySchema = new Schema<IActivityModel>({
    name: {
        type: String,
        required: true,
    },
    ubication:  {
        type: String,
        required: true,
    },
    description:  {
        type: String,
        required: true,
    },
    hour:  {
        type: String,
        required: true,
    },
    date:  {
        type: String,
        required: true,
    },
    colaboration:  {
        type: String,
        required: true,
    },
    event:  {
        type: String,
        required: true,
    },
    user_id:  {
        type: Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    event_id:  {
        type: Schema.Types.ObjectId, ref: "Event",
        required: true,
    }   
});

//exportamos el archivo 
export default model <IActivityModel>('activity', activitySchema);
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.