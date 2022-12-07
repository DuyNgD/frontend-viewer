import { toast } from "react-toastify";

export const Cookies = {
  getCookie: (name: string) => {
    const value = `; ${document.cookie}`;
    const parts: any = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(";").shift();
  },
  setCookie: (
    name: string,
    value: string,
    expires: number = 0,
    path: string = "/"
  ) => {
    const expiresDate = new Date(expires * 1000);

    document.cookie =
      name + "=" + value + "; expires=" + expiresDate + "; path=" + path;
  },
};
export const request = async (option: any) => {
  const response = await fetch(option.url, {
    method: option.method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + option.accessToken,
      "Content-Type": "application/json",
    },
    body:
      option.method !== "GET" ? JSON.stringify(reObjByNull(option.body)) : null,
  });

  if (response.ok) return await response.json();

  throw await response.json().then((error) => {
    toast.error(error.message);
    return error.message;
  });
};
export const requestFile = async (option: any) => {
  const response = await fetch(option.url, {
    method: option.method,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + option.accessToken,
    },
    body: option.method !== "GET" ? option.body : null,
  });

  if (response.ok) return await response.json();

  throw await response.json().then((error) => {
    toast.error(error.message);
    return error.message;
  });
};
// Replace "" field in object by null
export const reObjByNull = (obj: any) => {
  if (!obj) return;

  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      obj[key] = null;
    }
  });

  return obj;
};
// Validation
export const hasSpecialChar = (str: string) => {
  const format = new RegExp(/[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/); // eslint-disable-line

  return format.test(str);
};
export const hasUpperCase = (str: string) => {
  return str !== str.toLowerCase();
};
export const regexEmail = (str: string) => {
  const format = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); // eslint-disable-line

  return format.test(str);
};
