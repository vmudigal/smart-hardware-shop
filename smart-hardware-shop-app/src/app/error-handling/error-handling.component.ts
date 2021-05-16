import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../shared/constants';

export class CustomHttpError {
  code!: number;
  title!: string;
  message!: string;
  constructor(code: number) {
    this.code = code;
  }
}

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.scss']
})
export class ErrorHandlingComponent implements OnInit {

  error!: CustomHttpError;
  code!: number;
  message!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.code = +this.route.snapshot.params['errorCode'];

    this.error = new CustomHttpError(this.code);
    this.error.message = Constants.ERROR_404_MESSAGE;

    if (!!this.route.snapshot.queryParamMap.get('message')) {
      this.error.message = this.route.snapshot.queryParamMap.get('message')!;
    }


  }

}
