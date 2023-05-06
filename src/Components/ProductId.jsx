import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/productId.css";
import useAddCartProduct from "../Hooks/useAddCartProduct";
import Modal from "./Modal";

const ProductId = ({addToCard}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const { productCard, setProductCard, minProduct, plusProduct } =
    useAddCartProduct();
  const [imgBarckground, setImgBarckground] = useState();
  const [msg, setMsg] = useState(false);

  let counter = 0;
  const getProductId = () => {
    axios
      .get(
        `https://e-commerce-api-v2.academlo.tech/api/v1/products/${id ? id : 1}`
      )
      .then((res) => {
        if (res.status == 200) {
          setProduct(res.data);
          setImgBarckground(res.data.images[0]?.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductId();
  }, []);
  // Guardamas las url de las imagenes en array para no llamarlas tan extensa
  const imgUrl = [
    product?.images[0]?.url,
    product?.images[1]?.url,
    product?.images[2]?.url,
  ];
  //  cambiar fondo de imagen grande
  const changeImg = (e) => {
    setImgBarckground(e);
  };

  const mobilePortada = (e) => {
    const imgs = document.querySelectorAll(
      ".gallery__thumnails .gallery__thumnail"
    );
    if (counter <= 2 && counter >= 0) {
      imgs.forEach((e) => {
        e.classList.add("oscure");
      });
      if (e == "prev") {
        counter = counter - 1;
        if (counter == -1) counter = 0;
        imgs[counter].classList.remove("oscure");
      }
      if (e == "next") {
        console.log(counter);
        counter = counter + 1;
        if (counter == 3) counter = 2;
        imgs[counter].classList.remove("oscure");
      }
    }
  };

  const pushDataProduct = (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      const url = "https://e-commerce-api-v2.academlo.tech/api/v1/cart";
      axios
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          addToCard()
        })
        .catch((err) => {
          if (err.response.status == 403)
          {
            setMsg(err.response.data.error);
            setTimeout(() => {
              setMsg(false);
            }, 3000);
          }
        });
    } else {
      navigate("/login");
    }
  };
  const addProduct = () => {
    let prod = {
      quantity: productCard,
      productId: product?.id,
    };
    pushDataProduct(prod);
    setProductCard(0);
  };
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-4 flex-wrap relative">
      <div className="w-full px-2 sm:px-16">
        <button
          onClick={() => goBack()}
          className="float-left bg-blue-beauty text-white font-semibold rounded-lg px-2 py-1 sm:px-4 sm:py-2 hover:opacity-80"
        >
          <i className="fa-solid fa-arrow-left"></i> Regresar
        </button>
      </div>
      <section className="content">
        <article className="gallery">
          <div
            className="gallery__image-container"
            style={{ backgroundImage: `url(${imgBarckground})` }}
          >
            {/* Fondo de imagen */}
          </div>
          <div className="gallery__thumnails">
            <i
              onClick={() => mobilePortada("prev")}
              className="fa-solid fa-chevron-left gallery__previus"
            ></i>
            <i
              onClick={() => mobilePortada("next")}
              className="fa-solid fa-chevron-right gallery__next hover:bg-blue-beauty hover:text-white transition-colors duration-300"
            ></i>
            <img
              id="1"
              onClick={() => changeImg(imgUrl[0])}
              className="gallery__thumnail"
              src={imgUrl[0]}
              alt="thumbnail"
            />
            <img
              id="2"
              onClick={() => changeImg(imgUrl[1])}
              className="gallery__thumnail oscure"
              src={imgUrl[1]}
              alt="thumbnail"
            />
            <img
              id="3"
              onClick={() => changeImg(imgUrl[2])}
              className="gallery__thumnail oscure"
              src={imgUrl[2]}
              alt="thumbnail"
            />
          </div>
        </article>

        <article className="details">
          <h2 className="details__company">{product?.brand}</h2>
          <h2 className="details__title">{product?.title}</h2>
          <div className="container w-11/12 flex justify-between p-2 py-3">
            <span className="text-yellow-700 text-xl">
              &#9733;&#9733;&#9733;&#9733;&#9734;
            </span>
            <span className="text-sm font-bold px-3 py-1 rounded-md bg-green-400 text-white">
              IN STOCK
            </span>
          </div>
          <p className="details__description">{product?.description}</p>
          <div className="w-11/12 px-1 py-3 flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-700 rounded-full block"></span>
            <span className="w-3 h-3 bg-green-800 rounded-full block"></span>
            <span className="w-3 h-3 bg-red-700 rounded-full block"></span>
            <span className="w-3 h-3 bg-gray-900 rounded-full block"></span>
          </div>
          <div className="details__prices">
            <p className="details__now">
              ${product?.price} <span className="details__discount">50%</span>
            </p>
            <p className="details__before">${product?.price * 2}</p>
          </div>

          <div className="details__product-quantity">
            <div className="input">
              <i
                onClick={() => minProduct()}
                className="fa-solid fa-minus input__minus"
              ></i>
              <input
                className="input__number"
                type="text"
                value={productCard}
                readOnly
              />
              <i
                onClick={() => plusProduct()}
                className="fa-solid fa-plus input__plus"
              ></i>
            </div>
            <button onClick={() => addProduct()} className="details__button">
              <i className="fa-solid fa-cart-arrow-down text-xl text-white"></i>
              Add to cart
            </button>
          </div>
          <div>{msg && <Modal msg={msg} />}</div>
        </article>
      </section>
      {/* <!--Final seccion producto--> */}
    </div>
  );
};

export default ProductId;
