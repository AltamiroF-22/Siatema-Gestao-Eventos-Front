export interface Event {
  id?: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  main_image: null | string;
  other_images?: string[];
  organizer_id?: number;
  created_at?: Date;
  updated_at?: Date;
}
