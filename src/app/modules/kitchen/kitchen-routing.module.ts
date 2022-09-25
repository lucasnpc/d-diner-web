import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KitchenPage } from "./pages/kitchen/kitchen.page";

const routes: Routes = [
    {
        path: '',
        component: KitchenPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KitchenRoutingModule { }