import { httpClient } from "../client";
import { urls } from "../urls";
import { IParams, ISneakerList, ISneakerResponse } from "../../src/types/main";

export async function getSneakers(params: IParams): Promise<ISneakerResponse> {
  const response = await httpClient().get<ISneakerResponse>(urls.sneaker.list, {
    params: {
      page: params.page,
      limit: params.limit,
      brands: params.brands,
      search: params.search,
    },
  });
  // console.log(response.data);

  return response.data;
}

export async function getSneakerBrands(): Promise<string[]> {
  const response = await httpClient().get<string[]>(urls.sneaker.sneakerBrands);
  return response.data;
}

export async function getSneakerItems(
  id: number | string
): Promise<ISneakerList> {
  const response = await httpClient().get<ISneakerList>(
    urls.sneaker.sneakerItems(id)
  );
  return response.data;
}
