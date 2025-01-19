import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Form, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useState } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const firstName = String(formData.get("first-name"));
  const lastName = String(formData.get("last-name"));
  const email = String(formData.get("email"));

  const streetAddress = String(formData.get("street-address"));
  const city = String(formData.get("city"));
  const state = String(formData.get("state"));
  const postalCode = String(formData.get("postal-code"));

  const org = String(formData.get("org"));
  const orgName = String(formData.get("org-name"));
  const orgSize = String(formData.get("org-size"));

  let errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    orgName?: string;
    orgSize?: string;
  } = {};

  if (!firstName) {
    errors.firstName = "First name is required";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  }

  if (!email) {
    errors.email = "Email address is required";
  } else if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (!streetAddress) {
    errors.streetAddress = "Street address is required";
  }
  if (!city) {
    errors.city = "City is required";
  }
  if (!state) {
    errors.state = "State is required";
  }
  if (!postalCode) {
    errors.postalCode = "Postal code is required";
  }
  if (org) {
    if (!orgName) {
      errors.orgName = "Organization name is required";
    }
    if (!orgSize) {
      errors.orgSize = "Organization size is required";
    }
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Redirect to dashboard if validation is successful
  return redirect("/dashboard");
}

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const [org, setOrg] = useState(false);

  return (
    <div className="p-10">
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
                  {actionData?.errors.firstName && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.firstName}
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
                  {actionData?.errors.lastName && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.lastName}
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
                  {actionData?.errors.email && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.email}
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
                  {actionData?.errors.streetAddress && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.streetAddress}
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
                  {actionData?.errors.city && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.city}
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
                  {actionData?.errors.state && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.state}
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
                  {actionData?.errors.postalCode && (
                    <span className="inline-block text-sm/6 font-medium text-red-500">
                      {actionData?.errors.postalCode}
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
                      {actionData?.errors.orgName && (
                        <span className="inline-block text-sm/6 font-medium text-red-500">
                          {actionData?.errors.orgName}
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
                      {actionData?.errors.orgSize && (
                        <span className="inline-block text-sm/6 font-medium text-red-500">
                          {actionData?.errors.orgSize}
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
  );
}
