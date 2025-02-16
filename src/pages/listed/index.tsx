import Link from "next/link";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardsWrapper } from "@/components/PropertyCards/CardsWrapper";
import { PropertyCard } from "@/components/PropertyCards/PropertyCard";
import { SEOHead } from "@/components/SEOHead";
import styles from "@/styles/InfoTag.module.scss";
import data from "@/data/staticData.json";
import { IEstateData } from "@/types/estate";
import { useAuthContext } from "@/contexts/AuthContext";
import getProperties from "@/lib/firebase/getFromDB";


const MyProperties = ({
  properties,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuthContext();
  const [myListings, setMyListings] = useState<IEstateData[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push("/", undefined, { shallow: true });
  }, [router, user]);

  useEffect(() => {
    if (user === null) return;
    setMyListings(
      properties.filter((record) => {
        return record.email === user.email;
      })
    );
  }, []);

  return (
    <>
      <SEOHead title="My Listings" />
      {myListings.length === 0 ? (
        <div className={styles.wrapper}>
          <h2 className={styles.info}>
            Since you have not listed any properties yet, you have a great
            opportunity to{" "}
            <Link className={styles.link} href={"/sell"}>
              showcase
            </Link>{" "}
            your unique properties and attract potential buyers.{" "}
          </h2>
        </div>
      ) : (
        <CardsWrapper>
          {myListings.map((record: IEstateData) => (
            <PropertyCard key={record.id} record={record} showDelete={true} />
          ))}
        </CardsWrapper>
      )}
    </>
  );
};

export default MyProperties;

export const getServerSideProps = async () => {
  try {
    const properties = await getProperties();

    return { props: { properties: properties as IEstateData[] } };
  } catch (error) {
    console.log("Error fetching document:", error);
    return { props: { properties: data } };
  }
};
