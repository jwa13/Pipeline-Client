const handleNewUser = async (accInfo) => {
    try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newAcc`, {
            method: "POST",
            headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
            body: JSON.stringify(accInfo)
        });
        const status = await response.status;
        return status;
    } catch (error) {
        console.error(error);
    }
}

export default handleNewUser;