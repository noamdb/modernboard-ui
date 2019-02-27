import {Post, ThreadItem} from '../models';

export class UserLoginGet {
  id: number;
  role: string;
}

export class UserCreate {
  name: string;
  password: string;
  role: string;
}

export class UserLogin {
  name: string;
  password: string;
}

export class LoggedUser {
  id: number;
  role: string;
}

export class UserItem {
  id: number;
  name: string;
  role: string;
  created: string;
}

export class BoardUser extends UserItem{

}

export class BoardCreate {
  title: string;
  uri: string;
  priority: number;
}

export class ManagementPost extends Post {
  author_id: string;
  author_id_color: string;
  reports: Report[];
}

export class ManagementThreadItem extends ThreadItem {
  author_id: string;
  author_id_color: string;
  reports: Report[];
}

export class Report {
  id: number;
  author_id: string;
  author_id_color: string;
  reason: string;
  created: string;
}

export class ManagementThreadDetail {
  subject: string;
  is_locked: boolean;
  is_sticky: boolean;
  posts: ManagementPost[];
}

export class ReportedPost {
  id: number;
  thread_id: number;
  subject: string;
  author: string;
  author_id: string;
  author_id_color: string;
  body_html: any;
  tripcode?: string;
  bump: number;
  file_name: string;
  file_original_name: string;
  thumbnail_name: string;
  created: string;
  board_uri: string;
  is_op: boolean;
  reports: Report[];
}
