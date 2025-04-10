import { Image } from 'expo-image'
import { useAuth } from '@/contexts/authContext'
import { Dropdown } from 'react-native-element-dropdown'
import { TransactionType, TransactionWithWalletType, WalletType } from '@/types'
import { useEffect, useState } from 'react'
import { colors, radius, spacingX, spacingY } from '@/styles/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createUpdateWallet, deleteWallet } from '@/services/walletService'
import { Alert, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { expenseCategories, incomeCategory, transactionTypes } from '@/constants/data'

import Input from '@/components/Input'
import Header from '@/components/Header'
import Button from '@/components/Button'
import useData from '@/hooks/useData'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import ImageUpload from '@/components/ImageUpload'
import ModalWrapper from '@/components/ModalWrapper'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

import { orderBy, where } from 'firebase/firestore'
import { toIdr } from '@/utils/idrFormater'
import { TouchableOpacity } from 'react-native'
import { toDate } from '@/utils/dateFormater'
import { Trash2 } from 'lucide-react-native'
import { createUpdateTransaction, deleteTransaction } from '@/services/transactionService'
import { deleteAlert } from '@/components/deleteAlert'
import { onAction } from '@/services/globalService'
import { useTheme } from '@/contexts/themeContext'
import { transactionModalStyle } from '@/styles/modals/modalStyles'


const TransactionModal = () => {
    const { user } = useAuth()
    const router = useRouter()
    const ios = Platform.OS == 'ios'

    const { colors } = useTheme()
    const styles = transactionModalStyle(colors)
    
    const params = useLocalSearchParams()
    
    const [isLoading, setIsLoading] = useState(false)
    const [isDatePicker, setIsDatePicker] = useState(false)
    const [transaction, setTransaction] = useState<TransactionWithWalletType>({
        walletId: '',
        walletName: '',
        type: 'expense',
        amount: 0,
        description: '',
        category: '',
        date: new Date(),
        image: null
    })

    const {
        data: walletData, 
        isLoading: walletLoading,
        error: walletError
    } = useData<WalletType>(
        "wallets",
        [
            where("uid", "==", user?.uid),
            orderBy("created", "desc")
        ]
    )


    const selectedTransaction:TransactionWithWalletType = {
        id: params.id as string,
        uid: params.uid as string,
        walletId: params.walletId as string,
        walletName: params.walletName as string,
        type: params.type as "expense" | "income",
        amount: Number(params.amount) || 0,
        category: params.category as string,
        date: params.date as string,
        description: params.description as string,
        image: typeof params.image === "string" ? JSON.parse(params.image) : null
    }

    const onDateChange = (e: DateTimePickerEvent | any, selectedDate: Date | any) =>{
        const currentDate = selectedDate || transaction.date
        setTransaction({
            ...transaction,
            date: currentDate
        })

        setIsDatePicker(ios ? true : false)
    }

    const onSubmit = async() =>{
        const { 
            type,
            amount,
            description,
            category,
            date,
            walletId,
            image
        } = transaction

        if(!walletId || !date || !amount || (type === "expense" && (!category || category == ""))){
            return Alert.alert("Transaction", "Please fill all the require fields!...")
        }

        let transactionData: TransactionType = {
            type,
            amount,
            description,
            category,
            date,
            walletId,
            image,
            uid: user?.uid
        }

        if(selectedTransaction?.id){
            transactionData.id = selectedTransaction.id
        }

        setIsLoading(true)
        const action = await createUpdateTransaction(transactionData)
        setIsLoading(false)

        if(action.success) {
            router.back()
        } else {
            return Alert.alert("Transaction", action.msg)
        }
    }

    const showDeleteAlert = () =>{
        return deleteAlert({
            title: "Confirm",
            desc: "Are you sure to delete this transaction? \nThis action can be undone",
            onConfirm: () => 
                onAction(
                    () => deleteTransaction(selectedTransaction.id!, selectedTransaction.walletId),
                    setIsLoading,
                    () => router.back(),
                    (msg) => Alert.alert("Error", msg)
                ),
        })
    }

    useEffect(() => {
        if(selectedTransaction?.id){
            setTransaction({
                walletId: selectedTransaction.walletId,
                walletName: selectedTransaction.walletName,
                type: selectedTransaction.type,
                amount: selectedTransaction.amount,
                description: selectedTransaction.description || "",
                category: selectedTransaction.category || "",
                date: new Date(selectedTransaction.date as string),
                image: selectedTransaction?.image
            })
        }
    }, [])

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title={`${selectedTransaction?.id ? 'Update' : 'New'} Transaction`}
                    leftIcon={<BackButton/>}
                    style={{marginBottom: spacingY._10}}
                />
                <ScrollView 
                    contentContainerStyle={styles.form}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.inputContainer}>
                        <CustomText 
                            size={verticalScale(16)}
                            color={colors.neutral200}
                        >
                            Amount
                        </CustomText>
                        <Input
                            keyboardType='numeric'
                            value={toIdr(transaction.amount)}
                            onChangeText={(value) => {
                                const numericValue = value.replace(/[^0-9]/g, "")
                                setTransaction({
                                    ...transaction,
                                    amount: numericValue ? Number(numericValue) : 0, 
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.flexRow}>
                            <CustomText 
                                size={verticalScale(16)}
                                color={colors.neutral200}
                            >
                                Label
                            </CustomText>
                            <CustomText 
                                size={verticalScale(14)}
                                color={colors.neutral500}
                            >
                                (optional)
                            </CustomText>
                        </View>
                        <Input
                            value={transaction.description}
                            placeholder='Transaction label'
                            onChangeText={(value) => {
                                setTransaction({
                                    ...transaction,
                                    description: value
                                })
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText 
                            size={verticalScale(16)}
                            color={colors.neutral200}
                        >
                            Type
                        </CustomText>
                        <Dropdown
                            value={transaction.type}
                            activeColor={colors.neutral700}
                            placeholderStyle={styles.dropDownPlaceholder}
                            selectedTextStyle={styles.dropDownSelectedText}
                            iconStyle={styles.dropDownIcon}
                            data={transactionTypes}
                            maxHeight={verticalScale(300)}
                            labelField="label"
                            valueField="value"
                            style={styles.dropDownContainer}
                            itemTextStyle={styles.dropDownText}
                            itemContainerStyle={styles.dropDownItemContainer}
                            containerStyle={styles.dropDownListContainer}
                            onChange={(item) => {
                                setTransaction(prev => ({
                                    ...prev,
                                    type: item.value,
                                    category: item.value === prev.type 
                                        ? prev.category 
                                        : '',
                                }))
                            }}
                            renderItem={(item) => (
                                <View style={styles.dropDownItem}>
                                    <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                                        <item.icon size={18} color="white" style={styles.dropDownIcon} />
                                    </View>
                                    <CustomText style={styles.dropDownText}>{item.label}</CustomText>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <CustomText 
                            size={verticalScale(16)}
                            color={colors.neutral200}
                        >
                            Wallet
                        </CustomText>
                        <Dropdown
                            value={transaction.walletId}
                            activeColor={colors.neutral700}
                            placeholderStyle={styles.dropDownPlaceholder}
                            selectedTextStyle={styles.dropDownSelectedText}
                            iconStyle={styles.dropDownIcon}
                            data={
                                walletData.map((wallet) => ({
                                    label: `${wallet?.name} (${toIdr(wallet.amount)})`,
                                    value: wallet?.id,
                                    image: wallet?.image
                                }))
                            }
                            maxHeight={verticalScale(300)}
                            labelField="label"
                            valueField="value"
                            style={styles.dropDownContainer}
                            itemTextStyle={styles.dropDownText}
                            itemContainerStyle={styles.dropDownItemContainer}
                            containerStyle={styles.dropDownListContainer}
                            placeholder={"Select wallet"}
                            onChange={item => {
                                setTransaction({
                                    ...transaction, 
                                    walletId: item.value || ""
                                })
                            }}

                            renderItem={(item) => (
                                <View style={styles.dropDownItem}>
                                    <Image
                                        source={item.image}
                                        contentFit='cover'
                                        transition={100}
                                        style={styles.iconContainer}
                                    />
                                    <CustomText style={styles.dropDownText}>{item.label}</CustomText>
                                </View>
                            )}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText 
                            size={verticalScale(16)}
                            color={colors.neutral200}
                        >
                            {`${transaction.type === "expense" ? "Expense" : "Income"} Category`}
                        </CustomText>
                        <Dropdown
                            value={transaction.category}
                            activeColor={colors.neutral700}
                            placeholderStyle={styles.dropDownPlaceholder}
                            selectedTextStyle={styles.dropDownSelectedText}
                            iconStyle={styles.dropDownIcon}
                            data={Object.values(transaction.type === "expense" ? expenseCategories : incomeCategory)}
                            maxHeight={verticalScale(300)}
                            labelField="label"
                            valueField="value"
                            style={styles.dropDownContainer}
                            itemTextStyle={styles.dropDownText}
                            itemContainerStyle={styles.dropDownItemContainer}
                            containerStyle={styles.dropDownListContainer}
                            placeholder={"Select category"}
                            onChange={item => {
                                setTransaction({
                                    ...transaction, 
                                    category: item.value || ""
                                })
                            }}
                            renderItem={(item) => (
                                <View style={styles.dropDownItem}>
                                    <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
                                        <item.icon size={18} color="white" style={styles.dropDownIcon} />
                                    </View>
                                    <CustomText style={styles.dropDownText}>{item.label}</CustomText>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <CustomText 
                            size={verticalScale(16)}
                            color={colors.neutral200}
                        >
                            Date
                        </CustomText>
                        {
                            !isDatePicker && (
                                <Pressable
                                    onPress={() => setIsDatePicker(true)}
                                    style={styles.dateInput}
                                >
                                    <CustomText color={colors.neutral200}>
                                        {toDate(transaction.date)}
                                    </CustomText>
                                </Pressable>
                            )
                        }{
                            isDatePicker && (
                                <View style={ ios && styles.iosDatePicker}>
                                    <DateTimePicker
                                        value={transaction.date as Date}
                                        mode='date'
                                        display={ios ? 'spinner' : 'default'}
                                        themeVariant='dark'
                                        textColor={colors.white}
                                        onChange={onDateChange}
                                    />
                                    {
                                        ios && (
                                            <View>
                                                <TouchableOpacity
                                                    onPress={() => setIsDatePicker(false)}
                                                    style={styles.datePickerButton}
                                                >
                                                    <CustomText
                                                        size={verticalScale(16)}
                                                        fontWeight={'500'}
                                                        color={colors.neutral200}
                                                    >
                                                        OK
                                                    </CustomText>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.flexRow}>
                            <CustomText 
                                size={verticalScale(16)}
                                color={colors.neutral200}
                            >
                                Receipt
                            </CustomText>
                            <CustomText 
                                size={verticalScale(14)}
                                color={colors.neutral500}
                            >
                                (optional)
                            </CustomText>
                        </View>
                        <ImageUpload
                            file={transaction?.image}
                            onSelect={(file) => setTransaction({...transaction, image: file})}
                            onClear={() => setTransaction({...transaction, image: null})}
                            placeholder='Upload Image'
                            aspectRatio={[16, 9]} 
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                {
                    selectedTransaction?.id && (
                        <Button
                            onPress={showDeleteAlert}
                            style={styles.deleteButton}
                            variant='delete'
                            isLoading={isLoading}
                        >
                            <Trash2
                                color={colors.white}
                            />
                        </Button>
                    )
                }
                <Button
                    onPress={onSubmit}
                    style={{flex: 1}}
                    isLoading={isLoading}
                >
                    <CustomText
                        color={colors.black}
                        fontWeight={'700'}
                    >
                        {`${selectedTransaction?.id ? 'Update' : 'Add'} Transaction`}
                    </CustomText>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default TransactionModal