import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../App.css"

export default function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const categoryData = Object.entries(
    filteredProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([category, quantity]) => ({ category, quantity }));

  return (
    <div className="p-6 max-w-4xl mx-auto  rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Table</h1>
      <button 
        onClick={() => setShowChart(!showChart)}
        className="bi bi-table bg-blue-600 text-white px-4 py-2 rounded mb-4 "
      >
        {showChart ? "Hide Chart" : "Show Chart"}
      </button>
      <input
        type="text"
        placeholder="Search product..."
        className=".btn mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <table className="w-full border-collapse border border-red-300 mb-6 bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showChart && (
        <>
          <h2 className="text-xl font-bold mb-2 text-center">Number of Products by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#FF0000" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
