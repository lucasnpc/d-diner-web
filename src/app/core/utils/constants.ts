import { DatePipe } from "@angular/common";

export const ORDER_TAG = "order"
export const USER_INFO = "userInfo"

export const CASH_ROLE = "caixa"
export const CLIENT_ROLE = "cliente"

export const datePipe = new DatePipe('pt-BR');

export const STATUS_STARTING = "enviado"
export const STATUS_PREPARED = "preparado"

export const SAVE_DATE_FORMAT = "dd/MM/yyyy"
export const SHOW_DATE_FORMAT = "dd 'de' MMMM 'de' yyyy"

export const INICIO_ROUTE = "/menu/inicio"
export const KITCHEN_ROUTE = "/menu/cozinha"
export const DESKS_ROUTE = "/menu/mesas"
export const DASHBOARD_ROUTE = "/menu/dashboard"
export const DASHBOARD_DETAIL_ROUTE = "/menu/dashboard/detail"
export const CASHIER_ROUTE = "/menu/caixa"
export const CLIENTS_ROUTE = "/menu/clientes"
export const MENU_ROUTE = "/menu/cardapio"