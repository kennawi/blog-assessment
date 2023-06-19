export interface Post {
  [x: string]: string | number | undefined;
  id: number;
  userId: number;
  title: string;
  body: string;
  date?: string;

  author?: string;
}
