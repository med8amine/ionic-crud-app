import { Component, OnInit } from '@angular/core';
import { SongService } from './../shared/song.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.page.html',
  styleUrls: ['./edit-song.page.scss'],
})
export class EditSongPage implements OnInit {
  updateSongForm: FormGroup;
  id: any;
  constructor(
    private songAPI: SongService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.getSongData(this.id);
    this.updateSongForm = this.fb.group({
      song_name: [''],
      artist: ['']
    })
  }
  getSongData(id:any) {
    this.songAPI.getSong(id).subscribe((res:any) => {
      this.updateSongForm.setValue({
        song_name: res['song_name'],
        artist: res['artist']
      });
    });
  }
  updateForm() {
    if (!this.updateSongForm.valid) {
      return false;
    } else {
      return this.songAPI.updateSong(this.id, this.updateSongForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateSongForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }
}