import { Component, Input, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  standalone: true,
})
export class SkeletonComponent implements OnInit {
  @Input() height?: number | string;
  constructor() {}

  ngOnInit(): void {}
}
