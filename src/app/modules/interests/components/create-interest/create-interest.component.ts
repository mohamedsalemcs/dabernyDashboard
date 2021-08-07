import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestService } from '../../services/interest/interest.service';

@Component({
  selector: 'app-create-interest',
  templateUrl: './create-interest.component.html',
  styleUrls: ['./create-interest.component.css']
})
export class CreateInterestComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  form: FormGroup;
  isLoading: boolean;
  isSubmitted: boolean;
  /* #endregion */

  /* #region  Parameters */
  @Input() show: false;
  @Output() canceled = new EventEmitter();

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private formBuilder: FormBuilder,
    private interestService: InterestService,
    private alertService: AlertService
  ) {
    super(translate, languageService);
  }
  /* #endregion */

  /* #region  Events */
  ngOnInit() {
    this.initForm();
  }
  /* #endregion */

  /* #region  Methods */
  initForm() {
    this.form = this.formBuilder.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  reset() {
    this.isLoading = false;
    this.isSubmitted = false;
    this.form.reset();
  }
  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isLoading = true;
      this.interestService.create({}).subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.alertService.successMsg('Interest Added');
          this.reset();
          this.close();
        } else {
          this.alertService.errorMsg(response.message || 'errors.errorOccured');
        }
      });
    }
  }
  close() {
    this.show = false;
    if (this.canceled) {
      this.canceled.emit();
    }
  }
  onHide() {
    if (this.canceled) {
      this.canceled.emit();
    }
  }
  /* #endregion */
}
