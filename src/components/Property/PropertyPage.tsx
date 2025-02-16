import Image from "next/image";
import styles from "./styles.module.scss";
import { IProperty } from "@/components/Property/types";
import { PropertyDetails } from "./Details";
import { ContactInfo } from "./ContactInfo";
import { SEOHead } from "../SEOHead";
import defaultImg from "@/../public/static/default_img.jpg";

export const PropertyPage = ({ property }: { property: IProperty }) => {
  if (!property) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <SEOHead title={property.title} />

      <div className={styles.featured_container}>
        <div className={styles.featured_property}>
          <div className={styles.image}>
            <Image
              src={property.img || defaultImg}
              width={700}
              height={500}
              alt={property.title}
            />
          </div>
          <div className={styles.text}>
            <h2>Property Information</h2>
            <p className={styles.details}>{property.description}</p>

            <PropertyDetails property={property} />

            <ContactInfo property={property} />

            <div className={styles.contact_wrapper}>
              <p className={styles.contact}>Address:</p>
              {!property.localization ? (
                <div>
                  <p>{property.street}</p>
                  <p>{property.city}</p>
                  <p>{property.zip}</p>
                </div>
              ) : (
                <div>
                  <p>{property.localization.street || property.street}</p>
                  <p>{property.localization.city || property.city}</p>
                  <p>{property.localization.zip || property.zip}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
