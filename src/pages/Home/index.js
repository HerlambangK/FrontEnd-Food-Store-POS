import * as React from "react";
import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
  InputText,
  Pill,
} from "upkit";

import menus from "./menu";
import TopBar from "../../components/TopBar";
import { config } from "../../config";
import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
  setKeyword,
  SetCategory,
  toggleTag,
} from "../../features/Products/actions";

import BounceLoader from "react-spinners/BounceLoader";

import { tags } from "./tags";

// (1) import `useDispatch` dan `useSelector`
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  let dispatch = useDispatch();

  // (2) baca state `products` dari Redux store
  let products = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);
  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="top"
            active={products.category}
            onChange={(category) => dispatch(SetCategory(category))}
          />
        }
        content={
          <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
            <div className="w-full md:w-3/4 pl-5 pb-10">
              <TopBar />

              <div className="w-full text-center mb-10 mt-5">
                <InputText
                  fullRound
                  placeholder="cari makanan favoritmu..."
                  value={products.keyword}
                  fitContainer
                  onChange={(e) => dispatch(setKeyword(e.target.value))}
                />
              </div>
              <div className="mb-9 mt-5 pl-2 flex w-3/3 overflow-auto pb-5">
                {tags[products.category].map((tag, index) => {
                  return (
                    <div key={index}>
                      <Pill
                        text={tag}
                        icon={tag.slice(0, 1).toUpperCase()}
                        isActive={products.tags.includes(tag)}
                        onClick={(_) => dispatch(toggleTag(tag))}
                      />
                    </div>
                  );
                })}
              </div>

              {products.status === "process" && !products.data.length ? (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              ) : null}

              <Responsive desktop={3} items="stretch">
                {products?.data?.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      <CardProduct
                        title={product.name}
                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                        price={product.price}
                        onAddToCart={(_) => null}
                      />
                    </div>
                  );
                })}
              </Responsive>

              <div className="text-center my-10">
                <Pagination
                  totalItems={products.totalItems}
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={(page) => dispatch(setPage(page))}
                  onNext={(_) => dispatch(goToNextPage())}
                  onPrev={(_) => dispatch(goToPrevPage())}
                />
              </div>
            </div>

            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
              Keranjang Belanja disini
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}

// redux store
