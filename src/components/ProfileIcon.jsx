'use client'

import { useTheme } from "next-themes"
import { CgProfile } from "react-icons/cg"

export default function ProfileIcon() {
    const {theme} = useTheme()
  return (
    <CgProfile size={25} color={`gray`} />
)
}
