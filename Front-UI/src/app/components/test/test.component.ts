import {Component, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  @Output() event : EventEmitter<string> = new EventEmitter<string>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/html',
    }),
  };

  constructor(private http: HttpClient) {}

  test() {
    this.http.get('http://127.0.01:8081/api/test', this.httpOptions).subscribe((data:any) => {
      console.log("Receive")
      console.log(data.data)
      this.event.emit(data.data)
    });
  }
}
