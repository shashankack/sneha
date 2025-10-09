// Dummy Porsche Center Data
export const porscheCenters = [
  {
    id: 'melbourne',
    name: 'Porsche Centre Melbourne',
    address: '420 St Kilda Road, Melbourne, VIC 3004',
    phone: '(03) 9820 8888',
    coordinates: { lat: -37.8416, lng: 144.9791 },
    availableDates: ['2025-10-14', '2025-10-17', '2025-10-19', '2025-10-23'],
    availableTimes: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM']
  },
  {
    id: 'brighton',
    name: 'Porsche Centre Brighton',
    address: '161 Bay Street, Brighton, VIC 3186',
    phone: '(03) 9596 6911',
    coordinates: { lat: -37.9071, lng: 144.9926 },
    availableDates: ['2025-10-15', '2025-10-16', '2025-10-20', '2025-10-22'],
    availableTimes: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
  },
  {
    id: 'doncaster',
    name: 'Porsche Centre Doncaster',
    address: '1060 Doncaster Road, Doncaster, VIC 3108',
    phone: '(03) 9848 9911',
    coordinates: { lat: -37.7850, lng: 145.1294 },
    availableDates: ['2025-10-13', '2025-10-18', '2025-10-21', '2025-10-24'],
    availableTimes: ['09:30 AM', '11:30 AM', '01:30 PM', '03:30 PM']
  },
  {
    id: 'approved-melbourne',
    name: 'Porsche Approved Centre Melbourne',
    address: '75 O\'Riordan Street, Alexandria, NSW 2015',
    phone: '(03) 8338 3911',
    coordinates: { lat: -37.8172, lng: 144.9570 },
    availableDates: ['2025-10-14', '2025-10-17', '2025-10-19', '2025-10-25'],
    availableTimes: ['10:00 AM', '12:30 PM', '02:30 PM', '04:30 PM']
  }
];

export const getCenterById = (id) => {
  return porscheCenters.find(center => center.id === id);
};

// Concierge Service Info
export const conciergeService = {
  deposit: 500,
  description: 'Have your chosen Porsche delivered directly to your location. The deposit is fully refundable when you purchase the vehicle.',
  features: [
    'Delivery to your location',
    'Professional concierge driver',
    'Flexible timing',
    'Real-time tracking via My Porsche App',
    'Premium experience'
  ],
  availableAreas: ['Sydney Metro', 'Melbourne Metro', 'Brisbane Metro', 'Gold Coast', 'Perth Metro']
};
