import admin from 'firebase-admin'
import config from '../config.js'
import { createRequire } from 'module'
import moment from 'moment';
const require = createRequire(import.meta.url)
const serviceAccount = require('../db/prueba-b7c37-firebase-adminsdk-uxzxd-6e9cb793b6.json')

admin.initializeApp({
        credential:admin.credential.cert(serviceAccount),
        baseUrl: config.fb.baseUrl
    })

const db = admin.firestore();

export default class Contenedor {
    constructor(collection) {
        this.FieldValue = admin.firestore.FieldValue;
        this.firebase = admin.firestore();
        this.collection = this.firebase.collection(collection);
    }

        async getAll() {
            try {
                const search = await this.collection.get();
                const data = search.docs;
                const res = data.map(doc => doc.data());
                return { status: 'Success', message: 'Se obtuvieron de manera exitosa los datos.', payload: res }
            } catch (err) {
                return { status: 'Error', message: `No se pudo encontrar los documentos: ${err}` }
            }
        }


        async save(object) {
            object.timestamp =  moment(new Date()).format('DD/MM/YY HH:mm');
            try {
                const newElement = await this.collection.add(object).then(doc => doc.id);
                return { ...object, id:newElement.id }
            } catch (error) {
                return { status: 'Error', message: "No se pudo guardar el documento"+error }
            }
        }

        async getById(id) {
            try {
                const doc = this.collection.doc(id);
                let data = await doc.get();
                let res = data.data();
                if (!res ) {
                    return { status: 'Error', message: `No se encontro un elemento con ese ID en la base de datos.` }
                } else {
                    return { status: 'Success', message: 'Se obtuvo el elemento buscado.', payload: res }
                }
            } catch (error) {
                return { status: 'Error', message: "No se pudo guardar el documento"+error }
            }
        }

        async deleteAll() {
            try {
                const search = await this.collection.delete();
                const data = search.docs;
                const res = data.map(doc => doc.data());
                return { status: 'Success', message: 'Se obtuvieron de manera exitosa los datos.', payload: res }
            } catch (err) {
                return { status: 'Error', message: `No se pudo encontrar los documentos: ${err}` }
            }
        }

        async deleteById(id) {
            try {
                const exist = await this.getById(id);
                if (exist.status === 'Error') {
                    return { status: 'Error', message: 'No existe el documento que quiere borrar.' }
                } else {                
                    const doc = this.collection.doc(id);
                    await doc.delete();
                    return { status: 'Success', message: 'Se elimino con éxito el elemento.'}
                }
            } catch (err) {
                return { status: 'Error', message: `No se pudo eliminar el documento: ${err}` }
            }
        }
        

    }