import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../data/services/login.service';
import { ConfigService } from '../../data/services/config.service';
import { SweetAlerService } from '../../data/services/sweetAler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  hidePass = true; //para mostrar u ocultar contraseña
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService, 
    private sw: SweetAlerService,
    private router: Router,
    private configService: ConfigService){
  }


  ngOnInit(): void {   
    this.cargarComponent();
  }

  configurarForm(){
    this.form = this.fb.group({
      userName : [{value: null, disabled: false}, Validators.required],
      password: [{value: null, disabled: false}, Validators.required]
    })

    this.showSpinner = false;
  }


  cargarComponent(){
    this.configurarForm();
  }

  async login() {
    this.showSpinner= true;
    this.loginService.login(this.form.value).subscribe(
      (response) => {
        if (response) {
          this.loginService.guardarToken(response);
          this.router.navigate(['/']);        
          this.loginService.setAuthenticatedUser(response).subscribe(async (usuario) => {
            this.configService.cargarUsuario();
          }, (error) => {
            console.log(error);
            this.loginService.logout();
            this.sw.sweet_alerta('Error', 'No es posible obtener la informacion del usuario', 'error');
            this.showSpinner= false;

          });
        }
      },
      (err) => {
        console.log(err);
        this.showSpinner= false;

      }
    );
  }
}