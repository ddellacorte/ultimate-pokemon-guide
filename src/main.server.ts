import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';

import { App } from './app/app';
import { appConfig } from './app/shared/config/app.config';

export default function bootstrap(context: any) {
  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      provideServerRendering(),
      ...(appConfig.providers ?? []),
    ],
  }, 
  context);
}
