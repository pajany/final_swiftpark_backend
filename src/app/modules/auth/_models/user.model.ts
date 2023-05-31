import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  roles: number[];
  phone: string;
  firstname: string;
  lastname: string;
  authToken: string;   
  refreshToken: string;  
}
