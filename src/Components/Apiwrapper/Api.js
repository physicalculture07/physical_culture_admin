import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASECONFIG } from "../Config";

const api = async ({
  body,
  headers = {},
  method,
  signal,
  url,
  formData = false,
}) => {
  let languge = localStorage.getItem("langs");
  if (languge === null) {
    languge = "en";
  }
  let user_id = localStorage.getItem("userid");
  let comapny_id = localStorage.getItem("company_id");

  console.log(user_id, "1456456464");

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Accept-Language"] = `${languge}`;
  headers["for-country"] = "IND";
  headers["user_id"] = user_id;
  headers["company_id"] =comapny_id;

  // headers["Cookie"] =
  //   "session=eyJvdHBfY29kZSI6IjgyNDgwMSIsInNpZ251cF9lbWFpbCI6InZpa3JhbUB5b3BtYWlsLmNvbSJ9.ZpZv9A.r9KaYjkjUzAFY_3IoO3QvpPCQyk";

  // headers["Authorization"] = `${token}`;
  if (!formData) {
    headers["content-type"] = "application/json";
  }
  try {
    const response = await fetch(BASECONFIG.BASE_URL + url, {
      method,
      headers,
      body: body ? (formData ? body : JSON.stringify(body)) : null,
      // credentials: "include",
      signal,
    });
    if (!response.ok) {
      throw await response.clone().json();
    }

    return response.clone().json();
  } catch (error) {
    // throw error;
    return error;
  }
};

export const allApi = async ({
  body,
  headers = {},
  method,
  signal,
  url,
  formData = false,
}) => {
  // headers['Access-Control-Allow-Origin'] = '*';

  try {
    return await fetch(url, {
      method,
      headers,
      body: body ? (formData ? body : JSON.stringify(body)) : null,
      signal,
    })
      .then((response) => {
        if (response.url.includes("X-Amz-Credential")) {
          return true;
        }
        return response.clone().json();
      })
      .then((data) => {
        return data;
      });
  } catch (error) {
    toast.error(error);
    throw Error(error);
  }
};

export default api;
