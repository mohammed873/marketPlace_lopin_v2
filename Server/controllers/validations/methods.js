const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

function generatePassword() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = ''
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

async function sendMail(token) {
  var output
  var userEmail
  if (token.tempPassword) {
    output = `<h2>Félicitations</h2>
  
  <div>Votre compte a été créer avec succes !</br>
  Votre mot de passe temporaire : ${token.tempPassword} </br>
  </div>
  `
    userEmail = token.sellerEmail
  } else {
    output = `<h2>Félicitations</h2>
   
   <div>Votre compte a été créer avec succes ! Clique sur lien pour la valider!
   <a href=${process.env.CLIENT_URL + '/buyer/validation/' + token}>${
      process.env.CLIENT_URL + '/buyer/validation/' + token
    }</a>
   </div>
   `
    userEmail = jwt.verify(token, process.env.BUYER_TOKEN).email
  }

  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    let info = await transporter.sendMail({
      from: 'Banjamin Marketplace Support <noreplay@benjamin.fr>',
      to: userEmail,
      subject: 'Verification de compte ✔',
      text: 'Compte verifié',
      html: output,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sendMail, generatePassword }
