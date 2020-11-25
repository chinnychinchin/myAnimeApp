import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';



const MATERIAL = [MatButtonModule,MatRadioModule,MatDatepickerModule,MatInputModule,MatDividerModule,MatFormFieldModule, MatToolbarModule, MatIconModule, MatCardModule, MatListModule, MatCheckboxModule, MatButtonToggleModule, FlexLayoutModule]

@NgModule({
    imports: [MATERIAL],
    exports: [MATERIAL]
})

export class MaterialModule { }