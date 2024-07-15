import { Component, effect, inject, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { ZnViewerModule } from '../../core/zn30-core-viewer/zn-viewer.module';
import { ZnViewerI } from '../../core/zn30-core-viewer/zn-viewer.interface';
import { DialogModule } from 'primeng/dialog';
import { ZnFormsModule } from '../../core/zn30-core-forms/zn-forms.module';
import { ZnFieldType } from '../../core/zn30-core-forms/zn-forms.interface';
import { ZnBrowserModule } from '../../core/zn30-core-browser/zn-browser.module';
import { ZnTableColumnI } from '../../core/zn30-core-browser/zn-browser.interface';
import { count } from 'rxjs';
import { CatalogsStore } from '../../core/store/catalogs.store';
import { getState } from '@ngrx/signals';
import { CommonModule } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    TabViewModule,
    ZnViewerModule,
    DialogModule,
    ZnFormsModule,
    ZnBrowserModule,
    CommonModule,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  readonly store: any = inject(CatalogsStore);
  private translate = inject(TranslateService);

  fields: ZnViewerI[] = [
    {
      label: 'Client Information',
      type: 'title',
    },
    {
      key: 'firstName',
      label: 'First Name',
      type: 'text',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'text',
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
    },
    {
      key: 'birthDate',
      label: 'Birth Date',
      type: 'date',
    },
    {
      label: 'Client Account Information',
      type: 'title',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'tag',
      colorSchema: [
        { color: 'bg-primary-400', value: 'active', label: 'Active' },
        { color: 'bg-danger-400', value: 'inactive', label: 'Inactive' },
      ],
    },
  ];
  data = {
    firstName: 'Elon',
    lastName: 'Musk',
    age: 49,
    birthDate: new Date(1971, 0, 28),
    status: 'active',
  };

  formSchema: ZnFieldType[] = [
    {
      key: 'firstName',
      label: 'First Name',
      type: 'input',
    },
    {
      key: 'lastName',
      label: 'Last Name',
      type: 'input',
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      max: 100,
    },
    {
      key: 'birthDate',
      label: 'Birth Date',
      type: 'datetime',
      format: 'yy',
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
    },
    {
      key: 'status',
      label: 'Status',
      type: 'radioButton',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ];
  viewEditForm = false;
  formSchema2: ZnFieldType[] = [
    {
      type: 'title',
      text: 'Client Information',
      style: 'title',
    },
    {
      type: 'column',
      columns: [
        {
          fields: [
            {
              key: 'firstName',
              label: 'First Name',
              type: 'input',
            },
            {
              key: 'lastName',
              label: 'Last Name',
              type: 'input',
              validators: { required: true, minLength: 3, maxLength: 10 },
            },
          ],
        },
        {
          fields: [
            {
              key: 'age',
              label: 'Age',
              type: 'number',
            },
            {
              key: 'birthDate',
              label: 'Birth Date pepe',
              type: 'datetime',
              format: 'M, d yy',
            },
          ],
        },
      ],
    },
    {
      type: 'title',
      text: 'Client Account Information',
      style: 'subtitle',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'radioButton',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      type: 'message',
      text: 'This is a message',
      title: 'Warning',
      severity: 'alert',
      showOn: {
        satisfy: 'ALL',
        rules: [{ property: 'status', value: 'inactive', op: 'eq' }],
      },
    },
    {
      key: 'lv1',
      label: 'Level 1',
      type: 'select',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
    },
    {
      key: 'lv2',
      label: 'Level 2',
      type: 'select',
      parentKey: 'lv1',
      options: [
        { label: 'Option 1-1', value: 'option1-1', parent: 'option1' },
        { label: 'Option 1-2', value: 'option1-2', parent: 'option1' },
        { label: 'Option 1-3', value: 'option1-3', parent: 'option1' },
        { label: 'Option 2-1', value: 'option2-1', parent: 'option2' },
        { label: 'Option 2-2', value: 'option2-2', parent: 'option2' },
        { label: 'Option 2-3', value: 'option2-3', parent: 'option2' },
        { label: 'Option 3-1', value: 'option3-1', parent: 'option3' },
      ],
    },
  ];

  columns: ZnTableColumnI[] = [
    {
      key: 'firstName',
      header: 'First Name',
      type: 'text',
      hidden: false,
      sortable: true,
      filterable: true,
    },
    {
      key: 'lastName',
      header: 'Last Name',
      type: 'text',
      hidden: false,
      sortable: true,
      filterable: true,
    },
    {
      key: 'age',
      header: 'Age',
      type: 'number',
      hidden: false,
      sortable: true,
      filterable: true,
    },
    {
      key: 'birthDate',
      header: 'Birth Date',
      type: 'date',
      hidden: false,
      sortable: true,
      filterable: true,
    },
    {
      key: 'status',
      header: 'Status',
      type: 'parametric',
      hidden: false,
      sortable: true,
      filterable: true,
    },
  ];
  dataTable = [
    {
      id: '1',
      firstName: 'Elon Maximilian',
      lastName: 'Musk',
      age: 49,
      birthDate: new Date(1971, 0, 28),
      status: 'active',
    },
    {
      id: '2',
      firstName: 'Jeff Jhon',
      lastName: 'Bezos',
      age: 57,
      birthDate: new Date(1964, 0, 12),
      status: 'inactive',
    },
    {
      id: '3',
      firstName: 'Billllllllllllllllllllssssssssssssssssssssssssss',
      lastName: 'Gates',
      age: 65,
      birthDate: new Date(1955, 9, 28),
      status: 'active',
    },
    {
      id: '4',
      firstName: 'Warren',
      lastName: 'Buffett',
      age: 90,
      birthDate: new Date(1930, 7, 30),
      status: 'active',
    },
    {
      id: '5',
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      age: 36,
      birthDate: new Date(1984, 4, 14),
      status: 'active',
    },
    {
      id: '6',
      firstName: 'Larry',
      lastName: 'Page',
      age: 47,
      birthDate: new Date(1973, 3, 26),
      status: 'active',
    },
    {
      id: '7',
      firstName: 'Sergey',
      lastName: 'Brin',
      age: 47,
      birthDate: new Date(1973, 8, 21),
      status: 'active',
    },
    {
      id: '8',
      firstName: 'Larry',
      lastName: 'Ellison',
      age: 76,
      birthDate: new Date(1944, 8, 17),
      status: 'active',
    },
    {
      id: '9',
      firstName: 'Steve',
      lastName: 'Jobs',
      age: 56,
      birthDate: new Date(1955, 1, 24),
      status: 'inactive',
    },
    {
      id: '10',
      firstName: 'Tim',
      lastName: 'Cook',
      age: 60,
      birthDate: new Date(1960, 10, 1),
      status: 'active',
    },
  ];

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('books state changed', state);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadCatalogs();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);
      this.store.changeLanguage(event.lang);
    });
  }

  async loadCatalogs() {
    await this.store.loadByCatalogCodes(['GENDER', 'TEST']);
  }

  showModal() {
    this.viewEditForm = true;
    this.translate.use(this.translate.currentLang === 'en' ? 'es' : 'en');

    console.log('[LANG]', this.translate.currentLang);
  }

  getData = async (f: any): Promise<any> => {
    const { first, rows, globalFilter, sortField, sortOrder } = f;
    console.log(f);
    const d = {
      skip: first,
      take: rows,
      search: globalFilter,
      sort_by: sortField ?? 'id',
      sort_order: sortOrder == 1 ? 'asc' : 'desc',
    };
    return { count: this.dataTable.length, data: this.dataTable };
  };

  onFormChange(f: any) {
    console.log('fchange', f);
  }
}
