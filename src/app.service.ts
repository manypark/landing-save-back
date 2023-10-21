import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const sgMail = require('@sendgrid/mail');

import { UserRegister } from './entities/user-register.entity';
import { UserRegisterDto } from './dto/user-register';

@Injectable()
export class AppService {


  newHtmlEmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style><style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: '3D1';} } </style><style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: '3D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #fc91dc !important } .r2-o { background-size: contain !important; border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r3-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r4-o { border-style: solid !important; width: 100% !important } .r5-o { border-style: solid !important; margin-bottom: 0px !important; margin-top: 0px !important; width: 100% !important } .r6-i { padding-bottom: 15px !important; padding-top: 15px !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><style type="text/css">p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #0092ff; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #0092ff; text-decoration: underline;}</style></head><body bgcolor="#fc91dc" text="#3b3f44" link="#0092ff" yahoo="fix" style="background-color: #fc91dc;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #fc91dc; width: 100%;"><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"><tr><td valign="top" class="r1-i" style="background-color: #fc91dc;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" class="r5-o" style="table-layout: fixed; width: 600px;"><tr><td class="r6-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px;"> <div style="display: grid; place-items: center; border-radius: 50px; padding: 10px;"> <div style="background: #fff; background-color: #fff; position: relative; width: auto; height: auto; padding: 40px 30px; border-radius: 20px; background-image: url('https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/image-white.png?alt=media&amp;token=e19c1c21-0825-4b36-b875-ba4626f48682&amp;_gl=1*1gk3e73*_ga*MTk5MTI4Njk1Mi4xNjg5Mjc1MjY2*_ga_CW55HF8NVT*MTY5Nzg1Nzk0MS4yNy4xLjE2OTc4NTgxMjAuNDkuMC4w'); background-size: cover; background-position: center; background-repeat: no-repeat;"> <div style="width: 100%; display: grid; place-items: center; padding-top: 20px;"> <img width="200px" height="80px" src="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/LogoPequeno.png?alt=media&token=5bf1e664-e6c3-4e18-aa3a-e07036b2149d&_gl=1*q3inx2*_ga*MTk5MTI4Njk1Mi4xNjg5Mjc1MjY2*_ga_CW55HF8NVT*MTY5Nzc1ODE3Ny4yNS4xLjE2OTc3NTgyNzEuNjAuMC4w" alt="logotipo pequeno"></div> <div style="width: 100%; display: grid; place-items: center;"> <p style="margin: 0; font-size: 24px; color: #EA1964; font-weight: 500;"> SUCCESSFUL REGISTRATION </p> </div> <div style="width: 100%; display: grid; place-items: center; padding: 20px 0px;"> <img width="200px" height="auto" src="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/iconos.png?alt=media&token=59d4d0f4-092e-427e-95aa-0cf7a1268d01&_gl=1*1ffnkcw*_ga*MTk5MTI4Njk1Mi4xNjg5Mjc1MjY2*_ga_CW55HF8NVT*MTY5Nzc1ODE3Ny4yNS4xLjE2OTc3NjA3MzQuNjAuMC4w" alt="logotipo pequeno"></div> <div style="width: 100%; display: grid; place-items: center; margin-top: 15px; color: #EA1964;"> <p style="margin: 0;"> Date: 06/11/2023 </p> <p style="margin: 0;"> Location: Cancun, Breathless Riviera Maya Hotel </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 15px; color: #EA1964; font-size: 30px; font-weight: 500;"> <p style="margin: 0;"> SAVE THE DATE </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 30px; gap: 20px 0px;"> <a href="https://calendar.google.com/calendar/u/0/r/eventedit?text=BENEVERSE+2023&dates=20231106T190000Z/20231106T220000Z&details=Como+llegar:+https://maps.app.goo.gl/Bdy1LT3d3tdQqmPXA" style="color: #0092ff; text-decoration: underline;"> <button style="background: #EA1964; color: #fff; border-radius: 10px; padding: 10px 30px; font-size: 22px; border: 0px;"> Add this event to Google Calendar </button> </a> <a href="https://firebasestorage.googleapis.com/v0/b/hellomx-f7302.appspot.com/o/BENEVERSE_2023.ics?alt=media" style="color: #0092ff; text-decoration: underline; margin-top: 20px;"> <button style="background: #EA1964; color: #fff; border-radius: 10px; padding: 10px 30px; font-size: 22px; border: 0px;"> Save this event to my PC or Cell phone </button> </a> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 30px;"> <p style="margin: 0; font-size: 22px; color: #7E34A2;"> Visit BENEVERSE 2023 </p> </div> <div style="width: 100%; display: grid; place-items: center; margin-top: 10px;"> <a href="https://www.beneverselatam2023.com/" style="text-decoration: underline; color: #EA1964; font-size: 18px; font-style: italic;"> https://beneverselatam2023.com/ </a> <div style="display: flex; gap: 0px 10px;"> <p style="margin: 0; color: #7C2C8C;"> BENEVERSE 2023 </p> <p style="margin: 0; color: #EA1964;"> all rights reserved 2023 </p> </div> </div> </div> </div> </td> </tr></table></th> </tr></table></td> </tr></table></td> </tr></table></body></html>`;

  emailInviteHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <style type="text/css">
      body, p, div {
        font-family: arial,helvetica,sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188E6;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
      </head>
      <body>
        <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
              <tr>
                <td valign="top" bgcolor="#FFFFFF" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                        <tr>
                                          <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
      <tr>
        <td role="module-content">
          <p></p>
        </td>
      </tr>
    </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="012592d1-375f-494f-8b45-5917de263668">
      <tbody>
        <tr>
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
            
          <a href="https://www.beneverselatam2023.com/"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="Beneverse latam 2023" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/6275debb81093cdb/7887eb33-b876-4370-8b08-451a4bce7680/1650x2550.jpg"></a></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="072dfae7-6b51-4521-b96c-4acc9b34f651">
      <tbody>
        <tr>
          <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="de18492c-7517-4f21-9a67-227a5c306ca3">
        <tbody>
          <tr>
            <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
              <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                <tbody>
                  <tr>
                  <td align="center" bgcolor="#721368" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                    <a href="https://www.beneverselatam2023.com" style="background-color:#721368; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:arial,helvetica,sans-serif; font-size:22px; width:390px;" target="_blank">For more details and to register, visit: www.beneverselatam2023.com</a>
                  </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table></td>
                                        </tr>
                                      </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>`;

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

  async senEmailInvite( emails:string[] = ['skiap17@gmail.com'] ) {

    sgMail.setApiKey(process.env.API_KEY_SENDGRIDE);
    
    const msg = {
      to      : emails,
      from    : 'eventos@beneverselatam2023.com',
      subject : 'Attend to Beneverse Latam 2023',
      html    : this.emailInviteHtml
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
