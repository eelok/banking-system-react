export interface Account {
  id: number;
  fullName: string;
  iban: string;
  currency: string;
  balance: number;
  withdrawPerDayLimit: number;
}