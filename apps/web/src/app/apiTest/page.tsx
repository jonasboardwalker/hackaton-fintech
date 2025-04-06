"use client";

import Link from "next/link";

const ApiTest = () => {
  const links = [
    { href: "/apiTest/transactions", label: "Transactions" },
    { href: "/apiTest/alerts", label: "Alerts" },
    { href: "/apiTest/dashboard", label: "Dashboard Statistics" },
    { href: "/apiTest/rules", label: "Rules" },
  ];

  return (
    <div className="min-h-screen gap-8 bg-gray-50 p-8">
      <div className="max-w-[800px]">
        <h1 className="mb-8 text-3xl font-bold">Browse DB data</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {link.label}
              </h2>
              <p className="mt-2 text-gray-600">
                View {link.label.toLowerCase()} data in a table format
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
