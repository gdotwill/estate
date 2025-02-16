import { IInitSearch } from "./type";
import { IEstateData } from "../../types/estate";
import { isInRange } from "./isInRange";

export const filterData = (values: IInitSearch, data: IEstateData[]) => {
    const filtered = data.filter((record) => {

        const cost = record.price.toString()
        const price = parseInt(cost.substring(1).replace(",", ""));
        const title = record.title.toLowerCase();
        const bedrooms = record.num_bedrooms;

        if (
            values.title.length > 3 &&
            !title.includes(values.title.toLowerCase())
        ) {
            return false;
        }

        isInRange(price, { min: values.minPrice, max: values.maxPrice })
        isInRange(bedrooms, { min: values.minBedrooms, max: values.maxBedrooms })


        return true;
    });

    return filtered;
};