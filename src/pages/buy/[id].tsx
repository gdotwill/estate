import { PropertyPage } from "@/components/Property/PropertyPage";
import { IProperty } from "@/components/Property/types";
import getProperties, { getProperty } from "@/lib/firebase/getFromDB";
import { useRouter } from "next/router";

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  try {
    if (!params) throw "No params attached";
    const property = await getProperty(params.id);

    return {
      props: {
        data: property,
      },
    };
  } catch (error) {
    console.log("Error fetching property:", error);

    return {
      props: {
        data: { property: null },
      },
    };
  }
}

export async function getServerSidePaths() {
  const properties = await getProperties();
  if (properties === null) return;

  const paths = properties.map((record) => {
    return { params: { id: record.id } };
  });

  return {
    paths,
    fallback: false,
  };
}

const PropertyDetails = ({ data }: { data?: IProperty }) => {
  const router = useRouter();
  if (!data) {
    router.push("/404");
    return {
      notFound: true,
    };
  }

  return <PropertyPage property={data} />;
};

export default PropertyDetails;
