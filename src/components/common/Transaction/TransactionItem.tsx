import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ITransaction } from '../../../store/features/user/types'
import { theme } from 'native-base';
import { capitalizeString } from '../../../utils/format';

export interface ITransactionItemProp {
    transaction: ITransaction;
}

const TransactionItem: React.FC<ITransactionItemProp> = ({transaction}) => {
const isIncome = transaction.type.toLowerCase() === 'Income'.toLowerCase();
  return (
    <View style={[styles.item, {
        backgroundColor: isIncome ? theme.colors.green[500] : theme.colors.orange[300],
    }]}
        key={transaction?.amount + Math.random() * 999}>
        <View>
            <Text>{capitalizeString(transaction?.type)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{capitalizeString(transaction?.description)}</Text>
            <Text>${transaction?.amount}</Text>
        </View>
    </View>
  )
}

export default TransactionItem

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    },
});