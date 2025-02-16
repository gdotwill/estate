import { formatPrice } from "@/utils/search/formatPrice";
import { requestHandlerSet } from "../../utils/firebase/requestHandlers";
import { v4 as uuidv4 } from 'uuid';
import { IEstateData } from "@/types/estate";
import { FormValues } from "@/types/sellForm";


export default async function addProperty<T extends FormValues>(data: T ) {
    const DB_TITLE = "properties";
    const ID = uuidv4();

    const submittedData = {
        ...data,
        id: ID,
        price: formatPrice(Number(data.price)),
      };

    try {
        const result = requestHandlerSet(DB_TITLE, ID, submittedData)
        return { result, error: null };
    } catch (error) {
        return { result: null, error };
    }

}

