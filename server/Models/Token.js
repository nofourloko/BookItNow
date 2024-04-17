class Token{
    constructor(token, expireTime, authUserState){
        this.token = token,
        this.expireTime = expireTime,
        this.authUserState = authUserState
    }

    getToken(){
        return {
            token : this.token,
            expiresIn : this.expireTime,
            authUserState: this.authUserState,
        }
    }
}


module.exports = Token