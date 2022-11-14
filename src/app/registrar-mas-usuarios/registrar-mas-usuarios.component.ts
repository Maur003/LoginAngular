import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-mas-usuarios',
  templateUrl: './registrar-mas-usuarios.component.html',
  styleUrls: ['./registrar-mas-usuarios.component.css']
})
export class RegistrarMasUsuariosComponent implements OnInit {
  registerUser: any;
  loading: boolean | undefined;
  afAuth: any;
  FireBaseErrorService: any;

  constructor(
    private fb : FormBuilder,
    private toastr : ToastrService,
    private router : Router,
    
  ) {
    this.registerUser = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(7)]],
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
    }).catch((error: { code: any; }) => {
      this.loading = false;
      this.toastr.error(this.FireBaseErrorService.codeError(error.code), 'Error')
  
    })
  }

}
