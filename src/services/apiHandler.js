import axios from "axios";

const methods = {
  GET: axios.get,
  POST: axios.post,
  DELETE: axios.delete,
  PATCH: axios.patch,
};

const handleRequest = async (
  endpoint,
  method = "POST",
  requestBody = null,
  requestParams = null,
  // toastIdPrefix = '',
  successCallback = null,
  disabledNotification = false
) => {
  try {
    const axiosMethod = methods[method.toUpperCase()];
    if (!axiosMethod) {
      throw new Error(`Invalid HTTP method: ${method}`);
    }
    const token = sessionStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
    };

    const response = await axios({
      method: method,
      url: `http://localhost:4009${endpoint}`,
      data: requestBody,
      headers: headers,
      params: requestParams,
    });
    let { data } = response.data;
    console.log("response handlereq", response);
    if (data == null) {
      data = response.data;
    }

    if (response.status === 200) {
      if (successCallback && data) {
        successCallback(data);
      }
      if (method !== "GET" && !disabledNotification) {
        // thunkAPI.dispatch(
        //   showNotification({
        //     message: response.data.message,
        //     status: response.status,
        //     isActive: true,
        //     toastId: `${toastIdPrefix}Success`,
        //   })
        // );
      }
      return response.data.data;
    } else {
      // thunkAPI.dispatch(
      //   showNotification({
      //     message: response.data.message,
      //     status: response.status,
      //     isActive: true,
      //     toastId: `${toastIdPrefix}Failed`,
      //   })
      // );
      return response;
    }
  } catch (error) {
    // thunkAPI
    //   .dispatch
    // showNotification({
    //   message: error.response.data.message,
    //   status: error.response.status,
    //   isActive: true,
    //   toastId: `${toastIdPrefix}Failed`,
    // })
    // ();

    return error.response;
  }
};

export default handleRequest;
