import bcrypt from "bcrypt";


async function encrypt(text) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(text, salt);
    return hash
}



async function decrypt(text,hashpass) {
    const hash = await bcrypt.compare(text,hashpass);
    return hash
}

// const password =await encrypt("shivamjha");
// console.log(password)

// const decryptPassword =await decrypt("shivamjha",password);
// console.log("decryptPassword",decryptPassword)
export {encrypt,decrypt}