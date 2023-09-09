"use strict";
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const md5 = require('md5');

async function main(from, to, nome, empresa, telefone, assunto, mensagem) {

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport(
    {
      host: 'mail.agecob.com.br',
      port: 465,
      secure: true,
      auth: {
        user: 'repasse.mail@agecob.com.br',
        pass: 'nova@trocar123'
      },
      logger: true,
      transactionLog: true, // include SMTP traffic in the logs
      allowInternalNetworkInterfaces: true
    }
  );
  const saltRounds = 10;
  var hash = await bcrypt.hash(from + '+' + to + '+' + nome + '+' + empresa + '+' + assunto, saltRounds);
  hash = md5(hash);

  let info = await transporter.sendMail({
    from: `"${nome}" <${from}>`, // sender address
    to: `${to}`, // list of receivers
    subject: `Formulário do Site [${hash}]`,
    cc: `${from}`,
    html: `
    <p>Olá,</p>

    <p>Recebemos uma mensagem de contato com as seguintes informações:</p>
    
    <ul>
      <li>
        <strong>Nome:</strong>
          ${nome}
      </li>
      <li>
        <strong>Empresa:</strong>
          ${empresa}
      </li>
      <li>
        <strong>Telefone:</strong>
          ${telefone}
      </li>
      <li>
        <strong>Email:</strong>
          ${from}
      </li>
      <li>
        <strong>Assunto:</strong>
          ${assunto}
      </li>
      <li>
        <strong>Mensagem:</strong>
          ${mensagem}
      </li>
    </ul>
    `, // html body
    date: new Date()
  });

  return { "id": info.messageId, "preview": nodemailer.getTestMessageUrl(info), "hash": hash, sendMail: true }

}

module.exports = function () {

  this.sendMail = async (from, to, nome, empresa, telefone, assunto, mensagem) => {
    const send = await main(from, to, nome, empresa, telefone, assunto, mensagem);
    return send;
  }

}