import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  fileTypes = ['jpg', 'png', 'webm', 'gif'];
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  sizeLimit = 10 * 1024 * 1024;
  _isLtr: boolean = undefined;

  constructor() {
  }


  splitString(s: string, str: string) {
    let second = '';
    let first = s;
    const i = s.indexOf(str);
    if (i !== -1) {
      second = s.slice(i + 1);
      first = s.slice(0, i);
    }
    return [first, second];
  }

  validFileType(name: string) {
    try {
      return this.fileTypes.indexOf(name.split('.').pop().toLowerCase()) !== -1;
    } catch {
      return false;
    }
  }

  validFileSize(size: number): boolean {
    return size < this.sizeLimit;
  }

  formatDate(dateStr): string {
    return (new Date(dateStr)).toLocaleString(undefined, {timeZone: this.timezone});
    // const date = new Date(dateStr);
    // return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  }

  stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  // get dir from the toolbar and cache it
  isLtr() {
    if (this._isLtr === undefined) {
      this._isLtr = document.getElementsByTagName('mat-toolbar')[0].getAttribute('dir') === 'ltr';
    }
    return this._isLtr;
  }
}

