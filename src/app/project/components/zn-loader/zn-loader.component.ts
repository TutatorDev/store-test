import { Component } from '@angular/core';
import { GeneralService } from '../../../core/services/general.service';

@Component({
  selector: 'zn-loader',
  standalone: true,
  imports: [],
  templateUrl: './zn-loader.component.html',
  styleUrl: './zn-loader.component.scss',
})
export class ZnLoaderComponent {
  l = true;
  constructor(public gs: GeneralService) {
    this.gs.isLoading$.subscribe((isLoading) => {
      this.l = isLoading;
    });
  }
}
