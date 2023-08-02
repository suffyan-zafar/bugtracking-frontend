import BugTrackingApi from "./api";

export async function deleteProjectApi(data){
  try {
    const res= await BugTrackingApi.delete(`project/deleteproject/${data.project_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}


export async function getProjectApi(data){
  try {
    const res= await BugTrackingApi.get(`project/getproject/${data.user_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}

export async function assignProjectApi(data){
  try {
    const res= await BugTrackingApi.post("project/assignproject", data);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}


export async function addProjectApi(data){
  try {
    const res= await BugTrackingApi.post("project/addproject", data);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}


export async function displayProjectApi(data){
  try {
    const res= await BugTrackingApi.get(`project/displayproject/${data.user_id}/${data.project_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}

export async function displayProjectAgainstManagerApi(data){
  try {
    const res= await BugTrackingApi.get(`project/displayprojectagainstmanager/${data.user_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}



export async function getProjectAgainstDeveloperApi(data){
  try {
    const res= await BugTrackingApi.get(`project/getprojectagainstdeveloper/${data.user_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}

export async function getProjectAgainstQaApi(data){
  try {
    const res= await BugTrackingApi.get(`project/getprojectagainstqa/${data.user_id}`);
    return res.data;
  } catch (error) {
    // alert(error.response.data.message)
    throw error;
  }

}






