// Talent/Creator profiles with metadata

export interface SocialMetrics {
  instagram: string;
  tiktok: string;
  youtube: string;
  snapchat: string;
  total: string;
}

export interface SocialAliases {
  instagram: string;
  tiktok: string;
  snapchat: string;
  youtube: string;
}

export type PlatformConnectionStatus = "connected" | "not_connected" | "expired" | "not_added";

export interface SocialConnections {
  instagram: PlatformConnectionStatus;
  tiktok: PlatformConnectionStatus;
  youtube: PlatformConnectionStatus;
  snapchat: PlatformConnectionStatus;
}

export interface Talent {
  id: number;
  name: string;
  location: string;
  gender: "Male" | "Female";
  age: number;
  birthday: string; // Format: "YYYY-MM-DD"
  bio: string;
  followers: SocialMetrics;
  connections: SocialConnections;
  aliases: SocialAliases;
  links: string[];
  avatarImage: string;
  verticals: string[];
  instagramEngagementRate: string;
  connected: boolean;
}

// Helper to parse follower counts for total calculation
function parseFollowerCount(count: string): number {
  if (!count || count === "-") return 0;
  const numStr = count.toLowerCase().replace(/[^0-9.km]/g, '');
  let multiplier = 1;
  if (count.toLowerCase().includes('m')) multiplier = 1000000;
  else if (count.toLowerCase().includes('k')) multiplier = 1000;
  return parseFloat(numStr) * multiplier;
}

// Helper to format follower count
function formatFollowerCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(2) + 'm';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

// Calculate total from individual counts (excluding "-")
function calculateTotal(instagram: string, tiktok: string, youtube: string, snapchat: string): string {
  const total = parseFollowerCount(instagram) + parseFollowerCount(tiktok) + 
                parseFollowerCount(youtube) + parseFollowerCount(snapchat);
  return formatFollowerCount(total);
}

// Helper function to calculate age from birthday
export function calculateAge(birthday: string): number {
  if (!birthday) return 0;
  
  const birthDate = new Date(birthday);
  
  // Check if date is valid
  if (isNaN(birthDate.getTime())) return 0;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Helper function to calculate birthday from age (approximation)
function calculateBirthdayFromAge(age: number): string {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  // Use July 1st as a default birthday for existing data
  return `${birthYear}-07-01`;
}

export const talents: Talent[] = [
  {
    id: 1,
    name: "Sophia Martinez",
    location: "Los Angeles, CA, USA",
    gender: "Female",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "LA-based lifestyle creator blending fashion, travel, and wellness tips with candid behind-the-scenes moments of her everyday life. Advocates for slow fashion and mindful living.",
    followers: {
      instagram: "482.3k",
      tiktok: "1.1m",
      youtube: "264.8k",
      snapchat: "-",
      total: calculateTotal("482.3k", "1.1m", "264.8k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@sophiamartinez",
      tiktok: "@sophiamartinez",
      snapchat: "sophiamartinez",
      youtube: "sophiamartinez",
    },
    links: [
      "https://pinterest.com/sophiamartinezstyle",
      "https://linkedin.com/in/sophiamartinez",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_fashion_influencer.jpeg",
    verticals: ["Fashion", "Travel", "Wellness"],
    instagramEngagementRate: "6.80%",
    connected: true,
  },
  {
    id: 2,
    name: "Liam Turner",
    location: "Austin, TX, USA",
    gender: "Male",
    age: 34,
    birthday: calculateBirthdayFromAge(34),
    bio: "Tech-savvy dad and drone videographer capturing Texas landscapes. Known for cinematic reels, gear reviews, and relatable family vlogs.",
    followers: {
      instagram: "243.9k",
      tiktok: "-",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("243.9k", "-", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_added",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@liamturner",
      tiktok: "@liamturner",
      snapchat: "liamturner",
      youtube: "liamturner",
    },
    links: [
      "https://liamturnerfilms.com",
      "https://github.com/liamturner",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_middle_aged_hoodie.jpeg",
    verticals: ["Tech", "Family", "Travel"],
    instagramEngagementRate: "5.40%",
    connected: false,
  },
  {
    id: 3,
    name: "Jasmine Lee",
    location: "Seattle, WA, USA",
    gender: "Female",
    age: 22,
    birthday: calculateBirthdayFromAge(22),
    bio: "Vegan recipe creator and plant enthusiast sharing budget-friendly, eco-conscious meals. Loves storytelling through colorful, short-form cooking videos.",
    followers: {
      instagram: "512.6k",
      tiktok: "1.4m",
      youtube: "201.2k",
      snapchat: "68.9k",
      total: calculateTotal("512.6k", "1.4m", "201.2k", "68.9k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "expired",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@jasminlee",
      tiktok: "@jasminlee",
      snapchat: "jasminlee",
      youtube: "jasminlee",
    },
    links: [
      "https://jasminleecooks.com",
      "https://pinterest.com/jasminleecooks",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_cooking_influencer.jpeg",
    verticals: ["Food", "Wellness", "Lifestyle"],
    instagramEngagementRate: "7.10%",
    connected: false,
  },
  {
    id: 4,
    name: "Marcus Hill",
    location: "Chicago, IL, USA",
    gender: "Male",
    age: 28,
    birthday: calculateBirthdayFromAge(28),
    bio: "Streetwear stylist and sneaker collector documenting the culture of Chicago's fashion scene. Drops style guides and thrift store treasure hunts weekly.",
    followers: {
      instagram: "325.8k",
      tiktok: "912.4k",
      youtube: "142.6k",
      snapchat: "-",
      total: calculateTotal("325.8k", "912.4k", "142.6k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@marcushill",
      tiktok: "@marcushill",
      snapchat: "marcushill",
      youtube: "marcushill",
    },
    links: [
      "https://hypebeast.com/marcushill",
      "https://depop.com/marcushill",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_stylish_leaning.jpeg",
    verticals: ["Fashion", "Lifestyle", "Creativity"],
    instagramEngagementRate: "6.20%",
    connected: false,
  },
  {
    id: 5,
    name: "Chloe Nguyen Richards",
    location: "San Francisco, CA, USA",
    gender: "Female",
    age: 25,
    birthday: calculateBirthdayFromAge(25),
    bio: "UX designer by day, cozy gamer by night. Streams indie games, shares home office setups, and posts practical design tips for aspiring creatives.",
    followers: {
      instagram: "188.7k",
      tiktok: "534.2k",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("188.7k", "534.2k", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@chloenguyen",
      tiktok: "@chloenguyen",
      snapchat: "chloenguyen",
      youtube: "chloenguyen",
    },
    links: [
      "https://behance.net/chloenguyen",
      "https://twitch.tv/chloenguyen",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_hoodie_couch.jpeg",
    verticals: ["Gaming", "Tech", "Creativity"],
    instagramEngagementRate: "8.40%",
    connected: false,
  },
  {
    id: 6,
    name: "Ryan Brooks",
    location: "Nashville, TN, USA",
    gender: "Male",
    age: 31,
    birthday: calculateBirthdayFromAge(31),
    bio: "Country singer-songwriter sharing acoustic sessions, songwriting tips, and behind-the-scenes tour life. Fans love his heartfelt storytelling through music.",
    followers: {
      instagram: "402.5k",
      tiktok: "1.2m",
      youtube: "310.8k",
      snapchat: "85.2k",
      total: calculateTotal("402.5k", "1.2m", "310.8k", "85.2k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@ryanbrooksmusic",
      tiktok: "@ryanbrooksmusic",
      snapchat: "ryanbrooksmusic",
      youtube: "ryanbrooksmusic",
    },
    links: [
      "https://spotify.com/artist/ryanbrooks",
      "https://soundcloud.com/ryanbrooksmusic",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_musician_guitar.jpeg",
    verticals: ["Music", "Entertainment", "Lifestyle"],
    instagramEngagementRate: "9.20%",
    connected: true,
  },
  {
    id: 7,
    name: "Alexis Carter",
    location: "Miami, FL, USA",
    gender: "Female",
    age: 29,
    birthday: calculateBirthdayFromAge(29),
    bio: "Fitness coach and former pro dancer creating dance-based workouts, wellness challenges, and mindset motivation. Passionate about body positivity.",
    followers: {
      instagram: "678.3k",
      tiktok: "982.5k",
      youtube: "154.2k",
      snapchat: "-",
      total: calculateTotal("678.3k", "982.5k", "154.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@alexiscarterfit",
      tiktok: "@alexiscarterfit",
      snapchat: "alexiscarterfit",
      youtube: "alexiscarterfit",
    },
    links: [
      "https://alexiscarterfit.com",
      "https://medium.com/@alexiscarterfit",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_fitness_influencer.jpeg",
    verticals: ["Fitness", "Dance", "Wellness"],
    instagramEngagementRate: "7.50%",
    connected: false,
  },
  {
    id: 8,
    name: "Ethan Ross",
    location: "Denver, CO, USA",
    gender: "Male",
    age: 26,
    birthday: calculateBirthdayFromAge(26),
    bio: "Adventure photographer hiking across the Rockies. Posts jaw-dropping landscapes, camping tips, and outdoor gear reviews.",
    followers: {
      instagram: "351.1k",
      tiktok: "784.9k",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("351.1k", "784.9k", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@ethanrossphoto",
      tiktok: "@ethanrossphoto",
      snapchat: "ethanrossphoto",
      youtube: "ethanrossphoto",
    },
    links: [
      "https://natgeo.com/ethanross",
      "https://500px.com/ethanross",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_athletic_stretching.jpeg",
    verticals: ["Travel", "Sport", "Lifestyle"],
    instagramEngagementRate: "6.90%",
    connected: false,
  },
  {
    id: 9,
    name: "Mia Torres",
    location: "New York, NY, USA",
    gender: "Female",
    age: 24,
    birthday: calculateBirthdayFromAge(24),
    bio: "Aspiring chef documenting her journey through culinary school in NYC. Combines classic techniques with modern street food inspiration.",
    followers: {
      instagram: "429.5k",
      tiktok: "1.05m",
      youtube: "242.6k",
      snapchat: "92.1k",
      total: calculateTotal("429.5k", "1.05m", "242.6k", "92.1k"),
    },
    connections: {
      instagram: "expired",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@miatorres",
      tiktok: "@miatorres",
      snapchat: "miatorres",
      youtube: "miatorres",
    },
    links: [
      "https://miatorreskitchen.com",
      "https://pinterest.com/miatorreskitchen",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_cooking_influencer.jpeg",
    verticals: ["Food", "Education", "Lifestyle"],
    instagramEngagementRate: "8.10%",
    connected: false,
  },
  {
    id: 10,
    name: "Noah Bennett",
    location: "Portland, OR, USA",
    gender: "Male",
    age: 21,
    birthday: calculateBirthdayFromAge(21),
    bio: "Minimalist lifestyle vlogger documenting his vanlife journey through the Pacific Northwest. Focuses on sustainability, travel, and simple living tips.",
    followers: {
      instagram: "193.4k",
      tiktok: "542.1k",
      youtube: "121.7k",
      snapchat: "-",
      total: calculateTotal("193.4k", "542.1k", "121.7k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@noahbennett",
      tiktok: "@noahbennett",
      snapchat: "noahbennett",
      youtube: "noahbennett",
    },
    links: [
      "https://noahbennettvanlife.com",
      "https://linkedin.com/in/noahbennett",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_teen_skater_influencer.jpeg",
    verticals: ["Travel", "Lifestyle", "Advocacy"],
    instagramEngagementRate: "7.70%",
    connected: true,
  },
  {
    id: 11,
    name: "Olivia Harper",
    location: "Brooklyn, NY, USA",
    gender: "Female",
    age: 30,
    birthday: calculateBirthdayFromAge(30),
    bio: "Fashion blogger turned capsule wardrobe coach, helping busy women simplify their closets without sacrificing style. Weekly outfit formulas and styling hacks.",
    followers: {
      instagram: "512.4k",
      tiktok: "1.3m",
      youtube: "278.2k",
      snapchat: "-",
      total: calculateTotal("512.4k", "1.3m", "278.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@oliviaharperstyle",
      tiktok: "@oliviaharperstyle",
      snapchat: "oliviaharperstyle",
      youtube: "oliviaharperstyle",
    },
    links: [
      "https://pinterest.com/oliviaharperstyle",
      "https://medium.com/@oliviaharperstyle",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_fashion_influencer.jpeg",
    verticals: ["Fashion", "Lifestyle", "Beauty"],
    instagramEngagementRate: "6.50%",
    connected: true,
  },
  {
    id: 12,
    name: "Dylan Cooper",
    location: "Phoenix, AZ, USA",
    gender: "Male",
    age: 25,
    birthday: calculateBirthdayFromAge(25),
    bio: "Travel vlogger exploring hidden gems across the American Southwest. Known for cinematic drone shots and budget-friendly adventure tips.",
    followers: {
      instagram: "387.2k",
      tiktok: "942.5k",
      youtube: "189.4k",
      snapchat: "42.8k",
      total: calculateTotal("387.2k", "942.5k", "189.4k", "42.8k"),
    },
    connections: {
      instagram: "not_connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@dylandcooper",
      tiktok: "@dylandcooper",
      snapchat: "dylandcooper",
      youtube: "dylandcooper",
    },
    links: [
      "https://youtube.com/dylancoopertravels",
      "https://dylandcoopertravels.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_athletic_stretching.jpeg",
    verticals: ["Travel", "Lifestyle", "Entertainment"],
    instagramEngagementRate: "7.20%",
    connected: false,
  },
  {
    id: 13,
    name: "Harper James",
    location: "Raleigh, NC, USA",
    gender: "Female",
    age: 21,
    birthday: calculateBirthdayFromAge(21),
    bio: "College lifestyle influencer sharing productivity tips, study vlogs, and dorm-friendly meal ideas. Advocates for mental health awareness on campus.",
    followers: {
      instagram: "275.8k",
      tiktok: "764.1k",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("275.8k", "764.1k", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@harperjames",
      tiktok: "@harperjames",
      snapchat: "harperjames",
      youtube: "harperjames",
    },
    links: [
      "https://pinterest.com/harperjames",
      "https://linkedin.com/in/harperjames",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_teen_peace_sign.jpeg",
    verticals: ["Education", "Lifestyle", "Mental Health"],
    instagramEngagementRate: "7.70%",
    connected: true,
  },
  {
    id: 14,
    name: "Logan Price",
    location: "Orlando, FL, USA",
    gender: "Male",
    age: 32,
    birthday: calculateBirthdayFromAge(32),
    bio: "Disney parks content creator sharing insider tips, ride POVs, and hidden secrets from theme parks. Known for cheerful and family-friendly style.",
    followers: {
      instagram: "621.9k",
      tiktok: "1.05m",
      youtube: "310.2k",
      snapchat: "-",
      total: calculateTotal("621.9k", "1.05m", "310.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@loganprice",
      tiktok: "@loganprice",
      snapchat: "loganprice",
      youtube: "loganprice",
    },
    links: [
      "https://youtube.com/loganpriceparks",
      "https://loganpriceparks.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_middle_aged_laughing.jpeg",
    verticals: ["Entertainment", "Family", "Travel"],
    instagramEngagementRate: "8.30%",
    connected: true,
  },
  {
    id: 15,
    name: "Bella Rivera",
    location: "San Diego, CA, USA",
    gender: "Female",
    age: 26,
    birthday: calculateBirthdayFromAge(26),
    bio: "Surfer and ocean conservation advocate. Shares surf tutorials, travel vlogs, and environmental activism content.",
    followers: {
      instagram: "442.3k",
      tiktok: "1.2m",
      youtube: "196.9k",
      snapchat: "59.8k",
      total: calculateTotal("442.3k", "1.2m", "196.9k", "59.8k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "expired",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@bellarivera",
      tiktok: "@bellarivera",
      snapchat: "bellarivera",
      youtube: "bellarivera",
    },
    links: [
      "https://bellarivera.com",
      "https://oceanwavesfoundation.org",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_fitness_influencer.jpeg",
    verticals: ["Sport", "Travel", "Advocacy"],
    instagramEngagementRate: "6.40%",
    connected: false,
  },
  {
    id: 16,
    name: "Carter Miller",
    location: "Boston, MA, USA",
    gender: "Male",
    age: 29,
    birthday: calculateBirthdayFromAge(29),
    bio: "Self-taught chef and food stylist making gourmet recipes approachable for home cooks. Known for mouth-watering plating and step-by-step videos.",
    followers: {
      instagram: "518.2k",
      tiktok: "1.4m",
      youtube: "275.4k",
      snapchat: "-",
      total: calculateTotal("518.2k", "1.4m", "275.4k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@cartermiller",
      tiktok: "@cartermiller",
      snapchat: "cartermiller",
      youtube: "cartermiller",
    },
    links: [
      "https://pinterest.com/cartermillerchef",
      "https://cartermillerkitchen.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_adjusting_tie.jpeg",
    verticals: ["Food", "Creativity", "Lifestyle"],
    instagramEngagementRate: "7.40%",
    connected: false,
  },
  {
    id: 17,
    name: "Ava Scott Maryland",
    location: "Dallas, TX, USA",
    gender: "Female",
    age: 24,
    birthday: calculateBirthdayFromAge(24),
    bio: "Fitness and lifestyle creator focusing on HIIT workouts, smoothie recipes, and personal growth challenges. Energetic and uplifting content.",
    followers: {
      instagram: "386.7k",
      tiktok: "824.5k",
      youtube: "144.8k",
      snapchat: "-",
      total: calculateTotal("386.7k", "824.5k", "144.8k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@avascottfit",
      tiktok: "@avascottfit",
      snapchat: "avascottfit",
      youtube: "avascottfit",
    },
    links: [
      "https://avascottfit.com",
      "https://pinterest.com/avascottfit",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_fitness_influencer.jpeg",
    verticals: ["Fitness", "Wellness", "Lifestyle"],
    instagramEngagementRate: "7.20%",
    connected: false,
  },
  {
    id: 18,
    name: "Hunter Gray",
    location: "Salt Lake City, UT, USA",
    gender: "Male",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "Outdoor survivalist teaching wilderness skills, gear setup, and minimalistic camping techniques. Blends educational content with adventure storytelling.",
    followers: {
      instagram: "451.2k",
      tiktok: "1.1m",
      youtube: "-",
      snapchat: "69.2k",
      total: calculateTotal("451.2k", "1.1m", "-", "69.2k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_connected",
      youtube: "not_added",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@huntergray",
      tiktok: "@huntergray",
      snapchat: "huntergray",
      youtube: "huntergray",
    },
    links: [
      "https://youtube.com/huntergrayoutdoors",
      "https://huntergrayoutdoors.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_athletic_stretching.jpeg",
    verticals: ["Sport", "Education", "Lifestyle"],
    instagramEngagementRate: "8.90%",
    connected: true,
  },
  {
    id: 19,
    name: "Ella Brooks",
    location: "Minneapolis, MN, USA",
    gender: "Female",
    age: 20,
    birthday: calculateBirthdayFromAge(20),
    bio: "Art student sharing digital painting tutorials, sketchbook tours, and creative challenges. Encourages followers to find joy in everyday creativity.",
    followers: {
      instagram: "209.8k",
      tiktok: "605.1k",
      youtube: "88.2k",
      snapchat: "-",
      total: calculateTotal("209.8k", "605.1k", "88.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "expired",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@ellabrooksart",
      tiktok: "@ellabrooksart",
      snapchat: "ellabrooksart",
      youtube: "ellabrooksart",
    },
    links: [
      "https://behance.net/ellabrooks",
      "https://etsy.com/shop/ellabrooksart",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_teen_peace_sign.jpeg",
    verticals: ["Art", "Creativity", "Education"],
    instagramEngagementRate: "6.80%",
    connected: false,
  },
  {
    id: 20,
    name: "Mason Blake",
    location: "Portland, ME, USA",
    gender: "Male",
    age: 33,
    birthday: calculateBirthdayFromAge(33),
    bio: "Chef-turned-forager documenting wild food recipes, sustainable sourcing tips, and culinary experiments from the Maine coast.",
    followers: {
      instagram: "328.4k",
      tiktok: "912.9k",
      youtube: "134.5k",
      snapchat: "-",
      total: calculateTotal("328.4k", "912.9k", "134.5k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@masonblake",
      tiktok: "@masonblake",
      snapchat: "masonblake",
      youtube: "masonblake",
    },
    links: [
      "https://masonblakeforaging.com",
      "https://pinterest.com/masonblake",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_middle_aged_hoodie.jpeg",
    verticals: ["Food", "Lifestyle", "Advocacy"],
    instagramEngagementRate: "6.50%",
    connected: true,
  },
  {
    id: 21,
    name: "Emily Carter",
    location: "Denver, CO, USA",
    gender: "Female",
    age: 16,
    birthday: calculateBirthdayFromAge(16),
    bio: "High schooler sharing goofy GRWM videos, braces-friendly snack hacks, and funny moments from her everyday life.",
    followers: {
      instagram: "148.2k",
      tiktok: "472.6k",
      youtube: "33.9k",
      snapchat: "12.4k",
      total: calculateTotal("148.2k", "472.6k", "33.9k", "12.4k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@emilycarter",
      tiktok: "@emilycarter",
      snapchat: "emilycarter",
      youtube: "emilycarter",
    },
    links: [
      "https://pinterest.com/emilycarterfun",
      "https://emilyslaughs.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_teen_braces_goofy.jpeg",
    verticals: ["Comedy", "Lifestyle", "Entertainment"],
    instagramEngagementRate: "8.30%",
    connected: false,
  },
  {
    id: 22,
    name: "Rachel Hayes",
    location: "Chicago, IL, USA",
    gender: "Female",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "Career coach and business vlogger teaching personal branding, LinkedIn strategies, and workplace confidence.",
    followers: {
      instagram: "-",
      tiktok: "593.4k",
      youtube: "121.6k",
      snapchat: "-",
      total: calculateTotal("-", "593.4k", "121.6k", "-"),
    },
    connections: {
      instagram: "not_added",
      tiktok: "connected",
      youtube: "not_connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@rachelhayesbiz",
      tiktok: "@rachelhayesbiz",
      snapchat: "rachelhayesbiz",
      youtube: "rachelhayesbiz",
    },
    links: [
      "https://linkedin.com/in/rachelhayes",
      "https://medium.com/@rachelhayes",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_business_train.jpeg",
    verticals: ["Finance", "Education", "Lifestyle"],
    instagramEngagementRate: "8.10%",
    connected: false,
  },
  {
    id: 23,
    name: "Zoe Rivers",
    location: "Portland, OR, USA",
    gender: "Female",
    age: 24,
    birthday: calculateBirthdayFromAge(24),
    bio: "Alternative style creator mixing thrift store finds, bold hair colors, and sustainability tips with edgy street photography.",
    followers: {
      instagram: "351.2k",
      tiktok: "824.9k",
      youtube: "-",
      snapchat: "46.3k",
      total: calculateTotal("351.2k", "824.9k", "-", "46.3k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@zoerivers",
      tiktok: "@zoerivers",
      snapchat: "zoerivers",
      youtube: "zoerivers",
    },
    links: [
      "https://depop.com/zoerivers",
      "https://zoeriversstyle.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_dyed_hair.jpeg",
    verticals: ["Fashion", "DIY", "Advocacy"],
    instagramEngagementRate: "9.00%",
    connected: false,
  },
  {
    id: 24,
    name: "Amira Khan",
    location: "Dearborn, MI, USA",
    gender: "Female",
    age: 25,
    birthday: calculateBirthdayFromAge(25),
    bio: "Modest fashion and lifestyle creator celebrating culture, faith, and modern style with inspiring lookbooks and life tips.",
    followers: {
      instagram: "284.5k",
      tiktok: "693.8k",
      youtube: "105.4k",
      snapchat: "-",
      total: calculateTotal("284.5k", "693.8k", "105.4k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@amirakhan",
      tiktok: "@amirakhan",
      snapchat: "amirakhan",
      youtube: "amirakhan",
    },
    links: [
      "https://pinterest.com/amirakhanstyle",
      "https://linkedin.com/in/amirakhan",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_hijab.jpeg",
    verticals: ["Fashion", "Lifestyle", "Advocacy"],
    instagramEngagementRate: "7.40%",
    connected: false,
  },
  {
    id: 25,
    name: "Lauren Blake",
    location: "Phoenix, AZ, USA",
    gender: "Female",
    age: 28,
    birthday: calculateBirthdayFromAge(28),
    bio: "Mom sharing parenting hacks, baby milestones, and relatable mom-life humor in short-form videos and vlogs.",
    followers: {
      instagram: "398.1k",
      tiktok: "1.1m",
      youtube: "146.8k",
      snapchat: "72.9k",
      total: calculateTotal("398.1k", "1.1m", "146.8k", "72.9k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@laurenblakemomlife",
      tiktok: "@laurenblakemomlife",
      snapchat: "laurenblakemomlife",
      youtube: "laurenblakemomlife",
    },
    links: [
      "https://laurenblakemomlife.com",
      "https://pinterest.com/laurenblakemomlife",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_mom_baby.jpeg",
    verticals: ["Family", "Lifestyle", "Comedy"],
    instagramEngagementRate: "7.40%",
    connected: true,
  },
  {
    id: 26,
    name: "Harper Lane",
    location: "Nashville, TN, USA",
    gender: "Female",
    age: 23,
    birthday: calculateBirthdayFromAge(23),
    bio: "Music vlogger documenting behind-the-scenes sessions, songwriting, and indie artist interviews.",
    followers: {
      instagram: "275.3k",
      tiktok: "-",
      youtube: "193.2k",
      snapchat: "-",
      total: calculateTotal("275.3k", "-", "193.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_added",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@harperlanemusic",
      tiktok: "@harperlanemusic",
      snapchat: "harperlanemusic",
      youtube: "harperlanemusic",
    },
    links: [
      "https://spotify.com/harperlane",
      "https://soundcloud.com/harperlane",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_music_vlogger.jpeg",
    verticals: ["Music", "Entertainment", "Lifestyle"],
    instagramEngagementRate: "6.90%",
    connected: false,
  },
  {
    id: 27,
    name: "Bella Ortiz",
    location: "Miami, FL, USA",
    gender: "Female",
    age: 26,
    birthday: calculateBirthdayFromAge(26),
    bio: "Party host and lifestyle influencer curating epic events, outfit inspo, and tips for creating memorable nights with friends.",
    followers: {
      instagram: "512.8k",
      tiktok: "1.2m",
      youtube: "218.5k",
      snapchat: "94.6k",
      total: calculateTotal("512.8k", "1.2m", "218.5k", "94.6k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@bellaortizparty",
      tiktok: "@bellaortizparty",
      snapchat: "bellaortizparty",
      youtube: "bellaortizparty",
    },
    links: [
      "https://bellaortiz.com",
      "https://pinterest.com/bellaortizparty",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_party_host.jpeg",
    verticals: ["Entertainment", "Lifestyle", "Fashion"],
    instagramEngagementRate: "6.60%",
    connected: true,
  },
  {
    id: 28,
    name: "Sasha Kim",
    location: "Los Angeles, CA, USA",
    gender: "Female",
    age: 24,
    birthday: calculateBirthdayFromAge(24),
    bio: "Streetwear influencer mixing high-fashion pieces with casual LA vibes, spotlighting emerging brands and sneaker drops.",
    followers: {
      instagram: "336.7k",
      tiktok: "904.3k",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("336.7k", "904.3k", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@sashakim",
      tiktok: "@sashakim",
      snapchat: "sashakim",
      youtube: "sashakim",
    },
    links: [
      "https://depop.com/sashakim",
      "https://pinterest.com/sashakim",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_young_adult_streetwear_influencer.jpeg",
    verticals: ["Fashion", "Beauty", "Lifestyle"],
    instagramEngagementRate: "9.40%",
    connected: true,
  },
  {
    id: 29,
    name: "Diane Brooks",
    location: "Atlanta, GA, USA",
    gender: "Female",
    age: 44,
    birthday: calculateBirthdayFromAge(44),
    bio: "Home cook and recipe blogger sharing Southern classics, family-friendly meals, and kitchen tips.",
    followers: {
      instagram: "189.4k",
      tiktok: "531.2k",
      youtube: "84.3k",
      snapchat: "-",
      total: calculateTotal("189.4k", "531.2k", "84.3k", "-"),
    },
    connections: {
      instagram: "expired",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@dianebrookskitchen",
      tiktok: "@dianebrookskitchen",
      snapchat: "dianebrookskitchen",
      youtube: "dianebrookskitchen",
    },
    links: [
      "https://dianebrookskitchen.com",
      "https://pinterest.com/dianebrookskitchen",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/female/female_middle_aged_kitchen.jpeg",
    verticals: ["Food", "Family", "Lifestyle"],
    instagramEngagementRate: "8.90%",
    connected: false,
  },
  {
    id: 30,
    name: "Jake Miller",
    location: "Kansas City, MO, USA",
    gender: "Male",
    age: 16,
    birthday: calculateBirthdayFromAge(16),
    bio: "High schooler sharing funny school-life skits, gaming clips, and teen trends.",
    followers: {
      instagram: "121.8k",
      tiktok: "462.7k",
      youtube: "28.6k",
      snapchat: "15.3k",
      total: calculateTotal("121.8k", "462.7k", "28.6k", "15.3k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@jakemiller",
      tiktok: "@jakemiller",
      snapchat: "jakemiller",
      youtube: "jakemiller",
    },
    links: [
      "https://youtube.com/jakemiller",
      "https://pinterest.com/jakemiller",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_teen_acne_braces.jpeg",
    verticals: ["Gaming", "Comedy", "Entertainment"],
    instagramEngagementRate: "7.50%",
    connected: true,
  },
  {
    id: 31,
    name: "Noah Foster",
    location: "Phoenix, AZ, USA",
    gender: "Male",
    age: 17,
    birthday: calculateBirthdayFromAge(17),
    bio: "Comedy creator posting awkward teen moments, braces humor, and relatable high school life.",
    followers: {
      instagram: "108.5k",
      tiktok: "401.3k",
      youtube: "22.7k",
      snapchat: "-",
      total: calculateTotal("108.5k", "401.3k", "22.7k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@noahfoster",
      tiktok: "@noahfoster",
      snapchat: "noahfoster",
      youtube: "noahfoster",
    },
    links: [
      "https://noahfosterfun.com",
      "https://pinterest.com/noahfoster",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_teen_braces.jpeg",
    verticals: ["Comedy", "Entertainment", "Lifestyle"],
    instagramEngagementRate: "7.90%",
    connected: true,
  },
  {
    id: 32,
    name: "Alex Price",
    location: "Dallas, TX, USA",
    gender: "Male",
    age: 24,
    birthday: calculateBirthdayFromAge(24),
    bio: "Casual lifestyle creator vlogging coffee runs, travel days, and apartment life.",
    followers: {
      instagram: "201.9k",
      tiktok: "632.4k",
      youtube: "74.6k",
      snapchat: "-",
      total: calculateTotal("201.9k", "632.4k", "74.6k", "-"),
    },
    connections: {
      instagram: "not_connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@alexprice",
      tiktok: "@alexprice",
      snapchat: "alexprice",
      youtube: "alexprice",
    },
    links: [
      "https://youtube.com/alexpricevlogs",
      "https://alexpricevlogs.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_car_dashboard.jpeg",
    verticals: ["Lifestyle", "Travel", "Food"],
    instagramEngagementRate: "6.40%",
    connected: false,
  },
  {
    id: 33,
    name: "Ethan Gray",
    location: "Seattle, WA, USA",
    gender: "Male",
    age: 26,
    birthday: calculateBirthdayFromAge(26),
    bio: "Grooming and skincare influencer sharing routines, beard care tips, and self-confidence content.",
    followers: {
      instagram: "278.6k",
      tiktok: "781.5k",
      youtube: "101.2k",
      snapchat: "39.4k",
      total: calculateTotal("278.6k", "781.5k", "101.2k", "39.4k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@ethangray",
      tiktok: "@ethangray",
      snapchat: "ethangray",
      youtube: "ethangray",
    },
    links: [
      "https://ethangraygrooming.com",
      "https://pinterest.com/ethangray",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_bearded_mirror.jpeg",
    verticals: ["Beauty", "Lifestyle", "Wellness"],
    instagramEngagementRate: "9.30%",
    connected: true,
  },
  {
    id: 34,
    name: "Luca Rossi",
    location: "New York, NY, USA",
    gender: "Male",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "Fashion creator blending oversized coats with sleek streetwear looks, inspired by NYC culture.",
    followers: {
      instagram: "392.4k",
      tiktok: "928.1k",
      youtube: "148.9k",
      snapchat: "-",
      total: calculateTotal("392.4k", "928.1k", "148.9k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@lucarossi",
      tiktok: "@lucarossi",
      snapchat: "lucarossi",
      youtube: "lucarossi",
    },
    links: [
      "https://depop.com/lucarossi",
      "https://pinterest.com/lucarossi",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_bearded_oversized_coat.jpeg",
    verticals: ["Fashion", "Lifestyle", "Creativity"],
    instagramEngagementRate: "6.70%",
    connected: false,
  },
  {
    id: 35,
    name: "Jordan Miles",
    location: "Miami, FL, USA",
    gender: "Male",
    age: 25,
    birthday: calculateBirthdayFromAge(25),
    bio: "Car enthusiast and lifestyle vlogger sharing supercar content, maintenance tips, and road trip diaries.",
    followers: {
      instagram: "334.5k",
      tiktok: "-",
      youtube: "113.8k",
      snapchat: "47.5k",
      total: calculateTotal("334.5k", "-", "113.8k", "47.5k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_added",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@jordanmiles",
      tiktok: "@jordanmiles",
      snapchat: "jordanmiles",
      youtube: "jordanmiles",
    },
    links: [
      "https://youtube.com/jordanmilescars",
      "https://jordanmilescars.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_car_selfie.jpeg",
    verticals: ["Lifestyle", "Tech", "Travel"],
    instagramEngagementRate: "6.50%",
    connected: false,
  },
  {
    id: 36,
    name: "Samuel Hayes",
    location: "Boston, MA, USA",
    gender: "Male",
    age: 30,
    birthday: calculateBirthdayFromAge(30),
    bio: "Public speaking coach and entrepreneur sharing tips on confidence, career growth, and business networking.",
    followers: {
      instagram: "245.6k",
      tiktok: "678.9k",
      youtube: "102.4k",
      snapchat: "-",
      total: calculateTotal("245.6k", "678.9k", "102.4k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@samuelhayes",
      tiktok: "@samuelhayes",
      snapchat: "samuelhayes",
      youtube: "samuelhayes",
    },
    links: [
      "https://linkedin.com/in/samuelhayes",
      "https://medium.com/@samuelhayes",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_business_suit.jpeg",
    verticals: ["Finance", "Education", "Lifestyle"],
    instagramEngagementRate: "6.20%",
    connected: true,
  },
  {
    id: 37,
    name: "Oliver Kim",
    location: "San Francisco, CA, USA",
    gender: "Male",
    age: 28,
    birthday: calculateBirthdayFromAge(28),
    bio: "Tech reviewer and app developer creating tutorials, gadget breakdowns, and startup life diaries.",
    followers: {
      instagram: "198.2k",
      tiktok: "592.4k",
      youtube: "-",
      snapchat: "-",
      total: calculateTotal("198.2k", "592.4k", "-", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_added",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@oliverkimtech",
      tiktok: "@oliverkimtech",
      snapchat: "oliverkimtech",
      youtube: "oliverkimtech",
    },
    links: [
      "https://github.com/oliverkim",
      "https://linkedin.com/in/oliverkim",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_glasses.jpeg",
    verticals: ["Tech", "Education", "Lifestyle"],
    instagramEngagementRate: "7.80%",
    connected: false,
  },
  {
    id: 38,
    name: "Nathan Cole",
    location: "Austin, TX, USA",
    gender: "Male",
    age: 38,
    birthday: calculateBirthdayFromAge(38),
    bio: "Marketing strategist helping brands scale through storytelling and social campaigns. Shares productivity tips and leadership advice.",
    followers: {
      instagram: "154.3k",
      tiktok: "438.6k",
      youtube: "64.2k",
      snapchat: "-",
      total: calculateTotal("154.3k", "438.6k", "64.2k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@nathancole",
      tiktok: "@nathancole",
      snapchat: "nathancole",
      youtube: "nathancole",
    },
    links: [
      "https://linkedin.com/in/nathancole",
      "https://medium.com/@nathancole",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_middle_aged_balding_polo.jpeg",
    verticals: ["Finance", "Education", "Lifestyle"],
    instagramEngagementRate: "7.10%",
    connected: false,
  },
  {
    id: 39,
    name: "Adrian Vega",
    location: "Los Angeles, CA, USA",
    gender: "Male",
    age: 26,
    birthday: calculateBirthdayFromAge(26),
    bio: "Foodie and lifestyle creator posting espresso recipes, coffee shop reviews, and cooking experiments.",
    followers: {
      instagram: "311.4k",
      tiktok: "902.8k",
      youtube: "156.9k",
      snapchat: "49.5k",
      total: calculateTotal("311.4k", "902.8k", "156.9k", "49.5k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "expired",
      snapchat: "not_connected",
    },
    aliases: {
      instagram: "@adrianvega",
      tiktok: "@adrianvega",
      snapchat: "adrianvega",
      youtube: "adrianvega",
    },
    links: [
      "https://pinterest.com/adrianvegafood",
      "https://adrianvegakitchen.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_model_espresso.jpeg",
    verticals: ["Food", "Lifestyle", "Creativity"],
    instagramEngagementRate: "8.10%",
    connected: true,
  },
  {
    id: 40,
    name: "Tyler Brooks",
    location: "San Diego, CA, USA",
    gender: "Male",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "Lifestyle vlogger sharing minimalist apartment tours, morning routines, and laid-back California living.",
    followers: {
      instagram: "-",
      tiktok: "582.4k",
      youtube: "89.7k",
      snapchat: "21.9k",
      total: calculateTotal("-", "582.4k", "89.7k", "21.9k"),
    },
    connections: {
      instagram: "not_added",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@tylerbrooks",
      tiktok: "@tylerbrooks",
      snapchat: "tylerbrooks",
      youtube: "tylerbrooks",
    },
    links: [
      "https://youtube.com/tylerbrooks",
      "https://tylerbrookslife.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_relaxed_lounging.jpeg",
    verticals: ["Lifestyle", "Home/Decor", "Wellness"],
    instagramEngagementRate: "7.00%",
    connected: true,
  },
  {
    id: 41,
    name: "Jake Thompson",
    location: "Portland, OR, USA",
    gender: "Male",
    age: 29,
    birthday: calculateBirthdayFromAge(29),
    bio: "Marathon runner and fitness coach posting training tips, race-day vlogs, and healthy eating guides.",
    followers: {
      instagram: "292.4k",
      tiktok: "847.1k",
      youtube: "123.6k",
      snapchat: "-",
      total: calculateTotal("292.4k", "847.1k", "123.6k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@jakethompsonrun",
      tiktok: "@jakethompsonrun",
      snapchat: "jakethompsonrun",
      youtube: "jakethompsonrun",
    },
    links: [
      "https://strava.com/athletes/jakethompson",
      "https://jakethompsonrun.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_running_influencer.jpeg",
    verticals: ["Fitness", "Sport", "Wellness"],
    instagramEngagementRate: "8.70%",
    connected: true,
  },
  {
    id: 42,
    name: "Chris Allen",
    location: "New York, NY, USA",
    gender: "Male",
    age: 28,
    birthday: calculateBirthdayFromAge(28),
    bio: "Travel and lifestyle influencer with a focus on hidden city gems, cafe hopping, and style inspiration.",
    followers: {
      instagram: "243.5k",
      tiktok: "732.8k",
      youtube: "108.4k",
      snapchat: "-",
      total: calculateTotal("243.5k", "732.8k", "108.4k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "not_connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@chrisallen",
      tiktok: "@chrisallen",
      snapchat: "chrisallen",
      youtube: "chrisallen",
    },
    links: [
      "https://pinterest.com/chrisallenstyle",
      "https://chrisallenlifestyle.com",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_stylish_seated.jpeg",
    verticals: ["Travel", "Lifestyle", "Fashion"],
    instagramEngagementRate: "6.90%",
    connected: true,
  },
  {
    id: 43,
    name: "Vincent Ross",
    location: "Chicago, IL, USA",
    gender: "Male",
    age: 27,
    birthday: calculateBirthdayFromAge(27),
    bio: "Menswear content creator known for sharp streetwear looks and editorial-style photoshoots.",
    followers: {
      instagram: "398.4k",
      tiktok: "-",
      youtube: "174.9k",
      snapchat: "58.7k",
      total: calculateTotal("398.4k", "-", "174.9k", "58.7k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "not_added",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@vincentross",
      tiktok: "@vincentross",
      snapchat: "vincentross",
      youtube: "vincentross",
    },
    links: [
      "https://depop.com/vincentross",
      "https://pinterest.com/vincentross",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_vintage_leather.jpeg",
    verticals: ["Fashion", "Creativity", "Lifestyle"],
    instagramEngagementRate: "7.40%",
    connected: false,
  },
  {
    id: 44,
    name: "Daniel Reed",
    location: "Washington, DC, USA",
    gender: "Male",
    age: 33,
    birthday: calculateBirthdayFromAge(33),
    bio: "Remote work expert and productivity coach offering tips on video calls, digital workflows, and personal branding.",
    followers: {
      instagram: "178.5k",
      tiktok: "498.3k",
      youtube: "82.1k",
      snapchat: "25.3k",
      total: calculateTotal("178.5k", "498.3k", "82.1k", "25.3k"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "connected",
    },
    aliases: {
      instagram: "@danielreed",
      tiktok: "@danielreed",
      snapchat: "danielreed",
      youtube: "danielreed",
    },
    links: [
      "https://linkedin.com/in/danielreed",
      "https://medium.com/@danielreed",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_young_adult_zoom_call.jpeg",
    verticals: ["Tech", "Finance", "Education"],
    instagramEngagementRate: "1.00%",
    connected: true,
  },
  {
    id: 45,
    name: "Walter Green",
    location: "Tampa, FL, USA",
    gender: "Male",
    age: 72,
    birthday: calculateBirthdayFromAge(72),
    bio: "Retired teacher sharing wisdom, storytelling videos, and DIY woodworking projects.",
    followers: {
      instagram: "85.2k",
      tiktok: "228.7k",
      youtube: "17.4k",
      snapchat: "-",
      total: calculateTotal("85.2k", "228.7k", "17.4k", "-"),
    },
    connections: {
      instagram: "connected",
      tiktok: "connected",
      youtube: "connected",
      snapchat: "not_added",
    },
    aliases: {
      instagram: "@waltergreen",
      tiktok: "@waltergreen",
      snapchat: "waltergreen",
      youtube: "waltergreen",
    },
    links: [
      "https://waltergreencrafts.com",
      "https://pinterest.com/waltergreen",
    ],
    avatarImage:
      "https://proto.dev.foam.io/assets/avatars/male/male_elderly_plaid_shirt.jpeg",
    verticals: ["DIY", "Education", "Lifestyle"],
    instagramEngagementRate: "7.60%",
    connected: true,
  },
];

// Helper functions
export function getTalentById(id: number): Talent | undefined {
  return talents.find((talent) => talent.id === id);
}

export function getTalentByName(
  name: string,
): Talent | undefined {
  return talents.find(
    (talent) =>
      talent.name.toLowerCase() === name.toLowerCase(),
  );
}

export function getTalentsByGender(
  gender: "Male" | "Female",
): Talent[] {
  return talents.filter((talent) => talent.gender === gender);
}

export function getTalentsByAgeRange(
  minAge: number,
  maxAge: number,
): Talent[] {
  return talents.filter(
    (talent) => talent.age >= minAge && talent.age <= maxAge,
  );
}

export function getRandomTalent(): Talent {
  return talents[Math.floor(Math.random() * talents.length)];
}

export function getRandomTalents(count: number): Talent[] {
  const shuffled = [...talents].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
