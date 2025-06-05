import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()


const get_secret = async (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente ${key} não está definida`);
  }
  return value;
};


const verify_token = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json({error: 'Token não encontrado.'})

    let secret_key;
    try {
        secret_key = await get_secret('SECRET_KEY');
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
    
    jwt.verify(token, secret_key, (error, decoded) => {
        if(error) return res.status(403).json({error: 'Aviso! Token inválido.'})

        next()
    })
}

export default verify_token