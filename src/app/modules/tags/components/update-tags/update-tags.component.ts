import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TagService } from '../../services/tag/tag.service';

@Component({
  selector: 'app-update-tags',
  templateUrl: './update-tags.component.html',
  styleUrls: ['./update-tags.component.css']
})
export class UpdateTagsComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  form: FormGroup;
  isLoading: boolean;
  isSubmitted: boolean;
  item: any;
  /* #endregion */

  /* #region  Parameters */
  private _id: number;
  get id() {
    return this._id;
  }
  @Input() set id(value: number) {
    this._id = value;
    this.getById();
  }
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
    this.getById();
  }

  /* #endregion */

  /* #region  Methods */
  initForm() {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
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
  setForm() {
    if (this.item) {
      this.form.setValue({
        id: this.item.id,
        nameEn: this.item.nameEn,
        nameAr: this.item.nameAr,
        isActive: this.item.isActive
      })
    }
  }

  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isLoading = true;
      this.tagService.update(this.form.value, false, '/update').subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.alertService.successMsg('Tag Updated');
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
  getById() {
    if (this.id > 0) {
      this.isLoading = true;
      this.tagService.getById(this.id).subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.item = response.resource;
          this.setForm();
        } else {
          this.alertService.errorMsg(response.message || 'errors.errorOccured');
        }
      }, err => {
        this.isLoading = false;
        this.alertService.error(err);
      })
    }
  }
  /* #endregion */
}
