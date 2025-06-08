import { Component } from '@angular/core';
import { AppLocalRepositoryModule } from './app-local-repository.module';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppMockRepositoryModule } from './app-mock-repository.module';
import { AppApiRepositoryModule } from './app-api-repository.module';

@Component({
  selector: 'app-root',
  imports: [
    AppLocalRepositoryModule,
    RouterOutlet,
    ...(environment.dataSource == 'mock'
      ? [AppMockRepositoryModule]
      : [AppApiRepositoryModule]),
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'template-web';
}
