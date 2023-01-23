import sortJobs from "../utils/sortJobs";
import setLocalJobs from "../utils/setLocalJobs";

let fakeData = null;

beforeEach(() => {
  fakeData = [
		{
			"id": 6229,
			"priority": "Trivial",
			"jobName": "Join to Happy Hour"
		},
		{
			"id": 2525,
			"priority": "Urgent",
			"jobName": "Create a new Modal"
		},
		{
			"id": 7556,
			"priority": "Regular",
			"jobName": "Review Code"
		}
	]
})

test("Sort jobs correctly test", () => {
  // Expected sorting = Urgent - Regular - Trivial

  const result = sortJobs(fakeData);

  expect(result).toEqual([
    {
			"id": 2525,
			"priority": "Urgent",
			"jobName": "Create a new Modal"
		},
    {
			"id": 7556,
			"priority": "Regular",
			"jobName": "Review Code"
		},
    {
			"id": 6229,
			"priority": "Trivial",
			"jobName": "Join to Happy Hour"
		},
  ])
});


test("Set data to localStorage control", () => {

  setLocalJobs(fakeData);

  expect(JSON.parse(localStorage.getItem('jobs'))).toEqual(fakeData);
  
})