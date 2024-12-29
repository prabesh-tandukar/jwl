export interface FilterOptions {
  categories: string[];
  collections: string[];
  availability: boolean;
  princeRange: {
    min: number;
    max: number;
  };
}
