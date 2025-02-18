import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { CardsWrapper } from "@/components/PropertyCards/CardsWrapper";
import data from "@/data/staticData.json";
import { PropertyCard } from "@/components/PropertyCards/PropertyCard";
import { SearchBar } from "@/components/Search";
import { Search } from "@/components/Search2";
import { getRandomItems } from "@/utils/helpers/randomArrayElements";
import { SEOHead } from "@/components/SEOHead";
import styles from "@/styles/Home.module.scss";
import { IEstateData } from "@/types/estate";
import getProperties from "@/lib/firebase/getFromDB";

const NUM_PROPERTIES_ON_HOME_PAGE = 6;

export type ISearch = {
  properties: IEstateData[];
};

const Home = ({ properties}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const defaultDisplayProperties = getRandomItems(
    properties,
    NUM_PROPERTIES_ON_HOME_PAGE
  );

  const [loading, setLoading] = useState(false); 

  const [query, setQuery] = useState<string>('');

  const [searchItems, setSearchItems] = useState(defaultDisplayProperties);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setSearchItems(
      properties.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )  
    ); 
  };

  return (
    <>
      <SEOHead
        title={
          "Real Estate Agency - Your One Stop Shop for Buying and Selling Properties"
        }
      />

      <main className={styles.main}>
        <h1 className={styles.h1}>Find Your Dream Home</h1>      
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative wrapper w-xl">
            <div className="mr-10 pr-10 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-9 h-9 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              style={{ width: '500px', borderRadius: '10px', padding: '20px 10px 20px 35px' }}
              value={query}
              onChange={handleSearch}
              placeholder="Search properties..."
            />
        </div>
      </main>

      {
        loading ? (
          <h1 className='text-center mt-10 text-3xl'>Loading properties...</h1>

        ) :  searchItems.length === 0 ? (
          <h1 className='text-center mt-20 text-5xl'>No properties found for "{query}"</h1> 
        ) : (
          <CardsWrapper>
            {
              searchItems.map((record: IEstateData) => {
                const { id, num_bedrooms, img, ...restData } = record;
                return <PropertyCard key={id} record={record} />;
              })}
          </CardsWrapper>
        )
      }

    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const properties = await getProperties();

    return { props: { properties } };
  } catch (error) {
    console.log("Error fetching document:", error);
    return { props: { properties: data } };
  }
}
