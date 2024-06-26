import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoMdHeart } from "react-icons/io";
import { LuLogOut } from "react-icons/lu"
import Link from "next/link"
import { buttonVariants } from "./ui/button";
import { auth,signOut } from "@/lib/auth";
import { IoIosCart } from "react-icons/io";
import { FaMapMarker } from "react-icons/fa";
import ProfileIcon from "./ProfileIcon";

export default async function Profile() {
    const session = await auth()

    return (
        <div>
            {
                session?.user ? (
                    <Sheet>
                        <SheetTrigger className="flex items-center">
                            <ProfileIcon/>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className='mt-6 flex flex-col gap-4'>
                                <div className='flex flex-col items-start'>
                                    <SheetTitle>{session?.user?.name}</SheetTitle>
                                    <p>{session?.user?.email}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex gap-4 pr-6 hover:bg-muted h-full pt-2 pb-2'>
                                        <IoMdHeart size={22} />
                                        <Link href='orders' className="flex-1 flex justify-between">
                                            My Orders
                                        </Link>
                                    </div>
                                    <div className='flex gap-4 pr-6 hover:bg-muted h-full pt-2 pb-2'>
                                        <IoIosCart size={22} />
                                        <Link href='cart' className="flex-1 flex justify-between">
                                            My Cart
                                        </Link>
                                    </div>
                                    <div className='flex gap-4 pr-6 hover:bg-muted h-full pt-2 pb-2'>
                                        <FaMapMarker size={20} />
                                        <Link href='address' className="flex-1 flex justify-between">
                                            My Address
                                        </Link>
                                    </div>
                                    <form 
                                        action={async () => {
                                            'use server';
                                            await signOut();
                                        }} 
                                        className='flex items-center gap-4 hover:bg-muted pt-2 pb-2'
                                    >
                                        <LuLogOut size={22} />
                                        <button >Logout</button>
                                    </form>
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <Link href='/login' className={buttonVariants()}>Log in</Link>
                )
            }
        </div>
    )
}
