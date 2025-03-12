import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import { parse } from 'yaml';
import { HttpClient } from '@angular/common/http';

export enum AllTechstacks {
    python_selenium = 'Python and Selenium',
    java_selenium = 'Java and Selenium',
    nodejs_playwright = 'NodeJS and Playwright',
    python_playwright = 'Python and Playwright',
}

export const availableTechStacks = {
    python_selenium: true,
    python_playwright: false,
    java_selenium: false,
    nodejs_playwright: false,
}

export const techstackHash = {
    python_selenium: 'Python and Selenium',
    python_playwright: 'Python and Playwright',
    java_selenium: 'Java and Selenium',
    nodejs_playwright: 'NodeJS and Playwright',
}

export interface ItechStack {
    techstack: AllTechstacks,
    code: string,
    static_video: string,
}

export interface IVirtualUITestsConfig {
    testcase_title: string,
    testcase_description: string,
    testcase_source: string,
    techstacks: ItechStack[]
}

export const blankTestCase: IVirtualUITestsConfig = {
    testcase_title: 'Empty PlayGround',
    testcase_description: 'An `Empty Playground` is where you test out your code.',
    testcase_source: 'NA',
    techstacks: [
        {
            techstack: AllTechstacks.python_selenium,
            code: "",
            static_video: "",
        },
        {
            techstack: AllTechstacks.java_selenium,
            code: "",
            static_video: "",
        },
        {
            techstack: AllTechstacks.nodejs_playwright,
            code: "",
            static_video: "",
        },
        {
            techstack: AllTechstacks.python_playwright,
            code: "",
            static_video: "",
        },
    ],
}

@Injectable({
    providedIn: "root",
})
export class VirtualUITestsConfigService {
    public selectedTechStackValue = "python_selenium";

    public get selectedTechStackName(): AllTechstacks {
        return this.getTechStackName(this.selectedTechStackValue);
    }

    public get isCodeVisible() {
        return this.codeVisibility;
    }

    public set isCodeVisible(visibility) {
        this.codeVisibility = visibility;
    }

    private codeVisibility = false;

    private virtualUItestsConfig!: IVirtualUITestsConfig[];

    constructor(private http: HttpClient) {
        this.getVirtualUITestsConfig().subscribe(data => {
            this.virtualUItestsConfig = { ...data };
        })
    }

    private getVirtualUITestsConfig(): Observable<any> {
        return this.http.get("../../assets/virtual-ui-tests.config/virtual-ui-tests.config.yaml", {
            observe: "body",
            responseType: "text",
        }).pipe(
            map(yamlString => parse(yamlString)),
        );
    }

    public getSavedJson(): IVirtualUITestsConfig[] {
        return this.virtualUItestsConfig;
    }

    public getJson(): Observable<any> {
        return this.getVirtualUITestsConfig();
    }

    public getTechStackName(tech: string): AllTechstacks {
        return (AllTechstacks as any)[tech];
    }

    public getTechStackAvailability(tech: string): boolean {
        return (availableTechStacks as any)[tech];
    }
}