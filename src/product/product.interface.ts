export interface Product {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly image_url: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}
