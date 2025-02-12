"use client";

import dynamic from "next/dynamic";

const TextRevealCard = dynamic(
  () => import("./text-reveal").then((mod) => mod.TextRevealCard),
  { ssr: false }
);
const TextRevealCardTitle = dynamic(
  () => import("./text-reveal").then((mod) => mod.TextRevealCardTitle),
  { ssr: false }
);
const TextRevealCardDescription = dynamic(
  () => import("./text-reveal").then((mod) => mod.TextRevealCardDescription),
  { ssr: false }
);

export { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription };
