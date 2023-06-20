import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product-service";
import ProductALL from "../components/productALL-component";
const CategoryNew = ({ setShowCart, showCart }) => {
  const navigate = useNavigate();
  let [productData, setProductData] = useState(null);
  useEffect(() => {
    ProductService.getAll()
      .then((data) => {
        setProductData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  useEffect(() => {
    if (productData) {
      const soldOutElements = document.querySelectorAll(".productImg");
      soldOutElements.forEach((product) => {
        if (product.parentElement.children[2].innerText === "0") {
          console.log(product.children);
          product.children[1].style.display = "block";
          product.classList.add("sold-out");
        }
      });
    }
  }, [productData]);
  return (
    <div>
      <div className="page-bar">
        <ul className="pages">
          <li
            onClick={() => {
              navigate("/products");
            }}
          >
            ViewALL /{" "}
          </li>
          <li>CATEGORY / </li>
          <li
            onClick={() => {
              navigate("/categories/new-arrivals");
            }}
          >
            {" "}
            NEW ARRIVALS
          </li>
        </ul>
      </div>
      <div className="pageTitle">NEW ARRIVALS</div>
      <ProductALL
        productData={productData}
        setShowCart={setShowCart}
        showCart={showCart}
      />
    </div>
  );
};

export default CategoryNew;
