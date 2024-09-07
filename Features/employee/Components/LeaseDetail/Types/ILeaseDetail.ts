export interface ILeaseDetail {
    idLeaseDetail: number
    idEmployee: number
    idBank: number
    idPerson: number
    employeeName: string
    concept: string
    entity: string
    recurrency: string
    fees: number
    amountFee: number
    totalAmount: number
    requestDate: string
    startDate: string
    endDate: string
    payDate: string
    numberFee: number
    isPaid: boolean
}
