import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .then((ref) => {
    // do some stuff
  })
  .catch((err) => console.error(err));
