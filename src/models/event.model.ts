// creacion de un modelo, importaremos con structuring.
import { Schema, model, ObjectId } from 'mongoose';

//Creation task
export interface IEventModel {
    name: string;
    date: string;
    hour: string;
    description: string;
    user_id: ObjectId;
}

type NewType = IEventModel;

//Crear un usuario el cual impletementara adentro del schema el IUserModel
const eventSchema = new Schema<NewType>({
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
export default model <IEventModel>('event', eventSchema);
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.