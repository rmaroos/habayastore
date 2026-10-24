import React from 'react';
import { Link } from 'react-router-dom';
import { announcement } from '../../data/site';

export function AnnouncementBar() {
  return (
    <div className="bg-burgundy text-ivory">
      <p className="container-page flex h-9 items-center justify-center gap-3 text-center text-[12px] tracking-[0.04em] md:text-[13px]">
        <span>{announcement.message}</span>
        <span aria-hidden="true" className="hidden h-3 w-px bg-ivory/40 sm:block" />
        <Link
          to={announcement.linkTo}
          className="hidden underline decoration-ivory/50 underline-offset-4 hover:decoration-ivory sm:inline">
          
          {announcement.linkLabel}
        </Link>
      </p>
    </div>);

}