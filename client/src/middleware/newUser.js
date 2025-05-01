const handleNewUser = async (accInfo) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
    try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(`${baseURL}/api/newAcc`, {
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