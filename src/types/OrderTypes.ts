// types/orderTypes.ts
export interface Order {
    id: number;
    state: string;
    description?: string;
    orderAddress?: string;
  }
  