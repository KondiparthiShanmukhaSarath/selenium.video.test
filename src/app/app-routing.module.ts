import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestcasesComponent } from './testcases/testcases.component';

const routes: Routes = [
    {
        path: '**',
        component: TestcasesComponent,
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}