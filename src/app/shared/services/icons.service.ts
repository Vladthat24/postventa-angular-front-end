import { Injectable } from "@angular/core";
import icEdit from "@iconify/icons-ic/round-edit";
import icDelete from "@iconify/icons-ic/round-delete";
import icArrowDropDown from "@iconify/icons-ic/round-arrow-drop-down";
import icSearch from "@iconify/icons-ic/round-search";
import icClose from "@iconify/icons-ic/round-close";
import icName from "@iconify/icons-ic/round-badge";
import icDescription from "@iconify/icons-ic/round-description";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icMail from "@iconify/icons-ic/twotone-group";
import icViewHeadLine from "@iconify/icons-ic/twotone-view-headline";
import icLabel from "@iconify/icons-ic/twotone-label";
import icProvider from "@iconify/icons-ic/twotone-group";
import icDashboard from "@iconify/icons-ic/twotone-dashboard";
import isCategory from "@iconify/icons-ic/twotone-category";
import icCloudDownload from "@iconify/icons-ic/twotone-cloud-download";
import icToday from "@iconify/icons-ic/twotone-today";
import icRefresh from "@iconify/icons-ic/twotone-restart-alt";
import icWarehouse from "@iconify/icons-ic/twotone-widgets";
import icManage from "@iconify/icons-ic/twotone-article";
import icProduct from "@iconify/icons-ic/twotone-inventory-2";
@Injectable({
  providedIn: "root",
})
export class IconsService {
  getIcon(icon: string) {
    if(icon=="icManage"){
      return icManage;
    }
    if(icon=="icProduct"){
      return icProduct;
    }
    if (icon == "icEdit") {
      return icEdit;
    }
    if (icon == "icDelete") {
      return icDelete;
    }
    if (icon == "icArrowDropDown") {
      return icArrowDropDown;
    }
    if (icon == "icSearch") {
      return icSearch;
    }
    if (icon == "icClose") {
      return icClose;
    }
    if (icon == "icName") {
      return icName;
    }
    if (icon == "icDescription") {
      return icDescription;
    }
    if (icon == "icVisibility") {
      return icVisibility;
    }
    if (icon == "icVisibilityOff") {
      return icVisibilityOff;
    }
    if (icon == "icMail") {
      return icMail;
    }
    if (icon == "icViewHeadLine") {
      return icViewHeadLine;
    }
    if (icon == "icLabel") {
      return icLabel;
    }
    if (icon == "icProvider") {
      return icProvider;
    }
    if (icon == "icDashboard") {
      return icDashboard;
    }
    if (icon == "isCategory") {
      return isCategory;
    }
    if(icon=="icCloudDownload"){
      return icCloudDownload;
    }
    if(icon=="icToday"){
      return icToday;
    }
    if(icon=="icRefresh"){
      return icRefresh;
    }
    if(icon=="icWarehouse"){
      return icWarehouse;
    }
  }
}
