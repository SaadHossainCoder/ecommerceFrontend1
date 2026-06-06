import { useMemo } from "react";
import debounce from "lodash.debounce";

import { productService } from "@/services/product.service";
import { useSearchResultsStore } from "@/store/search-store";

export const useSearch = () => {
    const { setLoading, setResults } = useSearchResultsStore();

    const search = useMemo(
        () =>
            debounce(async (query: string) => {
                try {
                    if (query.length < 3) {
                        setResults([]);
                        return;
                    }

                    setLoading(true);

                    const products = await productService.searchproducts(query);

                    setResults(products.data);
                } finally {
                    setLoading(false);
                }
            }, 300),
        [setLoading, setResults]
    );

    return { search };
};
