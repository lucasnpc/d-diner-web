import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioPage } from "./pages/inicio/inicio.page";

const routes: Routes = [
    {
        path: '',
        component: InicioPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InicioRoutingModule { }