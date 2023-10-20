import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const sgMail = require('@sendgrid/mail');

import { UserRegister } from './entities/user-register.entity';
import { UserRegisterDto } from './dto/user-register';

@Injectable()
export class AppService {


  newHtmlEmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style><style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' 3D1';} } </style><style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: '3D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #fc91dc !important } .r2-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r3-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r4-o { border-style: solid !important; width: 100% !important } .r5-o { border-style: solid !important; margin-bottom: 0px !important; margin-top: 0px !important; width: 100% !important } .r6-i { padding-bottom: 15px !important; padding-top: 15px !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><style type="text/css">p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #0092ff; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #0092ff; text-decoration: underline;}</style></head><body bgcolor="#fc91dc" text="#3b3f44" link="#0092ff" yahoo="fix" style="background-color: #fc91dc;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #fc91dc; width: 100%;"><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"><tr><td valign="top" class="r1-i" style="background-color: #fc91dc;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" class="r5-o" style="table-layout: fixed; width: 600px;"><tr><td class="r6-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px;"> <div style="display: grid; place-items: center; border-radius: 50px; padding: 10px;"> <div style="background: #fff; position: relative; width: auto; height: auto; padding: 40px 30px; border-radius: 20px;"> <div style="width: 100%; display: grid; place-items: center; padding-top: 20px;"> <img width="200px" height="80px" src="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/LogoPequeno.png?alt=media&token=5bf1e664-e6c3-4e18-aa3a-e07036b2149d&_gl=1*q3inx2*_ga*MTk5MTI4Njk1Mi4xNjg5Mjc1MjY2*_ga_CW55HF8NVT*MTY5Nzc1ODE3Ny4yNS4xLjE2OTc3NTgyNzEuNjAuMC4w" alt="logotipo pequeno"></div> <div style="width: 100%; display: grid; place-items: center;"> <p style="margin: 0; font-size: 24px; color: #EA1964; font-weight: 500;"> SUCCESSFUL REGISTRATION </p> </div> <div style="width: 100%; display: grid; place-items: center; padding: 20px 0px;"> <img width="200px" height="auto" src="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/iconos.png?alt=media&token=59d4d0f4-092e-427e-95aa-0cf7a1268d01&_gl=1*1ffnkcw*_ga*MTk5MTI4Njk1Mi4xNjg5Mjc1MjY2*_ga_CW55HF8NVT*MTY5Nzc1ODE3Ny4yNS4xLjE2OTc3NjA3MzQuNjAuMC4w" alt="logotipo pequeno"></div> <div style="width: 100%; display: grid; place-items: center; margin-top: 15px; color: #EA1964;"> <p style="margin: 0;"> Date: 06/11/2023 </p> <p style="margin: 0;"> Location: Cancun, Breathless Riviera Maya Hotel </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 15px; color: #EA1964; font-size: 30px; font-weight: 500;"> <p style="margin: 0;"> SAVE THE DATE </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 30px; gap: 20px 0px;"> <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=BENEVERSE+2023&dates=20231106T190000Z/20231106T220000Z&details=Como+llegar:+https://maps.app.goo.gl/Bdy1LT3d3tdQqmPXA" style="color: #0092ff; text-decoration: underline;"> <button style="background: #EA1964; color: #fff; border-radius: 10px; padding: 10px 30px; font-size: 22px; border: 0px;"> Add this event to Google Calendar </button> </a> <a href="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/BENEVERSE_2023.ics?alt=media" style="color: #0092ff; text-decoration: underline; margin-top: 20px;"> <button style="background: #EA1964; color: #fff; border-radius: 10px; padding: 10px 30px; font-size: 22px; border: 0px;"> Save this event to my PC or Cell phone </button> </a> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 30px;"> <p style="margin: 0; font-size: 22px; color: #7E34A2;"> Visit BENEVERSE 2023 </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 10px;"> <a href="https://www.beneverselatam2023.com/" style="text-decoration: underline; color: #EA1964; font-size: 18px; font-style: italic;"> https://beneverselatam2023.com/ </a> <div style="display: flex; gap: 0px 10px;"> <p style="margin: 0; color: #7C2C8C;"> BENEVERSE 2023 </p> <p style="margin: 0; color: #EA1964;"> all rights reserved 2023 </p> </div> </div> </div></div> </td> </tr></table></th> </tr></table></td> </tr></table></td> </tr></table></body></html>`;

  constructor(
    @InjectRepository( UserRegister ) private readonly userRepository: Repository<UserRegister>,
  ){}

  async createUser( createUser:UserRegisterDto ) {

    try {

      const ifUserExist = await this.getUserByEmail(createUser.email);

      if( ifUserExist.length > 0 ) {

        this.sendEmail( [createUser.email] );

        return {
          status  : 'false',
          message : 'Usuario registrado correctamente'
        };
        
      }

      const user = this.userRepository.create(createUser);

      const userCreate = await this.userRepository.save(user);

      this.sendEmail([userCreate.email]);

      return {
        status  : 'ok',
        data    : userCreate,
        message : 'Usuario registrado correctamente'
      }

    } catch (error) {
      this.handleErrors( error );
    }

  }

  async getUserByEmail( email:string ) {
    const user = await this.userRepository.findBy({ email: email });

    return user;
  }

  async getUsers() {

    const users = await this.userRepository.find();

    return {
      status  : 'ok',
      data    : users,
      message : 'Todo correcto'
    };
  }

  async getOneUser( idUser:string ) {

    const user = await this.userRepository.findBy({ id: idUser });

    return user;
  }

  async deletUser( idUser:string ) {

    try {
      const userDelete = await this.userRepository.remove( await this.getOneUser(idUser) );

      if( userDelete.length == 0 ) {
        return {
          status: 'false',
          data: userDelete,
          message: 'Usuario no se encuentra en la BD'
        }  
      }
      
      return {
        status: 'ok',
        data: userDelete,
        message: 'Usuario eliminado correctamente'
      }
    } catch (error) {
      this.handleErrors( error );
    }

  }

  async sendEmail( emails:string[] = ['skiap17@gmail.com'] ) {

    sgMail.setApiKey(process.env.API_KEY_SENDGRIDE);
    
    const msg = {
      to      : emails,
      from    : 'eventos@beneverselatam2023.com',
      subject : 'Bienvenido a Beneverse LATAM 2023',
      html    : this.newHtmlEmail
    }
    
    sgMail.send(msg).then((response) => {

      console.log( emails, response[0].statusCode);

      return {
        status  : 'ok',
        message : 'Correo enviado'
      };
    }).catch((error) => {

      console.error('err: ',error);

      return {
        status  : 'false',
        message : 'Correo no enviado'
      }
    });
  }

  private handleErrors( error:any ) : never {

    if( error.code === '23505' ) throw new BadRequestException(`${error.detail }`);

    throw new InternalServerErrorException('Check server logs');
    
  }
}
