import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    token: string
) {
    const comfirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    try {
      await resend.emails.send({
        from: 'Test <onboarding@resend.dev>',
        to: [email],
        subject: 'Comfirm your email',
        html: `<p>Click <a href="${comfirmLink}">here</a> to confirm your email</p>`,
      });
  
    } catch (error) {
      console.log(error)
    }
}


export async function sendPasswordResetEmail(
    email: string,
    token: string
) {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    try {
      await resend.emails.send({
        from: 'Test <onboarding@resend.dev>',
        to: [email],
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetLink}">here</a> to Reset your password</p>`,
      });
  
    } catch (error) {
      console.log(error)
    }
}