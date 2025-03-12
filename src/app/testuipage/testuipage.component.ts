import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ELEMENT_DATA } from './testuipage-dictionary-words';

export interface StateGroup {
  letter: string;
  names: string[];
}

interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-testuipage',
  templateUrl: './testuipage.component.html',
  styleUrls: ['./testuipage.component.less']
})
export class TestuipageComponent {
  public loading: boolean = false;
  public dateSelected: Date;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public skillCtrl = new FormControl('');
  public filteredSkills!: Observable<string[]>;
  public skills: string[] = ['Python3'];
  public allSkills = ['Java', 'Python', 'Selenium', 'CICD', 'Jenkins', 'Angular', 'NodeJS', 'Typescript', 'Ruby on Rails'];

  @ViewChild('toolbar')
  public toolbar?: MatToolbar;

  @ViewChild('skillInput')
  public skillInput!: ElementRef<HTMLInputElement>;

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, private http: HttpClient) {
    this.dateSelected = new Date();

    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => (skill ? this._filter(skill) : this.allSkills.slice())),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  public get columns(): number {
    const width = this.toolbar?._elementRef.nativeElement.offsetWidth;

    return width/400;
  }

  public removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  public addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  public selectedSkill(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  public openDialog(): void {
    this.dialog.open(TestuipageModal);
  }

  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [
    {
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
    {
      letter: 'C',
      names: ['California', 'Colorado', 'Connecticut'],
    },
    {
      letter: 'D',
      names: ['Delaware'],
    },
    {
      letter: 'F',
      names: ['Florida'],
    },
    {
      letter: 'G',
      names: ['Georgia'],
    },
    {
      letter: 'H',
      names: ['Hawaii'],
    },
    {
      letter: 'I',
      names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
    },
    {
      letter: 'K',
      names: ['Kansas', 'Kentucky'],
    },
    {
      letter: 'L',
      names: ['Louisiana'],
    },
    {
      letter: 'M',
      names: [
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
      ],
    },
    {
      letter: 'N',
      names: [
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ],
    },
    {
      letter: 'O',
      names: ['Ohio', 'Oklahoma', 'Oregon'],
    },
    {
      letter: 'P',
      names: ['Pennsylvania'],
    },
    {
      letter: 'R',
      names: ['Rhode Island'],
    },
    {
      letter: 'S',
      names: ['South Carolina', 'South Dakota'],
    },
    {
      letter: 'T',
      names: ['Tennessee', 'Texas'],
    },
    {
      letter: 'U',
      names: ['Utah'],
    },
    {
      letter: 'V',
      names: ['Vermont', 'Virginia'],
    },
    {
      letter: 'W',
      names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    },
  ];

  public stateGroupOptions!: Observable<StateGroup[]>;

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  public toppings = new FormControl('');

  public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  public pokemonControl = new FormControl('');
  public pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
        { value: 'oddish-1', viewValue: 'Oddish' },
        { value: 'bellsprout-2', viewValue: 'Bellsprout' },
      ],
    },
    {
      name: 'Water',
      pokemon: [
        { value: 'squirtle-3', viewValue: 'Squirtle' },
        { value: 'psyduck-4', viewValue: 'Psyduck' },
        { value: 'horsea-5', viewValue: 'Horsea' },
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        { value: 'charmander-6', viewValue: 'Charmander' },
        { value: 'vulpix-7', viewValue: 'Vulpix' },
        { value: 'flareon-8', viewValue: 'Flareon' },
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        { value: 'mew-9', viewValue: 'Mew' },
        { value: 'mewtwo-10', viewValue: 'Mewtwo' },
      ],
    },
  ];

  public formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  public sliderValue: number = 30000;

  public showFileProcessProgressBar = false;
  public showFileProcessedSuccessMessage = false;

  public cleanFileCard(): void {
    this.showFileProcessProgressBar = false;
    this.showFileProcessedSuccessMessage = false;
  }

  public upload = true;

  public onFileSelected(upload = true): void {
    this.cleanFileCard();
    this.upload = upload;
    this.showFileProcessProgressBar = true;
    setTimeout(() => {
      this.showFileProcessProgressBar = false;
      this.showFileProcessedSuccessMessage = true;
    }, 6000);
  }

  public jsOptionValue: string | null = '';
  public jsInteractions(intType: string): void {
    switch (intType) {
      case 'alert': {
        alert("Hello");
        break;
      }

      case 'prompt': {
        this.jsOptionValue = prompt('What is your name?', 'Tony');
        break;
      }

      case 'confirm': {
        this.jsOptionValue = confirm('Are you doing Good?').toString();
        break;
      }
    }
  }

  public buttonText: string = '';

  public selectAnimal(event: any): void {
    this.buttonText = event?.srcElement?.innerText;
  }

  public todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  public done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public displayedColumns: string[] = [ 'word' ];
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public showspinner = false;
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.showspinner = true;
    setTimeout(() => {
      this.showspinner = false;
    }, 1000)
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public showMisc: boolean = true;
  public reloadhMisc(): void {
    this.showMisc = false;
    setTimeout(() => {
      this.showMisc = true;
    }, 1000);
  }

  public tempDisable = false;
  public disableFor5Secs(): void {
    this.tempDisable = true;
    setTimeout(() => {
      this.tempDisable = false;
    }, 5000)
  }
}


@Component({
  selector: 'testuipage-modal',
  templateUrl: 'testuipage-modal/testuipage-modal.component.html',
})
export class TestuipageModal {
  public currentDate = new Date();
  constructor(public dialogRef: MatDialogRef<TestuipageModal>) { }
}
