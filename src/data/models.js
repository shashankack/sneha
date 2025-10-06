// Dummy Porsche Model Data
export const porscheModels = [
  {
    id: 'taycan',
    name: 'Taycan',
    title: 'The All-Electric Performer',
    description: 'Electric sports car with instant torque and exhilarating performance. Experience the future of driving with zero emissions and maximum excitement.',
    type: 'Electric',
    seats: '4/5 seats',
    doors: '4 doors',
    image: 'https://files.porsche.com/filestore/image/multimedia/none/992-gt3-modelimage-sideshot/model/765dfc51-51bc-11ed-80f3-005056bbdc38/porsche-model.png',
    features: ['Instant Torque', 'Zero Emissions', 'Sport Plus Mode', '0-100 km/h in 2.8s'],
    price: 'From $158,000'
  },
  {
    id: '911',
    name: '911',
    title: 'The Iconic Legend',
    description: 'Timeless design meets cutting-edge technology. The 911 is the quintessential sports car that defines the Porsche experience.',
    type: 'Petrol',
    seats: '2+2 seats',
    doors: '2 doors',
    image: 'https://files.porsche.com/filestore/image/multimedia/none/992-carrera-modelimage-sideshot/model/cfbb8ed3-1a60-11ed-80f5-005056bbdc38/porsche-model.png',
    features: ['Rear Engine', 'Iconic Design', 'Precision Handling', '0-100 km/h in 3.4s'],
    price: 'From $231,000'
  },
  {
    id: 'cayenne',
    name: 'Cayenne',
    title: 'The Versatile Performer',
    description: 'A luxury SUV that delivers true Porsche performance. Perfect for those who need space without compromising on driving dynamics.',
    type: 'Hybrid',
    seats: '5 seats',
    doors: '4 doors',
    image: 'https://files.porsche.com/filestore/image/multimedia/none/9ya-cayenne-modelimage-sideshot/model/c2506e8b-20e5-11ed-80f4-005056bbdc38/porsche-model.png',
    features: ['Versatile', 'Hybrid Efficiency', 'Premium Comfort', 'All-Wheel Drive'],
    price: 'From $131,000'
  }
];

export const getModelById = (id) => {
  return porscheModels.find(model => model.id === id);
};
