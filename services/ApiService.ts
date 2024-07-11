import IUser from "@/app/(full-page)/auth/types/IUser";
import IParamsApi from "@/types/IParamApi";
import IResponse from "@/types/IResponse";
import axios from "axios";
import Cookies from "js-cookie";

const user = Cookies.get("auth") as IUser | undefined;

const axiosInstance = axios.create({
    baseURL: "http://localhost:5038/",
    // baseURL: "http://specialistnomgateway.objectlink.com:5038/",
    headers: {
        "Content-Type": "application/json",
        IdCompany: user?.idCompany ?? "2",
        IdUser: user?.userId ?? "E110ED35-9677-43AD-9075-781720C1C847",
    },
});

class ApiService<Q, R> {
    endpoint: string;
    params?: IParamsApi;

    constructor(endpoint: string, params?: IParamsApi) {
        this.endpoint = endpoint;
        this.params = params;
    }

    async getForTable(
        params: IParamsApi,
        missEndpoint?: string
    ): Promise<IResponse<R>> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        return await axiosInstance
            .get<IResponse<R>>(finalEndpoint, {
                params: params?.filter,
            })
            .then((res) => res.data);
    }

    async get(missEndpoint?: string): Promise<R> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        return await axiosInstance
            .get<R>(finalEndpoint, {})
            .then((res) => res.data);
    }

    async post(body: Q, missEndpoint?: string): Promise<R | string> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        try {
            const response = await axiosInstance.post<R>(finalEndpoint, body);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async loginPost(body: Q, missEndpoint?: string): Promise<R | string> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        try {
            const response = await axiosInstance.post<R>(finalEndpoint, body);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    async postEmpty(missEndpoint?: string): Promise<R | string> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        try {
            const response = await axiosInstance.post<R>(finalEndpoint, {});
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async put(body: Q, missEndpoint?: string): Promise<R | string> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);

        try {
            const response = await axiosInstance.put<R>(finalEndpoint, body);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async getById(id: number): Promise<R[]> {
        const finalEndpoint = concatEndpoint(this.endpoint, `${id}`);
        return await axiosInstance
            .get<R[]>(finalEndpoint, {})
            .then((res) => res.data);
    }

    async delete(id: number, missEndpoint?: string): Promise<string> {
        const finalEndpoint = concatEndpoint(this.endpoint, missEndpoint);
        try {
            await axiosInstance.delete<R>(`${finalEndpoint}/${id}`);
            return "Registro eliminado";
        } catch (error: any) {
            throw error;
        }
    }
}

const concatEndpoint = (endpoint: string, missEndpoint?: string) => {
    return missEndpoint ? `${endpoint}${missEndpoint}` : endpoint;
};

export default ApiService;
