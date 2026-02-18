import { talents } from "@/data/talents";
import { coffeeVideos, tiktokVideos, nikeImages } from "@/data/thumbnails";
import type { Platform } from "@/data/platformIcons";

export interface Post {
  id: number;
  thumbnail: string;
  video?: string;
  platform: Platform;
  talentName: string;
  talentAvatar: string;
  posted: string;
  reach: string;
  impressions: string;
  engagements: string;
  reachEngRate: string;
  views: string;
  viewEngRate: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  insights: string[];
  score: number;
  analysisText: string;
  caption: string;
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

const postDates = [
  "1 hour ago",
  "2 hours ago",
  "4 hours ago",
  "6 hours ago",
  "8 hours ago",
  "12 hours ago",
  "1 day ago",
  "2 days ago",
  "3 days ago",
  "4 days ago",
  "5 days ago",
  "1 week ago",
  "12/12/2026",
  "11/12/2026",
  "10/12/2026",
  "09/12/2026",
  "08/12/2026",
  "05/12/2026",
  "01/12/2026",
  "28/11/2026",
  "25/11/2026",
  "20/11/2026",
  "15/11/2026",
  "10/11/2026",
  "01/11/2026",
  "25/10/2026",
  "20/10/2026",
  "15/10/2026",
  "10/10/2026",
  "01/10/2026",
  "25/09/2026",
  "20/09/2026",
  "15/09/2026",
  "10/09/2026",
  "01/09/2026",
  "25/08/2026",
  "20/08/2026",
  "15/08/2026",
  "10/08/2026",
  "01/08/2026",
];

// Seed a deterministic set of posts using all available video/image assets
const allMedia: { thumbnail: string; video?: string; platform: Platform }[] = [];

// Coffee videos → youtube
for (const cv of coffeeVideos) {
  allMedia.push({ thumbnail: cv.thumbnail, video: cv.video, platform: "youtube" });
}
// TikTok videos → tiktok
for (const tv of tiktokVideos) {
  allMedia.push({ thumbnail: tv.thumbnail, video: tv.video, platform: "tiktok" });
}
// Nike images → instagram
for (const img of nikeImages) {
  allMedia.push({ thumbnail: img, platform: "instagram" });
}
// Repeat coffee videos as instagram content
for (const cv of coffeeVideos) {
  allMedia.push({ thumbnail: cv.thumbnail, video: cv.video, platform: "instagram" });
}
// Repeat tiktok videos as snap content
for (const tv of tiktokVideos) {
  allMedia.push({ thumbnail: tv.thumbnail, video: tv.video, platform: "snap" });
}
// More coffee videos as tiktok
for (const cv of coffeeVideos.slice(0, 6)) {
  allMedia.push({ thumbnail: cv.thumbnail, video: cv.video, platform: "tiktok" });
}

const brands = ["Nike", "Adidas", "Puma", "Lululemon", "Under Armour", "New Balance"];

const captionTemplates = [
  (brand: string) =>
    `#${brand.toUpperCase()} #off-duty\n"Every step I take, I think of what I feel in my feet—which is a good thing."\nBrought to you by ${brand} Mind: A MIND-ALTERING SHOE. Restoring the art of movement since day one.`,
  (brand: string) =>
    `New drop alert 🔥 @${brand.toLowerCase()} just changed the game.\n#${brand.toUpperCase()} #NewRelease #Style\nFull review coming soon — stay tuned.`,
  (brand: string) =>
    `Morning run essentials ft. ${brand}. Nothing beats that feeling.\n#${brand.toUpperCase()} #Running #Fitness #MorningRoutine`,
  (brand: string) =>
    `Behind the scenes at the ${brand} showroom. This collection is insane.\n#${brand.toUpperCase()} #BTS #Fashion #Exclusive`,
  (brand: string) =>
    `${brand} just dropped and I'm obsessed. The quality is unmatched.\n#${brand.toUpperCase()} #OOTD #StreetStyle`,
  (brand: string) =>
    `Workout complete. ${brand} gear held up perfectly today.\n#${brand.toUpperCase()} #GymLife #Fitness #Workout`,
];

function getAnalysisText(score: number): string {
  if (score >= 85)
    return "Strong engagement and reach metrics. Content performs well with target audience. Good fit for campaigns.";
  if (score >= 75)
    return "Good engagement metrics with solid reach. Content resonates well with core audience segments.";
  if (score >= 65)
    return "Moderate engagement with room for growth. Content shows potential with niche audience segments.";
  return "Below average engagement. Content may need optimization to better reach target demographics.";
}

function buildInsights(seed: number, brand: string): string[] {
  const r = (n: number) => seededRandom(seed * 5 + n);
  const mentions = Math.floor(r(0) * 5) + 1;
  const hashtags = Math.floor(r(1) * 8) + 1;
  const images = Math.floor(r(2) * 6) + 1;
  const products = Math.floor(r(3) * 4) + 1;
  return [
    `${brand} mentioned ${mentions} times in caption`,
    `${hashtags} ${brand}-related hashtags`,
    `${brand} logo visible in ${images} images`,
    `${products} tagged ${brand} products`,
  ];
}

// Use a seeded random to keep metrics stable across renders
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export const posts: Post[] = allMedia.map((media, i) => {
  const talent = talents[i % talents.length];
  const s = (field: number) => seededRandom(i * 7 + field);
  const reach = Math.floor(s(1) * 9000) + 100;
  const impressions = Math.floor(reach * (0.8 + s(2) * 0.6));
  const engagements = Math.floor(impressions * (0.01 + s(3) * 0.15));
  const views = Math.floor(reach * (0.5 + s(4) * 1.5));
  const reachEngRate = (engagements / reach) * 100;
  const viewEngRate = views > 0 ? (engagements / views) * 100 : 0;

  const brand = brands[i % brands.length];
  const score = Math.floor(s(5) * 40) + 60;

  const likes = Math.floor(engagements * (0.5 + s(6) * 0.3));
  const comments = Math.floor(engagements * (0.1 + s(7) * 0.15));
  const shares = Math.floor(engagements * (0.05 + s(8) * 0.1));
  const saves = Math.floor(engagements * (0.03 + s(9) * 0.08));

  return {
    id: i + 1,
    thumbnail: media.thumbnail,
    video: media.video,
    platform: media.platform,
    talentName: talent.name,
    talentAvatar: talent.avatarImage,
    posted: postDates[i % postDates.length],
    reach: fmt(reach),
    impressions: fmt(impressions),
    engagements: fmt(engagements),
    reachEngRate: reachEngRate.toFixed(1) + "%",
    views: fmt(views),
    viewEngRate: viewEngRate.toFixed(1) + "%",
    likes: fmt(likes),
    comments: fmt(comments),
    shares: fmt(shares),
    saves: fmt(saves),
    insights: buildInsights(i, brand),
    score,
    analysisText: getAnalysisText(score),
    caption: captionTemplates[i % captionTemplates.length](brand),
  };
});
