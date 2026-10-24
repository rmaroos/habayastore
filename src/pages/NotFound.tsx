import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center lg:py-36">
      <p className="font-display text-[20px] italic text-ink-soft">Page not found</p>
      <h1 className="mt-3 max-w-xl font-display text-[42px] font-medium leading-[1.05] lg:text-[60px]">
        This page has wandered out of the archive
      </h1>
      <p className="mt-4 max-w-md text-[16px] text-ink-soft">
        The link may be old, or the piece may have been retired. Let us take you somewhere useful.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">Shop all</Link>
        <Link to="/" className="btn-outline">Return home</Link>
      </div>
    </div>);

}