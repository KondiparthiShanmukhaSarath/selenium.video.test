import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../app.services/notification.service';
import { SetVideoPlayerService } from '../app.services/set-video-player.service';
import { ICodeExecutorDataType, ICodeExecutorResponse, TestCaseCodePostManService } from '../app.services/testcase-code-postman.service';
import { UserStateManagerService } from '../app.services/user-state-manager.service';
import { VirtualUITestsConfigService } from '../app.services/virtual-ui-tests.config.service';

import "./codeeditor.component.less";

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.less']
})
export class CodeeditorComponent implements OnInit {
  @Input()
  public code!: string;

  @Input()
  public visibility!: boolean;

  @Input()
  public isCurrentElementFirst!: boolean;

  public get readonly() {
    return !Boolean(this.userStateManagerService.userstate.activemode);
  }

  public get isInterviewMode() {
    return this.userStateManagerService.userstate.activemode === 'interview';
  }

  public editorHintVisibility = false;

  public codePostManService!: TestCaseCodePostManService;

  public setVideoPlayerService!: SetVideoPlayerService;

  public get codeEditorEditStatus(): string {
    return this.readonly ? 'Editor Locked' : '';
  }

  public get editorStatus(): string {
    return this.readonly ? 'lock' : 'lock_open';
  }

  public get toggleEditColor(): string {
    return this.readonly ? 'green' : 'purple';
  }

  public get editorTooltip(): string {
    return this.readonly ? 'Click to Edit Code' : 'Editing...';
  }

  public get visibilityTooltip(): string {
    return this.visibility ? 'Code visibile' : 'Code hidden';
  }

  public get codeEditorOpacity(): string {
    return this.visibility ? 'visibility: visible' : 'visibility: hidden';
  }

  private virtualUITestsConfigService: VirtualUITestsConfigService;

  public get activeMode(): boolean {
    return Boolean(this.userStateManagerService.userstate.activemode);
  }

  public get isLoggedIn(): boolean {
    return this.userStateManagerService.userstate.userdata.userloggedinstatus;
  }

  @Output()
  public resetCodeEventEmitter = new EventEmitter<boolean>();

  constructor(
    virtualUITestsConfigService: VirtualUITestsConfigService,
    codePostManService: TestCaseCodePostManService,
    setVideoPlayerService: SetVideoPlayerService,
    private readonly userStateManagerService: UserStateManagerService,
    private readonly notificationService: NotificationService,
  ) {
    this.virtualUITestsConfigService = virtualUITestsConfigService;
    this.visibility = this.virtualUITestsConfigService.isCodeVisible;
    this.codePostManService = codePostManService;
    this.setVideoPlayerService = setVideoPlayerService;
  }

  /**
   * @override
   * Code Visibility is always true for first Testcase, Empty Testcase.
   */
  ngOnInit(): void {
    this.visibility = this.isCurrentElementFirst ? true : this.visibility
  }

  public clearCode(): void {
    this.code = '';
  }

  public get isCodeInvalid(): string | boolean {
    if (this.code.includes('"')) {
      return 'Use Single Quotes instead of Double Quotes';
    } else if (this.code.includes(';')) {
      return 'Dont use ; in Python'
    } else if (this.code.includes('execute_script') || this.code.includes('execute_async_script')) {
      return 'JS execution is not supported';
    }

    return false;
  }

  public showLoginWarningNotification(): void {
    !this.isLoggedIn ? this.notificationService.showSnackBar("Login to unlock Editor") :
      !this.activeMode ? this.notificationService.showSnackBar("Plan expired, Open Profile") :
        this.setVideoPlayerService.isCodeExecutionInProgress ? this.notificationService.showSnackBar("Code Execution in Progress.") : null;
  }

  public allowedDomainNames: string[] = [
    'google.com', 'instagram.com', 'snapchat.com',
    'facebook.com', 'reddit.com', 'pinterest.com',
    'microsoft.com', 'linkedin.com', 'amazon.com',
    'apple.com', 'vmware.com', 'example.com',
    'amazon.com', 'netflix.com', 'youtube.com',
    'twitter.com', 'whatsapp.com', 'selenium.video',
  ]

  public onResetCode(): void {
    this.resetCodeEventEmitter.emit();
  }

  public trySolution(): void {
    this.visibility = true;
    this.clearCode();
  }

  public showSolutionForNow(): void {
    this.visibility = true;
  }

  public alwaysShowSolution(): void {
    this.visibility = true;
    this.virtualUITestsConfigService.isCodeVisible = true;
  }

  public onExecuteCodeClickHandler(): void {
    if (!this.activeMode) {
      return;
    }
    const codeExecutorData = this.verifyCodeSafety(
      this.formatData(this.code),
    );

    this.setVideoPlayerService.isCodeExecutionInProgress = true;

    this.notificationService.showSnackBar("Executing Code...");

    this.codePostManService.executeCodeInNode(codeExecutorData).subscribe(
      (data: string) => {
        const responseData: ICodeExecutorResponse = JSON.parse(data);

        this.setVideoPlayerService.setVideoPlayerSource(responseData.videoURL);
        this.setVideoPlayerService.reloadVideo();

        if (responseData.consoleerrors) {
          // console.log('ConsoleLogErrors', responseData);

          this.setVideoPlayerService.setConsoleLogErrors(responseData.consoleerrors);
        }
      }
    );
  }

  private formatData(code: string) {
    const allCode = code.split("\n")
    const linesOfImports = allCode.reduce(
      (acc: string[], line: string, index: number, orgArray: string[]): string[] => {
        if (line.includes("import ")) {
          acc.push(line)
        }
        return acc
      }, []);
    const linesOfCode = allCode.filter((line) => line && !line.includes("import "))

    const codeExecutorData: ICodeExecutorDataType = {
      imports: linesOfImports,
      code: linesOfCode,
      techstack: this.virtualUITestsConfigService.selectedTechStackValue,
    }
    return codeExecutorData;
  }

  private verifyCodeSafety(codeExecutorData: ICodeExecutorDataType) {
    // Code Filtering goes here
    return codeExecutorData;
  }
}
