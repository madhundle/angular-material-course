import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input() courses: Course[];
  
  numCols = 3;
  rowHeight = '500px';

  handsetPortrait = false;

  constructor(private dialog: MatDialog,
              private responsive: BreakpointObserver) {}

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.TabletPortrait, Breakpoints.TabletLandscape,
      Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape
    ])
    .subscribe(result => {
      console.log(result);

      // Set defaults      
      this.numCols = 3;
      this.rowHeight = '500px';
      this.handsetPortrait = false;

      // Depending on the breakpoints found, site responds accordingly
      const breakpoints = result.breakpoints;

      if (breakpoints[Breakpoints.TabletPortrait]) {
        this.numCols = 1;
      } 
      else if (breakpoints[Breakpoints.HandsetPortrait]) {
        this.numCols = 1;
        this.rowHeight = '430px';
        this.handsetPortrait = true;
      }
      else if (breakpoints[Breakpoints.TabletLandscape]) {
        this.numCols = 2;
      }
      else if (breakpoints[Breakpoints.HandsetLandscape]) {
        this.numCols = 1;
      }
    });
  }

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









