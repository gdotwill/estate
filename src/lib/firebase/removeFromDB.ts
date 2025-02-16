import { requestHandlerDelete } from "../../utils/firebase/requestHandlers";



export default async function removeProperty(id: string) {
    
    const DB_TITLE = "properties";
    try {
        const result = requestHandlerDelete(DB_TITLE, id)
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }

}

