import BugTrackingApi from "./api";

export async function LoginApi(data) {
  try {
    const res = await BugTrackingApi.post("user/login", data)
    return res.data

  } catch (error) {
    throw error;
  }

}

export async function SignupApi(data) {
  try {
    const res = await BugTrackingApi.post("user/signup", data)
    return res.data;
  } catch (error) {
    throw error;
  }
}


export async function GetDeveloperApi(data) {
  console.log(data.project_id, "Data");
  try {
    const res = await BugTrackingApi.get(`user/getdeveloper/${data.project_id}`)
    console.log(res.data, "response");
    return res.data;
  } catch (error) {
    console.log(error, "error ku ");
    throw error;
  }
}

export async function GetQaApi(data) {
  console.log(data.project_id, "Data");
  try {
    const res = await BugTrackingApi.get(`user/getQa/${data.project_id}`)
    console.log(res.data, "response");
    return res.data;
  } catch (error) {
    console.log(error, "error ku ");
    throw error;
  }
}

export async function GetDeveloperForUnassign(data) {
  console.log(data.project_id, "Data");
  try {
    const res = await BugTrackingApi.get(`user/getdeveloperforunassign/${data.project_id}`)
    console.log(res.data, "response");
    return res.data;
  } catch (error) {
    console.log(error, "error ku ");
    throw error;
  }
}


export async function unAssignDeveloper(data) {
  try {
    const res = await BugTrackingApi.post("user/unassigndeveloper", data)
    return res.data

  } catch (error) {
    throw error;
  }

}

export async function getQaForUnassign(data) {
  console.log(data.project_id, "Data");
  try {
    const res = await BugTrackingApi.get(`user/getqaforunassign/${data.project_id}`);
    console.log(res.data, "response");
    return res.data;
  } catch (error) {
    console.log(error, "error ku ");
    throw error;
  }

  
}


export async function unAssignQa(data) {
  try {
    const res = await BugTrackingApi.post("user/unassignqa", data)
    return res.data

  } catch (error) {
    throw error;
  }

}

