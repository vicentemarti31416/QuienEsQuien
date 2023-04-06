import { Person } from './shared/service/person';
import { PersonsService } from './shared/service/persons.service';
import { Component, OnInit } from '@angular/core';
import { Question } from './shared/service/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'QuienEsQuien';
  persons: Person[] = [];
  questions: Question[] = [];
  randomPerson = new Person();

  constructor(
    private personsService: PersonsService
  ) { }

  ngOnInit(): void {
    this.persons = this.personsService.persons;
    this.questions = this.personsService.questions;
    this.getRandomPerson();
    console.log(this.randomPerson);
  }

  public checkPerson(personSelected: Person): void {
    if (personSelected.img === this.randomPerson.img) {
      Swal.fire('Correcto', 'La persona elegida es la correcta', 'success');
    } else {
      let person$$ = document.getElementById(`${personSelected.img}`);
      person$$?.setAttribute('style', 'pointer-events: none; opacity: 0.2;');
      Swal.fire('Ohhhhhh', 'La persona elegida no es la correcta', 'error');
    }
  }

  public checkQuestion(questionKey: string, questionValue: string): void {
    for (let randomKey in this.randomPerson) {
      if (questionKey === randomKey) {
        if (questionValue === this.randomPerson[randomKey]) {
          this.disablePersons(questionKey, questionValue, this.randomPerson[randomKey]);
          Swal.fire('Correcto', 'La persona misteriosa sí tiene ese atributo', 'success');
        } else {
          this.disablePersons(questionKey, questionValue, this.randomPerson[randomKey]);
          Swal.fire('Nooo', 'La persona misteriosa no tiene ese atributo', 'error');
        }
      }
    }
  }

  public disablePersons(questionKey: string, questionValue: string, randomValue: string): void {
    this.persons.forEach((person) => {
      for (let personKey in person) {
        if (questionKey === personKey) {
          if (questionValue !== randomValue) {
            if (questionValue === person[personKey]) {
              let person$$ = document.getElementById(`${person.img}`);
              person$$.setAttribute('style', 'pointer-events: none; opacity: .2;');
            }
          } else {
            if (questionValue !== person[personKey]) {
              let person$$ = document.getElementById(`${person.img}`);
              person$$.setAttribute('style', 'pointer-events: none; opacity: .2;');
            }
          }
        }
      }
    })
  }

  public findQuestionByTitle(title: string): Question | undefined {
    return this.questions.find((question) => question.title === title)
  }

  public getRandomPerson(): void {
    let randomNumber = Math.floor(Math.random() * this.persons.length);
    this.randomPerson = this.persons[randomNumber];
    console.log(randomNumber)
  }
}
