import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Song } from 'src/shared/song';
@Injectable({ providedIn: 'root' })
export class SongService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  addSong(song: Song): Observable<any> {
    return this.http
      .post<Song>(
        'http://localhost:3000/api/create',
        song,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Song>('Add Song')));
  }
  getSong(id: string): Observable<Song[]> {
    return this.http
      .get<Song[]>('http://localhost:3000/api/read/' + id)
      .pipe(
        tap((_) => console.log(`Song fetched: ${id}`)),
        catchError(this.handleError<Song[]>(`Get Song id=${id}`))
      );
  }
  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>('http://localhost:3000/api').pipe(
      tap((songs) => console.log('Songs fetched!')),
      catchError(this.handleError<Song[]>('Get Songs', []))
    );
  }
  updateSong(id: string, song: Song): Observable<any> {
    return this.http
      .put(
        'http://localhost:3000/api/update/' + id,
        song,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Song updated: ${id}`)),
        catchError(this.handleError<Song[]>('Update Song'))
      );
  }
  deleteSong(id: string): Observable<Song[]> {
    return this.http
      .delete<Song[]>(
        'http://localhost:3000/api/delete/' + id,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`Song deleted: ${id}`)),
        catchError(this.handleError<Song[]>('Delete Song'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}