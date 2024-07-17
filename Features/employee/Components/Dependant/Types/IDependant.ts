import { IPerson } from "@/Features/person/Types/IPerson";

export interface IDependant {
    idDependant?: number;
    idEmployee?: number;
    idStatusRelationship?: number;
    idPerson?: number;
    person?: IPerson;
}
