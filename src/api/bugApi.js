import BugTrackingApi from "./api";

export async function getProjectDeveloper(data) {
  try {
    const res = await BugTrackingApi.get(`bug/getprojectdeveloper/${data.project_id}`)
    return res.data

  } catch (error) {
    throw error;
  }

}

export async function addBugApi(data) {
  console.log(data, "Data");
  try {
    const res = await BugTrackingApi.post("bug/addbug", data)
    return res.data;
  } catch (error) {
    throw error;
  }
}



export async function deleteBugApi(data) {
  try {
    const res = await BugTrackingApi.delete(`bug/deletebug/${data.bug_id}/${data.image}`)
    return res.data

  } catch (error) {
    throw error;
  }

}

export async function
  displayProjectWithBugApi(data) {
  try {
    const res = await BugTrackingApi.get(`bug/displayprojectwithbug/${data.project_id}`);
    return res.data
  } catch (error) {
    throw error;
  }

}

export async function displayBugApi(data) {
  try {
    const res = await BugTrackingApi.get(`bug/displayBug/${data.user_id}/${data.project_id}`)
    return res.data
  } catch (error) {
    throw error;
  }

}



export async function getUserProject(data){
  try {
    const res= await BugTrackingApi.get(`bug/getuserproject/${data.user_id}`);
    return res.data
  } catch (error) {
    throw error;
  }
}

export async function updateBugStatusApi(data) {
  try {
    const res = await BugTrackingApi.post("bug/updatebugstatus", data)
    return res.data;
  } catch (error) {
    throw error;
  }
}


export async function assignProjectDeveloper(data) {
  try {
    const res = await BugTrackingApi.post("bug/assignProjectDeveloper",data)
    return res.data
  } catch (error) {
    throw error;
  }

}


export async function checkBugApi(data) {
  console.log(data,"data");
  try {
    const res = await BugTrackingApi.get(`bug/checkBug/${data.developer_id}/${data.bug_id}`)
    return res.data
  } catch (error) {
    throw error;
  }

}

