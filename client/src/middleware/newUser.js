const handleNewUser = async (accInfo) => {
    try {
        const token = localStorage.getItem("jwt");
        const response = await fetch("http://localhost:3001/api/newAcc", {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            body: JSON.stringify(accInfo)
        });
        const status = await response.status;
    } catch (error) {
        console.error(error);
    }
}

export default handleNewUser;