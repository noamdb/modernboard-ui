import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Board, Post, ReportCreate, ThreadDetail, ThreadItem, TrendingThread} from './models';
import {catchError, tap} from 'rxjs/internal/operators';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  httpOptions = {
    // Content-Type is text/plain for avoiding pre-flighted OPTIONS request
    headers: new HttpHeaders({'Content-Type': 'text/plain'}),
  };
  boards: Board[];

  constructor(private http: HttpClient, private utilsService: UtilsService) {
  }

  createThread(fd: FormData, board: string): any {
    return this.http.post(`${environment.modernboardUrl}boards/${board}/threads`, fd);
  }

  createPost(fd: FormData, threadID: number): any {
    return this.http.post(environment.modernboardUrl + `boards/threads/${threadID}/posts`, fd);
  }

  reportPost(report: ReportCreate, postID: number): any {
    return this.http.post(environment.modernboardUrl + `boards/threads/posts/${postID}/reports`, report, this.httpOptions);
  }

  getThreads(board: string, page: number): any {
    return this.http.get<ThreadItem[]>(`${environment.modernboardUrl}boards/${board}/threads`,
      {params: {page: page + ''}}).pipe(
      tap(threads => {
        if (!threads) {
          return;
        }
        threads.forEach(t => t.created = this.utilsService.formatDate(t.created));
      }),
      catchError(this.handleError<ThreadItem[]>())
    );
  }

  getThread(id: number): any {
    return this.http.get<ThreadDetail>(`${environment.modernboardUrl}boards/threads/${id}`).pipe(
      tap(thread => {
        thread.posts.forEach(p => p.created = this.utilsService.formatDate(p.created));
      }),
      catchError(this.handleError<ThreadDetail>())
    );
  }

  getBoards(): any {
    if (this.boards === undefined) {
      return this.http.get<Board[]>(`${environment.modernboardUrl}boards`).pipe(
        tap(((boards) => this.boards = boards)),
        catchError(this.handleError<Board[]>())
      );
    } else {
      return of(this.boards);
    }
  }

  getTrending(): any {
    return this.http.get<TrendingThread[]>(`${environment.modernboardUrl}home/trending`).pipe(
      catchError(this.handleError<TrendingThread[]>())
    );
  }

  getPostsAfter(post_id: number): any {
    return this.http.get<Post[]>(`${environment.modernboardUrl}boards/threads/posts/${post_id}/after`).pipe(
      tap(posts => {
        if (!posts) {
          return;
        }
        posts.forEach(p => p.created = this.utilsService.formatDate(p.created));
      }),
      catchError(this.handleError<Post[]>())
    );
  }


  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

