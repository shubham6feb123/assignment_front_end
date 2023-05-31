import React from 'react';

const ProductCard = ({ productName, category, company, image, purchaseDate, underWarranty,product_id, description, onDelete }) => {
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img className="object-cover w-full h-48" src={image} alt={productName} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        <div className="absolute bottom-0 p-4">
          <h2 className="text-xl font-semibold text-white">{productName}</h2>
          <p className="text-gray-200 text-sm">{category}</p>
        </div>
      </div>
      <div className="px-4 py-2">
        <div className="mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Company:</h3>
          <p className="text-gray-600 text-sm">{company}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Purchase Date:</h3>
          <p className="text-gray-600 text-sm">{purchaseDate}</p>
        </div>
        <div className="mb-2">
          <h3 className="text-gray-600 text-sm font-semibold">Description:</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-gray-600 text-sm font-semibold">Warranty:</h3>
          <p className="text-gray-600 text-sm">{underWarranty ? 'Under Warranty' : 'No Warranty'}</p>
        </div>
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
          onClick={onDelete}
          name={product_id}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
