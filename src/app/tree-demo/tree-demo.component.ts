import {Component, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';

interface CourseNode {
  name: string;
  children?: CourseNode[];
}

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-demo',
  templateUrl: 'tree-demo.component.html',
  styleUrls: ['tree-demo.component.scss']
})
export class TreeDemoComponent implements OnInit {

  /* Nested */

  nestedDataSource = new MatTreeNestedDataSource<CourseNode>();
  // NestedTreeControl takes a function which can extract a node's children
  nestedTreeControl = new NestedTreeControl<CourseNode>(node => node.children);

  /* Flat */

  // FlatTreeControl takes functions to get the level and whether it's expandable
  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );
  // To craft our flatDataSource, we need to flatten our data
  // Provide a transform function for CourseNode -> CourseFlatNode
  // Also provide level, expandable, and children
  treeFlattener = new MatTreeFlattener(
    (node: CourseNode, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);

  ngOnInit() {
    this.nestedDataSource.data = TREE_DATA;
    this.flatDataSource.data = TREE_DATA;
  }

  hasNestedChild(index: number, node: CourseNode) {
    return node?.children?.length > 0;
  }

  hasFlatChild(index: number, node: CourseFlatNode) {
    return node.expandable;
  }
}


