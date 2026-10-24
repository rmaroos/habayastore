import React from 'react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 text-[13px] text-ink-soft">
        {items.map((item, i) =>
        <li key={item.label} className="flex items-center gap-2">
            {item.to ?
          <Link to={item.to} className="hover:text-ink hover:underline hover:underline-offset-4">
                {item.label}
              </Link> :

          <span aria-current="page" className="text-ink">
                {item.label}
              </span>
          }
            {i < items.length - 1 && <span aria-hidden="true" className="text-taupe">/</span>}
          </li>
        )}
      </ol>
    </nav>);

}