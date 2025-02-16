import Head from "next/head";

export const SEOHead = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>

      <meta
        name="description"
        content="We are a real estate agency that helps clients buy and sell properties."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
