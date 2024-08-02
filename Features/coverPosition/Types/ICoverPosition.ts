export interface ICoverPosition {
    idCoverEmployee: number
    idCoverHierarchyPosition: number
    idCoverPosition: number
    idHierarchyPosition: number
    idEmployee: number
    description?: string
    employee: string
    hierarchyPosition?: string
    coverEmployee?: string
    coverHiearchyPosition?: string
    start?: Date
    end?: Date
}