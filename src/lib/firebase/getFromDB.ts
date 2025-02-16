import { IEstateData } from "@/types/estate";
import { requestHandlerGet, requestHandlerGetByID } from "../../utils/firebase/requestHandlers";


export default async function getProperties() {
  const data = requestHandlerGet('properties')
  const result = await data as IEstateData[]
  if (result === null) throw Error("I'm sorry, an error occurred when attempting to get properties from the database.")
  return result
}





export async function getProperty(id: string) {

  const data = requestHandlerGetByID('properties', id)

  const result = await data as IEstateData

  if (result === null) throw Error("I'm sorry, an error occurred when attempting to get property from the database.")
  return result
}


