import {Component, OnInit} from '@angular/core';
import {UserForEditDto} from "../../model/UserForEditDto";
import {Gender} from "../../model/Gender";
import {Language} from "../../model/Language";
import {LanguageService} from "../../service/language.service";
import {UserForResponseDto} from "../../model/UserForResponseDto";
import {ProfileService} from "../../service/profile.service";
import {FileUploadService} from "../../service/file-upload.service";
import {NotificationService} from "../../service/notification.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-profile-user-data',
  templateUrl: './profile-user-data.component.html',
  styleUrls: ['./profile-user-data.component.scss']
})
export class ProfileUserDataComponent implements OnInit {
  userForResponseDto: UserForResponseDto;
  tmpUserName: string;
  tmpRoles: string[];
  tmpEmail: string;
  tmpAvatar: string;
  tmpNativeLanguage: Language | undefined;
  tmpFirstname: string;
  tmpLastname: string;
  tmpGender: Gender;
  tmpDob: string;
  tmpRole: string;

  genders: Gender[] = [];
  languages: Language[] = [];
  roles: string[] = ['PRACTITIONER', 'OBSERVER', 'COACH'];
  fileName: string = '';
  requiredFileType: string[] = ['image/png', 'image/jpeg'];
  MAX_AVATAR_SIZE: number = 100 * 1024;
  editProfile: boolean = false;
  currentDate: Date;

  ngOnInit(): void {
    this.currentDate = new Date();
    this.genders = [Gender.MALE, Gender.FEMALE];
    this.languageService.getAll().subscribe(result => {
      this.languages = result;
    });
    this.profileService.getProfileDetails().subscribe(result => {
      this.userForResponseDto = result;
      this.tmpUserName = this.userForResponseDto.userName;
      this.tmpEmail = this.userForResponseDto.email;
      this.tmpRoles = this.userForResponseDto.roles;
      this.tmpRole = this.tmpRoles.filter(
          el => !el.startsWith('USER'))[0];
      this.tmpAvatar = this.userForResponseDto.avatar;
      this.tmpNativeLanguage = this.languages.find(
          el => el.languageName === this.userForResponseDto.nativeLanguage);
      this.tmpFirstname = this.userForResponseDto.firstname;
      this.tmpLastname = this.userForResponseDto.lastname;
      this.tmpGender = this.userForResponseDto.gender;
      this.tmpDob = this.userForResponseDto.dob;
    });
  }

  constructor(private languageService: LanguageService,
              private profileService: ProfileService,
              private fileUploadService: FileUploadService,
              private authService: AuthService,
              private notificationService: NotificationService) {
  }

  changeNativeLanguage() {
    console.log(this.tmpNativeLanguage);
  }

  save() {
    const dateArray = this.tmpDob.split("-");

    if (Number(dateArray[0])<=this.currentDate.getFullYear()) {
      let newUserForEditDto = new UserForEditDto(this.tmpFirstname, this.tmpLastname,
          this.tmpRole, this.tmpAvatar, this.tmpNativeLanguage?.codeIso || '',
          this.tmpDob, this.tmpGender);
      this.profileService.updateUserData(newUserForEditDto).subscribe(result => {
        this.notificationService.showSnackBar('Changes saved successfully!');
      });
    }else {
      this.notificationService.showSnackBar('Date of birth is not correct!');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && this.checkAvatarFile(file)) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("avatar", file);
      this.fileUploadService.uploadAvatar(formData).subscribe(result => {
        if (result.url !== this.tmpAvatar) {
          this.notificationService.showSnackBar('Avatar changed successfully!');
        }
        this.tmpAvatar = result.url;
      });
    }
  }

  private checkAvatarFile(file: File) {
    let result = file.size <= this.MAX_AVATAR_SIZE
        && (file.type.toLowerCase() === "image/png" ||
            file.type.toLowerCase() === "image/jpeg");
    if (!result) {
      this.notificationService.showSnackBar('Wrong size or type file of avatar!');
    }
    return result;
  }

  editProfileChange() {
    this.editProfile = !this.editProfile;
  }

  passwordRecovery() {
    this.authService.passwordRecoverySendEmail().subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Link for password recovery sent by e-mail !');
    }, error => {
      this.notificationService.showSnackBar('Some errors');
    });
  }
}
