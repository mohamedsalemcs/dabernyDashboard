import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { FormDataHeplper } from '@core/helpers/form-data-helper';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';
import { InterestService } from '../../services/interest/interest.service';

@Component({
  selector: 'app-update-interest',
  templateUrl: './update-interest.component.html',
  styleUrls: ['./update-interest.component.css']
})
export class UpdateInterestComponent extends BaseComponent implements OnInit {

  /* #region  Prroperties & Fields */
  form: FormGroup;
  isLoading: boolean;
  isSubmitted: boolean;
  attachment: any;
  @ViewChild('imageUploader') imageUploader: FileUpload;
  item: any;
  get imagePath() {
    return this.item ? `${environment.dabernyServerUrl}/${this.item.imagePath}` : null;
  }
  get maxImageSize() {
    return environment.maxImageSize;
  }
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
    private interestService: InterestService,
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

  onRemoveImage() {
    this.clearFileSelection();
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
    this.imageUploader.clear();
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
  onImageSelected(event) {
    if (event && event.files && event.files.length > 0) {
      if ((event.files[0] as File).size <= environment.maxImageSize) {
        this.readFile(event.files[0]);
      } else {
        this.clearFileSelection();
        this.alertService.errorMsg(
          this.translate.instant('imageInvalidSize', { size: environment.maxImageSize / 1000000 })
        );
      }
    }
  }
  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileblob = new Blob([reader.result], {
        type: file.type
      });
      // const src = URL.createObjectURL(fileblob);
      this.attachment = {
        blob: fileblob,
        name: file.name
      };
    };
    reader.onerror = () => {
      this.clearFileSelection();
    }
    reader.readAsArrayBuffer(file);
  }
  clearFileSelection() {
    this.attachment = null;
  }
  save() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.isLoading = true;
      const model = this.form.value;
      const fd = FormDataHeplper.toFormData(model);
      if (this.attachment && this.attachment.blob) {
        fd.append('image', this.attachment.blob, this.attachment.name);
      }
      this.interestService.update(fd, false, '/update').subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.alertService.successMsg('Interest Updated');
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
      this.interestService.getById(this.id).subscribe(response => {
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
