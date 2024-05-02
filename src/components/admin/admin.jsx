import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductForm from "./ProductForm"
import MaxWidthWrapper from "../MaxWidthWrapper"
import { Button } from "../ui/button"
import AdminResults from "./AdminResults"
import MuliDele from "../MuliDele"

export default function Admin() {
    return (
        <main className="flex justify-center items-center my-10">
            <MaxWidthWrapper>
                <Tabs defaultValue="home">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="home">All Products</TabsTrigger>
                            <TabsTrigger value="add-product">Add Product</TabsTrigger>
                        </TabsList>
                       <MuliDele/>
                    </div>
                    <TabsContent value="home"><AdminResults/></TabsContent>
                    <TabsContent value="add-product"><ProductForm /></TabsContent>
                </Tabs>
            </MaxWidthWrapper>
        </main>
    )
}
