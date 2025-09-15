import React from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useTransactionDetails } from './hooks/useTransactionDetails';

export default function TransactionDetailsScreen() {
  const { data, isLoading, isError, goBack } = useTransactionDetails();

  if (isLoading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator />
        <Text>Carregando transação…</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', gap:8 }}>
        <Text>Não foi possível carregar os detalhes.</Text>
        <Button title="Voltar" onPress={goBack} />
      </View>
    );
  }

  return (
    <View style={{ flex:1, padding:16, gap:8 }}>
      <Text style={{ fontSize:20, fontWeight:'700' }}>{data.description ?? data.type}</Text>
      <Text>
        Valor: {data.amount.toLocaleString('pt-BR', { style:'currency', currency:'BRL' })} ({data.type})
      </Text>
      <Text>Data: {new Date(data.date).toLocaleString('pt-BR')}</Text>
      {data.merchant && <Text>Estabelecimento: {data.merchant}</Text>}
      {data.category && <Text>Categoria: {data.category}</Text>}
      {data.cardLast4 && <Text>Cartão: •••• {data.cardLast4}</Text>}
      {data.status && <Text>Status: {data.status}</Text>}
      {data.authCode && <Text>Código de autorização: {data.authCode}</Text>}

      <View style={{ marginTop:16 }}>
        <Button title="Voltar" onPress={goBack} />
      </View>
    </View>
  );
}