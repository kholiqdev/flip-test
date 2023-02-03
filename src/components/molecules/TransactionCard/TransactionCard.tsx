import React, {memo} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';

import {Transaction} from '@store/transaction/types';

import {Gap, StatusBadge} from '@components/atoms';
import {SenderBankText} from '@components/molecules/SenderBankText';

export interface TransactionCardProps extends ViewProps {
  data: Transaction;
}

const TransactionCard = memo((props: TransactionCardProps) => {
  const {data, ...baseProps} = props;

  const isTransactionSuccess = data?.status === 'SUCCESS';
  const colorByStatus = isTransactionSuccess ? '#00bb83' : '#f96a53';

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        {
          borderLeftColor: colorByStatus,
        },
      ])}
      {...baseProps}>
      <View
        style={{
          flex: 1,
        }}>
        <SenderBankText
          data={{
            senderBank: data?.sender_bank,
            beneficiaryBank: data?.beneficiary_bank,
          }}
        />
        <Gap height={8} />
        <Text style={styles.infoText} numberOfLines={1}>
          {`-${data?.beneficiary_name}`}
        </Text>
        <Gap height={8} />
        <Text
          style={
            styles.infoText
          }>{`${data?.amount} ● ${data?.completed_at}`}</Text>
      </View>
      <StatusBadge isSuccess={isTransactionSuccess} />
    </View>
  );
});

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderLeftColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderLeftWidth: 12,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 12,
  },
  infoText: {color: '#202020', fontWeight: '600', fontSize: 12},
});
