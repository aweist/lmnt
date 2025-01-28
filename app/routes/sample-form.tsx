import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Form,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useRouteError,
} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { useState } from "react";
import { toast } from "sonner";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = String(formData.get("first-name")).trim();
  const lastName = String(formData.get("last-name")).trim();
  const email = String(formData.get("email")).trim();

  const streetAddress = String(formData.get("street-address")).trim();
  const city = String(formData.get("city")).trim();
  const state = String(formData.get("state")).trim();
  const postalCode = String(formData.get("postal-code")).trim();

  const org = String(formData.get("org")).trim();
  const orgName = String(formData.get("org-name")).trim();
  const orgSize = Number(formData.get("org-size"));

  const validateEmail = (email: string) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  let validationErrors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    orgName?: string;
    orgSize?: string;
    toastMsg?: string;
  } = {};

  if (!firstName) {
    validationErrors.firstName = "First name is required";
  }

  if (!lastName) {
    validationErrors.lastName = "Last name is required";
  }

  if (!email) {
    validationErrors.email = "Email address is required";
  } else if (!validateEmail(email)) {
    validationErrors.email = "Invalid email address";
  }

  if (!streetAddress) {
    validationErrors.streetAddress = "Street address is required";
  }
  if (!city) {
    validationErrors.city = "City is required";
  }
  if (!state) {
    validationErrors.state = "State is required";
  }
  if (!postalCode) {
    validationErrors.postalCode = "Postal code is required";
  }
  if (org === "yes") {
    if (!orgName) {
      validationErrors.orgName = "Organization name is required";
    }
    if (!orgSize) {
      validationErrors.orgSize = "Organization size is required";
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    return validationErrors;
  }

  const baseURL = process.env.SAMPLE_REQUEST_SERVICE_URL;
  const url = baseURL + "/sample_requests";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      street_address: streetAddress,
      city: city,
      state: state,
      postal_code: postalCode,
      org_name: orgName,
      org_size: orgSize,
    }),
  });

  if (!response.ok) {
    validationErrors.toastMsg = "Error submitting request";
    return validationErrors;
  }

  return redirect("/success");
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

export default function SampleForm() {
  const errors = useActionData<typeof action>();
  console.log("loading");
  if (errors?.toastMsg) {
    toast.error(errors.toastMsg, {
      id: "error",
    });
  }
  const [org, setOrg] = useState(false);

  return (
    <div className="flex h-screen justify-center bg-white">
      <div className="p-10 bg-white">
        <Form method="post">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="inline-block text-sm/6 font-medium text-gray-900"
                  >
                    First name{" "}
                    {errors?.firstName && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.firstName}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last name{" "}
                    {errors?.lastName && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.lastName}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address{" "}
                    {errors?.email && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.email}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Street address{" "}
                    {errors?.streetAddress && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.streetAddress}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="street-address"
                      name="street-address"
                      type="text"
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    City{" "}
                    {errors?.city && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.city}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    State{" "}
                    {errors?.state && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.state}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    ZIP / Postal code{" "}
                    {errors?.postalCode && (
                      <span className="inline-block text-sm/6 font-medium text-red-500">
                        {errors?.postalCode}
                      </span>
                    )}
                  </label>
                  <div className="mt-2">
                    <input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="org"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Are you part of an organization?
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="org"
                      name="org"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setOrg(e.target.value === "yes")}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4"></div>
                {org && (
                  <>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="org-name"
                        className="inline-block text-sm/6 font-medium text-gray-900"
                      >
                        Organization name{" "}
                        {errors?.orgName && (
                          <span className="inline-block text-sm/6 font-medium text-red-500">
                            {errors?.orgName}
                          </span>
                        )}
                      </label>
                      <div className="mt-2">
                        <input
                          id="org-name"
                          name="org-name"
                          type="text"
                          autoComplete="org-name"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="org-size"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Organization Size{" "}
                        {errors?.orgSize && (
                          <span className="inline-block text-sm/6 font-medium text-red-500">
                            {errors?.orgSize}
                          </span>
                        )}
                      </label>
                      <div className="mt-2">
                        <input
                          id="org-size"
                          name="org-size"
                          type="number"
                          autoComplete="org-size"
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
