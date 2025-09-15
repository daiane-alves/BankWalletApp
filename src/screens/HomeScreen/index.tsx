import React from 'react';
import { Button, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useHomeData } from './hooks/useHomeData';

export default function HomeScreen() {
  const { user, locale, bal, txs, isLoading, nav, handleClick } = useHomeData();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {' '}
      <Text style={{ fontSize: 18 }}>Olá, {user?.name ?? 'usuário'}</Text>{' '}
      <Text style={{ fontSize: 14, color: '#555' }}>
        {' '}
        Idioma do aparelho: {locale ?? '...'}{' '}
      </Text>{' '}
      <Text style={{ fontSize: 22, fontWeight: '700' }}>
        {' '}
        Saldo:{' '}
        {bal?.balance != null
          ? bal.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          : '—'}{' '}
      </Text>{' '}
      <Text style={{ marginTop: 8, fontWeight: '600' }}>Transações</Text>{' '}
      <FlatList
        data={txs ?? []}
        keyExtractor={t => t.id}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              nav.navigate(
                'TransactionDetails' as never,
                { id: item.id } as never,
              )
            }
            style={{
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#eee',
            }}
          >
            {' '}
            <Text style={{ fontWeight: '600' }}>
              {item.description ?? item.type}
            </Text>{' '}
            <Text>
              {' '}
              {new Date(item.date).toLocaleString('pt-BR')} •{' '}
              {item.type === 'debit' ? '-' : '+'}{' '}
              {Math.abs(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}{' '}
            </Text>{' '}
            {item.cardLast4 && <Text>Cartão •••• {item.cardLast4}</Text>}{' '}
          </TouchableOpacity>
        )}
      />{' '}
      <Button title="Bloquear agora" onPress={() => handleClick()} />{' '}
    </View>
  );
}
