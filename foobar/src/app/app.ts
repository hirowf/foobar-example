import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './service/user.types';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  userService = inject(UserService);
  users: User[] = [];
  filteredUsers: User[] = [];

  userForm = new FormGroup({
    name: new FormControl<string>(''),
  });
  
  searchName() {
    const searchTerm = this.userForm.controls.name.value?.toLowerCase() ?? '';

    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm)
    );
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: u => {
        this.users = u;
        this.filteredUsers = u;
      },
    });
  }
}

