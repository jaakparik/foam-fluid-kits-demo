import { talents } from "@/data/talents";
import { nikeImages } from "@/data/thumbnails";
import type { Post } from "@/data/posts";
import type { Platform } from "@/data/platformIcons";

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
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
];

const platforms: Platform[] = ["tiktok", "instagram", "youtube", "snap"];

const captionTemplates = [
  `#NIKE #off-duty\n"Every step I take, I think of what I feel in my feet—which is a good thing."\nBrought to you by Nike Mind: A MIND-ALTERING SHOE. Restoring the art of movement since day one.`,
  `New drop alert 🔥 @nike just changed the game.\n#NIKE #NewRelease #Style\nFull review coming soon — stay tuned.`,
  `Morning run essentials ft. Nike. Nothing beats that feeling.\n#NIKE #Running #Fitness #MorningRoutine`,
  `Behind the scenes at the Nike showroom. This collection is insane.\n#NIKE #BTS #Fashion #Exclusive`,
  `Nike just dropped and I'm obsessed. The quality is unmatched.\n#NIKE #OOTD #StreetStyle`,
  `Workout complete. Nike gear held up perfectly today.\n#NIKE #GymLife #Fitness #Workout`,
];

function getAnalysisText(score: number): string {
  if (score >= 85)
    return "Strong engagement and reach metrics. Content performs well with target audience. Good fit for Nike campaigns.";
  if (score >= 75)
    return "Good engagement metrics with solid reach. Content resonates well with Nike's core audience segments.";
  if (score >= 65)
    return "Moderate engagement with room for growth. Content shows potential with Nike's niche audience segments.";
  return "Below average engagement. Content may need optimization to better reach Nike's target demographics.";
}

function buildInsights(seed: number): string[] {
  const r = (n: number) => seededRandom(seed * 5 + n);
  const mentions = Math.floor(r(0) * 5) + 1;
  const hashtags = Math.floor(r(1) * 8) + 1;
  const images = Math.floor(r(2) * 6) + 1;
  const products = Math.floor(r(3) * 4) + 1;
  return [
    `Nike mentioned ${mentions} times in caption`,
    `${hashtags} Nike-related hashtags`,
    `Nike logo visible in ${images} images`,
    `${products} tagged Nike products`,
  ];
}

// 37 Nike videos: nike_wd.mp4 first, then nike_video-2 through nike_video-37
const BASE = "https://proto.dev.foam.io/assets/videos";
const nikeVideoUrls = [
  `${BASE}/nike_wd.mp4`,
  ...Array.from({ length: 36 }, (_, i) => `${BASE}/nike_video-${i + 2}.mp4`),
];

// Build media entries: all 38 videos + 4 nike images (no video)
const nikeMedia: { thumbnail: string; video?: string; platform: Platform }[] = [];

for (let i = 0; i < nikeVideoUrls.length; i++) {
  nikeMedia.push({
    thumbnail: nikeVideoUrls[i],
    video: nikeVideoUrls[i],
    platform: platforms[i % platforms.length],
  });
}

for (let i = 0; i < nikeImages.length; i++) {
  nikeMedia.push({
    thumbnail: nikeImages[i],
    platform: platforms[(i + 1) % platforms.length],
  });
}

// Cycle to fill ~147 posts
const allNikeMedia: typeof nikeMedia = [];
while (allNikeMedia.length < 147) {
  for (const m of nikeMedia) {
    allNikeMedia.push({
      ...m,
      platform: platforms[allNikeMedia.length % platforms.length],
    });
    if (allNikeMedia.length >= 147) break;
  }
}

export const nikePosts: Post[] = allNikeMedia.map((media, i) => {
  const talent = talents[i % talents.length];
  const s = (field: number) => seededRandom(i * 7 + field);
  const reach = Math.floor(s(1) * 9000) + 100;
  const impressions = Math.floor(reach * (0.8 + s(2) * 0.6));
  const engagements = Math.floor(impressions * (0.01 + s(3) * 0.15));
  const views = Math.floor(reach * (0.5 + s(4) * 1.5));
  const reachEngRate = (engagements / reach) * 100;
  const viewEngRate = views > 0 ? (engagements / views) * 100 : 0;
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
    insights: buildInsights(i),
    score,
    analysisText: getAnalysisText(score),
    caption: captionTemplates[i % captionTemplates.length],
  };
});
