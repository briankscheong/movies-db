import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? "";
};

export const setCookie = async (key: string, value: string, options?: Partial<ResponseCookie>) => {
    cookies().set(key, value, options ? options : {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        sameSite: "strict"
    });
}

export const deleteCookie = async (key: string) => {
    cookies().delete(key);
}