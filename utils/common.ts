import { GroupedTransactionType, TransactionWithWalletType } from "@/types";
import { Timestamp } from "@firebase/firestore";
import { LocaleConfig } from "react-native-calendars";

export const getLast7Days = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push({
      day: daysOfWeek[date.getDay()],
      date: date.toISOString().split("T")[0],
      income: 0,
      expense: 0,
    });
  }
  return result.reverse();
  // returns an array of all the previous 7 days
};

export const getLast12Months = () => {
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setDate(1)
    date.setMonth(date.getMonth() - i)

    const monthName = monthsOfYear[date.getMonth()];
    const shortYear = date.getFullYear().toString().slice(-2);
    const formattedMonthYear = `${monthName} ${shortYear}`; // Jan 24, Feb 25
    const formattedDate = date.toISOString().split("T")[0];

    result.push({
      month: formattedMonthYear,
      fullDate: formattedDate,
      income: 0,
      expense: 0,
    });
  }

  // return result;
  return result.reverse();
};

export const getYearsRange = (startYear: number, endYear: number): any => {
  const result = [];
  for (let year = startYear; year <= endYear; year++) {
    result.push({
      year: year.toString(),
      fullDate: `01-01-${year}`,
      income: 0,
      expense: 0,
    });
  }
  // return result;
  return result.reverse();
}

export const calendarConfig = () => {
  return (LocaleConfig.locales['en'] = {
    monthNames: [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthNamesShort: [
      'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 
      'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ],
    dayNames: [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    dayNamesShort: [
      'Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'
    ],
    today: "Today"
  })
}

export const transformTransactions = (transactions: TransactionWithWalletType[]): GroupedTransactionType[] => {
  const grouped: Record<string, GroupedTransactionType> = {};

  transactions.forEach((transaction, index) => {
    const dateObj = transaction.date instanceof Date
      ? transaction.date
      : transaction.date 
        ? (transaction.date as Timestamp).toDate() 
        : new Date()

    const dateStr = dateObj.toISOString().split("T")[0] // Extract YYYY-MM-DD
    // const hourStr = `${dateObj.getHours()}.${String(dateObj.getMinutes()).padStart(2, "0")}` // Extract hour

    if (!grouped[dateStr]) {
      grouped[dateStr] = { 
        title: dateStr, 
        data: [] 
      }
    }

    grouped[dateStr].data.push({
      ...transaction,
      date: dateObj
    })
  })

  return Object.values(grouped).sort((a, b) => (a.title < b.title ? 1 : -1))
}

