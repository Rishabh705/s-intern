import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
  } from "@/components/ui/card"
import Options from "./Options"

export default function ResultCard({isAdmin, item}) {
    return (
        <Card className='shadow-md hover:shadow-lg'>
            <CardContent className="flex h-full justify-between p-4 relative">
                <div className="space-y-2">
                    <CardTitle>{item.name.length > 50 ? `${item.name.slice(0, 50)}...` : item.name}</CardTitle>
                    <CardDescription>Rs. {item.price}</CardDescription>
                </div>
                {
                    isAdmin &&
                    <Options isAdmin={true} id={item.id} />
                }
            </CardContent>
        </Card>
    )
}
