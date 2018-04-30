import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guess-friend',
  templateUrl: './guess-friend.component.html',
  styleUrls: ['./guess-friend.component.css']
})

export class GuessFriendComponent implements OnInit {
  private playlists = [];
  private tracks = [];
  private randomPlaylist;
  private randomFriend;
  private randomTrack;

  public owner;
  public vsFriend;
  public track;

  public correct = null;
  public opponents = [];
  public disabledAnswers;

  public dataLoaded = false;

  public hasTwoOwners;

  constructor(private spotify: SpotifyService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getMyPlaylists();
  }

  getMyPlaylists() {
    this.spotify.getMyPlaylists()
      .subscribe(res => {
        //if it has at least 2 playlists
        if (res['items'].length >= 2) {
          this.populatePlaylists(res);
          if (this.hasTwoOwners) {
            this.generateNewQuiz();
          }
        }
        this.dataLoaded = true;
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        } else {
          console.log(err.error);
          this.router.navigate(['/error']);
        }
      })
  }

  populatePlaylists(res) {
    for (let i = 0; i < res['items'].length; i++) {
      var obj = {};
      obj['owner'] = res['items'][i]['owner'];
      obj['tracks'] = res['items'][i]['tracks'];
      //store only owner obj and tracks obj
      this.playlists.push(obj);
    }
    //ensure you have at least 2 different users
    this.checkOwners(this.playlists);
  }

  checkOwners(arr) {
    this.hasTwoOwners = false;
    var firstOwner = arr[0]['owner']['display_name'] || arr[0]['owner']['id'];
    var secondOwner;
    for (let i = 0; i < arr.length; i++) {
      secondOwner = arr[i]['owner']['display_name'] || arr[i]['owner']['id'];
      if (firstOwner != secondOwner) {
        this.hasTwoOwners = true;
        break;
      }
    }
  }

  generateNewQuiz() {
    this.getRandomPlaylist();

    this.getTracksFromPlaylist(this.playlists[this.randomPlaylist]['tracks']['href']);

    this.getRandomFriend();

    this.generateRandomOrderOpponents();

    //reset result
    this.correct = null;

    //enabled answers
    this.disabledAnswers = false;
  }

  getRandomPlaylist() {
    //get random int for playlist
    this.randomPlaylist = this.getRandomInt(0, this.playlists.length - 1);

    //avoid getting playlist with 0 tracks
    while (this.playlists[this.randomPlaylist]['tracks']['total'] == 0) {
      this.randomPlaylist = this.getRandomInt(0, this.playlists.length - 1);
    }
    this.owner = this.playlists[this.randomPlaylist]['owner']['display_name'] || this.playlists[this.randomPlaylist]['owner']['id'];
  }

  getTracksFromPlaylist(href) {
    this.spotify.getTracks(href)
      .subscribe(res => {
        this.getRandomTrack(res);
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        } else {
          console.log(err.error);
          this.router.navigate(['/error']);
        }
      })
  }

  getRandomTrack(res) {
    this.tracks = res['items'];
    //get random track
    this.randomTrack = this.getRandomInt(0, this.tracks.length - 1);
    var artist = this.tracks[this.randomTrack]['track']['album']['artists'][0]['name'];
    var song = this.tracks[this.randomTrack]['track']['name'];
    this.track = `${artist} - ${song}`;
  }

  getRandomFriend() {
    //get random int for vsFriend
    this.randomFriend = this.getRandomInt(0, this.playlists.length - 1);
    //avoid getting duplicate vsFriend
    while (this.owner == this.playlists[this.randomFriend]['owner']['id']
      || this.owner == this.playlists[this.randomFriend]['owner']['display_name']) {
      this.randomFriend = this.getRandomInt(0, this.playlists.length - 1);
    }
    this.vsFriend = this.playlists[this.randomFriend]['owner']['display_name'] || this.playlists[this.randomFriend]['owner']['id'];
  }

  generateRandomOrderOpponents() {
    //add random order opponents
    var pos = this.getRandomInt(0, 1);
    this.opponents = [];
    this.opponents[pos] = this.owner;
    if (pos == 0) {
      this.opponents[1] = this.vsFriend;
    } else {
      this.opponents[0] = this.vsFriend;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkAnswer(index) {
    if (this.opponents[index] == this.owner) {
      this.correct = true;
    } else {
      this.correct = false;
    }
    this.disabledAnswers = true;
  }
}
