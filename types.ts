
import { ReactNode } from "react";
import { Timestamp } from "firebase/firestore";
import { LucideIcon } from "lucide-react-native";
import { SharedValue } from "react-native-reanimated";
import {
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { DateData } from "react-native-calendars";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
}

export type ModalWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
  bg?: string;
}

export type accountOptionType = {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  routeName?: any;
}

export type CustomTextProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children?: React.ReactNode;
  style?: TextStyle;
  textProps?: TextProps;
}

export type IconComponent = React.ComponentType<{
  height?: number;
  width?: number;
  strokeWidth?: number;
  color?: string;
  fill?: string;
}>

export type IconProps = {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
  fill?: string;
}

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type BackButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
}

export type TransactionType = {
  id?: string;
  type: "expense" | "income";
  amount: number;
  category?: string;
  date: Date | Timestamp | string;
  description?: string;
  image?: any;
  uid?: string;
  walletId: string;
}

export type TransactionWithWalletType = {
    walletName: string
} & TransactionType

export type CategoryType = {
  label: string;
  value: string;
  icon: LucideIcon;
  bgColor: string;
}

export type TransactionCategoriesType = {
  [key: string]: CategoryType;
}

export type TransactionListType = {
  data: TransactionWithWalletType[];
  variant?: 'default' | 'secondary'
  title?: string;
  isLoading?: boolean;
  emptyListMessage?: string;
}

export type TransactionItemProps = {
  item: TransactionWithWalletType
  index: number;
  onClick: Function;
}

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
}

export interface CustomButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress?: () => void;
  isLoading?: boolean;
  variant?: "primary" | "delete"
  children: React.ReactNode;
}

export type ImageUploadProps = {
  file?: any;
  onSelect: (file: any) => void;
  onClear: () => void;
  containerStyle?: ViewStyle;
  imageStyle?: ViewStyle;
  placeholder?: string;
  aspectRatio?: [number, number] 
}

export type UserType = {
  uid?: string;
  email?: string | null;
  name: string | null;
  image?: any;
} | null;

export type UserDataType = {
  name: string;
  image?: any;
}

export type AuthContextType = {
  user: UserType;
  setUser: Function;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; msg?: string }>;
  updateUserData: (userId: string) => Promise<void>;
}

export type ResponseType = {
  success: boolean;
  data?: any;
  msg?: string;
}

export type WalletType = {
  id?: string;
  name: string;
  amount?: number;
  totalIncome?: number;
  totalExpenses?: number;
  image: any;
  uid?: string;
  created?: Date;
}

export type DeleteAlertType = {
  onConfirm: () => void, 
  title: string, 
  desc: string
}

export type CardType = {
  prevId?: string | null,
  nextId?: string | null,
  title: string,
  totalBalance: number | string | undefined,
  totalIncome: number | string | undefined,
  totalExpense: number | string | undefined,
  isLoading?: boolean
  index: number,
  currentIndex: SharedValue<number>,
  prevIndex: SharedValue<number>
  animateValue: SharedValue<number>
  dataLength: number,
  setCardActiveID: React.Dispatch<React.SetStateAction<string>>,
}

export type VerticalSegmentedControlProps = {
  values: string[]
  selectedValue: string[]
  onChange: (walletName: string) => void
}

export type StatisticType = {
  viewMode: "Calendar" | "Chart"
  range: "Weekly" | "Monthly" | "Yearly"
}

export type CalendarStatType = {
  selectedDay: string
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>,
  data: TransactionWithWalletType[],
  isWithCalendar?: boolean
}

export type DayComponentType = {
    date?: DateData
    state?: 'disabled' | 'selected' | 'inactive' | 'today' | ''
    selectedDay: string
    expenseData: Record<string, number>
    incomeData: Record<string, number>
    onPress: (day: any) => void
}

export type GroupedTransactionType = {
  title: string
  data: TransactionWithWalletType[]
}

export type TransactionItemSecondaryType ={
  item: GroupedTransactionType
  index: number;
  onClick: Function;
}

export type AgendaListType = {
  date: Date | Timestamp | string
  totalAmount: number
  transactionsLength: number
}