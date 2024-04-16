import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editCourse(course:Course) {
    openEditCourseDialog(this.dialog, course)
      .pipe(
        // make truthy, so if the user has closed the dialog without passing any data,
        // then the observable will not emit any value
        filter(val => !!val)
      )
      .subscribe(val => {
        console.log("New course value: ", val);
      });

  }

}









