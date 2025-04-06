import { format } from "date-fns";
import { Timestamp } from "firebase/firestore"; // Import if needed

export function toDate(date?: string | Date | Timestamp) {
    if (!date) return "-"; // Handle undefined values

    const parsedDate =
        date instanceof Timestamp ? date.toDate() : // Convert Firebase Timestamp
        typeof date === "string" ? new Date(date) : date // Convert string to Date

    return parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

export function toLabelDate(
  date?: string | Date | Timestamp,
  dayType: "short" | "long" = "short" // default short
): string {

  if (!date) return "-";

  const parsedDate =
    date instanceof Timestamp
      ? date.toDate()
      : typeof date === "string"
        ? new Date(date)
        : date

  return parsedDate
    .toLocaleDateString("id-ID", {
      weekday: dayType,
      day: "numeric",
      month: "short",
    })
    .replace(/(\w{3,}) (\d{1,2}) (\w{3,})/, "$1, $2 $3") // support longer names too
}

export const convertToDateString = (date: string | Date | Timestamp): string => {
    if (date instanceof Timestamp) {
        return new Date(date.seconds * 1000).toISOString().split("T")[0]; // Convert Firestore Timestamp
    }

    if (date instanceof Date) {
        return date.toISOString().split("T")[0]
    }

    return date
} 

export const getAmPmHour = (date?: string | Date | Timestamp) => {
    if (!date) return { hour: "", ampm: "" } // Handle undefined/null case

    let parsedDate: Date;

    if (date instanceof Timestamp) {
        parsedDate = date.toDate()
    } else if (typeof date === "string") {
        parsedDate = new Date(date)
    } else {
        parsedDate = date
    }

    return {
        hour: format(parsedDate, "h"), // Extracts hour (12-hour format)
        ampm: format(parsedDate, "a"), // Extracts AM/PM
    }
}

export const today = () => {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Makassar',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    return formatter.format(new Date()) // returns YYYY-MM-DD
}