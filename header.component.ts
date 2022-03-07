import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { HeaderService } from "./header.service";
import {
    UrlConstants,
    AppConstants
} from "../../../shared/constants/app.constants";
import { SharedService } from "../../../shared/services/shared.service";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/api";
import { SharedFactory } from "../../../shared/factory/shared.factory";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    providers: [
        HeaderService,
        MessageService,
        SharedFactory
    ]
})
export class HeaderComponent implements OnInit {
    @Input() shrinkFlag;
    @Input() flagValue;
    @Output() collapsedEvent = new EventEmitter<boolean>();
    items: MenuItem[];
    items1: MenuItem[];
    activeItem: MenuItem;
    public shrinkScreenFlag: boolean = false;
    public mobileViewFlag: boolean = false;

    public profileJsonValue: any = [];
    public text: any = "";
    public results: any;
    public searchModel = {
        requisitionSearch: "",
        employeeSearch: ""
    };
    public errorMsgsReq: any = [];
    public warningMsgsReq: any = [];
    public errorMsgsEmp: any = [];
    public warningMsgsEmp: any = [];
    public userDetails: any = [];
    public notificationItems: any = [];
    

    public reqSSOId: string = "";
    public reqSSOName: string = "";
    public reqSSOPosition: string = "";
    public profileUrl: string = "";

    public menuCollapseFlag: boolean = false;
    public showLoader: boolean = false;
   
    /**
     * Creates an instance of header component.
     * @param authService
     * @param sharedFactory
     * @param translate
     * @param router
     * @param queueDetailService
     * @param headerService
     * @param sharedService
     * @param messageService
     */
    constructor(
        public authService: AuthService,
        private sharedFactory: SharedFactory,
        private translate: TranslateService,
        public router: Router,
        private headerService: HeaderService,
        public sharedService: SharedService,
        private messageService: MessageService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }
    /**
     * on init
     */
    ngOnInit() {
        this.menuCollapseFlag = this.shrinkFlag ? this.shrinkFlag : false;
        const innerWidth = window.innerWidth;
        const deviceWidth = window.screen.width;
        if (innerWidth < 1024 || deviceWidth < 1024) {
            this.mobileViewFlag = true;
        } else {
            this.mobileViewFlag = false;
        }

        this.reqSSOId = "503036830";
        this.reqSSOName = "Debargho Bhattacharyya";
        this.reqSSOPosition = "UI Architect";
        // this.assignProfilePicture();
        this.showLoader = false;

        this.items = [
            {label: 'Site Level Dashboard', routerLink:"/siteleveldashboard"},
            {label: 'Equipment Level Dashboard', routerLink:"/equipmentleveldashboard"},
            {label: 'Emission', routerLink:"/enbridgeemission"},
            {label: 'Alert', routerLink:"/overalldashboard"}
        ];

        this.activeItem = this.items[0];
    }

    /**
     * Sends menu event
     */
    sendMenuEvent() {
        this.menuCollapseFlag = !this.menuCollapseFlag;
        this.sharedService.setMenuFlag(this.menuCollapseFlag);
        this.collapsedEvent.emit(this.menuCollapseFlag);
    }

    /**
     * Assigns profile picture
     */
    // assignProfilePicture() {
    //     this.profileUrl =
    //         environment.API_ENDPOINT_BASE_URL_PROFILE_PICTURE +
    //         this.reqSSOId +
    //         UrlConstants.SER_PIC_EXT;
    // }

    /*Function to operate Roles and User Option */
}
