import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deliveryOptions } from '../data/site';
import { useCart } from '../contexts/CartContext';
import { useStore } from '../contexts/StoreContext';
import { DeliveryOption, PlacedOrder } from '../types/product';

export type CheckoutStep = 1 | 2 | 3;

export interface DetailsForm {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  phone: string;
}

export interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function deliveryCostFor(option: DeliveryOption, subtotal: number): number {
  if (option.freeOver !== undefined && subtotal >= option.freeOver) return 0;
  return option.price;
}

export function useCheckout() {
  const { lines, subtotal, clearCart } = useCart();
  const { addOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [details, setDetails] = useState<DetailsForm>({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    phone: ''
  });
  const [detailErrors, setDetailErrors] = useState<Errors<DetailsForm>>({});
  const [deliveryId, setDeliveryId] = useState<DeliveryOption['id']>('standard');
  const [payment, setPayment] = useState<PaymentForm>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
  const [paymentErrors, setPaymentErrors] = useState<Errors<PaymentForm>>({});
  const [processing, setProcessing] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const delivery = deliveryOptions.find((d) => d.id === deliveryId) ?? deliveryOptions[0];
  const deliveryCost = deliveryCostFor(delivery, subtotal);
  const total = subtotal + deliveryCost;

  const updateDetails = (key: keyof DetailsForm, value: string) => {
    setDetails((d) => ({ ...d, [key]: value }));
    if (detailErrors[key]) setDetailErrors((e) => ({ ...e, [key]: undefined }));
  };

  const updatePayment = (key: keyof PaymentForm, value: string) => {
    let v = value;
    if (key === 'cardNumber') v = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    if (key === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      v = digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    }
    if (key === 'cvc') v = value.replace(/\D/g, '').slice(0, 4);
    setPayment((p) => ({ ...p, [key]: v }));
    if (paymentErrors[key]) setPaymentErrors((e) => ({ ...e, [key]: undefined }));
    setPaymentFailed(false);
  };

  const submitDetails = () => {
    const e: Errors<DetailsForm> = {};
    if (!EMAIL_RE.test(details.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    if (!details.firstName.trim()) e.firstName = 'Enter your first name.';
    if (!details.lastName.trim()) e.lastName = 'Enter your last name.';
    if (!details.address1.trim()) e.address1 = 'Enter the first line of your address.';
    if (!details.city.trim()) e.city = 'Enter your town or city.';
    if (!POSTCODE_RE.test(details.postcode.trim())) e.postcode = 'Enter a valid UK postcode, like LE1 6FB.';
    setDetailErrors(e);
    if (Object.keys(e).length === 0) setStep(2);
    return Object.keys(e).length === 0;
  };

  const submitDelivery = () => setStep(3);

  const placeOrder = () => {
    const e: Errors<PaymentForm> = {};
    if (!payment.cardName.trim()) e.cardName = 'Enter the name shown on your card.';
    if (payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter the 16-digit card number.';
    const [mm, yy] = payment.expiry.split(' / ').map(Number);
    if (!mm || !yy || mm < 1 || mm > 12) e.expiry = 'Enter a valid expiry date (MM / YY).';
    if (payment.cvc.length < 3) e.cvc = 'Enter the 3 or 4 digit security code.';
    setPaymentErrors(e);
    if (Object.keys(e).length > 0) return;

    setProcessing(true);
    setPaymentFailed(false);
    window.setTimeout(() => {
      setProcessing(false);
      if (payment.cardNumber.replace(/\s/g, '').endsWith('0002')) {
        setPaymentFailed(true);
        return;
      }
      const order: PlacedOrder = {
        reference: `HB-${Math.floor(100000 + Math.random() * 900000)}`,
        email: details.email.trim(),
        name: `${details.firstName} ${details.lastName}`.trim(),
        address:
        delivery.id === 'collect' ?
        'Collect from Habaya Flagship, 14 Granby Arcade, Leicester' :
        [details.address1, details.address2, details.city, details.postcode.toUpperCase()].filter(Boolean).join(', '),
        delivery,
        deliveryCost,
        subtotal,
        total,
        lines: lines.map((l) => ({
          name: l.product.name,
          colour: l.variant.name,
          quantity: l.quantity,
          lineTotal: l.lineTotal,
          image: l.variant.image,
        })),
      };
      addOrder(order);
      clearCart();
      navigate('/order-confirmed', { state: { order }, replace: true });
    }, 1400);
  };

  const summary = useMemo(() => ({ lines, subtotal, deliveryCost, total }), [lines, subtotal, deliveryCost, total]);

  return {
    step,
    setStep,
    details,
    detailErrors,
    updateDetails,
    submitDetails,
    delivery,
    deliveryId,
    setDeliveryId,
    submitDelivery,
    payment,
    paymentErrors,
    updatePayment,
    placeOrder,
    processing,
    paymentFailed,
    summary
  };
}