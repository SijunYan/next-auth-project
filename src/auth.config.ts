import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin, type NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./actions/services/user"
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const {email, password} = validatedFields.data

          const user = await getUserByEmail(email)
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password)

          if(passwordMatch) return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig