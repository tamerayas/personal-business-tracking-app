const setLocalJobs = jobs => {
  localStorage.setItem('jobs', JSON.stringify(jobs));
}

export default setLocalJobs;