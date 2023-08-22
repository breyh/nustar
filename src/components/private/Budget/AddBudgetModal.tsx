import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CheckIcon, Select } from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import InputIconContainer from '../../common/InputIconContainer/InputIconContainer'
import NustarButton from '../../common/NustarButton/NustarButton'
import NustarInputController from '../../common/NustarInputController/NustarInputController'
import SimpleModal from '../../common/SimpleModal/SimpleModal'
import { IAddTransactionField, ICategoryInterface } from './Budget'
import { useForm } from 'react-hook-form'
import { useAddTransactionMutation } from '../../../services/gim/user/user'
import { useSelector } from 'react-redux'
import { IAppState } from '../../../store/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

const AddBudgetModal = ({ type, onClose, categories, onAddTransaction }) => {
    const profile = useSelector((state: IAppState) => state?.user?.profile);
    const [categorySelected, setCategorySelcted] = useState<string>('');
    const [date, setDate] = useState(dayjs());
    const [addTransaction, { isLoading: transactionLoading }] = useAddTransactionMutation();
    const { handleSubmit, control } = useForm<IAddTransactionField>({ mode: 'all' });

    const onChange = (event, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setDate(dayjs(currentDate));
    };

    const addTransactionHandler = async (formData: IAddTransactionField) => {
        try {
            const transaction = {
                ...formData,
                category: categorySelected,
                type,
                date,
            }
            const transactionResponse = await addTransaction({ transaction, id: profile?.id }).unwrap();
            onAddTransaction(transactionResponse);
            onClose();
        } catch (error) {
            console.error(`Could not set a payment- error: ${error}`);
        }
    };

    return (
        <SimpleModal isOpen title={`Add new ${type}`} onClose={onClose}>
            <NustarInputController
                control={control}
                name="amount"
                inputProps={{
                    placeholder: 'Put the amount',
                    InputLeftElement: (
                        <InputIconContainer>
                            <FontAwesome5 name="money-bill-wave-alt" size={24} color="green" />
                        </InputIconContainer>
                    ),
                    testID: 'amount-input',
                    keyboardType: 'numeric'
                }}
                rules={{
                    minLength: {
                        value: 1,
                        message: 'Minimum length to name is 1 character',
                    },
                }}
            />
            <NustarInputController
                control={control}
                name="description"
                inputProps={{
                    placeholder: 'Set the description',
                    InputLeftElement: (
                        <InputIconContainer>
                            <MaterialIcons name="description" size={24} color="black" />
                        </InputIconContainer>
                    ),
                    testID: 'description-input',
                    numberOfLines: 4
                    
                }}
                rules={{
                    required: `You have to put a description to have control of your ${String(type).toLowerCase()}`,
                    minLength: {
                        value: 5,
                        message: 'Minimum length to name is 5 character',
                    },
                }}
            />
            <View style={{
                display: 'flex',
                width: '100%',
            }}>
               <Text>Date: {dayjs().format('DD-MMMM-YYYY')} or put it manually</Text>
            </View>
            <Select
                selectedValue={categorySelected}
                accessibilityLabel="Choose categorie"
                placeholder="Choose categorie"
                _selectedItem={{
                    bg: "teal.400",
                    endIcon: <CheckIcon size="5" />
                }}
                mt={1}
                onValueChange={(itemValue) => setCategorySelcted(itemValue)}
                style={[styles.select]}
                my={2}
            >
                {categories?.map((select: ICategoryInterface) => (
                    <Select.Item label={select?.label} value={select?.key} key={select.label} />
                ))}
            </Select>
            <NustarButton onPress={handleSubmit(addTransactionHandler)} isLoading={transactionLoading}>
                <Text>Add</Text>
            </NustarButton>
        </SimpleModal>
    )
}

export default AddBudgetModal

const styles = StyleSheet.create({
    select: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 7,
        marginVertical: 10,
    }
})