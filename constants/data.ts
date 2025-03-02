import { accountOptionType, CategoryType, ExpenseCategoriesType } from "@/types";
import { colors } from "./themes";
import { 
  ShoppingCart, 
  House, 
  Hammer, 
  CarFront, 
  Clapperboard,
  UtensilsCrossed, 
  HeartPulse, 
  ShieldUser, 
  PiggyBank, 
  Shirt, 
  User, 
  Ellipsis, 
  DollarSign,
  Power, 
  Settings,
  FolderKey,
} from "lucide-react-native"

export const accountOption: accountOptionType[] = [
  {
    title: 'Edit Profile',
    icon: User,
    routeName: '/(modals)/profileModal',
    bgColor: '#6366f1'
  }, {
    title: 'Setting',
    icon: Settings,
    bgColor: '#059669'
  }, {
    title: 'Privacy & Policy',
    icon: FolderKey,
    bgColor: colors.neutral600
  }, {
    title: 'Logout',
    icon: Power,
    bgColor: '#e11d48'
  }, 
]

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Groceries",
    value: "groceries",
    icon: ShoppingCart,
    bgColor: "#4B5563", // Deep Teal Green
  },
  rent: {
    label: "Rent",
    value: "rent",
    icon: House,
    bgColor: "#075985", // Dark Blue
  },
  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: Hammer,
    bgColor: "#ca8a04", // Dark Golden Brown
  },
  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: CarFront,
    bgColor: "#b45309", // Dark Orange-Red
  },
  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: Clapperboard,
    bgColor: "#0f766e", // Darker Red-Brown
  },
  dining: {
    label: "Dining",
    value: "dining",
    icon: UtensilsCrossed,
    bgColor: "#be185d", // Dark Red
  },
  health: {
    label: "Health",
    value: "health",
    icon: HeartPulse,
    bgColor: "#e11d48", // Dark Purple
  },
  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: ShieldUser,
    bgColor: "#404040", // Dark Gray
  },
  savings: {
    label: "Savings",
    value: "savings",
    icon: PiggyBank,
    bgColor: "#065F46", // Deep Teal Green
  },
  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: Shirt,
    bgColor: "#7c3aed", // Dark Indigo
  },
  personal: {
    label: "Personal",
    value: "personal",
    icon: User,
    bgColor: "#a21caf", // Deep Pink
  },
  others: {
    label: "Others",
    value: "others",
    icon: Ellipsis,
    bgColor: "#525252", // Neutral Dark Gray
  },
};

export const incomeCategory: CategoryType = {
  label: "Income",
  value: "income",
  icon: DollarSign,
  bgColor: "#16a34a", // Dark
};

export const transactionTypes = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];
