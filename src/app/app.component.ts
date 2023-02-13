import { Component, OnInit } from '@angular/core';

const texts = [
  'This is a very very very big text This is a very very very big text This is a very very very big text This is a very very very big text This is a very very very big text This is a very very very big text This is a very very very bigtext This is a very very very big text This is a very very very big text sfesefsdfsdfdsf',
  'hello',
  'bla bla bla bla bla',
];

const numberOfTextsToShow = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ellipsis-tooltip-directive';
  textData: string[] = [];

  ngOnInit(): void {
    for (let i = 0; i < numberOfTextsToShow; i++) {
      this.textData.push(texts[Math.floor(Math.random() * texts.length)]);
    }
  }
}
