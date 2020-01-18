import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { User } from './user-list/user';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	public headers = new HttpHeaders().set('Content-Type', 'application/json');
	constructor(private http: HttpClient) {}

	addUser(user) {
		const url = 'http://LRWS401:5000/users';
		return this.http
			.post(url, JSON.stringify(user), { headers: this.headers })
			.pipe(
				tap((result: any) => console.log('server data:', result.length)),
				map((result) => (result ? result : null))
			);
	}
	addHobbie(hobbie) {
		const url = 'http://LRWS401:5000/hobbies';
		return this.http
			.post(url, JSON.stringify(hobbie), { headers: this.headers })
			.pipe(
				tap((result: any) => console.log('server data:', result.length)),
				map((result) => (result ? result : null))
			);
	}
	getUser() {
		const url = 'http://lrws401:5000/users/info';
		return this.http
			.get<any>(url)
			.pipe(
				tap((result) => console.log('server data:', result.length)),
				map((result) => (result ? result : null))
			);
	}

	userDetails(user: User) {
		const url = `http://lrws401:5000/hobbies/${user._id}`;
		return this.http
			.get(url, { headers: this.headers })
			.pipe(
				tap((result: any) => console.log('server data:', result ? result.length : null)),
				map((result) => (result ? result : null))
			);
	}

	removeHobbie(id: String) {
		const url = `http://lrws401:5000/hobbies/${id}`;
		return this.http
			.delete(url, { headers: this.headers })
			.pipe(
				tap((result: any) => console.log('server data:', result.length)),
				map((result) => (result ? result : null))
			);
	}
}
