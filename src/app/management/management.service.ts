import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {
  BoardCreate,
  BoardUser, LoggedUser,
  ManagementThreadDetail,
  ManagementThreadItem,
  ReportedPost,
  UserCreate, UserItem,
  UserLogin,
  UserLoginGet
} from './management-models';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/internal/operators';
import {Board} from '../models';
import {UtilsService} from '../utils.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ManagementService {
  httpOptions = {
    // Content-Type is text/plain for avoiding pre-flighted OPTIONS request
    headers: new HttpHeaders({'Content-Type': 'text/plain'}),
    // allow sharing cookies across domains
    withCredentials: true
  };
  boards: Board[];

  constructor(private http: HttpClient, private router: Router, private utilsService: UtilsService) {
  }


  login(user: UserLogin): Observable<UserLoginGet> {
    return this.http.post<UserLoginGet>(`${environment.modernboardUrl}users/login`,
      user, this.httpOptions).pipe(
      tap(u => localStorage['user'] = JSON.stringify({role: u.role, id: u.id})),
      catchError(this.handleError<UserLoginGet>())
    );
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${environment.modernboardUrl}users/logout`,
      null, this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  createUser(user: UserCreate): Observable<void> {
    return this.http.post<void>(`${environment.modernboardUrl}users/register`,
      user, this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  createBoard(board: BoardCreate): Observable<BoardCreate> {
    this.boards = undefined;
    return this.http.post<BoardCreate>(`${environment.modernboardUrl}boards`,
      board, this.httpOptions).pipe(
      catchError(this.handleError<BoardCreate>())
    );
  }

  GetBoards(): Observable<Board[]> {
    return this.boards ? of(this.boards) : this.http.get<Board[]>(`${environment.modernboardUrl}boards/manage`,
      this.httpOptions).pipe(
      tap(b => this.boards = b),
      catchError(this.handleError<Board[]>()));
  }

  getThreads(board: string, page: number): any {
    return this.http.get<ManagementThreadItem[]>(`${environment.modernboardUrl}boards/${board}/threads/manage`,
      {...this.httpOptions, ...{params: {page: page + ''}}}).pipe(
      tap(threads => {
        if (!threads) {
          return;
        }
        threads.forEach(t => {
          t.created = this.utilsService.formatDate(t.created);
          t.author_id_color = this.utilsService.stringToColor(t.author_id);
        });
      }),
      catchError(this.handleError<ManagementThreadItem[]>())
    );
  }

  getThread(id: number): any {
    return this.http.get<ManagementThreadDetail>(`${environment.modernboardUrl}boards/threads/${id}/manage`,
      this.httpOptions).pipe(
      tap(thread => {
        thread.posts.forEach(p => {
          p.created = this.utilsService.formatDate(p.created);
          p.author_id_color = this.utilsService.stringToColor(p.author_id);
        });
      }),
      catchError(this.handleError<ManagementThreadDetail>())
    );
  }

  dismissReport(id: number): Observable<void> {
    return this.http.delete<any>(`${environment.modernboardUrl}boards/threads/posts/reports/${id}`,
      this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  toggleLockThread(id: number): Observable<void> {
    return this.http.post<any>(`${environment.modernboardUrl}boards/threads/${id}/lock`, null,
      this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  toggleStickyThread(id: number): Observable<void> {
    return this.http.post<any>(`${environment.modernboardUrl}boards/threads/${id}/stick`, null,
      this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  changePassword(old_password: string, new_password: string): Observable<void> {
    return this.http.post<any>(`${environment.modernboardUrl}users/changePassword`, {old_password, new_password},
      this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  deleteThread(id: number): Observable<void> {
    return this.http.delete<any>(`${environment.modernboardUrl}boards/threads/${id}`,
      this.httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.modernboardUrl}boards/threads/posts/${id}`,
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  banPoster(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${environment.modernboardUrl}ban/posts/${id}`, {reason},
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  banIP(ip: string, reason: string): Observable<void> {
    return this.http.post<void>(`${environment.modernboardUrl}ban/ip`, {ip, reason},
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  getReportedPosts(page: number): any {
    return this.http.get<ReportedPost[]>(`${environment.modernboardUrl}boards/threads/posts/reports`,
      {...this.httpOptions, ...{params: {page: page + ''}}}).pipe(
      tap(posts => {
        if (!posts) {
          return;
        }
        posts.forEach(p => {
          p.created = this.utilsService.formatDate(p.created);
          p.author_id_color = this.utilsService.stringToColor(p.author_id);
        });
      }),
      catchError(this.handleError<ReportedPost[]>())
    );
  }

  getUsers(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(`${environment.modernboardUrl}users`,
      this.httpOptions).pipe(
      tap(users => users.forEach(u => u.created = this.utilsService.formatDate(u.created))),
      catchError(this.handleError<UserItem[]>())
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.modernboardUrl}users/${id}`,
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  getBoardUsers(uri: string): Observable<BoardUser[]> {
    return this.http.get<BoardUser[]>(`${environment.modernboardUrl}boards/${uri}/users`,
      this.httpOptions).pipe(
      tap(users => users.forEach(u => u.created = this.utilsService.formatDate(u.created))),
      catchError(this.handleError<BoardUser[]>())
    );
  }


  createBoardUser(uri: string, name: string): Observable<void> {
    return this.http.post<void>(`${environment.modernboardUrl}boards/${uri}/users`, {name},
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  deleteBoardUser(uri: string, id: number): Observable<void> {
    return this.http.delete<void>(`${environment.modernboardUrl}boards/${uri}/users/${id}`,
      this.httpOptions).pipe(
      catchError(this.handleError<void>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error(error);
      if (error.status === 401) {
        this.router.navigate([`/management/login`]);

      }
      return throwError(error);
      // return of(result as T);
    };
  }

  getLoggedUser(): LoggedUser {
    try {
      return JSON.parse(localStorage['user']);
    } catch (e) {
      this.router.navigate([`/management/login`]);
    }
  }
}
