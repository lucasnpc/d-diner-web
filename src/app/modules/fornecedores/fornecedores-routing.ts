import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FornecedoresPage } from "./pages/fornecedores/fornecedores.page";

const routes: Routes = [
    {
        path: '',
        component: FornecedoresPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FornecedoresRoutingModule { }