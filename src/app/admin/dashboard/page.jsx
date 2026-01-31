import DashboardClient from "./DashboardClient";
import { getProducts } from "../actions";

export default async function DashboardPage() {
    const products = await getProducts();

    return (
        <DashboardClient initialProducts={products} />
    );
}
