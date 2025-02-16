import { IProperty } from "@/components/Property/types";

export const PropertyDetails = ({ property }: { property: IProperty }) => {
  return (
    <ul className="property-list-details">
      <li className="text-black">
        Property: <strong className="text-black">{property.title}</strong>
      </li>
      <li>
        Room: <strong>{property.num_bedrooms}</strong>
      </li>
      <li>
        Total Area: <strong>{property.area}m&sup2;</strong>
      </li>
      <li>
        Category: <strong>Modern House</strong>
      </li>
      <li>
        Lunch Date: <strong>Jan 20, 2019</strong>
      </li>
    </ul>
  );
};
