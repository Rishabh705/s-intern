import { Mulish } from "next/font/google"

export const metadata = {
    title: 'Register',
    description: 'Register your account',
}
const mulish = Mulish({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function LoginLayout({children}) {
  return (
    <>
        {children}
    </>
  )
}
