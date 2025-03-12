import { Injectable } from "@angular/core";
import { NotificationService } from "./notification.service";

const bucket = 'https://cloudseleniumvideos.s3.ap-south-1.amazonaws.com/';

@Injectable({
    providedIn: "root",
})
export class SetVideoPlayerService {

    public videoPlayerSource: string = 'https://drive.google.com/u/5/uc?id=16cqj1XvpCPCUlB9xjzYp8tTGmug5t-7u&export=download';

    public errorLogs?: string;

    public videoplayer: any;

    private interval: unknown;

    private timeout: unknown;

    public isCodeExecutionInProgress = false;

    constructor(private readonly notificationService: NotificationService) {}

    public reloadVideo(): void {
        this.videoplayer.load();
        this.videoplayer.play();
        this.interval = setInterval(() => {
            if (this.isVideoStarted()) {
                this.notificationService.showSnackBar("Code executed, Check Video Response.");
                this.isCodeExecutionInProgress = false;
                clearInterval(this.interval as number);
                clearTimeout(this.timeout as number);
            }
            this.videoplayer.load();
            this.videoplayer.play();
        }, 5000);

        this.timeout = setTimeout(() => {
            if (this.isCodeExecutionInProgress) {
                this.isCodeExecutionInProgress = false;
                this.notificationService.showSnackBar(`Failed, see ${this.videoPlayerSource} later`);
                clearInterval(this.interval as number);
                clearTimeout(this.timeout as number);
            }
        }, 120000)
    }

    public isVideoStarted(): boolean {
        return Boolean(this.videoplayer.currentTime);
    }

    public setVideoPlayerSource(videoFileName: string) {
        this.videoPlayerSource = `${bucket}${videoFileName}`;
    }

    public getVideoPlayerSource(): string {
        return this.videoPlayerSource;
    }

    public setConsoleLogErrors(errorLogs: string) {
        this.errorLogs = errorLogs;
    }
}