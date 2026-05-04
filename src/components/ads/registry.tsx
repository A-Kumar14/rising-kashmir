import type { ComponentType } from "react";
import {
  AdArticleNative,
  AdLeaderboardGeneric,
  AdLeaderboardHome,
} from "./sample-creatives";

const SAMPLE_ADS: Record<string, ComponentType> = {
  "home-mid-1": AdLeaderboardHome,
  "article-inline-1": AdArticleNative,
};

export function getSampleAd(slot: string): ComponentType {
  return SAMPLE_ADS[slot] ?? AdLeaderboardGeneric;
}
