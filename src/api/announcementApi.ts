import api from "axios"

export interface Announcements {
    id : number;
    title:string;
    message:string;
    created_At:string;
}


export const getAnnouncements = async (): Promise<Announcements[]> => {
    const response = await api.get("http://127.0.0.1:8000/donor/announcements");
    return response.data;
}