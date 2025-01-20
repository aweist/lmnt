import React from "react";

import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { toast } from "sonner";

enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
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
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const requestID = body.get("id");
  const baseURL = process.env.SAMPLE_REQUEST_SERVICE_URL;
  const action = body.get("action");
  let url = baseURL + "/sample_requests/" + requestID;
  if (action === "approve") {
    url += "/approve";
  } else if (action === "reject") {
    url += "/reject";
  }
  const response = await fetch(url, { method: "POST" });
  if (!response.ok) {
    toast.error("Error updating request");
  }
  return response;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Unknown error";
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 m-10 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">{message}</strong>
    </div>
  );
}

export const loader = async () => {
  const baseURL = process.env.SAMPLE_REQUEST_SERVICE_URL;
  const url = baseURL + "/sample_requests";
  const response = await fetch(url).catch(function () {
    throw new Error("Failed to fetch data");
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  let sampleRequests: SampleRequest[] = await response.json();
  return sampleRequests;
};

export default function SampleRequestReview() {
  const sampleRequests = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen justify-center bg-white">
      <div className="rounded-lg overflow-hidden mt-4 mx-4 md:mx-10">
        <table className="shadow-lg w-full table-fixed">
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
                  {request.status === RequestStatus.APPROVED && (
                    <span className="text-green-600">Approved</span>
                  )}
                  {request.status === RequestStatus.REJECTED && (
                    <span className="text-red-600">Rejected</span>
                  )}
                  {request.status === RequestStatus.PENDING && (
                    <>
                      <form method="post" className="inline-block mr-1">
                        <input type="hidden" name="id" value={request.id} />
                        <input type="hidden" name="action" value="approve" />
                        <button
                          type="submit"
                          className="py-1 px-2 rounded-full text-xs bg-green-500 text-white"
                        >
                          Approve
                        </button>
                      </form>
                      <form method="post" className="inline-block">
                        <input type="hidden" name="id" value={request.id} />
                        <input type="hidden" name="action" value="reject" />
                        <button
                          type="submit"
                          className="py-1 px-2 rounded-full text-xs bg-red-500 text-white"
                        >
                          Reject
                        </button>
                      </form>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
