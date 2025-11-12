import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Twitter-style timestamps
export const getTimestamp = (timestamp: string) => {
  const now = dayjs();
  const postTime = dayjs(timestamp);
  const diffMinutes = now.diff(postTime, "minute");
  const diffHours = now.diff(postTime, "hour");
  const diffDays = now.diff(postTime, "day");

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return postTime.format("MMM D"); // "Nov 11"
};

export const getLongTimeStamp = (date: string) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-NG", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(newDate);
};
