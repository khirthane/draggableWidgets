export type StockTrade = {
  s: string; // Symbol
  p: number; // Price
  t: number; // Timestamp (Unix milliseconds)
  v: number; // Volume
  c: string[]; // Trade conditions (optional)
};

export type wsMessage = {
  type: WebSocketMessageType;
  data: StockTrade[];
};

export type StockData = {
  symbol: string;
  price: number;
  timestamp: number;
  volume: number;
  tradeConditions: string[];
};

export type WebSocketMessage = {
  type: WebSocketMessageType;
  data: StockData[];
};

export enum WebSocketMessageType {
  TRADE = 'trade',
  PING = 'ping',
  ERROR = 'error',
}
