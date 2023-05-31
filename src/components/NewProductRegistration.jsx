import React, { useState } from 'react';
import Spinner from "../components/Spinner"
import {register_product} from "../api_functions/axios"

const ProductRegistrationForm = ({user}) => {
  const [product, setProduct] = useState({
    productName: '',
    company:'',
    category: '',
    purchaseDate: '',
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfXyP5m-PLcLQ76H3YMjjhBWXlqfuv5V9ZjJfyT601A&s",
    description: 'No Description Available',
    underWarranty: false,
  });
  const [loading,setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
        // image blob to datauri
    const blobToUri = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = () => {
                reject("Error in converting image to uri")
            }
            reader.readAsDataURL(blob)
        })
    }
    //   image file to datauri (base 64 format)
    const convertImage = async(image) => {
        const buffer = await image.arrayBuffer()
        let blob = new Blob([buffer], { type: image.type })
        const uri = await blobToUri(blob)
        return uri;
   } 

  const handleImageUpload = async(e) => {
      const file = e.target.files[0];
    // Perform any necessary image upload logic here
      
      const datauri = await convertImage(file) 

      console.log(e.target.files,datauri) 
      
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: datauri,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
     // Perform form submission logic here
     setLoading(true)
     console.log(product);
 
     console.log(crypto.randomUUID())
     
     const result = await register_product(user.user_id,crypto.randomUUID(), product.productName, product.purchaseDate, user.email, product.underWarranty, product.category, product.company, product.description, product.image)
     
     console.log(result)

     if (result.data.success) {
         // Reset form fields
          setProduct({
          productName: '',
          category: '',
          company:'',
          purchaseDate: '',
          image: '',
          description: '',
          underWarranty: false,
          });
       alert("product registered")
     }

     setLoading(false)
   
   } catch (error) {
     setLoading(false)
     alert("failed to register product")
   }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-lg sm:text-2xl font-bold text-center mb-4">Product Registration</h1>
      <form onSubmit={handleSubmit} className='bg-white shadow-md p-3 rounded-sm'>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="productName">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={product.company}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="purchaseDate">
            Purchase Date
          </label>
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={product.purchaseDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image Upload
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="underWarranty">
            Under Warranty
          </label>
          <input
            type="checkbox"
            id="underWarranty"
            name="underWarranty"
            checked={product.underWarranty}
            onChange={() =>
              setProduct((prevProduct) => ({
                ...prevProduct,
                underWarranty: !prevProduct.underWarranty,
              }))
            }
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex place-content-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {
            loading ?
            <Spinner/>
            : "Register"
          }
        </button>
      </form>
    </div>
  );
};

export default ProductRegistrationForm;
