import { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { CardsWrapper } from "@/components/PropertyCards/CardsWrapper";
import { PropertyCard } from "@/components/PropertyCards/PropertyCard";
import { SEOHead } from "@/components/SEOHead";
import styles from "@/styles/Cards.module.scss";
import data from "@/data/staticData.json";
import { IEstateData } from "@/types/estate";
import getProperties from "@/lib/firebase/getFromDB";

const Buy = ({
  properties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [visibleItems, setVisibleItems] = useState<IEstateData[]>(
    properties.slice(0, 6)
  );

  const handleLoadMore = () => {
    setVisibleItems((prev) => properties.slice(0, prev.length + 6));
  };

  return (
    <>
      <SEOHead title="Buy dream property" />

      <CardsWrapper>
        {visibleItems.map((record: IEstateData) => (
          <PropertyCard key={record.id} record={record} />
        ))}
      </CardsWrapper>
      <button className={styles.btnMore} onClick={handleLoadMore}>
        Load More
      </button>
    </>
  );
};

export default Buy;

export async function getServerSideProps() {
  try {
    const properties = await getProperties();

    return { props: { properties: properties as IEstateData[] } };
  } catch (error) {
    console.log("Error fetching document:", error);
    return { props: { properties: data } };
  }
}
