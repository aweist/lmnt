import React from "react";

import { useLoaderData, useRouteError } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";

interface SampleRequest {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  org: string | null;
  org_name: string;
  org_size: number;
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const requestID = body.get("id");
  const response = await fetch(
    `http://localhost:3000/sample_requests/${requestID}/approve`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    throw new Response("Failed to approve request");
  }
  throw new Response("Failed to approve request");
  return response;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="text-red-500 text-center">
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}

export const loader = async () => {
  const response = await fetch("http://localhost:3000/sample_requests");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  let sampleRequests: SampleRequest[] = await response.json();
  return sampleRequests;
};

export default function SampleRequestReview() {
  const sampleRequests = useLoaderData<typeof loader>();

  return (
    <div className="shadow-lg rounded-lg overflow-hidden mt-4 mx-4 md:mx-10">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Email
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Address
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {sampleRequests.map((request) => (
            <tr key={request.id}>
              <td className="py-4 px-6 border-b border-gray-200">{`${request.first_name} ${request.last_name}`}</td>
              <td className="py-4 px-6 border-b border-gray-200 truncate">
                {request.email_address}
              </td>
              <td className="py-4 px-6 border-b border-gray-200">{`${request.street_address}, ${request.city}, ${request.state}, ${request.postal_code}`}</td>
              <td className="py-4 px-6 border-b border-gray-200">
                {request.approved_at ? (
                  <span className="py-1 px-2 rounded-full text-xs bg-green-500 text-white">
                    Approved
                  </span>
                ) : (
                  <form method="post">
                    <input type="hidden" name="id" value={request.id} />
                    <button
                      type="submit"
                      className="py-1 px-2 rounded-full text-xs bg-blue-500 text-white"
                    >
                      Approve
                    </button>
                  </form>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
