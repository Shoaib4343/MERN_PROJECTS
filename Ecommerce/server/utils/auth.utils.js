const bcrypt = require("bcrypt")

const hashPass = async (password)=>{
    try {
        return await bcrypt.hash(password,10)
        
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

const comparePass = async(password, hashedPass)=>{
    try {
    return await bcrypt.compare(password,hashedPass)
        
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

module.exports = {hashPass,comparePass}