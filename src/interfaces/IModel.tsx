export interface IModel {
  id: number;
  user: string;
  title: string;
  type: string;
  description: string;
  inferences: number;
  ratings: {
    stars: number;
  };
}
