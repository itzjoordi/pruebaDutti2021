import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { StarShip } from '../../../interfaces/starship.interface';
import { ShipsDetailsComponent } from './ships-details.component';

const starShip: StarShip = {
  MGLT: '60',
  cargo_capacity: '3000000',
  consumables: '1 year',
  cost_in_credits: '3500000',
  created: '2014-12-10T14:20:33.369000Z',
  crew: '30-165',
  edited: '2014-12-20T21:23:49.867000Z',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  hyperdrive_rating: '2.0',
  length: '150',
  manufacturer: 'Corellian Engineering Corporation',
  max_atmosphering_speed: '950',
  model: 'CR90 corvette',
  name: 'CR90 corvette',
  passengers: '600',
  pilots: [],
  starship_class: 'corvette',
  url: 'https://swapi.dev/api/starships/2/',
};

describe('ShipsDetailsComponent', () => {
  let component: ShipsDetailsComponent;
  let fixture: ComponentFixture<ShipsDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatCardModule, MatButtonModule],
      declarations: [ShipsDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsDetailsComponent);
    component = fixture.componentInstance;
    component.starShip = starShip;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
