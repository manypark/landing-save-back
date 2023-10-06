import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const sgMail = require('@sendgrid/mail');

import { UserRegister } from './entities/user-register.entity';
import { UserRegisterDto } from './dto/user-register';

@Injectable()
export class AppService {


  newHtmlEmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Registro exitoso</title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style><style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' 3D1';} } </style><style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: ' 3D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #ffffff !important } .r2-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r3-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r4-o { border-style: solid !important; width: 100% !important } .r5-i { padding-left: 0px !important; padding-right: 0px !important } .r6-c { box-sizing: border-box !important; padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important; valign: top !important; width: 100% !important } .r7-c { box-sizing: border-box !important; text-align: left !important; valign: top !important; width: 100% !important } .r8-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r9-i { padding-top: 15px !important; text-align: center !important } .r10-i { padding-bottom: 15px !important; padding-top: 15px !important; text-align: center !important } .r11-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r12-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r13-i { text-align: center !important } .r14-r { background-color: #7e34a2 !important; border-radius: 9px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding-bottom: 12px !important; padding-right: 0px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important; border: none !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><style type="text/css">p, h1, h2, h3, h4, ol, ul { margin: 0; } a, a:link { color: #0092ff; text-decoration: underline } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #0092ff; text-decoration: underline;}</style></head><body bgcolor="#ffffff" text="#3b3f44" link="#0092ff" yahoo="fix" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;"><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"><tr><td valign="top" class="r1-i" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r4-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r5-i"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r6-c" align="center" style="font-size: 0px; line-height: 0px; padding-bottom: 15px; padding-top: 15px; valign: top;"> <img src="https://img.mailinblue.com/6554242/images/content_library/original/651f481d9e1f12405f02fbf6.png" width="600" border="0" style="display: block; width: 100%;"></td> </tr><tr><td class="r7-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r8-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r9-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; word-break: break-word; line-height: 1.5; padding-top: 15px; text-align: center;"> <div><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 48px;">¡REGISTRO EXITOSO!</span></p></div> </td> </tr></table></td> </tr><tr><td class="r7-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r8-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r10-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: center;"> <div><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 22px;">FECHA: 06/11/2023</span><br><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 22px;">LUGAR: Cancún, Hotel Breathless Rivera Maya</span></p></div> </td> </tr></table></td> </tr><tr><td class="r7-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r8-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r9-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; word-break: break-word; line-height: 1.5; padding-top: 15px; text-align: center;"> <div><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 48px;">SAVE THE DATE</span></p></div> </td> </tr></table></td> </tr><tr><td class="r11-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="480" class="r12-o" style="table-layout: fixed; width: 480px;"><tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;">­</td> </tr><tr><td height="18" align="center" valign="top" class="r13-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word;">  <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#top" style="v-text-anchor:middle; height: 41px; width: 479px;" arcsize="22%" fillcolor="#7e34a2" strokecolor="#7e34a2" strokeweight="1px" data-btn="1"> <w:anchorlock> </w:anchorlock> <v:textbox inset="0,0,0,0"> <div style="display:none;"> <center class="default-button"><span>Agregar este evento en Google calendar</span></center> </div> </v:textbox> </v:roundrect> <![endif]-->  <!--[if !mso]><!-- --> <a href="#top" class="r14-r default-button" target="_blank" data-btn="1" style="font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word; border-style: solid; word-wrap: break-word; display: block; -webkit-text-size-adjust: none; background-color: #7e34a2; border-color: #7e34a2; border-radius: 9px; border-width: 0px; color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; height: 18px; mso-hide: all; padding-bottom: 12px; padding-right: 0px; padding-top: 12px; width: 480px;"> <span>Agregar este evento en Google calendar</span></a> <!--<![endif]--> </td> </tr><tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;"></td> </tr></table></td> </tr><tr><td class="r11-c" align="center"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="480" class="r12-o" style="table-layout: fixed; width: 480px;"><tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;"></td> </tr><tr><td height="18" align="center" valign="top" class="r13-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word;">  <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#top" style="v-text-anchor:middle; height: 41px; width: 479px;" arcsize="22%" fillcolor="#7e34a2" strokecolor="#7e34a2" strokeweight="1px" data-btn="2"> <w:anchorlock> </w:anchorlock> <v:textbox inset="0,0,0,0"> <div style="display:none;"> <center class="default-button"><span>Agregar este evento en mi PC o celúlar</span></center> </div> </v:textbox> </v:roundrect> <![endif]-->  <!--[if !mso]><!-- --> <a href="#top" class="r14-r default-button" target="_blank" data-btn="2" style="font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word; border-style: solid; word-wrap: break-word; display: block; -webkit-text-size-adjust: none; background-color: #7e34a2; border-color: #7e34a2; border-radius: 9px; border-width: 0px; color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; height: 18px; mso-hide: all; padding-bottom: 12px; padding-right: 0px; padding-top: 12px; width: 480px;"> <span>Agregar este evento en mi PC o celúlar</span></a> <!--<![endif]--> </td> </tr><tr class="nl2go-responsive-hide"><td height="15" style="font-size: 15px; line-height: 15px;">­</td> </tr></table></td> </tr><tr><td class="r7-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r8-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r10-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: center;"> <div><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 22px;">Visita BENEVERSE 2023</span></p><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 22px;">https://beneverselatam2023.com</span></p></div> </td> </tr></table></td> </tr><tr><td class="r7-c" align="left"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r8-o" style="table-layout: fixed; width: 100%;"><tr><td align="center" valign="top" class="r10-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: center;"> <div><p style="margin: 0;"><span style="color: #7E34A2; font-family: 'Trebuchet ms', helvetica, sans-serif; font-size: 22px;">BENEVERSE 2023</span><br><a href="https://beneverselatam2023.com" style="color: #0092ff; text-decoration: underline;"><span style="color: #7E34A2;">https://beneverselatam2023.com</span></a><br><span style="color: #7E34A2;">Todos los derechos reservados 2023</span></p></div> </td> </tr></table></td> </tr><tr><td class="r6-c" align="center" style="font-size: 0px; line-height: 0px; padding-bottom: 15px; padding-top: 15px; valign: top;"> <img src="https://img.mailinblue.com/6554242/images/content_library/original/651f4af69c6e7009da1751aa.png" width="600" border="0" style="display: block; width: 100%;"></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table></td> </tr></table></body></html>
  `;

  constructor(
    @InjectRepository( UserRegister ) private readonly userRepository: Repository<UserRegister>,
  ){}

  async createUser( createUser:UserRegisterDto ) {

    try {
      const user = this.userRepository.create(createUser);

      const userCreate = await this.userRepository.save(user);

      this.sendEmail(userCreate.email);

      return {
        status  : 'ok',
        data    : userCreate,
        message : 'Usuario registrado correctamente'
      }

    } catch (error) {
      this.handleErrors( error );
    }

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

  async sendEmail( email:string = 'skiap17@gmail.com' ) {

    sgMail.setApiKey(process.env.API_KEY_SENDGRIDE);
    
    const msg = {
      to      : [email],
      from    : 'manypark@live.com',
      subject : 'Sending with SendGrid is Fun',
      html    : this.newHtmlEmail
    }
    
    sgMail.send(msg).then((response) => {
      console.log(response[0].statusCode)

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
