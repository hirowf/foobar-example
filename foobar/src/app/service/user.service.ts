import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.types";

@Injectable()
export class UserService {
    http = inject(HttpClient)

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
    }
}