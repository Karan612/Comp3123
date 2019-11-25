import { Game } from './../../shared/game';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'list-games',
  templateUrl: './list-games.component.html',
  styleUrls: ['./list-games.component.css']
})
export class ListGamesComponent implements OnInit {

  GameData: any = [];
  dataSource: MatTableDataSource<Game>;
  @ViewChild(MatPaginator, {static : false}) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'platform', 'genre','rating','publisher','release','status', 'action'];

  constructor(private gameApi: ApiService) {
    this.gameApi.GetGames().subscribe(data => {
      this.GameData = data;
      this.dataSource = new MatTableDataSource<Game>(this.GameData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
   }
  
  ngOnInit() {
  }

  deleteGame(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.gameApi.DeleteGame(e._id).subscribe()
    }
  }

}
