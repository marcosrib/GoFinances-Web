import React, { useState, useEffect } from 'react';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';
import formatStringToDateAndMinute from '../../utils/formatDate';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions');
      const { transactions, balance } = response.data;

      const transacionsFormated = transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue:
            transaction.type === 'outcome'
              ? ` - ${formatValue(transaction.value)}`
              : formatValue(transaction.value),
          formattedDate: formatStringToDateAndMinute(transaction.created_at),
        }),
      );

      const balanceFormated = {
        income: formatValue(balance.income),
        outcome: formatValue(balance.outcome),
        total: formatValue(balance.total),
      };
      setTransactions(transacionsFormated);
      setBalance(balanceFormated);
      console.log(transactions);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transacion => (
                <tr key={transacion.id}>
                  <td className="title">{transacion.title}</td>
                  <td className={transacion.type}>
                    {transacion.formattedValue}
                  </td>
                  <td>{transacion?.category?.title}</td>
                  <td>{transacion.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
