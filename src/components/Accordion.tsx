import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  titleClassName?: string;
}

export function AccordionItem({ title, defaultOpen = false, children, titleClassName }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-rule">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-150 ease-out hover:text-burgundy ${
          titleClassName ?? 'text-[14px] font-bold tracking-[0.02em]'}`
          }>
          
          <span>{title}</span>
          {open ?
          <MinusIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" /> :

          <PlusIcon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          }
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className="pb-5 text-[15px] leading-relaxed text-ink-soft">{children}</div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}