import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private router: Router) {}

  socket: any;

  connect = (): void => {
    this.socket = io('http://localhost:3000');
  };

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data) {
    this.socket.emit(eventName, data);
  }

  createRoom(userId: string) {
    this.socket.emit('create', userId);
  }

  baseLogout = (url): void => {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([url]);
  };

  getMessages = () => {
    // return Observable.create((observer) => {
    //     console.log(observer);
    //     this.socket.on('new-message', (message) => {
    //         observer.next(message);
    //     });
    // });

    return new Observable((observer) => {
      this.socket.on('logout', (res) => {
        // console.log(res);
        // console.log('---------------');
        this.baseLogout('/auth');
        observer.next(res);
        observer.complete();
      });
    });
  };
}
