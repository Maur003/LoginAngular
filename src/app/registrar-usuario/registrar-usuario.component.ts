import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseErrorService } from "../services/fire-base-error.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registerUser : FormGroup;
  loading : boolean = false;

  constructor(
    private fb : FormBuilder,
    private afAuth : AngularFireAuth,
    private toastr : ToastrService,
    private router : Router,
    private FireBaseErrorService : FireBaseErrorService
  ) {
    this.registerUser = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    const email = this.registerUser.value.email;
    const password = this.registerUser.value.password;

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loading = false;
      this.toastr.success('The user has been successfully registered!', 'Registered User');
      this.toastr.info('We have sent you a verification email, please check it before logging in', 'Verify Mail')
      this.router.navigate(['/Login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.FireBaseErrorService.codeError(error.code), 'Error')
  
    })
  }

}
