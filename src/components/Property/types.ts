export type IProperty =  { 
  id: string;
  title: string;
  description: string;
  email: string;
  price: string;
  num_bedrooms: number;
  area: number;
  bathrooms: number;
  img: string;

}

type Localization = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
