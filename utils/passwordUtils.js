import bcrypt from 'bcryptjs';

export const hashPassword =async (password)=>{
     console.log("Hashing")
     const salt = await new bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     // console.log("Hashed Password: " + hashedPassword)
     return hashedPassword;
}

export const comparePassword=async (password,hashedPassword)=>{
     const isMatch= await bcrypt.compare(password,hashedPassword);
     return isMatch;
}