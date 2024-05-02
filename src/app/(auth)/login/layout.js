import { Mulish } from "next/font/google"

export const metadata = {
    title: 'Login',
    description: 'Login to your account',
}

const mulish = Mulish({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function LoginLayout({children}) {
  return (
    <div className={mulish.className}>
        {children}
    </div>
  )
}
