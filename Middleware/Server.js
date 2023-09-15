const express = require('express')
const nodemailer = require("nodemailer");

///////////////////////////////////////////////////////////
// this is for email delivery to verify email account
///////////////////////////////////////////////////////////

const MainVerifyLink = "http://localhost:5000/verify";
const MainEmail = '"Kussoriz Auth"mainemail';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gmail",
        pass: "apppassword",
    },
});
///////////////////////////////////////////////////////////

require('dotenv').config()
figlet = require("figlet");
const { Client } = require('pg')
const bcrypt = require('bcrypt');
const pgp = require('pg-promise')(/* options */)
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { error } = require('console');
const app = express()
const port = 5000
const saltRounds = 12;
console.log(process.env.PGSQL_URL)
app.use(cors());
const secretKey = 'youcangen';

//////////////////////////////////////////
// comming soon to add function
//////////////////////////////////////////
const SomethingtoAdd = "is coming soon!";
//////////////////////////////////////////

///////////////////////
// postgres
///////////////////////
const db = pgp('postgres://postgresusername:password@ip_or_domain:port/databasename')
const queryTest = async () => {
    const username = "user"
    const firstname = "Apinya"
    const lastname = "Forndev"
    const password = "12345"
    try {
        await client.connect()
        await client.end()
    } catch (e) {
        // console.log(e)
    }
}

////////////////////////
// for comparepassword
////////////////////////
const comparePassword = async (userPassword, hashedpassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, hashedpassword);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing passwords:', err);
    }
};

/////////////////////////
// for create verify link
/////////////////////////

const VerifyLinkGenerator = (email, username) => {
    const expiresIn = "5m";
    const payload = {
        email: email,
        username: username
    }
    const token = jwt.sign(payload, secretKey, { expiresIn });

    try {
        return token;
    } catch (error) {
        return 0;
    }
}

//////////////////////////////////
// send email to verify to user
//////////////////////////////////
async function SendMailToVerify(email, username) {
    const linkVerify = MainVerifyLink;
    try {
        const info = await transporter.sendMail({
            from: MainEmail,
            to: email,
            subject: "Kussoriz Verify Email",
            html: "<h2>Welcome to Kussoriz Authentication</h2><br>click here:" + linkVerify + "/" + VerifyLinkGenerator(email, username)
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log('send verify link error')
    }

}

///////////////////////////////////////////////////
// this old authentication
///////////////////////////////////////////////////
app.get('/auth/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const expiresIn = '5m';
    db.one('SELECT * FROM public.user where username = ' + "'" + username + "'")
        .then((data) => {
            // console.log('DATA:', data)
            const payload = { username: data.username, firstname: data.firstname, lastname: data.lastname };
            const token = jwt.sign(payload, secretKey, { expiresIn });
            comparePassword(password, data.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // console.log('Password matches!');
                        res.send({ msg: token });
                    } else {
                        // console.log('Password does not match!');
                        res.send({ msg: "Password does not match!" })
                    }
                })
                .catch((err) => {
                    res.status(404)
                    console.error('Error:', err.message);
                });
        })
        .catch((error) => {
            // console.log('ERROR:', error)
            res.status(404)
            res.send({ msg: "404" });
        })
})

////////////////////////////////////////////////////
// this is release auth
////////////////////////////////////////////////////
app.get('/authv2/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const expiresIn = '5m';
    db.one('SELECT uid FROM public.user where username = ' + "'" + username + "'")
        .then((data) => {
            //console.log('DATA:', data)
            const payload = { username: data.username, firstname: data.firstname, lastname: data.lastname };
            const token = jwt.sign(payload, secretKey, { expiresIn });
            comparePassword(password, data.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // console.log('Password matches!');
                        res.status(200)
                        res.send({ msg: token });
                    } else {
                        res.status(404)
                        // console.log('Password does not match!');
                        res.send({ msg: "Password does not match!" })
                    }
                })
                .catch((err) => {
                    console.error('Error:', err.message);
                });
        })
        .catch((error) => {
            // console.log('ERROR:', error)
            res.status(404);
            res.send({ msg: "404" });
        })
})

////////////////////////////////////
// for check token to expired?
////////////////////////////////////
app.get('/checktoken/:token', (req, res) => {
    const GetToken = req.params.token;
    // console.log(GetToken);
    try {
        const decoded = jwt.verify(GetToken, secretKey);
        const expFromToken = decoded.exp;
        const currentTime = Date.now();
        if (expFromToken > currentTime) {
            res.status(404)
            res.send({ msg: "expired" })
        }
        else {
            res.status(200)
            res.send(decoded)
        }
    } catch (err) {
        res.status(404)
        res.send({ msg: "404" })
    }
})

///////////////////////////////////////////////
// this is sign up (register)
///////////////////////////////////////////////
app.post('/register/:username/:firstname/:lastname/:password/:email', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    const firstname = req.params.firstname;
    const lastname = req.params.lastname;
    const email = req.params.email;
    const NowTime = "'NOW()'";
    db.one('SELECT username FROM public.user WHERE username = ' + "'" + username + "'")
        .then((checkdata) => {
            // console.log({ msg: "can't register beacause already account name!" })
            res.status(200)
            res.send({ msg: "can't register beacause already account name!" })
        }).catch((error) => {
            bcrypt.hash(password, saltRounds, (err, hashedpassword) => {
                if (err) {
                    console.error('Error hashing password:', err);
                }
                else {
                    // console.log('hashed password:', hashedpassword)
                    db.any('INSERT INTO public.user(username, firstname, lastname, password, "regdate",email)VALUES (' + "'" + username + "'" + ', ' + "'" + firstname + "'" + ', ' + "'" + lastname + "'" + ', ' + "'" + hashedpassword + "'" + ', ' + NowTime + ', ' + "'" + email + "'" + ");")
                        .then((data) => {
                            // console.log({ msg: "200" })
                            res.status(200)
                            res.send({ msg: "200" });
                            SendMailToVerify(email, username).catch(console.error);
                        })
                        .catch((error) => {
                            //console.log('ERROR:', error)
                            res.status(404)
                            res.send({ msg: "404" });
                        })
                }
            })

        })
})

//////////////////////////////////////////////
// this is verify email account 
//////////////////////////////////////////////
app.get('/verify/:token', (req, res) => {
    const VerifyToken = req.params.token;
    const decoded = jwt.verify(VerifyToken, secretKey);
    const username = decoded.username;
    const expFromToken = decoded.exp;
    const currentTime = Date.now();
    try {
        if (expFromToken > currentTime) {
            res.status(404)
            res.send({ msg: "expired" })
        }
        else {
            //res.send(decoded)
            try {
                db.query('UPDATE public."user" SET activate_account=' + true + ' WHERE username = ' + "'" + username + "'" + ';')
                    .then((data) => {
                        // res.send({ msg: 'update data successful!' })
                        // alert('Success to verify email you can login now.')
                        res.redirect('http://localhost:3000/verifysuccess');
                    })
            } catch (error) {
                res.send({ msg: 'error to update data', error })
            }
        }
    } catch (error) {

    }
})

/////////////////////////////////////////////////
// this is update personal user data
/////////////////////////////////////////////////
app.put('/update2/:username/:firstname/:lastname/:password', (req, res) => {
    const username = req.params.username
    const password = req.params.password;
    const firstname = req.params.firstname;
    const lastname = req.params.lastname;
    try {
        db.one('SELECT password FROM public.user WHERE username =' + "'" + username + "'")
            .then((data) => {
                comparePassword(password, data.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            try {
                                db.query('UPDATE public."user" SET firstname=' + "'" + firstname + "'" + ', lastname=' + "'" + lastname + "'" + ' WHERE username = ' + "'" + username + "'" + ';')
                                    .then((data) => {
                                        res.status(200)
                                        res.send({ msg: 'update data successful!' })
                                    })
                            } catch (error) {
                                res.status(404)
                                res.send({ msg: 'error to update data', error })
                            }
                        } else {

                        }
                    })
                    .catch((err) => {
                        console.error('Error:', err.message);
                    });
            })
            .catch((error) => {
                res.status(404);
                res.send({ msg: "404" });
            })
    } catch (error) {
        res.status(404);
        res.send({ msg: "404" })
    }
})
app.listen(port, () => {
    console.log('==============================================');
    figlet("KUSSORIZ BACKEND", function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data);
    });
})