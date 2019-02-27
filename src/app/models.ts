// export class ThreadCreate {
//   username: string;
//   tripcode?: string;
//   subject: string;
//   body: string;
//   bump: number;
//   file: File;
// }


export class ThreadItem {
  id: number;
  post_id: number;
  author: string;
  tripcode?: string;
  subject: string;
  body_html: string;
  bump: number;
  is_locked: boolean;
  is_sticky: boolean;
  file_name: string;
  file_original_name: string;
  thumbnail_name: string;
  created: string;
  posts_count: number;
  images_count: number;
}

export class ThreadDetail {
  subject: string;
  is_locked: boolean;
  is_sticky: boolean;
  posts: Post[];
}

export class Post {
  id: number;
  author: string;
  body_html: any;
  tripcode?: string;
  bump: number;
  file_name: string;
  file_original_name: string;
  thumbnail_name: string;
  created: string;
  replies: number[];
}

export class Board {
  id: number;
  title: string;
  uri: string;
}


export class TrendingThread {
  id: number;
  board_uri: string;
  subject: string;
  thumbnail_name: string;
}

export class ReportCreate {
  reason: string;
}

export class PostCreate {
  author: string;
  body: string;
  file: File;
}

export class ThreadCreate extends PostCreate {
  subject: string;
}
