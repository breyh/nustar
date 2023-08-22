import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { View, Text } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { PrivateNavigationScreen } from "../../../navigation/types";
import { ITransaction } from "../../../store/features/user/types";
import { IAppState } from "../../../store/types";
import { Colors } from "../../../utils/Colors";
import NustarButton from "../../common/NustarButton/NustarButton";


const Home = ({ navigation }: any) => {
    const profile = useSelector((state: IAppState) => state?.user?.profile)
    const transactions = useSelector((state: IAppState) => state?.user?.transactions);
    const [incomes, setIncomes] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const information = [{
        title: 'Incomes',
        color: Colors.paynesGray,
        amount: incomes,
        type: 'incomes',
    }, {
        title: 'Expenses',
        color: Colors.tiffanyBlue,
        amount: expenses,
        type: 'expenses',
    }];

    useEffect(() => {
        setIncomes(getIncomes || 0);
        setExpenses(getExpenses || 0);
    }, [])

    const getCurrentMonthTransationAmount = transactions?.filter((transaction) => dayjs(transaction.date).month === dayjs().month)

    const getIncomes = getCurrentMonthTransationAmount?.filter((transaction) => transaction.type === 'income')?.reduce((a: any, b: ITransaction) => a?.amount + b?.amount, 0)
    const getExpenses = getCurrentMonthTransationAmount?.filter((transaction) => transaction.type === 'expense')?.reduce((a: any, b: ITransaction) => a?.amount + b?.amount, 0)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkBackground }}>
            <View style={{ marginTop: 70, paddingHorizontal: 10, flex: 1, }}>
                <View marginY={3}>
                    <Text fontSize="lg">Welcome {profile?.nickName || profile?.firstName}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {information?.map((section) => {
                        const isIncome = section.title === 'Incomes';
                        const textColor = isIncome ? 'white' : 'black'
                        return (
                        <View style={{ width: '48%' }} key={section.title}>
                            <View style={[styles.boxContainer, {
                                backgroundColor: section?.color,
                            }]}>
                                <View style={styles.title}>
                                    <Text fontSize="lg" color={textColor}>{section?.title}</Text>
                                </View>
                                <View>
                                    <Text color={textColor}>
                                        {section?.amount ? `In this month you have registered ${section?.amount}` : 'You have not registered any for this month' }
                                    </Text>
                                </View>
                            </View>
                            <NustarButton
                                primary={isIncome}
                                onPress={() => navigation.navigate(PrivateNavigationScreen.BUDGET, {
                                    filter: section?.type
                                })}
                            >
                                <Text color={textColor}> Go to {section.title} </Text>
                            </NustarButton>
                        </View>
                    )})}
                </View>
                <View>
                    <Text size="xl">Your categories </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    boxContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        padding: 10
    },
    title: {
        width: '100%',
    }
});
