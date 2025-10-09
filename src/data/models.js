// Dummy Porsche Model Data
export const porscheModels = [
  {
    id: "taycan",
    name: "Taycan",
    title: "The All-Electric Performer",
    description:
      "Electric sports car with instant torque and exhilarating performance. Experience the future of driving with zero emissions and maximum excitement.",
    type: "Electric",
    seats: "4/5 seats",
    doors: "4 doors",
    image: "/models/taycan.jpeg",
    video:
      "https://res.cloudinary.com/dhlowafw0/video/upload/v1759769558/Porsche_Taycan_Turbo_S_mhcviq.mp4",
    features: [
      "Instant Torque",
      "Zero Emissions",
      "Sport Plus Mode",
      "0-100 km/h in 2.8s",
    ],
    price: "From $158,000",
  },
  {
    id: "911",
    name: "911",
    title: "The Iconic Legend",
    description:
      "Timeless design meets cutting-edge technology. The 911 is the quintessential sports car that defines the Porsche experience.",
    type: "Petrol",
    seats: "2+2 seats",
    doors: "2 doors",
    image: "/models/911.jpeg",
    video: "https://res.cloudinary.com/dhlowafw0/video/upload/v1760023504/The_new_Porsche_911_Exterior_Interior_Design._-_Porsche_1080p_h264_yx53op.mp4",
    features: [
      "Rear Engine",
      "Iconic Design",
      "Precision Handling",
      "0-100 km/h in 3.4s",
    ],
    price: "From $231,000",
  },
  {
    id: "cayenne",
    name: "Cayenne",
    title: "The Versatile Performer",
    description:
      "A luxury SUV that delivers true Porsche performance. Perfect for those who need space without compromising on driving dynamics.",
    type: "Hybrid",
    seats: "5 seats",
    doors: "4 doors",
    image: "/models/cayenne.jpg",
    video:
      "https://res.cloudinary.com/dhlowafw0/video/upload/v1760023313/The_new_Porsche_Cayenne_Turbo_in_motion._-_Porsche_1080p_h264_l1onln.mp4",
    features: [
      "Versatile",
      "Hybrid Efficiency",
      "Premium Comfort",
      "All-Wheel Drive",
    ],
    price: "From $131,000",
  },
  {
    id: "macan",
    name: "Macan",
    title: "The Compact Sports SUV",
    description:
      "Compact luxury SUV with sports car DNA. Combining everyday practicality with unmistakable Porsche performance and handling.",
    type: "Petrol",
    seats: "5 seats",
    doors: "4 doors",
    image:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Porsche/Macan/10973/1752478013186/exterior-image-165.jpg",
    video:
      "https://res.cloudinary.com/dhlowafw0/video/upload/v1760023178/Porsche_Macan_GTS_Cinematic_Video_LUIS_GOMEZ_-_Luis_Gomez_1080p_h264_lgiofr.mp4",
    features: [
      "Compact Agility",
      "Sports Car Handling",
      "Premium Interior",
      "0-100 km/h in 4.1s",
    ],
    price: "From $98,000",
  },
  {
    id: "panamera",
    name: "Panamera",
    title: "The Grand Tourer",
    description:
      "Four-door luxury sports car that perfectly balances performance and comfort. The ultimate grand touring experience with Porsche DNA.",
    type: "Hybrid",
    seats: "4/5 seats",
    doors: "4 doors",
    image:
      "https://images-porsche.imgix.net/-/media/EF493E3F2EFA4639AD7DC8100544D4E6_317C931650634732AB704E99B3BC39E9_PA24P5DOX0001-panamera-rear?w=900&q=85&crop=faces%2Centropy%2Cedges&auto=format",
    video:
      "https://res.cloudinary.com/dhlowafw0/video/upload/v1760023146/PORSCHE_PANAMERA_2022_cinematic_film_-_Doyosay_Studio_1080p_h264_ugt0zz.mp4",
    features: [
      "Executive Comfort",
      "Hybrid Technology",
      "Luxury Interior",
      "0-100 km/h in 3.1s",
    ],
    price: "From $185,000",
  },
];

export const getModelById = (id) => {
  return porscheModels.find((model) => model.id === id);
};
