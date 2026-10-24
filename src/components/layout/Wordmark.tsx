import React from 'react';
import { Link } from 'react-router-dom';

interface WordmarkProps {
  tone?: 'ink' | 'light';
  size?: 'md' | 'lg';
}

export function Wordmark({ tone = 'ink', size = 'md' }: WordmarkProps) {
  const color = tone === 'ink' ? 'text-ink' : 'text-ivory';
  const textSize = size === 'lg' ? 'text-[44px]' : 'text-[30px] lg:text-[38px]';
  return (
    <Link
      to="/"
      aria-label="Habaya — home"
      className={`inline-flex flex-col items-center leading-none ${color}`}>
      
      <span className={`font-display font-medium tracking-[0.06em] ${textSize}`}>Habaya</span>
      <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.42em] opacity-80 lg:block">
        Est. Leicester
      </span>
    </Link>);

}