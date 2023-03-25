export interface TypographyPropsTypes {
  className?: string;
  color?: 'primary' | 'secondary';
  children?: any;
  component?: any;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  count: number;
  owners: Array<string>;
  picture: string;
  bid: number;
  startTime?: number;
  endTime?: number;
  minBidPrice?: number;
};
