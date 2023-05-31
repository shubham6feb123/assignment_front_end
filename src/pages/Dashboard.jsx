import React, { useEffect, useState } from "react";
import NewProductRegistration from "../components/NewProductRegistration";
import ProductCard from "../components/ProductCard";
import { delete_product, get_products } from "../api_functions/axios";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const jsonStr = window.localStorage.getItem("user_data");
    const data = JSON.parse(jsonStr);
    console.log(data);
    setUser(data);
    fetchProduct(data?.user_id, data?.email);
  }, [load, activeTab]);

  async function fetchProduct(user_id, email) {
    const result = await get_products(user_id, email);
    setProducts(result.data.result);
    console.log("fetched product",result.data.result)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = async (e) => {
    try {
      // setLoading(true)
      // console.log(e.target.name, user.user_id)
      const result = await delete_product(
        user?.user_id,
        e.target.name,
        user?.email
      );
      // setLoad(!load);
      if (result.data.success) {
        console.log("product deleted", result);
      const deletedProduct = products.filter(
        (p) => p.product_id !== e.target.name
      );
      console.log("rest ", deletedProduct);
      setProducts(deletedProduct);

      console.log("rest prod ", deletedProduct);
      }
    } catch (error) {
      alert("failed to delete product");
      // setLoading(false)
    }
  };

  const ViewProductTab = () => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-2">View Product</h2>
        {/* Display product list or any other relevant information */}
        {products.length===0 ? (
          <h2 className="text-lg font-bold text-center capitalize mb-2">
            No Products to show
          </h2>
        ) : (
          <div className="flex gap-7 flex-wrap">
            {products?.map((p) => (
              <ProductCard
                key={p.product_id}
                image={p.image}
                description={p.description}
                name={p.product_name}
                company={p.company}
                underWarranty={p.under_warranty}
                category={p.category}
                purchaseDate={new Date(p.purchase_date).toLocaleDateString()}
                user_id={p.user_id}
                product_id={p.product_id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-white shadow-md py-4 px-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        <main className="flex-grow container mx-auto p-4 sm:p-8">
          <div className="mb-8 w-full">
            <ul className="w-full flex items-center justify-evenly flex-col gap-y-4 sm:flex-row sm:justify-center sm:gap-x-10">
              <li
                className={`border text-center w-full sm:min-h-fit border-gray-400 p-2 sm:mr-4 cursor-pointer ${
                  activeTab === "view" ? "font-bold bg-white" : ""
                }`}
                onClick={() => handleTabChange("view")}
              >
                View Product
              </li>
              <li
                className={`border text-center w-full sm:min-h-fit border-gray-400 p-2 sm:mr-4 cursor-pointer ${
                  activeTab === "register" ? "font-bold bg-white" : ""
                }`}
                onClick={() => handleTabChange("register")}
              >
                Register Product
              </li>
            </ul>
          </div>
          {activeTab === "view" ? (
            <ViewProductTab />
          ) : (
            <NewProductRegistration user={user} />
          )}
        </main>
        <footer className="bg-gray-200 py-4 px-8">
          <p className="text-sm text-center text-gray-500">
            &copy; 2023 My Company. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default DashboardPage;
