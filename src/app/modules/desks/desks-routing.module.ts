import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DesksPageComponent } from "./pages/desks-page/desks-page.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DesksPageComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DesksRoutingModule { }