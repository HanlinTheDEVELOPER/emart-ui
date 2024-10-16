"use server";

import { Review } from "@/lib/type";
import { get, post } from "@/util/fetch";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getMe = async () => {
	return get("users/me");
};

export const getAuth = () => {
	const cookie = cookies().get("Authentication")?.value;
	if (!cookie) return null;
	return jwtDecode(cookie!) as any;
};

export const logOut = async () => {
	cookies().delete("Authentication");
};

export const getProducts = async (
	page: string,
	q: string,
	category: string
) => {
	return get(`product?page=${page}&q=${q}&category=${category}`);
};

export const getTotalProducts = async (
	q: string | undefined = undefined,
	category: string | undefined = undefined
) => {
	return get(`product/total?q=${q}&category=${category}`);
};

export const getProductById = (id: string) => {
	return get(`product/${id}`);
};

export const getCategories = () => {
	return get("category");
};

export const setProductReview = async (review: Partial<Review>) => {
	const res = await post(`review`, review);

	if (res.error) {
		return { error: res.error };
	}

	return {
		error: null,
	};
};

export const deleteReview = async (id: string) => {
	const res = await post(`review/${id}`, {});
	if (res.error) {
		return { error: res.error };
	}

	return {
		error: null,
	};
};
export const addToCart = async (body: {
	productId: string;
	quantity: number;
	subTotal: number;
}) => {
	const res = await post(`cart`, body);
	if (res.error) {
		return { error: res.error };
	}

	return {
		error: null,
	};
};

export const revalidate = (path: string) => {
	revalidatePath(path);
};
