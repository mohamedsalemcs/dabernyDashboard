import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@core/base-component/base-component';
import { FormDataHeplper } from '@core/helpers/form-data-helper';
import { AlertService } from '@core/services/alert-service/alert.service';
import { LanguageService } from '@core/services/language-service/language.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { FileUpload } from 'primeng/fileupload';
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
  attachment: any;
  @ViewChild('imageUploader') imageUploader: FileUpload;

  get maxImageSize() {
    return environment.maxImageSize;
  }
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

  onRemoveImage() {
    this.clearFileSelection();
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
    this.imageUploader.clear();
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
    if (this.form.valid && this.attachment) {
      this.isLoading = true;
      const model = this.form.value;
      const fd = FormDataHeplper.toFormData(model);
      if (this.attachment && this.attachment.blob) {
        fd.append('image', this.attachment.blob, this.attachment.name);
      }
      this.interestService.create(fd).subscribe(response => {
        this.isLoading = false;
        if (response && response.success) {
          this.alertService.successMsg('Interest Added');
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
