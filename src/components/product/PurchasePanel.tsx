import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { getCollection } from '../../utils/catalogue';
import { AccordionItem } from '../Accordion';
import { QuantityStepper } from '../cart/QuantityStepper';
import { Price } from './Price';

interface PurchasePanelProps {
  product: Product;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PurchasePanel({ product, activeIndex, onSelect }: PurchasePanelProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const variant = product.colours[activeIndex];
  const collection = getCollection(product.collection);
  const soldOut = variant.stock === 0;

  useEffect(() => {
    setQuantity(1);
  }, [activeIndex]);

  useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 2000);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  const handleAdd = () => {
    if (soldOut) return;
    addItem(product.id, variant.name, quantity);
    setJustAdded(true);
  };

  return (
    <div>
      {collection &&
      <Link
        to={`/collections/${collection.slug}`}
        className="text-[13px] text-ink-soft underline decoration-rule underline-offset-4 hover:text-ink">
        
          {collection.name}
        </Link>
      }
      <h1 className="mt-3 font-display text-[40px] font-medium leading-[1.05] lg:text-[52px]">{product.name}</h1>
      <div className="mt-3">
        <Price price={product.price} compareAt={product.compareAt} size="lg" />
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

      <div className="mt-8 border-t border-rule pt-6">
        <fieldset>
          <legend className="text-[13px]">
            <span className="font-bold">Colour</span>
            <span className="text-ink-soft"> — {variant.name}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colours.map((c, i) => {
              const selected = i === activeIndex;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={selected}
                  className={`flex h-11 items-center gap-2.5 rounded-[2px] border px-3.5 text-[13px] transition-colors duration-150 ease-out ${
                  selected ? 'border-ink bg-warm font-bold' : 'border-rule hover:border-taupe'} ${
                  c.stock === 0 ? 'text-ink-soft' : 'text-ink'}`}>
                  
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border border-ink/15"
                    style={{ backgroundColor: c.hex }} />
                  
                  <span className={c.stock === 0 ? 'line-through decoration-ink-soft' : ''}>{c.name}</span>
                  {c.stock === 0 && <span className="sr-only">(sold out)</span>}
                </button>);

            })}
          </div>
        </fieldset>

        <StockLine stock={variant.stock} />

        <div className="mt-6 flex gap-3">
          <QuantityStepper
            value={quantity}
            max={Math.max(1, variant.stock)}
            onChange={setQuantity}
            label="Quantity" />
          
          <button type="button" onClick={handleAdd} disabled={soldOut} className="btn-primary flex-1">
            {soldOut ?
            'Sold out' :
            justAdded ?
            <>
                <CheckIcon className="h-4 w-4" strokeWidth={2} /> Added to bag
              </> :

            'Add to bag'
            }
          </button>
        </div>
        {soldOut &&
        <p className="mt-3 text-[13px] text-ink-soft">
            {variant.name} is sold out. Choose another colour, or{' '}
            <Link to="/contact" className="underline underline-offset-2 hover:text-ink">
              contact us
            </Link>{' '}
            to hear when it returns.
          </p>
        }

        <dl className="mt-6 grid grid-cols-1 gap-1 text-[13px] text-ink-soft sm:grid-cols-2">
          <div><dt className="sr-only">Delivery</dt><dd>Complimentary UK delivery over £50</dd></div>
          <div><dt className="sr-only">Returns</dt><dd>Free returns within 14 days</dd></div>
        </dl>
      </div>

      <div className="mt-8 border-t border-rule">
        <AccordionItem title="Fabric & size" defaultOpen>
          <dl className="grid grid-cols-[110px_1fr] gap-y-2">
            <dt className="text-ink">Fabric</dt>
            <dd>{product.material}</dd>
            <dt className="text-ink">Dimensions</dt>
            <dd>{product.dimensions}</dd>
            <dt className="text-ink">Type</dt>
            <dd>{product.type}</dd>
          </dl>
        </AccordionItem>
        <AccordionItem title="Care">
          <ul className="list-disc space-y-1 pl-5">
            {product.care.map((c) =>
            <li key={c}>{c}</li>
            )}
          </ul>
        </AccordionItem>
        <AccordionItem title="Delivery & returns">
          <p>
            Standard UK delivery in 2–4 working days for £3.95, complimentary over £50. Express next-day delivery is
            available at checkout, or collect free from our Leicester flagship.
          </p>
          <p className="mt-3">
            Unworn items with tags can be returned within 14 days.{' '}
            <Link to="/help/returns" className="text-ink underline underline-offset-2">
              Read our returns policy
            </Link>
            .
          </p>
        </AccordionItem>
      </div>
      <p className="mt-4 text-[12px] text-ink-soft">SKU {variant.sku}</p>
    </div>);

}

function StockLine({ stock }: {stock: number;}) {
  if (stock === 0) {
    return (
      <p className="mt-4 flex items-center gap-2 text-[13px] text-ink-soft">
        <span className="h-2 w-2 rounded-full bg-taupe" aria-hidden="true" /> Sold out in this colour
      </p>);

  }
  if (stock <= 4) {
    return (
      <p className="mt-4 flex items-center gap-2 text-[13px] text-burgundy">
        <span className="h-2 w-2 rounded-full bg-burgundy" aria-hidden="true" /> Only {stock} left — order soon
      </p>);

  }
  return (
    <p className="mt-4 flex items-center gap-2 text-[13px] text-success">
      <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" /> In stock, ready to dispatch
    </p>);

}