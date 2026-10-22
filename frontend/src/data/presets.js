export const DEFAULT_PRESETS = [
  {
    id: "silicon_valley",
    title: "Silicon Valley Tech Estate",
    location_name: "Palo Alto, California, USA",
    city: "Palo Alto",
    country: "United States",
    latitude: 37.4419,
    longitude: -122.1430,
    housing_median_age: 12,
    total_rooms: 3800,
    total_bedrooms: 650,
    population: 1100,
    households: 380,
    median_income: 12.8,
    ocean_proximity: "NEAR BAY",
    bhk_tag: "4+ BHK Luxury Villa",
    badge: "Prime Tech Hub",
    description: "High-income tech executive neighborhood in Silicon Valley with bay proximity."
  },
  {
    id: "malibu_coastal",
    title: "Malibu Coastal Retreat",
    location_name: "Malibu, California, USA",
    city: "Malibu",
    country: "United States",
    latitude: 34.0259,
    longitude: -118.7798,
    housing_median_age: 18,
    total_rooms: 2900,
    total_bedrooms: 520,
    population: 850,
    households: 320,
    median_income: 9.5,
    ocean_proximity: "NEAR OCEAN",
    bhk_tag: "3 BHK Oceanfront",
    badge: "Beachfront Luxury",
    description: "Exclusive coastal residence situated directly along the Pacific Coast highway."
  },
  {
    id: "sacramento_inland",
    title: "Central Valley Suburban Home",
    location_name: "Sacramento, California, USA",
    city: "Sacramento",
    country: "United States",
    latitude: 38.5816,
    longitude: -121.4944,
    housing_median_age: 28,
    total_rooms: 2200,
    total_bedrooms: 440,
    population: 1400,
    households: 410,
    median_income: 4.2,
    ocean_proximity: "INLAND",
    bhk_tag: "3 BHK Family Home",
    badge: "Affordable Inland",
    description: "Suburban inland residence showcasing affordable family living."
  },
  {
    id: "mumbai_bandra",
    title: "Bandra Seafront Apartment",
    location_name: "Bandra West, Mumbai, India",
    city: "Mumbai",
    country: "India",
    latitude: 19.0596,
    longitude: 72.8295,
    housing_median_age: 8,
    total_rooms: 2400,
    total_bedrooms: 480,
    population: 1600,
    households: 420,
    median_income: 8.5,
    ocean_proximity: "NEAR OCEAN",
    bhk_tag: "3 BHK High-Rise",
    badge: "Global Metro",
    description: "Ultra-prime coastal high-rise apartment in Mumbai's luxury western suburb."
  },
  {
    id: "london_kensington",
    title: "Kensington Townhouse",
    location_name: "Kensington, London, United Kingdom",
    city: "London",
    country: "United Kingdom",
    latitude: 51.5014,
    longitude: -0.1919,
    housing_median_age: 45,
    total_rooms: 3100,
    total_bedrooms: 580,
    population: 900,
    households: 340,
    median_income: 10.2,
    ocean_proximity: "<1H OCEAN",
    bhk_tag: "4 BHK Historic",
    badge: "Global Capital",
    description: "Prestigious historic townhouse in central London's royal borough."
  }
];

export const MANUAL_REGIONS = [
  { id: "coastal", name: "Coastal Beachfront", ocean_proximity: "NEAR OCEAN", lat: 34.02, lon: -118.77, baseFactor: 1.35, icon: "🏖️" },
  { id: "bay", name: "Urban Metro Bay Area", ocean_proximity: "NEAR BAY", lat: 37.88, lon: -122.23, baseFactor: 1.40, icon: "🌉" },
  { id: "suburban", name: "Suburban Near-City (<1 Hr)", ocean_proximity: "<1H OCEAN", lat: 33.85, lon: -118.15, baseFactor: 1.15, icon: "🏡" },
  { id: "inland", name: "Inland Valley / Countryside", ocean_proximity: "INLAND", lat: 36.75, lon: -119.75, baseFactor: 0.85, icon: "🌲" }
];

export const MANUAL_CONFIGS = [
  { id: "1bhk", label: "1 BHK Compact", rooms: 900, beds: 180, households: 180, population: 400 },
  { id: "2bhk", label: "2 BHK Standard", rooms: 1600, beds: 320, households: 300, population: 850 },
  { id: "3bhk", label: "3 BHK Spacious", rooms: 2400, beds: 480, households: 400, population: 1300 },
  { id: "4bhk", label: "4+ BHK Luxury Villa", rooms: 3800, beds: 650, households: 450, population: 1600 }
];

export const MANUAL_INCOME_TIERS = [
  { id: "tier_modest", label: "Modest Income (~$35k / ₹30L)", value: 3.5 },
  { id: "tier_middle", label: "Middle Class (~$60k / ₹50L)", value: 6.0 },
  { id: "tier_upper", label: "Upper Middle (~$95k / ₹80L)", value: 9.5 },
  { id: "tier_hnw", label: "High Net Worth ($150k+ / ₹1.3Cr+)", value: 15.0 }
];

export const MANUAL_AGE_TIERS = [
  { id: "modern", label: "Brand New / Modern (1-5 yrs)", age: 3 },
  { id: "standard", label: "Standard Established (15-25 yrs)", age: 20 },
  { id: "vintage", label: "Vintage / Classic (40+ yrs)", age: 45 }
];
