import { account } from "../lib/appwrite"

export const changePassword = async(password:string,oldPassword:string)=>{
    try {
       const result = await account.updatePassword({
            password:password,
            oldPassword:oldPassword
        }) ;
        return result;
    } catch (error) {
       console.error("Error on changePassword",error)
    }
}

interface UpdateEmailProp {
    newEmail:string;
    password:string;
}

export const updatingEmail = async({newEmail,password}:UpdateEmailProp)=>{
    try {
       const result = await account.updateEmail({
            email:newEmail,
            password:password
        })
        return result
    } catch (error) {
       console.error("Error while updatingEmail")
    }
}

export const sendEmailVerification = async(redirectUrl: string) => {
    console.log("authservices ",redirectUrl)
    try {
        const result = await account.createEmailVerification({
            url:"https://devadi.me/verify"
        })
        console.log("result:",result)
        return result;
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
}

export const verifyEmail = async(userId: string, secret: string) => {
    try {
        const result = await account.updateEmailVerification({
            userId,
            secret
        });
        return result;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

