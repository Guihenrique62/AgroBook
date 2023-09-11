/*
CRIADO: JEAN CLEIDSON PEREIRA RODRIGUES
MATRICULA: 202202257141
EMAIL: jeantng2016@gmail.com  
*/

// COLETA O EMAIL E SENHA DO USUARIO
const { user, password } = req.body;
const saltRounds = 10;
const newPassword = md5(password);

// VERIFICA SE O LOGIN EXISTE
const queryvalidar_user_db = new validar_user_db().query;
const valueQuery = await queryvalidar_user_db({
    "where_values": user,
    "and_values": newPassword
}).then((res) => {
    return res
});

// TOTAL DE REGISTROS
var rowQuery = (valueQuery[0]["result"]["recordsets"][0]).length;
var rowQueryValue = (valueQuery[0]["result"]["recordsets"][0]);

// DADOS DO LOGIN
var dataRowQuery = valueQuery[0]["result"]["recordsets"];

// VERIFICA SE EXISTE ALGUMA CORRESPONDENCIA
if (rowQuery > 0) {
    // CRIPTOGRAFA O EMAIL E SENHA
    bcrypt.hash(user + '+' + password, saltRounds).then(function (hash) {
        bcrypt.compare(user + '+' + password, hash).then(function (result) {

            // SALVA NOS COKIES O HASH
            if (result) {
                var token = jwt.sign(
                    {
                        "hash_mail_pass": hash,
                        "login": user,
                        "email": rowQueryValue[0]['usr_email'],
                        "id": rowQueryValue[0]['usr_id'],
                        "office": rowQueryValue[0]['usr_cargo'],
                        "registration_id": rowQueryValue[0]['usr_matricula'],
                        "active": rowQueryValue[0]['usr_ativo'],
                        "company_id": rowQueryValue[0]['usr_empresa'],
                        "goal": rowQueryValue[0]['usr_meta'],
                        "reset_pw": rowQueryValue[0]['usr_reset_senha'],
                        "name": rowQueryValue[0]['usr_nome'],
                        "team_id": rowQueryValue[0]['usr_equipe'],
                    },
                    process.env.SECRET_JWT,
                    {
                        expiresIn: !JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]] ? "300s" : JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]],
                    }
                );
                req.session.HASH_MAIL_PASS = token;
            }

            res.send([
                {
                    "hash": hash,
                    "checked": result,
                    "expiresIn": JSON.parse(process.env.EXPIRATE_PROFILE)[0][dataRowQuery[0][0]["usr_cargo"]],
                    "info": "saved in current session"
                }
            ]);

        });
    });
} else {
    res.status(401).json([
        {
            "hash": "",
            "checked": false,
            "info": "no changes made"
        }
    ]);
}