import React from 'react';
import { Link } from 'react-router-dom';
import { CartLine } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/currency';
import { QuantityStepper } from './QuantityStepper';

interface CartLineItemProps {
  line: CartLine;
  compact?: boolean;
  onNavigate?: () => void;
}

export function CartLineItem({ line, compact = false, onNavigate }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, variant } = line;
  const lowStock = variant.stock > 0 && variant.stock <= 3;

  return (
    <li className="flex gap-4 border-b border-rule py-5 last:border-b-0">
      <Link
        to={`/products/${product.slug}`}
        onClick={onNavigate}
        className={`shrink-0 overflow-hidden rounded-[2px] bg-warm ${compact ? 'h-[104px] w-[84px]' : 'h-[150px] w-[120px]'}`}>
        
        <img src={variant.image} alt={`${product.name} in ${variant.name}`} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to={`/products/${product.slug}`}
              onClick={onNavigate}
              className={`font-display leading-tight text-ink hover:text-burgundy ${compact ? 'text-[19px]' : 'text-[22px]'}`}>
              
              {product.name}
            </Link>
            <p className="mt-0.5 text-[13px] text-ink-soft">
              {variant.name} · {formatPrice(product.price)}
            </p>
          </div>
          <p className="shrink-0 text-[14px] font-bold tabular-nums">{formatPrice(line.lineTotal)}</p>
        </div>
        {lowStock && <p className="mt-1 text-[12px] text-burgundy">Only {variant.stock} left in this colour</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <QuantityStepper
            size="sm"
            value={line.quantity}
            max={variant.stock}
            onChange={(q) => updateQuantity(product.id, variant.name, q)}
            label={`Quantity for ${product.name}, ${variant.name}`} />
          
          <button
            type="button"
            onClick={() => removeItem(product.id, variant.name)}
            className="text-[13px] text-ink-soft underline underline-offset-4 hover:text-burgundy">
            
            Remove
          </button>
        </div>
      </div>
    </li>);

}