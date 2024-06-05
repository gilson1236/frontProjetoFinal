import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApostadorComponent } from "./components/apostador/apostador.component";
import { FormComponent } from "./components/form/form.component";

const routes: Routes = [
    { path: '', component: ApostadorComponent },
    { path: 'new', component: FormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ApostadoresRoutingModule { }