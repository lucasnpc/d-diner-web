export interface Order {
    orderId: string;
    employeeCpf: string | undefined;
    deskDescription: string
    concluded: boolean
    startDate: string
    startHour: string
    endDate: string | undefined
    endHour: string | undefined
}