import { dedupeById, parseYouTubeId, type YoutubeVideo } from "@/lib/youtube";

function v(title: string, url: string, dek?: string): YoutubeVideo {
  const parsed = parseYouTubeId(url);
  if (!parsed) throw new Error(`Invalid YouTube URL: ${url}`);
  return { id: parsed.id, kind: parsed.kind, title, dek };
}

export const RK_PODCAST_NEWS = dedupeById<YoutubeVideo>([
  v(
    "Why Cancer is Rising in Kashmir: A Life-Saving Warning from Dr. Sameer Kaul",
    "https://www.youtube.com/watch?v=k0ANOVktlIo",
  ),
  v(
    "Safe workplaces prerequisite for women empowerment; Epstein files an eye-opener: Mantasha Rashid",
    "https://www.youtube.com/watch?v=pf8b32m77x4",
  ),
  v(
    "4 Days to Ramadan: What Fasting Truly Teaches Us | Mufti Mehraj-ud-din on the Essence of Ramadan",
    "https://www.youtube.com/watch?v=iQca-UilV64",
  ),
  v(
    "The Path to a Pure Heart: Why Regret is Your Best Friend This Ramadan | Molvi Mohammad Noorani",
    "https://www.youtube.com/watch?v=KV2ow_8mEdA",
  ),
  v(
    "Junaid Qurashi: Insightful conversation on current issues, perspectives, and what lies ahead.",
    "https://www.youtube.com/watch?v=v2EmDqqtj-c",
  ),
  v(
    "Why are cancer cases more prominent in today’s time than ever before? | Dr. Sameer Kaul on Health",
    "https://www.youtube.com/watch?v=ZBALWBIQ3zg",
  ),
]);

export const RK_NEWS_VIDEOS = dedupeById<YoutubeVideo>([
  v(
    "Farooq Abdullah Welcomes US-Iran Ceasefire: “Talks Are the Only Way Forward”",
    "https://www.youtube.com/watch?v=BO8qYbW91CQ",
  ),
  v(
    "Encroachment on footpaths in Batamaloo forces pedestrians onto roads; Traffic Police takes action",
    "https://www.youtube.com/watch?v=-G44XVVvzr8",
  ),
  v(
    "Ghulam Rasool Kumar of Srinagar keeps age-old tonga tradition alive, runs horse cart since 1965",
    "https://www.youtube.com/watch?v=64tdqH_Wz0g",
  ),
  v(
    "BIG WIN! Phased Regularisation to Begin: Long-Pending Demands of Daily Wagers Finally Met",
    "https://www.youtube.com/watch?v=Ytuy4BylG8E",
  ),
  v(
    "Silence protects harasser, not victim; women commuters seek strict punishment to stop harassment.",
    "https://www.youtube.com/watch?v=vOk_7kMQfr8",
  ),
]);

export const RK_SHORT_NEWS = dedupeById<YoutubeVideo>([
  v(
    "The Last Timekeeper of Srinagar: Mohammad Shafi’s 50-Year Watch Repair Legacy",
    "https://www.youtube.com/shorts/K7UD608ItmQ",
  ),
  v(
    "#Watch: Fishes found Dead in Beehama in Ganderbal Spring, Raise Environmental Concerns",
    "https://www.youtube.com/shorts/12OOxpiodrk",
  ),
]);

