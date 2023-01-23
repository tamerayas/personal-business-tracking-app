const sortJobs = data => {
    return data.sort((a, b) => {
        if (a.priority === "Urgent") return -1;
        if (b.priority === "Urgent") return 1;
        return a.priority.localeCompare(b.priority);
    });
}
export default sortJobs;