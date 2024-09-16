import IRolModule from "@/Features/rolModule/Types/IRolModule";

export default interface IAuth {
    userId: string;
    idCompany: string;
    rol: string;
    employeeName: string;
    rolModule: IRolModule[];
}
