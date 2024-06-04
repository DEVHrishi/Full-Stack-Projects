import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    RatingModule,
    TagModule,
    InputTextModule,
    DataViewModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    RippleModule,
    BadgeModule,
    ImageModule,
    ToastModule,
    MessagesModule,
    MenubarModule,
    MenuModule,
    ProgressSpinnerModule
  ],
  exports: [
    AvatarModule,
    AvatarGroupModule,
    ToolbarModule,
    CardModule,
    ButtonModule,
    RatingModule,
    TagModule,
    InputTextModule,
    DataViewModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    RippleModule,
    BadgeModule,
    ImageModule,
    ToastModule,
    MessagesModule,
    MenubarModule,
    MenuModule,
    ProgressSpinnerModule
  ]
})
export class PrimengModule { }
