export interface IModel {
  id: number;
  user: string;
  title: string;
  inferences: number;
  ratings: {
    stars: number;
  };
}
