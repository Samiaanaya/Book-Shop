import { useEffect, useState } from "react";
import ProductCard from "../components/Product/ProductCard";
import { useGetAllProductsQuery } from "../redux/features/product/products.api";
import { TBook } from "../type/product.type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../components/ui/select";
import SelectPlaceholder from "../components/common/SelectPlaceholder";
import { productCategory } from "../utils/productCategory";
import { Input } from "../components/ui/input";
import { TParamsReq } from "../type/global.type";
import Loader from "../components/common/Loader";
import useAuthor from "../hook/useAuthor";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useState<TParamsReq[] | undefined>(undefined);
  const [priceFilter, setPriceFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [stockFilter, setStockFilter] = useState<string | undefined>();
  const [authorFilter, setAuthorFilter] = useState<string | undefined>();

  const { data: products, isLoading } = useGetAllProductsQuery(params);
  const [authors, isFetching] = useAuthor();

  useEffect(() => {
    const newParams: TParamsReq[] = [];

    if (searchText) {
      newParams.push({ name: "search", value: searchText });
    }
    if (categoryFilter && categoryFilter !== "All") {
      newParams.push({ name: "category", value: categoryFilter });
    }
    if (authorFilter && authorFilter !== "All") {
      newParams.push({ name: "author", value: authorFilter });
    }
    if (priceFilter && priceFilter !== "All") {
      newParams.push({ name: "priceRange", value: priceFilter });
    }
    if (stockFilter === "inStock") {
      newParams.push({ name: "inStock", value: true });
    }
    if (stockFilter === "outStock") {
      newParams.push({ name: "inStock", value: false });
    }

    setParams(newParams);
  }, [categoryFilter, authorFilter, priceFilter, stockFilter, searchText]);

  if (isLoading) return <Loader />;
  if (isFetching) return <Loader />;

  return (
    <div className="my-10 px-2 md:max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="w-full">
          <Select onValueChange={setCategoryFilter}>
            <SelectPlaceholder text={"Filter with category"} />
            <SelectContent>
              <SelectGroup>
                {productCategory?.map((item) => (
                  <SelectItem value={item} className="py-2">
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select onValueChange={setStockFilter}>
            <SelectPlaceholder text={"Filter with availability"} />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All" className="py-2">
                  All
                </SelectItem>
                <SelectItem value="inStock" className="py-2">
                  In Stock
                </SelectItem>
                <SelectItem value="outStock" className="py-2">
                  Out Of Stock
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select onValueChange={setAuthorFilter}>
            <SelectPlaceholder text={"Filter with author"} />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All" className="py-2">
                  All
                </SelectItem>
                {authors?.map((author: any) => (
                  <SelectItem
                    key={author.id}
                    value={author.author}
                    className="py-2"
                  >
                    {author.author}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <Select onValueChange={setPriceFilter}>
            <SelectPlaceholder text={"Filter with Price"} />
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All" className="py-2">
                  All
                </SelectItem>
                <SelectItem value="100" className="py-2">
                  Price range (0 - 100)
                </SelectItem>
                <SelectItem value="200" className="py-2">
                  Price range (100 - 200)
                </SelectItem>
                <SelectItem value="300" className="py-2">
                  Price range (200 - 300)
                </SelectItem>
                <SelectItem value="400" className="py-2">
                  Price range (300 - 400)
                </SelectItem>
                <SelectItem value="high" className="py-2">
                  Price range (400+)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 w-full">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" border-black py-6"
            type="text"
            placeholder="Search books"
          />
        </div>
      </div>

      {/* single products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
        {products?.data?.result?.map((product: TBook) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
