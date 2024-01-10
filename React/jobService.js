jobService.getById = (id) => {
  const config = {
    method: "GET",
    url: `${jobService.endPoint}/${id}`,
    data: null,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
