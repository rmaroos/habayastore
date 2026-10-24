import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../data/site';

export function BrandIntro() {
  return (
    <section aria-labelledby="intro-heading" className="py-16 lg:py-28">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="intro-heading" className="font-display text-[36px] leading-[1.08] lg:text-[50px]">
            Modest essentials, <em className="italic">kept with care</em>
          </h2>
          <div className="mt-6 max-w-md space-y-4 text-[16px] leading-relaxed text-ink-soft">
            <p>
              Habaya is a small hijab label built around fabric. We choose modal, jersey and chiffon for how they drape,
              breathe and wear after many washes — then dress them in colours chosen to sit together.
            </p>
            <p>The result is a quieter wardrobe: fewer pieces, worn more often, kept for longer.</p>
          </div>
          <Link to="/our-story" className="btn-outline mt-8">
            Read our story
          </Link>
        </div>
        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="aspect-[4/5] overflow-hidden rounded-[2px] bg-warm lg:ml-auto lg:max-w-[560px]">
            <img
              src={images.intro}
              alt="A stack of folded hijabs in natural tones on an antique walnut table"
              loading="lazy"
              className="h-full w-full object-cover" />
            
          </div>
          <figcaption className="mt-3 font-display text-[15px] italic text-ink-soft lg:ml-auto lg:max-w-[560px]">
            Plate I — The everyday archive, in sand, rose, sage and mocha.
          </figcaption>
        </figure>
      </div>
    </section>);

}