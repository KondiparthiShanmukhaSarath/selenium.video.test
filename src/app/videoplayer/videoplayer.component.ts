import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { SetVideoPlayerService } from '../app.services/set-video-player.service';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.less']
})
export class VideoplayerComponent implements OnInit {
  @Input()
  public parentWidth!: number;

  @Input()
  public parentHeight!: number;

  public get videoPlayerWidth() {
    return this.parentWidth;
  }

  public get videoPlayerHeight() {
    return this.parentHeight * 0.6;
  }

  public get dummyBinder(): null {
    this.setVideoPlayerService.videoplayer = this.elemRef.nativeElement.querySelector(".videoplayer-video");

    return null;
  }

  public tvmode = false;

  public get errorLogs(): string[] {
    const errorLogs: string = this.setVideoPlayerService.errorLogs || '["No Errors from console"]'

    return JSON.parse(errorLogs);
  }

  public setVideoPlayerService: SetVideoPlayerService;

  public get videoURL(): string {
    return this.setVideoPlayerService.getVideoPlayerSource();
  }

  constructor(
      setVideoPlayerService: SetVideoPlayerService,
      private elemRef: ElementRef,
    ) {
    this.setVideoPlayerService = setVideoPlayerService;
  }

  public ngOnInit(): void {
    setTimeout(() => {
      this.toggleMode();
    }, 2000);
  }

  @HostListener('document:keyup', ['$event'])
  public toggleMode(event?: KeyboardEvent) {
    if (event === undefined || event?.key === 'Alt') {
      this.tvmode = !this.tvmode;
    }
  }

  public reloadVideo() {
    const videoplayer = this.elemRef.nativeElement.querySelector(".videoplayer-video");
    videoplayer.load();
    videoplayer.play();
  }

  public showConsoleLogs() {
    this.tvmode = false;
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
