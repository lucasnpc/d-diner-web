import { Provider } from "../../fornecedores/models/provider.model";

export interface Purchase {
    description: string;
    quantityPurchased: number;
    unitCostValue: number;
    productId: number | undefined;
    businessCnpj: string;
    datePurchased: Date;
    productBatch: string;
    provider: Provider;
  }