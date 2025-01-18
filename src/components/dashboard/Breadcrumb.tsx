import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-large text-gray-600 hover:text-blue-600 hover:underline transition-all duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-large text-gray-400">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
