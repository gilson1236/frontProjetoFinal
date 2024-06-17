import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApostadorComponent } from "./components/apostador/apostador.component";
import { FormComponent } from "./components/form/form.component";
import { ApostadorViewComponent } from "./components/apostador-view/apostador-view.component";
import { ApostadorResolver } from "./guards/apostador.resolver";

const routes: Routes = [
    { path: '', component: ApostadorComponent },
    { path: 'new', component: FormComponent, resolve: {apostador: ApostadorResolver} },
    { path: 'view/:id', 
        component: ApostadorViewComponent, 
        resolve: {apostador: ApostadorResolver}
    },
    { path: 'edit/:id', 
        component: FormComponent, 
        resolve: {apostador: ApostadorResolver} 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApostadoresRoutingModule { }