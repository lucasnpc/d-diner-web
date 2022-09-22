export interface Order {
    orderId: string;
    employeeCpf: string | undefined;
    deskDescription: string
    concluded: boolean
    startDate: string
    endDate: string | undefined
}