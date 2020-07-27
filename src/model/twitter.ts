export interface Tweet {
  id: string;
  images: string[];
  author: string;
  fetchedAt: Date;
  approvedAt?: Date;
}
