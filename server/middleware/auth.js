import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const isCustom  = token.length > 30

    try{
        let decodedAuth

        if(token && isCustom) {
            decodedAuth = jwt.verify(token, 'test')
            req.userId = decodedAuth?.id
        }else{
            req.userId = token
        }

        next()
    }catch(err) {
        console.log(err)
    }
}

export default auth