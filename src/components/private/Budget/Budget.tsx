import { Dayjs } from "dayjs";
import { Text, Spinner } from "native-base";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector, useDispatch } from "react-redux";
import { useAllCategoriesQuery, useTransactionsByIdQuery } from "../../../services/gim/user/user";
import { ITransaction } from "../../../store/features/user/types";
import { addCategoriesData } from "../../../store/features/user/userSlice";
import { IAppState } from "../../../store/types";
import NustarButton from "../../common/NustarButton/NustarButton";
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import { SwipeListView } from 'react-native-swipe-list-view';
import TransactionItem from "../../common/Transaction/TransactionItem";
import AddBudgetModal from "./AddBudgetModal";

export interface ICategoryInterface {
    key: string;
    esLabel: string;
    label: string;
    type: string;
}

export interface IAddTransactionField {
    amount: number;
    description: string;
    category: string;
    date: Dayjs | Date;
}

const Budget = () => {
    const profile = useSelector((state: IAppState) => state?.user?.profile);
    const transactions = useSelector((state: IAppState) => state?.user?.transactions);
    const categories = useSelector((state: IAppState) => state?.user?.miscellaneous?.categories);
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [categoriesData, setCategoriesData] = useState<ICategoryInterface[]>([]);
    const { data: selectData } = useAllCategoriesQuery();
    const { data, isFetching, currentData } = useTransactionsByIdQuery(String(profile?.id));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addCategoriesData(selectData))
    }, [selectData]);

    useEffect(() => {
        const _categories = (categories || selectData)?.filter((category: ICategoryInterface) => category.type?.toLowerCase() === type?.toLowerCase());
        setCategoriesData(_categories);
    }, [type]);

    const openHandler = (type: 'Income' | 'Expense') => {
        setOpen(true);
        setType(type);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ marginTop: 70, paddingHorizontal: 10, flex: 1, }}>
                {open ? (
                    <AddBudgetModal
                        categories={categoriesData}
                        onClose={() => setOpen(false)}
                        onAddTransaction={(response) => console.log(response)}
                        type={type}
                    />
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <NustarButton style={{ width: '45%' }} primary onPress={() => openHandler('Income')}>
                        <Text>Income {' '} <Entypo name="add-to-list" /> </Text>
                    </NustarButton>
                    <NustarButton style={{ width: '45%' }} onPress={() => openHandler('Expense')}>
                        <Text>Expense {' '} <Octicons name="diff-removed" /> </Text>
                    </NustarButton>
                </View>
                {isFetching ? <Spinner /> : null}
                <SwipeListView
                    style={{
                        marginTop: 10,
                    }}
                    data={data || currentData}
                    renderItem={(data) => <TransactionItem transaction={data.item as ITransaction} />}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}>
                                {/* TODO  */}
                                <Text>Edit</Text>
                                <Text>transaction</Text>
                            </View>
                            <View style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}>
                                {/* TODO  */}
                                <Text>Delete</Text>
                                <Text>transaction</Text>
                            </View>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </View>
        </SafeAreaView>
    );
};

export default Budget;
