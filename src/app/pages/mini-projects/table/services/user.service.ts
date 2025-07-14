import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://randomuser.me/api/';

  fetchUsers(count: number) {
    const url = `${this.apiUrl}?results=${count}&nat=us,gb,ca`;
    return this.http.get<{ results: any[] }>(url).pipe(
      map((response) => response.results),
      catchError((error) => {
        console.error('fetchUsers error:', error);
        return of([]);
      })
    );
  }
}
