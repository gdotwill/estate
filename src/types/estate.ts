export type IEstateData = {
    id: string;
    title: string;
    description: string;
    localization: Localization;
    phone_number: string;
    email: string;
    price: string;
    num_bedrooms: number;
    area: number;
    bathrooms: number;
    img: string;
  }

  export type Localization = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }
  

