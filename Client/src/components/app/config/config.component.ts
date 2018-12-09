import { ConfigService } from './config.service';
import { IConfig } from './config.model';

export class ConfigComponent {
  config: IConfig;
  headers;
  error;

  constructor(protected configService: ConfigService) {}

  showConfig() {
    this.configService
      .getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: IConfig) =>
        this.config = { ...data },
        error => this.error = error
       );
  }

  showConfigResponse() {
    this.configService
      .getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body };
      });
  }
}
