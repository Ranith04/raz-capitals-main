import { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'pearl',
    title: 'Pearl',
    description: 'Minimum Deposit',
    price: '$500',
    period: '',
    leverage: '1:50',
    commission: '$2 per lot',
    minLot: '0.01',
    features: [
      'Coverage',
      'Commission',
      'Min lot',
      'Auto trading lots',
      'Basic trading tools',
      'Weekly trading logs',
      'Educational resources',
      'Demo Risk account'
    ],
    buttonText: 'Open Free Account'
  },
  {
    id: 'ruby',
    title: 'Ruby',
    description: 'Minimum Deposit',
    price: '$1,000',
    period: '',
    leverage: '1:50',
    commission: '$1 per lot',
    minLot: '0.01',
    features: [
      'Coverage',
      'Commission',
      'Min lot',
      'Auto trading lots',
      'Priority customer support',
      'Weekly market forecasts',
      'Advanced reporting',
      'Educational resources',
      'Algorithmic trading tools',
      'Advanced analytics'
    ],
    buttonText: 'Open Free Account',
    popular: true
  },
  {
    id: 'diamond',
    title: 'Diamond',
    description: 'Minimum Deposit',
    price: '$5,000',
    period: '',
    leverage: '1:100',
    commission: '$0 per lot',
    minLot: '0.01',
    features: [
      'Coverage',
      'Commission',
      'Min lot',
      'Auto trading lots',
      'Professional trading desk',
      'White-label solutions',
      'Institutional grade tools',
      'Advanced algorithms',
      'Custom reporting',
      'API Access'
    ],
    buttonText: 'Open Free Account'
  }
]; 