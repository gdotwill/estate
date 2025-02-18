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



const Home = (
  { properties}: InferGetServerSidePropsType<typeof getServerSideProps>,

) => {
  const defaultDisplayProperties = getRandomItems(
    properties,
    NUM_PROPERTIES_ON_HOME_PAGE
  );

  
  const [loading, setLoading] = useState(false); 

  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const [query, setQuery] = useState<string>('');

  const [searchItems, setSearchItems] = useState(defaultDisplayProperties);

  // const [searchItems, setSearchItems] = useState<ISearch[]>(data);

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
        {/* <Search setSearchTerms={setSearchTerms} properties={properties} /> */}
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search posts..."
        />
      </main>
      {
        loading ? (
          <h1 className='text-center mt-10 text-3xl'>Loading articles...</h1>

        ) :  searchItems.length === 0 && searchTerm ? (
          <h1 className='text-center mt-10 text-3xl'>No articles found for "{searchTerm}"</h1> 
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
