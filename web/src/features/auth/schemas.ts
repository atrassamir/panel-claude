import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('ایمیل معتبر نیست'),
  password: z.string().min(1, 'رمز عبور را وارد کنید'),
})

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'نام باید حداقل ۲ حرف باشد'),
    email: z.email('ایمیل معتبر نیست'),
    password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v, 'پذیرش قوانین الزامی است'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'تکرار رمز عبور مطابقت ندارد',
    path: ['confirmPassword'],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
