import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { tap } from 'rxjs';
import { User } from '../../../models';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user-details.component.html',
})
export default class UserComponent implements OnInit {
  user = signal<User | undefined>(undefined);

  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      if (id > 0) {
        this.userService
          .getById(id)
          .pipe(tap((user) => this.user.set(user)))
          .subscribe();
      }
    });
  }
}
