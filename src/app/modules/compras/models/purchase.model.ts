import { Provider } from "../../fornecedores/models/provider.model";

export interface Purchase {
  batch: string;
  description: string;
  expirationDate: Date | undefined;
  purchaseDate: Date;
  quantity: number;
  unitCostValue: number;
  provider: Provider | undefined;
}