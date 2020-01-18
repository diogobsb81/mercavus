import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Hobbies, User } from './user';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: [ './user-list.component.css' ]
})
export class UserListComponent implements OnInit {
	userForm: FormGroup;
	hobbieForm: FormGroup;
	constructor(private http: HttpClient, private fb: FormBuilder, private dataService: DataService) {}
	public hobbies: Hobbies[] = [];
	public users: User[] = [];
	public selectedUser: User;
	public selectedHobbie: Hobbies;
	public inactive: boolean;
	public passionList: {} = {};
	public showHobbies: boolean;
	ngOnInit() {
		this.userForm = this.fb.group({
			name: [ '', Validators.required ]
		});
		this.hobbieForm = this.fb.group({
			name: [ { value: '', disabled: true }, Validators.required ],
			passionLevel: [ { value: '', disabled: true }, Validators.required ],
			year: [ { value: 0, disabled: true }, Validators.required ]
		});
		this.getUser();
		this.passionList = [ 'low', 'Medium', 'High', 'Very-High' ];
		this.selectedUser = new User();
	}
	resetForm() {
		this.hobbieForm.reset();
		this.hobbieForm.disable();
	}
	addUser() {
		this.selectedUser = new User();
		this.hobbies = [];
		this.resetForm();
		this.selectedUser.name = this.userForm.get('name').value;
		try {
			this.dataService.addUser(this.selectedUser).subscribe((result) => {
				if (result) {
					this.getUser();
				}
			});
		} catch (error) {
			console.log(error);
		}
		this.userForm.reset();
	}

	addHobbie() {
		this.selectedHobbie = new Hobbies();
		this.selectedHobbie.userId = this.selectedUser._id;
		this.selectedHobbie.name = this.hobbieForm.get('name').value;
		this.selectedHobbie.passionLevel = this.hobbieForm.get('passionLevel').value;
		this.selectedHobbie.year = this.hobbieForm.get('year').value;
		this.dataService.addHobbie(this.selectedHobbie).subscribe((result) => {
			if (result) {
				this.userDetails(this.selectedUser);
			}
		});
		this.hobbieForm.reset();
	}

	getUser() {
		this.dataService.getUser().subscribe((result) => {
			this.users = result;
		});
	}

	userDetails(user: User) {
		this.hobbies = [];
		this.dataService.userDetails(user).subscribe((result) => {
			if (result) {
				this.hobbies = result;
			} else {
				this.hobbies = [];
			}
			this.selectedUser._id = user._id;
			this.selectedUser.name = user.name;
			this.inactive = true;
			this.hobbieForm.enable();
		});
	}
	removeHobbie(id: String) {
		this.dataService.removeHobbie(id).subscribe((result) => {
			this.userDetails(this.selectedUser);
		});
	}
}
