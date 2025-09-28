export const removeRoomAPI = async function removeRoomAPI (id:string){

    const response = await fetch("/api/rooms/"+id, {method:"DELETE", mode:"cors"});
    if (response.ok) {
        return await response.json();
    } 
    return;
}