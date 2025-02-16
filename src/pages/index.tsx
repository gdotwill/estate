import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { CardsWrapper } from "@/components/PropertyCards/CardsWrapper";
import data from "@/data/staticData.json";
import { PropertyCard } from "@/components/PropertyCards/PropertyCard";
import { SearchBar } from "@/components/Search";
import { getRandomItems } from "@/utils/helpers/randomArrayElements";
import { SEOHead } from "@/components/SEOHead";
import styles from "@/styles/Home.module.scss";
import { IEstateData } from "@/types/estate";
import getProperties from "@/lib/firebase/getFromDB";

const NUM_PROPERTIES_ON_HOME_PAGE = 6;

const Home = ({
  properties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const defaultDisplayProperties = getRandomItems(
    properties,
    NUM_PROPERTIES_ON_HOME_PAGE
  );
  const [searchItems, setSearchItems] = useState(defaultDisplayProperties);
  return (
    <>
      <SEOHead
        title={
          "Real Estate Agency - Your One Stop Shop for Buying and Selling Properties"
        }
      />

      <main className={styles.main}>
        <h1 className={styles.h1}>Find Your Dream Home</h1>
        <SearchBar setSearchItems={setSearchItems} properties={properties} />
      </main>
      <CardsWrapper>
        {searchItems &&
          searchItems.map((record: IEstateData) => {
            const { id, num_bedrooms, img, ...restData } = record;

            return <PropertyCard key={id} record={record} />;
          })}
      </CardsWrapper>
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
