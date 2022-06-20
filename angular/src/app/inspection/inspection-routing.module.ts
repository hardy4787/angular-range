import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InspectionPageComponent } from "./inspection-page.component";

const routes: Routes = [
  {
    path: '',
    component: InspectionPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule {}
