import { Component } from '@angular/core';
import { ZnBrowserModule } from '../../core/zn30-core-browser/zn-browser.module';
import { ZnTableColumnI } from '../../core/zn30-core-browser/zn-browser.interface';
import { ExternalApiService } from '../../project/services/externalapi.service';
import { mode } from 'crypto-js';
import { startsWith } from 'lodash-es';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [ZnBrowserModule],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.scss'
})
export class Test2Component {
  columns: ZnTableColumnI[] = [
    {
      key: 'firstName',
      header: 'First Name',
      type: 'text',
      hidden: false,
    },
    {
      key: 'lastName',
      header: 'Last Name',
      type: 'text',
      hidden: false,
    },
    {
      key: 'birthDate',
      header: 'Birth Date',
      type: 'date',
      hidden: false,
    },
    {
      key: 'gender',
      header: 'Gender',
      type: 'parametric',
      catalogCode: 'GENDER',
      hidden: true,
    }
  ];

  catalogs = {
    GENDER: [
      {label: 'Male', value: '1'},
      {label: 'Female', value: '2'}
    ]
  };

  constructor(
    private service: ExternalApiService
  ) {}

  getData = async (f: any): Promise<any> => {
    const { first, rows, globalFilter, sortField, sortOrder } = f;
    // const d = {skip: first, take: rows, search: globalFilter, sort_by: sortField ?? 'id', sort_order: sortOrder == 1 ? 'asc' : 'desc'};
    const d = {
      model: 'test_person',
      select: ['firstName', 'lastName', 'birthDate', 'gender'],
      filter: {
        skip: first,
        take: rows,
        where: {
          firstName: {startsWith: globalFilter ?? ''},
        },
      }
    };
    const countFiler = {
      model: 'test_person',
      filter: {
        where: {
        firstName: {startsWith: globalFilter ?? ''},
      },
    }
    };
    const count: any = await this.service.countBy(countFiler);
    const res: any = await this.service.getBy(d);
    console.log(count);
    return {count: count.count, data: res};
  }
}
