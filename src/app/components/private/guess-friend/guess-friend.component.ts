import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/authentication.service';

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

  constructor(private spotify: SpotifyService, private auth: AuthService) { }

  ngOnInit() {
    this.getMyPlaylists();
  }

  getMyPlaylists() {
    this.spotify.getMyPlaylists()
      .subscribe(res => {
        //if it has playlists
        if (res['items'].length) {
          this.populatePlaylists(res);
          this.generateNewQuiz();
        } else {
          console.log('No playlists.');
        }
      }, err => {
        if (err.status == 401) {
          this.auth.logout();
        }
        console.log(err);
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
        }
        console.log(err);
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
