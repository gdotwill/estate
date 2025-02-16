import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs, getDoc, DocumentReference, SetOptions, DocumentData } from "firebase/firestore";
import firebase_app from '@/lib/firebase'


export const db = getFirestore(firebase_app)

export const requestHandlerSet = async <T>(collection: string, id: string, data: T) => {
    const docRef: DocumentReference<any> = doc(db, collection, id);
    return await setDoc(docRef, data, {
        merge: true,
    })

}

export const requestHandlerGet = async (dataBase: string) => {

    const colRef = collection(db, dataBase)
    const docsSnap = await getDocs(colRef);

    return docsSnap.docs.map((doc) => ({ ...doc.data() }))

}



export const requestHandlerDelete = async (collection: string, id: string) => {

    return await deleteDoc(doc(db, collection, id))

}

export const requestHandlerGetByID = async (dataBase: string, id: string) => {

    const docRef = doc(db, dataBase, id);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.exists());
    return docSnap.data()

}
