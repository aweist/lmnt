import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: "https://aweist.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: "f76d5c9e4d1dd07c3390b6f7c415faa4",
});

interface productVariant {
  id: string;
  sku: string;
  title: string;
}
interface productByHandleQueryResponse {
  productByHandle: {
    createdAt: string;
    description: string;
    handle: string;
    id: string;
    variants: {
      nodes: {
        [id: number]: productVariant;
      };
    };
  };
}

export const loader = async () => {
  const shopQuery = `
    query Product {
      productByHandle(handle: "lmnt-electrolyte-drink") {
          createdAt
          description
          handle
          id
          variants(first: 100) {
              nodes {
                  id
                  sku
                  title
              }
          }
      }
    }
  `;

  const { data, errors, extensions } = await client.request(shopQuery);
  const product: productByHandleQueryResponse =
    data as productByHandleQueryResponse;
  return product;
};

export default function App() {
  const product = useLoaderData<typeof loader>();
  console.log(product.productByHandle.variants.nodes);
  return (
    <>
      <div>Hello World</div>
    </>
  );
}
