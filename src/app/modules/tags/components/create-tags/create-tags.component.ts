import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { TagService } from '../../services/tag/tag.service';

@Component({
  selector: 'app-create-tags',
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.css']
})
export class CreateTagsComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  form: FormGroup;
  isLoading: boolean;
  isSubmitted: boolean;
  /* #endregion */

  /* #region  Parameters */
  @Input() show: false;
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();

  /* #endregion */

  /* #region  Constructor */
  constructor(
    translate: TranslateService,
    languageService: LanguageService,
    private formBuilder: FormBuilder,
    private tagService: TagService,
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
      isActive: [true]
    });
  }
  reset() {
    this.isLoading = false;
    this.isSubmitted = false;
    this.form.reset();
    this.form.get('isActive').setValue(true);
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isLoading = true;
      this.tagService.create(this.form.value).subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.alertService.successMsg('Tag Added');
          this.reset();
          this.onSave();
        } else {
          this.alertService.errorMsg(response.message || 'errors.errorOccured');
        }
      },
        err => {
          this.isLoading = false;
          this.alertService.error(err);

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
  onSave() {
    this.show = false;
    if (this.saved) {
      this.saved.emit();
    }
  }
  /* #endregion */
}
