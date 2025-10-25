import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../data/services/login.service';
import { ConfigService } from '../../data/services/config.service';
import { usuarioI } from '../../data/models/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  public usuario!: usuarioI | null;

  constructor(private loginService: LoginService, private configService: ConfigService){ 
    this.usuario = this.configService.usuario;
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logoutApp(){
    this.loginService.logout();
  }

}
