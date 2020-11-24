import { Injector, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf,fromEvent, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { FileUpload } from 'primeng/fileupload';
export class BaseComponent {
   public unsubscribe = new Subject();
   public _renderer:any;
   public _api: ApiService;
   public _route: ActivatedRoute;
   constructor(injector: Injector) {  
      this._renderer = injector.get(Renderer2);
      this._api = injector.get(ApiService);
      this._route = injector.get(ActivatedRoute);
      } 
   public loadScripts() {
      this.renderExternalScript('assets/js/main.js').onload = () => {}
   }
   public renderExternalScript(src: string): HTMLScriptElement {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.async = true;
      script.defer = true;
      this._renderer.appendChild(document.body, script);
      return script;
   }
   public getEncodeFromImage(fileUpload: FileUpload) {
        if (fileUpload) {
          if (fileUpload.files == null || fileUpload.files.length == 0) {
            return observableOf('');
          }
          let file: File = fileUpload.files[0];
          let reader: FileReader = new FileReader();
          reader.readAsDataURL(file);
          return fromEvent(reader, 'load').pipe(
            map((e) => {
              let result = '';
              let tmp: any = reader.result;
              let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
              result = file.name + ';' + file.size + ';' + baseCode;
              return result;
            })
          );
        } else {
          return observableOf(null);
        }
      }
}