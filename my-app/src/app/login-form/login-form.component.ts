import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  isConnected: any;
  token: string='';

  commandForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit() {
    this.token = this.tokenService.getToken() || '';
    this.tokenService.isConnected$.subscribe(newValue => {
      this.isConnected = newValue;
    });
  }

  onSubmit() {
    if (this.commandForm.valid) {
      const formData = {
        username: this.commandForm.value.username,
        password: this.commandForm.value.password,
      };

      const apiUrl = 'http://localhost:8000/login/loginUser';

      this.http.post<any>(apiUrl, formData)
        .subscribe(
          data => {
            this.tokenService.setToken(data.token)
          },
          (error) => {
            console.error('Erreur lors de la soumission du formulaire : ', error);
          }
        );

        console.log(this.tokenService.getToken());
        
    }
    
  }

}
