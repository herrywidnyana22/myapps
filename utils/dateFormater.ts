import { Timestamp } from "firebase/firestore"; // Import if needed

export function toDate(date?: string | Date | Timestamp) {
    if (!date) return "-"; // Handle undefined values

    const parsedDate =
        date instanceof Timestamp ? date.toDate() : // Convert Firebase Timestamp
        typeof date === "string" ? new Date(date) : date; // Convert string to Date

    return parsedDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}