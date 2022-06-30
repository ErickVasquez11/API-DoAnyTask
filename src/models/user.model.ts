// creacion de un modelo, importaremos con structuring.
import { Schema, model } from 'mongoose';

//Creater recovery
interface IRecoveryOptions {
    token: string;
    url: string;
}

//Creation user
export interface IUserModel {
    name: string;
    lastName: string;
    dateofbirth: string;
    email: string;
    password: string;
    recovery?: IRecoveryOptions;

}
//Crear un usuario el cual impletementara adentro del schema el IUserModel
const userSchema = new Schema<IUserModel>({
    name: {
        type: String,
        required: true,
    },
    lastName:  {
        type: String,
        required: true,
    },
    dateofbirth:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true,
        minlength: 8
    },
    //setearemos el recovery
    recovery: {
        //El tipo sera un objeto, con las sigueinte propiedades
        type: {
            token: String,
            url: String,
        }
    }
});

//exportamos el archivo 
export default model <IUserModel>('user', userSchema);
// Asi tenemos listo nuestro modelo de esquema de nuestro usuario.