import { Component } from '@angular/core';
import { ThemeService } from 'src/core/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sons-of-the-forest-save-game-editor';

  constructor(
    public theme: ThemeService,
  ) {
    this.theme.setDesign();
  }

}
